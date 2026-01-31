"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { Save, Trash2, Plus, List } from "lucide-react";

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  images: string[];
  description: string;
  sizes: string[];
  is_new: boolean;
  is_featured: boolean;
};

type View = "add" | "manage";

export default function AdminPage() {
  const [view, setView] = useState<View>("manage");
  const [products, setProducts] = useState<Product[]>([]);
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 🔐 LOGIN
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "memories2026") {
      setIsAuthenticated(true);
    } else {
      setMessage("Invalid password");
    }
  };

  // 📦 FETCH PRODUCTS
  const fetchProducts = async () => {
    const { data } = await supabase.from("products").select("*").order("id", { ascending: false });
    if (data) setProducts(data);
  };

  useEffect(() => {
    if (isAuthenticated) fetchProducts();
  }, [isAuthenticated]);

  // 🗑️ DELETE
  const deleteProduct = async (id: number) => {
    if (!confirm("Delete this product?")) return;
    await supabase.from("products").delete().eq("id", id);
    fetchProducts();
  };

  // 💾 UPDATE
  const updateProduct = async (product: Product) => {
    const { error } = await supabase.from("products").update({
      name: product.name,
      price: product.price,
      category: product.category,
      image: product.image,
      images: product.images,
      description: product.description,
      sizes: product.sizes,
      is_new: product.is_new,
      is_featured: product.is_featured,
    }).eq("id", product.id);

    if (!error) {
      setMessage("Product updated");
      fetchProducts();
    }
  };

  // 🔒 LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <form onSubmit={handleLogin} className="border border-accent p-8 bg-accent/30 space-y-6 w-full max-w-sm">
          <h1 className="text-3xl font-black uppercase text-center">Admin Access</h1>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-background border border-accent px-4 py-3 text-center"
            placeholder="Password"
          />
          <button className="w-full bg-foreground text-background py-4 font-black uppercase tracking-widest">
            Unlock
          </button>
          {message && <p className="text-center text-red-500 text-xs font-black uppercase">{message}</p>}
        </form>
      </div>
    );
  }

  // 🧠 ADMIN PANEL
  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="container mx-auto px-6 max-w-6xl space-y-16">

        {/* HEADER */}
        <header className="flex flex-col md:flex-row justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black uppercase">Admin Panel</h1>
            <p className="text-zinc-500 text-xs uppercase tracking-widest">
              Manage store content
            </p>
          </div>

          {/* MENU */}
          <div className="flex gap-4">
            <button
              onClick={() => setView("add")}
              className={`flex items-center gap-2 px-5 py-3 border font-black uppercase text-xs tracking-widest ${
                view === "add" ? "bg-foreground text-background" : "border-accent"
              }`}
            >
              <Plus className="w-4 h-4" /> Add product
            </button>

            <button
              onClick={() => setView("manage")}
              className={`flex items-center gap-2 px-5 py-3 border font-black uppercase text-xs tracking-widest ${
                view === "manage" ? "bg-foreground text-background" : "border-accent"
              }`}
            >
              <List className="w-4 h-4" /> Manage products
            </button>
          </div>
        </header>

        {/* MANAGE PRODUCTS */}
        {view === "manage" && (
          <section className="space-y-6">
            {products.map((p) => (
              <div key={p.id} className="border border-accent p-6 space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <input value={p.name} onChange={(e) => setProducts(ps => ps.map(x => x.id === p.id ? { ...x, name: e.target.value } : x))} className="input" />
                  <input type="number" value={p.price} onChange={(e) => setProducts(ps => ps.map(x => x.id === p.id ? { ...x, price: Number(e.target.value) } : x))} className="input" />
                  <input value={p.category} onChange={(e) => setProducts(ps => ps.map(x => x.id === p.id ? { ...x, category: e.target.value } : x))} className="input" />
                </div>

                <input value={p.image} onChange={(e) => setProducts(ps => ps.map(x => x.id === p.id ? { ...x, image: e.target.value } : x))} className="input" placeholder="Main image URL" />
                <input value={p.images?.[0] || ""} onChange={(e) => setProducts(ps => ps.map(x => x.id === p.id ? { ...x, images: [e.target.value] } : x))} className="input" placeholder="Hover image URL" />

                <textarea value={p.description} onChange={(e) => setProducts(ps => ps.map(x => x.id === p.id ? { ...x, description: e.target.value } : x))} className="input h-28" />

                <input value={p.sizes.join(", ")} onChange={(e) => setProducts(ps => ps.map(x => x.id === p.id ? { ...x, sizes: e.target.value.split(",").map(s => s.trim()) } : x))} className="input" />

                <div className="flex gap-6">
                  <label className="flex gap-2 items-center text-xs uppercase font-black">
                    <input type="checkbox" checked={p.is_new} onChange={(e) => setProducts(ps => ps.map(x => x.id === p.id ? { ...x, is_new: e.target.checked } : x))} />
                    New
                  </label>
                  <label className="flex gap-2 items-center text-xs uppercase font-black">
                    <input type="checkbox" checked={p.is_featured} onChange={(e) => setProducts(ps => ps.map(x => x.id === p.id ? { ...x, is_featured: e.target.checked } : x))} />
                    Featured
                  </label>
                </div>

                <div className="flex justify-between">
                  <button onClick={() => updateProduct(p)} className="btn-primary">
                    <Save className="w-4 h-4" /> Save
                  </button>
                  <button onClick={() => deleteProduct(p.id)} className="btn-danger">
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </section>
        )}

        {message && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-500 text-xs font-black uppercase tracking-widest">
            {message}
          </motion.p>
        )}
      </div>
    </div>
  );
}
