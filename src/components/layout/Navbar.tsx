"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingBag, Menu, X, Search, Globe, Coins } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useSettings } from "@/context/SettingsContext";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { totalItems } = useCart();
  const { language, setLanguage, currency, setCurrency, t } = useSettings();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t("nav.shop"), href: "/shop" },
    { name: t("nav.collections"), href: "/collections" },
    { name: t("nav.stores"), href: "/stores" },
    { name: t("nav.about"), href: "/about" },
    { name: t("nav.contact"), href: "/contact" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md border-b py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <button
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[10px] font-bold tracking-[0.2em] uppercase hover:text-brand transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Minimalist M Logo */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center group"
        >
          <div className="text-3xl font-black tracking-tighter leading-none group-hover:scale-110 transition-transform">
            M
          </div>
          <div className="text-[6px] font-bold tracking-[0.4em] uppercase opacity-0 group-hover:opacity-100 transition-opacity mt-1">
            Division
          </div>
        </Link>

        <div className="flex items-center gap-4 md:gap-6">
          {/* Settings Selectors */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 group cursor-pointer relative">
              <Globe className="w-3.5 h-3.5 text-zinc-400 group-hover:text-foreground transition-colors" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="bg-transparent text-[10px] font-bold uppercase tracking-widest outline-none cursor-pointer border-none p-0 focus:ring-0"
              >
                <option value="en">EN</option>
                <option value="es">ES</option>
                <option value="jp">JP</option>
              </select>
            </div>
            <div className="flex items-center gap-2 group cursor-pointer relative">
              <Coins className="w-3.5 h-3.5 text-zinc-400 group-hover:text-foreground transition-colors" />
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as any)}
                className="bg-transparent text-[10px] font-bold uppercase tracking-widest outline-none cursor-pointer border-none p-0 focus:ring-0"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="JPY">JPY</option>
              </select>
            </div>
          </div>

          <button 
            onClick={() => setIsSearchOpen(true)}
            className="hover:text-brand transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>
          <Link href="/cart" className="relative group">
            <ShoppingBag className="w-5 h-5 group-hover:text-brand transition-colors" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-foreground text-background text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-background/95 backdrop-blur-xl z-[70] flex flex-col items-center justify-center p-6"
          >
            <button 
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-8 right-8 p-2 hover:rotate-90 transition-transform"
            >
              <X className="w-8 h-8" />
            </button>
            <form onSubmit={handleSearch} className="w-full max-w-4xl">
              <input
                autoFocus
                type="text"
                placeholder={t("shop.search")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-b-2 border-foreground/10 focus:border-foreground text-4xl md:text-6xl font-black uppercase tracking-tighter py-8 outline-none transition-colors"
              />
              <div className="mt-8 flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                {["Division", "Hoodie", "Shoes", "Cargo", "Limited"].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSearchQuery(tag)}
                    className="whitespace-nowrap px-6 py-2 bg-accent hover:bg-zinc-200 dark:hover:bg-zinc-800 text-[10px] font-bold uppercase tracking-widest transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-background z-[60] lg:hidden"
          >
            <div className="p-6 flex flex-col h-full">
              <div className="flex items-center justify-between mb-12">
                <span className="text-lg font-bold tracking-widest uppercase">Menu</span>
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="w-8 h-8" />
                </button>
              </div>
              
              <div className="flex flex-col gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-3xl font-bold tracking-tighter hover:text-brand transition-colors uppercase"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="mt-auto space-y-8">
                <div className="flex gap-8">
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest">Language</span>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value as any)}
                      className="bg-transparent text-sm font-bold uppercase tracking-widest outline-none border-none p-0 focus:ring-0"
                    >
                      <option value="en">English</option>
                      <option value="es">Español</option>
                      <option value="jp">日本語</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest">Currency</span>
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value as any)}
                      className="bg-transparent text-sm font-bold uppercase tracking-widest outline-none border-none p-0 focus:ring-0"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="JPY">JPY (¥)</option>
                    </select>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-4">Follow Us</p>
                  <div className="flex gap-6">
                    <a href="#" className="font-bold uppercase text-xs tracking-widest hover:text-brand transition-colors">Instagram</a>
                    <a href="#" className="font-bold uppercase text-xs tracking-widest hover:text-brand transition-colors">Twitter</a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
