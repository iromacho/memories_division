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
    document.body.style.overflow =
      isMobileMenuOpen || isSearchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen, isSearchOpen]);

  const navLinks = [
    { name: t("nav.shop"), href: "/shop" },
    { name: t("nav.collections"), href: "/collections" },
    { name: t("nav.stores"), href: "/stores" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/shop?search=${encodeURIComponent(searchQuery)}`);
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  const nextLanguage = () => {
    const langs: ("en" | "es" | "jp")[] = ["en", "es", "jp"];
    setLanguage(langs[(langs.indexOf(language) + 1) % langs.length]);
  };

  const nextCurrency = () => {
    const currs: ("USD" | "EUR" | "JPY")[] = ["USD", "EUR", "JPY"];
    setCurrency(currs[(currs.indexOf(currency) + 1) % currs.length]);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-md border-b py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* LEFT */}
          <div className="flex items-center gap-8">
            <button className="lg:hidden" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="w-5 h-5" />
            </button>

            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-[9px] font-black tracking-[0.3em] uppercase hover:text-brand transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* LOGO CENTRADO */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 flex items-center group"
          >
            <img
              src="https://image2url.com/r2/default/images/1769958058896-d38898db-080f-414e-8501-3582b86f0307.png"
              alt="Memories Division"
              className="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* RIGHT */}
          <div className="flex items-center gap-5 md:gap-7">
            <div className="hidden md:flex items-center gap-6">
              <button
                onClick={nextLanguage}
                className="text-[9px] font-black tracking-[0.2em] uppercase hover:text-brand"
              >
                {language}
              </button>
              <button
                onClick={nextCurrency}
                className="text-[9px] font-black tracking-[0.2em] uppercase hover:text-brand"
              >
                {currency}
              </button>
            </div>

            <button onClick={() => setIsSearchOpen(true)}>
              <Search className="w-4 h-4" />
            </button>

            <Link href="/wishlist" className="relative">
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand text-white text-[7px] w-3 h-3 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link href="/cart" className="relative">
              <ShoppingBag className="w-4 h-4" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-foreground text-background text-[7px] w-3 h-3 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>

      {/* SEARCH OVERLAY */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-background/95 backdrop-blur-xl z-[70] flex items-center justify-center"
          >
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-8 right-8"
            >
              <X className="w-8 h-8" />
            </button>
            <form onSubmit={handleSearch} className="w-full max-w-4xl px-6">
              <input
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("shop.search")}
                className="w-full bg-transparent border-b-2 border-foreground/10 text-4xl md:text-6xl font-black uppercase py-8 outline-none"
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            className="fixed inset-0 bg-background z-[60] lg:hidden"
          >
            <div className="p-6 h-full flex flex-col">
              <div className="flex justify-between mb-12">
                <span className="uppercase font-bold">Menu</span>
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
                    className="text-3xl font-bold uppercase"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
