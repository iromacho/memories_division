"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Save, Image as ImageIcon, Package, X, Upload, Loader2, Pencil } from "lucide-react";

type Tab = "products" | "add-product" | "cover-images";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  images?: string[];
  description?: string;
  sizes?: string[];
  is_new: boolean;
  is_featured: boolean;
  created_at: string;
}

interface HeroImage {
  id: string;
  url: string;
  created_at: string;
}

const CATEGORY_OPTIONS = ["t-shirts", "hoodies", "pants", "shoes", "outerwear", "accessories"];

async function uploadImage(file: File, folder: string): Promise<string | null> {
  const ext = file.name.split(".").pop();
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;
  const { error } = await supabase.storage.from("images").upload(fileName, file);
  if (error) {
    console.error("Upload error:", error);
    return null;
  }
  const { data } = supabase.storage.from("images").getPublicUrl(fileName);
  return data.publicUrl;
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("products");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "memories2026") {
      setIsAuthenticated(true);
    } else {
      setMessage("Invalid password");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-black flex items-center justify-center">
        <div className="w-full max-w-md px-6">
          <header className="mb-12 text-center">
            <h1 className="text-4xl font-black uppercase tracking-tighter mb-4 text-white">Admin Access</h1>
            <p className="text-zinc-500 uppercase tracking-widest text-[10px]">Enter password to continue</p>
          </header>
          <form onSubmit={handleLogin} className="space-y-6 bg-zinc-950 p-8 border border-zinc-800">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Password</label>
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border border-zinc-800 px-4 py-3 focus:border-white outline-none transition-colors text-center text-white"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-white text-black font-black uppercase tracking-[0.3em] py-4 hover:bg-zinc-200 transition-colors"
            >
              Unlock
            </button>
            {message && (
              <p className="text-center font-black uppercase tracking-widest text-[10px] text-red-500">
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    );
  }

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "products", label: "Products", icon: <Package className="w-4 h-4" /> },
    { id: "add-product", label: "Add Product", icon: <Plus className="w-4 h-4" /> },
    { id: "cover-images", label: "Cover Images", icon: <ImageIcon className="w-4 h-4" /> },
  ];

  return (
    <div className="pt-28 pb-24 min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <header className="mb-8">
          <h1 className="text-3xl font-black uppercase tracking-tighter mb-2">Admin Panel</h1>
          <p className="text-zinc-500 uppercase tracking-widest text-[10px]">Manage your store</p>
        </header>

        <div className="flex gap-1 mb-8 border-b border-zinc-800 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 text-[10px] font-bold uppercase tracking-widest transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "text-white border-b-2 border-white"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "products" && (
            <motion.div key="products" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ProductsList />
            </motion.div>
          )}
          {activeTab === "add-product" && (
            <motion.div key="add-product" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <AddProductForm />
            </motion.div>
          )}
          {activeTab === "cover-images" && (
            <motion.div key="cover-images" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <CoverImagesManager />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ImageUploader({ onUpload, folder, label }: { onUpload: (url: string) => void; folder: string; label: string }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) return;
    setUploading(true);
    setPreview(URL.createObjectURL(file));
    const url = await uploadImage(file, folder);
    if (url) {
      onUpload(url);
    }
    setUploading(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{label}</label>
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-zinc-700 hover:border-zinc-500 bg-zinc-950 p-6 text-center cursor-pointer transition-colors relative"
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />
        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-zinc-400" />
            <span className="text-[10px] uppercase tracking-widest text-zinc-500">Uploading...</span>
          </div>
        ) : preview ? (
          <div className="flex items-center gap-4">
            <img src={preview} alt="" className="w-16 h-16 object-cover border border-zinc-700" />
            <span className="text-[10px] uppercase tracking-widest text-green-500">Uploaded</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Upload className="w-6 h-6 text-zinc-600" />
            <span className="text-[10px] uppercase tracking-widest text-zinc-500">Click or drag image</span>
          </div>
        )}
      </div>
    </div>
  );
}

function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    setLoading(true);
    const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    setProducts(data || []);
    setLoading(false);
  }

  async function deleteProduct(id: string) {
    if (!confirm("Are you sure you want to delete this product?")) return;
    setDeleting(id);
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (!error) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
    setDeleting(null);
  }

  async function saveProduct(id: string, payload: {
    name: string;
    price: number;
    category: string;
    description: string;
    sizes: string[];
    allImages: string[];
    is_new: boolean;
    is_featured: boolean;
  }) {
    const { allImages, ...rest } = payload;
    const mainImage = allImages[0] || "";
    const extraImages = allImages.slice(1);

    const { data, error } = await supabase
      .from("products")
      .update({
        ...rest,
        image: mainImage,
        images: extraImages,
      })
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      return { error: error.message };
    }

    setProducts(prev => prev.map(product => (product.id === id ? (data as Product) : product)));
    setEditingId(null);
    return { error: null };
  }

  if (loading) {
    return <div className="text-center py-20 text-zinc-500 text-xs uppercase tracking-widest">Loading products...</div>;
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <Package className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
        <p className="text-zinc-500 text-xs uppercase tracking-widest">No products yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {products.map(product => {
        const allImages = [product.image, ...(product.images || [])].filter(Boolean);
        const isEditing = editingId === product.id;

        return (
          <div key={product.id} className="bg-zinc-950 border border-zinc-800 overflow-hidden">
            <div className="p-4 sm:p-5 flex items-start justify-between gap-4 border-b border-zinc-800">
              <div className="flex gap-4 min-w-0">
                <img src={product.image} alt={product.name} className="w-16 h-20 object-cover border border-zinc-800 shrink-0" />
                <div className="min-w-0">
                  <h3 className="text-sm font-bold uppercase tracking-wider truncate">{product.name}</h3>
                  <p className="text-zinc-500 text-xs uppercase tracking-wider mt-1">${product.price} · {product.category}</p>
                  <div className="flex gap-2 mt-2">
                    {product.is_new && <span className="bg-white text-black text-[8px] font-bold uppercase px-2 py-0.5">New</span>}
                    {product.is_featured && <span className="bg-zinc-700 text-white text-[8px] font-bold uppercase px-2 py-0.5">Featured</span>}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => setEditingId(isEditing ? null : product.id)}
                  className="text-zinc-400 hover:text-white transition-colors p-2"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => deleteProduct(product.id)}
                  disabled={deleting === product.id}
                  className="text-zinc-600 hover:text-red-500 transition-colors p-2 disabled:opacity-50"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {isEditing && (
              <ProductEditForm
                product={product}
                initialImages={allImages}
                onCancel={() => setEditingId(null)}
                onSave={(payload) => saveProduct(product.id, payload)}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function ProductEditForm({
  product,
  initialImages,
  onCancel,
  onSave,
}: {
  product: Product;
  initialImages: string[];
  onCancel: () => void;
  onSave: (payload: {
    name: string;
    price: number;
    category: string;
    description: string;
    sizes: string[];
    allImages: string[];
    is_new: boolean;
    is_featured: boolean;
  }) => Promise<{ error: string | null }>;
}) {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(String(product.price));
  const [category, setCategory] = useState(product.category);
  const [description, setDescription] = useState(product.description || "");
  const [sizes, setSizes] = useState((product.sizes || []).join(", "));
  const [allImages, setAllImages] = useState<string[]>(initialImages);
  const [isNew, setIsNew] = useState(product.is_new);
  const [isFeatured, setIsFeatured] = useState(product.is_featured);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const inputClass = "w-full bg-black border border-zinc-800 px-4 py-3 focus:border-white outline-none transition-colors text-white text-sm";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (allImages.length === 0) {
      setMessage("Error: Please upload at least one image");
      return;
    }

    const parsedPrice = Number(price);
    if (Number.isNaN(parsedPrice)) {
      setMessage("Error: Invalid price");
      return;
    }

    setSaving(true);
    setMessage("");

    const result = await onSave({
      name,
      price: parsedPrice,
      category,
      description,
      sizes: sizes.split(",").map(s => s.trim()).filter(Boolean),
      allImages,
      is_new: isNew,
      is_featured: isFeatured,
    });

    if (result.error) {
      setMessage(`Error: ${result.error}`);
    } else {
      setMessage("Product updated");
    }

    setSaving(false);
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Product Name">
          <input required value={name} onChange={e => setName(e.target.value)} className={inputClass} />
        </Field>
        <Field label="Price ($)">
          <input required type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} className={inputClass} />
        </Field>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Category">
          <select value={category} onChange={e => setCategory(e.target.value)} className={inputClass + " appearance-none"}>
            {CATEGORY_OPTIONS.map(cat => (
              <option key={cat} value={cat}>{cat.toUpperCase()}</option>
            ))}
          </select>
        </Field>
        <Field label="Sizes (comma separated)">
          <input value={sizes} onChange={e => setSizes(e.target.value)} className={inputClass} placeholder="S, M, L, XL" />
        </Field>
      </div>

      <MultiImageUploader
        images={allImages}
        onAdd={(url) => setAllImages(prev => [...prev, url])}
        onRemove={(idx) => setAllImages(prev => prev.filter((_, i) => i !== idx))}
      />

      <Field label="Description">
        <textarea required value={description} onChange={e => setDescription(e.target.value)} className={inputClass + " h-28 resize-none"} />
      </Field>

      <div className="flex flex-wrap gap-6">
        <Checkbox checked={isNew} onChange={setIsNew} label="New Arrival" />
        <Checkbox checked={isFeatured} onChange={setIsFeatured} label="Featured" />
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="submit"
          disabled={saving}
          className="sm:flex-1 bg-white text-black font-black uppercase tracking-[0.3em] py-3 hover:bg-zinc-200 transition-colors flex items-center justify-center gap-3 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? "Saving..." : "Save Changes"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="sm:w-40 border border-zinc-700 text-zinc-300 font-black uppercase tracking-[0.3em] py-3 hover:text-white hover:border-zinc-500 transition-colors"
        >
          Cancel
        </button>
      </div>

      {message && (
        <p className={`font-bold uppercase tracking-widest text-[10px] ${message.includes("Error") ? "text-red-500" : "text-green-500"}`}>
          {message}
        </p>
      )}
    </form>
  );
}

function MultiImageUploader({ images, onAdd, onRemove }: { images: string[]; onAdd: (url: string) => void; onRemove: (idx: number) => void }) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList) => {
    const imageFiles = Array.from(files).filter(f => f.type.startsWith("image/"));
    if (imageFiles.length === 0) return;
    setUploading(true);
    for (const file of imageFiles) {
      const url = await uploadImage(file, "products");
      if (url) onAdd(url);
    }
    setUploading(false);
  };

  return (
    <div className="space-y-3">
      <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Product Images</label>
      <p className="text-[9px] text-zinc-600 uppercase tracking-wider">First image = main image. Upload as many as you want.</p>

      {images.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {images.map((url, idx) => (
            <div key={idx} className="relative aspect-square bg-zinc-900 border border-zinc-800 group overflow-hidden">
              <img src={url} alt="" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => onRemove(idx)}
                className="absolute top-1 right-1 bg-black/80 text-white p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              >
                <X className="w-3 h-3" />
              </button>
              {idx === 0 && (
                <span className="absolute bottom-0 left-0 right-0 bg-red-600/90 text-white text-[7px] font-bold text-center py-0.5 uppercase tracking-wider">Main</span>
              )}
            </div>
          ))}
        </div>
      )}

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          if (e.dataTransfer.files.length > 0) handleFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-zinc-700 hover:border-zinc-500 bg-zinc-950 p-6 text-center cursor-pointer transition-colors"
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) handleFiles(e.target.files);
            e.target.value = "";
          }}
        />
        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-zinc-400" />
            <span className="text-[10px] uppercase tracking-widest text-zinc-500">Uploading...</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Upload className="w-6 h-6 text-zinc-600" />
            <span className="text-[10px] uppercase tracking-widest text-zinc-500">Click or drag images (multiple allowed)</span>
          </div>
        )}
      </div>
    </div>
  );
}

function AddProductForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("t-shirts");
  const [allImages, setAllImages] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [sizes, setSizes] = useState("S,M,L,XL");
  const [isNew, setIsNew] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (allImages.length === 0) {
      setMessage("Error: Please upload at least one image");
      return;
    }
    setIsSubmitting(true);
    setMessage("");

    const mainImage = allImages[0];
    const extraImages = allImages.slice(1);

    const { error } = await supabase.from("products").insert([
      {
        name,
        price: parseFloat(price),
        category,
        image: mainImage,
        images: extraImages,
        description,
        sizes: sizes.split(",").map(s => s.trim()),
        is_new: isNew,
        is_featured: isFeatured,
      },
    ]);

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage("Product added!");
      setName("");
      setPrice("");
      setAllImages([]);
      setDescription("");
    }
    setIsSubmitting(false);
  };

  const inputClass = "w-full bg-black border border-zinc-800 px-4 py-3 focus:border-white outline-none transition-colors text-white text-sm";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Product Name">
          <input required value={name} onChange={e => setName(e.target.value)} className={inputClass} placeholder="Division Hoodie" />
        </Field>
        <Field label="Price ($)">
          <input required type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} className={inputClass} placeholder="0.00" />
        </Field>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Category">
          <select value={category} onChange={e => setCategory(e.target.value)} className={inputClass + " appearance-none"}>
            {CATEGORY_OPTIONS.map(cat => (
              <option key={cat} value={cat}>{cat.toUpperCase()}</option>
            ))}
          </select>
        </Field>
        <Field label="Sizes (comma separated)">
          <input value={sizes} onChange={e => setSizes(e.target.value)} className={inputClass} placeholder="S, M, L, XL" />
        </Field>
      </div>

      <MultiImageUploader
        images={allImages}
        onAdd={(url) => setAllImages(prev => [...prev, url])}
        onRemove={(idx) => setAllImages(prev => prev.filter((_, i) => i !== idx))}
      />

      <Field label="Description">
        <textarea required value={description} onChange={e => setDescription(e.target.value)} className={inputClass + " h-28 resize-none"} placeholder="Describe the product..." />
      </Field>

      <div className="flex gap-6">
        <Checkbox checked={isNew} onChange={setIsNew} label="New Arrival" />
        <Checkbox checked={isFeatured} onChange={setIsFeatured} label="Featured" />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-white text-black font-black uppercase tracking-[0.3em] py-4 hover:bg-zinc-200 transition-colors flex items-center justify-center gap-3 disabled:opacity-50"
      >
        <Save className="w-4 h-4" />
        {isSubmitting ? "Saving..." : "Add Product"}
      </button>

      {message && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`text-center font-bold uppercase tracking-widest text-[10px] ${message.includes("Error") ? "text-red-500" : "text-green-500"}`}
        >
          {message}
        </motion.p>
      )}
    </form>
  );
}

function CoverImagesManager() {
  const [images, setImages] = useState<HeroImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadImages();
  }, []);

  async function loadImages() {
    setLoading(true);
    const { data } = await supabase.from("hero_images").select("*").order("created_at", { ascending: false });
    setImages(data || []);
    setLoading(false);
  }

  async function handleFileUpload(file: File) {
    if (!file.type.startsWith("image/")) return;
    setAdding(true);
    const url = await uploadImage(file, "hero");
    if (url) {
      const { data, error } = await supabase.from("hero_images").insert([{ url }]).select();
      if (!error && data) {
        setImages(prev => [data[0], ...prev]);
      }
    }
    setAdding(false);
  }

  async function deleteImage(id: string) {
    const { error } = await supabase.from("hero_images").delete().eq("id", id);
    if (!error) {
      setImages(prev => prev.filter(img => img.id !== id));
    }
  }

  return (
    <div className="max-w-3xl">
      <p className="text-zinc-500 text-xs uppercase tracking-widest mb-6">
        These images rotate on the homepage background. Upload images below.
      </p>

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const file = e.dataTransfer.files[0];
          if (file) handleFileUpload(file);
        }}
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-zinc-700 hover:border-zinc-500 bg-zinc-950 p-8 text-center cursor-pointer transition-colors mb-8"
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFileUpload(file);
          }}
        />
        {adding ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="w-8 h-8 animate-spin text-zinc-400" />
            <span className="text-[10px] uppercase tracking-widest text-zinc-500">Uploading...</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Upload className="w-8 h-8 text-zinc-600" />
            <span className="text-[10px] uppercase tracking-widest text-zinc-500">Click or drag image to upload</span>
          </div>
        )}
      </div>

      {loading ? (
        <div className="text-center py-16 text-zinc-500 text-xs uppercase tracking-widest">Loading...</div>
      ) : images.length === 0 ? (
        <div className="text-center py-16">
          <ImageIcon className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
          <p className="text-zinc-500 text-xs uppercase tracking-widest">No cover images yet. Fallback images will be used.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {images.map(img => (
            <div key={img.id} className="relative aspect-[16/10] bg-zinc-900 group overflow-hidden border border-zinc-800">
              <img src={img.url} alt="" className="w-full h-full object-cover" />
              <button
                onClick={() => deleteImage(img.id)}
                className="absolute top-2 right-2 bg-black/80 text-white p-1.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{label}</label>
      {children}
    </div>
  );
}

function Checkbox({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} className="hidden" />
      <div className={`w-4 h-4 border-2 flex items-center justify-center transition-colors ${checked ? "bg-white border-white" : "border-zinc-700 group-hover:border-zinc-500"}`}>
        {checked && <div className="w-1.5 h-1.5 bg-black" />}
      </div>
      <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">{label}</span>
    </label>
  );
}
