"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Product = {
  id?: number;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  sizes: string[];
  is_new: boolean;
  is_featured: boolean;
};

export default function AdminPage() {
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<Product>({
    name: "",
    price: 0,
    category: "t-shirts",
    description: "",
    image: "",
    sizes: ["S", "M", "L", "XL"],
    is_new: false,
    is_featured: false,
  });

  const [password, setPassword] = useState("");
  const [auth, setAuth] = useState(false);
  const [msg, setMsg] = useState("");

  /* LOGIN */
  if (!auth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            password === "memories2026"
              ? setAuth(true)
              : setMsg("Contraseña incorrecta");
          }}
          className="border border-accent p-8 bg-accent/30 space-y-4 w-full max-w-sm text-center"
        >
          <h1 className="text-2xl font-black uppercase">Admin</h1>
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full bg-background border border-accent px-4 py-3 text-center"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full bg-foreground text-background py-3 font-black uppercase">
            Entrar
          </button>
          {msg && <p className="text-red-500 text-xs">{msg}</p>}
        </form>
      </div>
    );
  }

  /* FETCH PRODUCTS */
  const loadProducts = async () => {
    const { data } = await supabase.from("products").select("*").order("id", { ascending: false });
    if (data) setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  /* IMAGE UPLOAD */
  const uploadImage = async (file: File) => {
    const path = `${Date.now()}-${file.name}`;
    const { data } = await supabase.storage.from("products").upload(path, file);
    if (!data) return "";
    return supabase.storage.from("products").getPublicUrl(data.path).data.publicUrl;
  };

  /* ADD */
  const addProduct = async () => {
    await supabase.from("products").insert([form]);
    setMsg("Producto añadido");
    setForm({ ...form, name: "", price: 0, description: "", image: "" });
    loadProducts();
  };

  /* UPDATE */
  const updateProduct = async (p: Product) => {
    await supabase.from("products").update(p).eq("id", p.id);
    setMsg("Producto actualizado");
    loadProducts();
  };

  /* DELETE */
  const deleteProduct = async (id?: number) => {
    if (!id || !confirm("¿Eliminar producto?")) return;
    await supabase.from("products").delete().eq("id", id);
    loadProducts();
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-6 space-y-12">

        {/* MENU */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setMode("add")}
            className={`px-6 py-2 border font-black uppercase text-xs ${
              mode === "add" ? "bg-foreground text-background" : "border-accent"
            }`}
          >
            Añadir producto
          </button>
          <button
            onClick={() => setMode("edit")}
            className={`px-6 py-2 border font-black uppercase text-xs ${
              mode === "edit" ? "bg-foreground text-background" : "border-accent"
            }`}
          >
            Editar productos
          </button>
        </div>

        {/* ADD */}
        {mode === "add" && (
          <div className="space-y-4 border border-accent p-6">
            <input className="input" placeholder="Nombre" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            <input type="number" className="input" placeholder="Precio" value={form.price} onChange={e => setForm({ ...form, price: Number(e.target.value) })} />
            <textarea className="input h-28" placeholder="Descripción" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />

            <input
              type="file"
              onChange={async e => {
                if (e.target.files?.[0]) {
                  const url = await uploadImage(e.target.files[0]);
                  setForm({ ...form, image: url });
                }
              }}
            />

            <button onClick={addProduct} className="w-full bg-foreground text-background py-3 font-black uppercase">
              Guardar producto
            </button>
          </div>
        )}

        {/* EDIT */}
        {mode === "edit" && (
          <div className="space-y-6">
            {products.map(p => (
              <div key={p.id} className="border border-accent p-5 space-y-3">
                <input className="input" value={p.name} onChange={e => setProducts(ps => ps.map(x => x.id === p.id ? { ...x, name: e.target.value } : x))} />
                <input type="number" className="input" value={p.price} onChange={e => setProducts(ps => ps.map(x => x.id === p.id ? { ...x, price: Number(e.target.value) } : x))} />
                <textarea className="input h-24" value={p.description} onChange={e => setProducts(ps => ps.map(x => x.id === p.id ? { ...x, description: e.target.value } : x))} />

                <div className="flex gap-3">
                  <button onClick={() => updateProduct(p)} className="btn-primary">Guardar</button>
                  <button onClick={() => deleteProduct(p.id)} className="btn-danger">Eliminar</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {msg && <p className="text-center text-xs uppercase font-black">{msg}</p>}
      </div>
    </div>
  );
}
