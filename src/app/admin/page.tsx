"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { Trash2, Save } from "lucide-react";

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
};

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [message, setMessage] = useState("");

  // 🔐 Login simple
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "memories2026") {
      setIsAuthenticated(true);
    } else {
      setMessage("Invalid password");
    }
  };

  // 📦 Cargar productos
  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("id, name, price, category")
      .order("id", { ascending: false });

    if (!error && data) {
      setProducts(data);
    }
  };

  // 🗑️ Eliminar producto
  const deleteProduct = async (id: number) => {
    const confirmDelete = confirm("Delete this product?");
    if (!confirmDelete) return;

    const { error } = await supabase.from("products").delete().eq("id", id);
    if (!error) fetchProducts();
  };

  // 💾 Actualizar producto (nombre + precio)
  const updateProduct = async (product: Product) => {
    const { error } = await supabase
      .from("products")
      .update({
        name: product.name,
        price: product.price,
        category: product.category,
      })
      .eq("id", product.id);

    if (!error) {
      setMessage("Product updated");
      fetchProducts();
    }
  };

  useEffect(() => {
    if (isAuthenticated) fetchProducts();
  }, [isAuthenticated]);

  // 🔒 LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <form
          onSubmit={handleLogin}
          className="border border-accent p-8 bg-accent/30 space-y-6 w-full max-w-sm"
        >
          <h1 className="text-3xl font-black uppercase tracking-tight text-center">
            Admin Access
          </h1>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full bg-background border border-accent px-4 py-3 text-center"
          />
          <button className="w-full bg-foreground text-background py-4 font-black uppercase tracking-widest">
            Unlock
          </button>
          {message && (
            <p className="text-center text-red-500 text-xs font-black uppercase">
              {message}
            </p>
          )}
        </form>
      </div>
    );
  }

  // 🧠 ADMIN PANEL
  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="container mx-auto px-6 max-w-5xl space-y-16">
        <header>
          <h1 className="text-4xl font-black uppercase tracking-tight mb-2">
            Admin Dashboard
          </h1>
          <p className="text-zinc-500 text-xs uppercase tracking-widest">
            Manage products
          </p>
        </header>

        {/* 🧾 PRODUCT LIST */}
        <section className="space-y-6">
          <h2 className="text-2xl font-black uppercase tracking-tight">
            Products
          </h2>

          <div className="border border-accent divide-y divide-accent">
            {products.map((product) => (
              <div
                key={product.id}
                className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 items-center"
              >
                <input
                  value={product.name}
                  onChange={(e) =>
                    setProducts((prev) =>
                      prev.map((p) =>
                        p.id === product.id
                          ? { ...p, name: e.target.value }
                          : p
                      )
                    )
                  }
                  className="bg-background border border-accent px-3 py-2"
                />

                <input
                  type="number"
                  value={product.price}
                  onChange={(e) =>
                    setProducts((prev) =>
                      prev.map((p) =>
                        p.id === product.id
                          ? { ...p, price: Number(e.target.value) }
                          : p
                      )
                    )
                  }
                  className="bg-background border border-accent px-3 py-2"
                />

                <input
                  value={product.category}
                  onChange={(e) =>
                    setProducts((prev) =>
                      prev.map((p) =>
                        p.id === product.id
                          ? { ...p, category: e.target.value }
                          : p
                      )
                    )
                  }
                  className="bg-background border border-accent px-3 py-2"
                />

                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => updateProduct(product)}
                    className="border border-accent px-3 py-2 hover:bg-brand"
                  >
                    <Save className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="border border-accent px-3 py-2 hover:bg-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {products.length === 0 && (
              <p className="p-6 text-center text-zinc-500 text-xs uppercase tracking-widest">
                No products found
              </p>
            )}
          </div>

          {message && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs uppercase tracking-widest text-green-500 font-black"
            >
              {message}
            </motion.p>
          )}
        </section>
      </div>
    </div>
  );
}
