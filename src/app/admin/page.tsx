"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";

type Product = {
  id?: number;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  images: string[];
  sizes: string[];
  is_new: boolean;
  is_featured: boolean;
};

export default function AdminPage() {
  const [view, setView] = useState<"add" | "edit">("add");
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product>({
    name: "",
    price: 0,
    category: "t-shirts",
    description: "",
    image: "",
    images: [],
    sizes: ["S", "M", "L", "XL"],
    is_new: false,
    is_featured: false,
  });

  const [password, setPassword] = useState("");
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");

  /* 🔐 LOGIN */
  if (!auth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            password === "memories2026"
              ? setAuth(true)
              : setMessage("Contraseña incorrecta");
          }}
          className="border border-accent p-10 bg-accent/30 space-y-6 w-full max-w-sm text-center"
        >
          <h1 className="text-3xl font-black uppercase">Admin</h1>
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full bg-background border border-accent px-4 py-3 text-center"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full bg-foreground text-background py-4 font-black uppercase">
            Entrar
          </button>
          {message && <p className="text-red-500 text-xs">{message}</p>}
        </form>
      </div>
    );
  }

  /* 📦 FETCH PRODUCTS */
  const loadProducts = async () => {
    const { data } = await supabase.from("products").select("*").order("id", { ascending: false });
    if (data) setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  /* 🖼️ UPLOAD IMAGE */
  const uploadImage = async (file: File) => {
    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from("products")
      .upload(fileName, file);

    if (error) return "";

    return supabase.storage.from("products").getPublicUrl(data.path).data.publicUrl;
  };

  /* ➕ ADD PRODUCT */
  const addProduct = async () => {
    const { error } = await supabase.from("products").insert([product]);
    if (!error) {
      setMessage("Producto añadido");
      setProduct({
        name: "",
        price: 0,
        category: "t-shirts",
        description: "",
        image: "",
        images: [],
        sizes: ["S", "M", "L", "XL"],
        is_new: false,
        is_featured: false,
      });
      loadProducts();
    }
  };

  /* ✏️ UPDATE */
  const updateProduct = async (p: Product) => {
    await supabase.from("products").update(p).eq("id", p.id);
    setMessage("Producto actualizado");
    loadProducts();
  };

  /* 🗑️ DELETE */
  const deleteProduct = async (id?: number) => {
    if (!id || !confirm("¿Eliminar producto?")) return;
    await supabase.from("products").delete().eq("id", id);
    loadProducts();
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 space-y-16">

        {/* MENU */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => setView("add")}
            className={`px-6 py-3 border font-black uppercase ${
              view === "add" ? "bg-foreground text-background" : "border-accent"
            }`}
          >
            Añadir producto
          </button>
          <button
            onClick={() => setView("edit")}
            className={`px-6 py-3 border font-black uppercase ${
              view === "edit" ? "bg-foreground text-background" : "border-accent"
            }`}
          >
            Editar productos
          </button>
        </div>

        {/* ➕ ADD PRODUCT */}
        {view === "add" && (
          <section className="space-y-6">
            <input placeholder="Nombre" className="input" value={product.name} onChange={e => setProduct({ ...product, name: e.target.value })} />
            <input type="number" placeholder="Precio" className="input" value={product.price} onChange={e => setProduct({ ...product, price: Number(e.target.value) })} />
            <textarea placeholder="Descripción" className="input h-32" value={product.description} onChange={e => setProduct({ ...product, description: e.target.value })} />

            <input type="file" onChange={async e => {
              if (e.target.files?.[0]) {
                const url = await uploadImage(e.target.files[0]);
                setProduct({ ...product, image: url });
              }
            }} />

            <button onClick={addProduct} className="w-full bg-foreground text-background py-4 font-black uppercase">
              Guardar producto
            </button>
          </section>
        )}

        {/* ✏️ EDIT */}
        {view === "edit" && (
          <section className="space-y-8">
            {products.map(p => (
              <div key={p.id} className="border border-accent p-6 space-y-4">
                <input className="input" value={p.name} onChange={e => setProducts(ps => ps.map(x => x.id === p.id ? { ...x, name: e.target.value } : x))} />
                <input type="number" className="input" value={p.price} onChange={e => setProducts(ps => ps.map(x => x.id === p.id ? { ...x, price: Number(e.target.value) } : x))} />

                <div className="flex gap-4">
                  <button onClick={() => updateProduct(p)} className="btn-primary">Guardar</button>
                  <button onClick={() => deleteProduct(p.id)} className="btn-danger">Eliminar</button>
                </div>
              </div>
            ))}
          </section>
        )}

        {message && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-xs font-black uppercase">
            {message}
          </motion.p>
        )}
      </div>
    </div>
  );
}
