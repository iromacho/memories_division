"use client";

import { useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { Plus, Trash2, Save, Image as ImageIcon, Upload, X } from "lucide-react";

export default function AdminPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("t-shirts");
  const [image, setImage] = useState("");
  const [hoverImage, setHoverImage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [hoverImageFile, setHoverImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [hoverImagePreview, setHoverImagePreview] = useState("");
  const [description, setDescription] = useState("");
  const [sizes, setSizes] = useState("S,M,L,XL");
  const [isNew, setIsNew] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const mainFileRef = useRef<HTMLInputElement>(null);
  const secondFileRef = useRef<HTMLInputElement>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "memories2026") {
      setIsAuthenticated(true);
    } else {
      setMessage("Invalid password");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "main" | "second") => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "main") {
          setImageFile(file);
          setImagePreview(reader.result as string);
          setImage(""); // Clear URL if file is chosen
        } else {
          setHoverImageFile(file);
          setHoverImagePreview(reader.result as string);
          setHoverImage(""); // Clear URL if file is chosen
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadFile = async (file: File) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const { error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from("product-images")
      .getPublicUrl(fileName);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) return;
    setIsSubmitting(true);
    setMessage("");

    try {
      let finalImageUrl = image;
      let finalHoverImageUrl = hoverImage;

      if (imageFile) {
        finalImageUrl = await uploadFile(imageFile);
      }

      if (hoverImageFile) {
        finalHoverImageUrl = await uploadFile(hoverImageFile);
      }

      const { error } = await supabase.from("products").insert([
        {
          name,
          price: parseFloat(price),
          category,
          image: finalImageUrl,
          images: finalHoverImageUrl ? [finalHoverImageUrl] : [],
          description,
          sizes: sizes.split(",").map(s => s.trim()),
          is_new: isNew,
          is_featured: isFeatured,
        },
      ]);

      if (error) throw error;

      setMessage("Product added successfully!");
      setName("");
      setPrice("");
      setImage("");
      setHoverImage("");
      setImageFile(null);
      setHoverImageFile(null);
      setImagePreview("");
      setHoverImagePreview("");
      setDescription("");
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-background flex items-center justify-center">
        <div className="w-full max-w-md px-6">
          <header className="mb-12 text-center">
            <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">Admin Access</h1>
            <p className="text-zinc-500 uppercase tracking-widest text-[10px]">Enter password to continue</p>
          </header>
          <form onSubmit={handleLogin} className="space-y-6 bg-accent/30 p-8 border border-accent">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest">Password</label>
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-background border border-accent px-4 py-3 focus:border-brand outline-none transition-colors text-center"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-foreground text-background font-black uppercase tracking-[0.3em] py-5 hover:bg-brand transition-colors"
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

  return (

    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="container mx-auto px-6 max-w-4xl">
        <header className="mb-12">
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">Admin Dashboard</h1>
          <p className="text-zinc-500 uppercase tracking-widest text-[10px]">Add new items to the shop</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8 bg-accent/30 p-8 border border-accent">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest">Product Name</label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-background border border-accent px-4 py-3 focus:border-brand outline-none transition-colors"
                placeholder="e.g. Division Hoodie"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest">Price ($)</label>
              <input
                required
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-background border border-accent px-4 py-3 focus:border-brand outline-none transition-colors"
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-background border border-accent px-4 py-3 focus:border-brand outline-none transition-colors appearance-none"
              >
                {["t-shirts", "hoodies", "pants", "shoes", "outerwear", "accessories"].map(cat => (
                  <option key={cat} value={cat}>{cat.toUpperCase()}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest">Sizes (comma separated)</label>
              <input
                value={sizes}
                onChange={(e) => setSizes(e.target.value)}
                className="w-full bg-background border border-accent px-4 py-3 focus:border-brand outline-none transition-colors"
                placeholder="S, M, L, XL"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Main Image */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest">Main Image</label>
              <div className="space-y-4">
                <input
                  value={image}
                  onChange={(e) => {
                    setImage(e.target.value);
                    setImageFile(null);
                    setImagePreview("");
                  }}
                  className="w-full bg-background border border-accent px-4 py-3 focus:border-brand outline-none transition-colors"
                  placeholder="Paste URL..."
                  disabled={!!imageFile}
                />
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => mainFileRef.current?.click()}
                    className="flex-1 border border-dashed border-accent py-3 flex items-center justify-center gap-2 hover:border-brand transition-colors text-[10px] uppercase font-black tracking-widest"
                  >
                    <Upload className="w-4 h-4" />
                    {imageFile ? "Change File" : "Upload File"}
                  </button>
                  {imageFile && (
                    <button
                      type="button"
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview("");
                      }}
                      className="p-3 border border-accent hover:border-red-500 hover:text-red-500 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  <input
                    type="file"
                    ref={mainFileRef}
                    onChange={(e) => handleFileChange(e, "main")}
                    className="hidden"
                    accept="image/*"
                  />
                  {(imagePreview || image) && (
                    <div className="w-12 h-12 relative border border-accent overflow-hidden bg-white shrink-0">
                      <img src={imagePreview || image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Second Image */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest">Segunda imagen (Opcional)</label>
              <div className="space-y-4">
                <input
                  value={hoverImage}
                  onChange={(e) => {
                    setHoverImage(e.target.value);
                    setHoverImageFile(null);
                    setHoverImagePreview("");
                  }}
                  className="w-full bg-background border border-accent px-4 py-3 focus:border-brand outline-none transition-colors"
                  placeholder="Paste URL..."
                  disabled={!!hoverImageFile}
                />
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => secondFileRef.current?.click()}
                    className="flex-1 border border-dashed border-accent py-3 flex items-center justify-center gap-2 hover:border-brand transition-colors text-[10px] uppercase font-black tracking-widest"
                  >
                    <Upload className="w-4 h-4" />
                    {hoverImageFile ? "Change File" : "Upload File"}
                  </button>
                  {hoverImageFile && (
                    <button
                      type="button"
                      onClick={() => {
                        setHoverImageFile(null);
                        setHoverImagePreview("");
                      }}
                      className="p-3 border border-accent hover:border-red-500 hover:text-red-500 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  <input
                    type="file"
                    ref={secondFileRef}
                    onChange={(e) => handleFileChange(e, "second")}
                    className="hidden"
                    accept="image/*"
                  />
                  {(hoverImagePreview || hoverImage) && (
                    <div className="w-12 h-12 relative border border-accent overflow-hidden bg-white shrink-0">
                      <img src={hoverImagePreview || hoverImage} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest">Description</label>
            <textarea
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-background border border-accent px-4 py-4 h-32 focus:border-brand outline-none transition-colors resize-none"
              placeholder="Describe the product..."
            />
          </div>

          <div className="flex gap-8">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={isNew}
                onChange={(e) => setIsNew(e.target.checked)}
                className="hidden"
              />
              <div className={`w-5 h-5 border-2 flex items-center justify-center transition-colors ${isNew ? "bg-brand border-brand" : "border-accent group-hover:border-brand"}`}>
                {isNew && <div className="w-2 h-2 bg-white" />}
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest">New Arrival</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="hidden"
              />
              <div className={`w-5 h-5 border-2 flex items-center justify-center transition-colors ${isFeatured ? "bg-brand border-brand" : "border-accent group-hover:border-brand"}`}>
                {isFeatured && <div className="w-2 h-2 bg-white" />}
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest">Featured Item</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-foreground text-background font-black uppercase tracking-[0.3em] py-5 hover:bg-brand transition-colors flex items-center justify-center gap-3 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {isSubmitting ? "Processing..." : "Add Product"}
          </button>

          {message && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-center font-black uppercase tracking-widest text-[10px] ${message.includes("Error") ? "text-red-500" : "text-green-500"}`}
            >
              {message}
            </motion.p>
          )}
        </form>
      </div>
    </div>
  );
}
