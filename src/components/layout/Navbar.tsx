"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingBag, Menu, X, Search, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useSettings } from "@/context/SettingsContext";
import { useWishlist } from "@/context/WishlistContext";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { totalItems } = useCart();
  const { wishlist } = useWishlist();
  const { language, setLanguage, currency, setCurrency, t } = useSettings();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (isMobileMenuOpen || isSearchOpen) return;
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobileMenuOpen, isSearchOpen]);

  useEffect(() => {
    if (isMobileMenuOpen || isSearchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen, isSearchOpen]);

  const navLinks = [
    { name: t("nav.shop"), href: "/shop" },
    { name: t("nav.collections"), href: "/collections" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const nextLanguage = () => {
    const langs: ("en" | "es" | "jp")[] = ["en", "es", "jp"];
    const idx = langs.indexOf(language);
    setLanguage(langs[(idx + 1) % langs.length]);
  };

  const nextCurrency = () => {
    const currs: ("USD" | "EUR" | "JPY")[] = ["USD", "EUR", "JPY"];
    const idx = currs.indexOf(currency);
    setCurrency(currs[(idx + 1) % currs.length]);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-black/90 backdrop-blur-md border-b border-zinc-900 py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button
              className="lg:hidden text-white"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-[9px] font-black tracking-[0.3em] uppercase text-zinc-400 hover:text-red-600 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center group"
          >
            <div className="font-display text-2xl font-bold italic leading-none text-white group-hover:text-red-600 transition-colors duration-500">
              M
            </div>
          </Link>

          <div className="flex items-center gap-5 md:gap-7">
            <div className="hidden md:flex items-center gap-6">
              <button 
                onClick={nextLanguage}
                className="text-[9px] font-black tracking-[0.2em] uppercase text-zinc-500 hover:text-red-600 transition-colors min-w-[20px]"
              >
                {language}
              </button>
              <button 
                onClick={nextCurrency}
                className="text-[9px] font-black tracking-[0.2em] uppercase text-zinc-500 hover:text-red-600 transition-colors min-w-[30px]"
              >
                {currency}
              </button>
            </div>

            <button 
              onClick={() => setIsSearchOpen(true)}
              className="text-white hover:text-red-600 transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>

            <Link href="/wishlist" className="relative group">
              <Heart className="w-4 h-4 text-white group-hover:text-red-600 transition-colors" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-700 text-white text-[7px] font-black w-3 h-3 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link href="/cart" className="relative group">
              <ShoppingBag className="w-4 h-4 text-white group-hover:text-red-600 transition-colors" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-700 text-white text-[7px] font-black w-3 h-3 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[70] flex flex-col items-center justify-center p-6 touch-none"
          >
            <button 
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-8 right-8 p-2 text-white hover:text-red-600 hover:rotate-90 transition-all"
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
                className="w-full bg-transparent border-b-2 border-zinc-800 focus:border-red-700 text-4xl md:text-6xl font-black uppercase tracking-tighter py-8 outline-none transition-colors text-white"
              />
              <div className="mt-8 flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                {["Division", "Hoodie", "Shoes", "Cargo", "Limited"].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSearchQuery(tag)}
                    className="whitespace-nowrap px-6 py-2 bg-zinc-900 hover:bg-red-700 text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-black z-[60] lg:hidden touch-none"
          >
            <div className="p-6 flex flex-col h-full">
              <div className="flex items-center justify-between mb-12">
                <span className="text-lg font-bold tracking-widest uppercase text-white">Menu</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-white">
                  <X className="w-8 h-8" />
                </button>
              </div>
              
              <div className="flex flex-col gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-3xl font-bold tracking-tighter text-white hover:text-red-600 transition-colors uppercase"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="mt-auto space-y-8">
                <div className="flex gap-8">
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] text-zinc-600 uppercase tracking-widest">Language</span>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value as any)}
                      className="bg-transparent text-sm font-bold uppercase tracking-widest outline-none border-none p-0 focus:ring-0 text-white"
                    >
                      <option value="en" className="bg-black">English</option>
                      <option value="es" className="bg-black">Espanol</option>
                      <option value="jp" className="bg-black">日本語</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] text-zinc-600 uppercase tracking-widest">Currency</span>
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value as any)}
                      className="bg-transparent text-sm font-bold uppercase tracking-widest outline-none border-none p-0 focus:ring-0 text-white"
                    >
                      <option value="USD" className="bg-black">USD ($)</option>
                      <option value="EUR" className="bg-black">EUR (€)</option>
                      <option value="JPY" className="bg-black">JPY (¥)</option>
                    </select>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] text-zinc-600 uppercase tracking-widest mb-4">Follow Us</p>
                  <div className="flex gap-6">
                    <a 
                      href="https://www.instagram.com/_memoriesdivision_/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="font-bold uppercase text-xs tracking-widest text-zinc-400 hover:text-red-600 transition-colors"
                    >
                      Instagram
                    </a>
                    <a 
                      href="https://www.tiktok.com/@memories_division" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="font-bold uppercase text-xs tracking-widest text-zinc-400 hover:text-red-600 transition-colors"
                    >
                      TikTok
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
