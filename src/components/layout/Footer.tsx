"use client";

import Link from "next/link";
import { useSettings } from "@/context/SettingsContext";
import { Globe, Coins } from "lucide-react";

export const Footer = () => {
  const { language, setLanguage, currency, setCurrency, t } = useSettings();

  return (
    <footer className="bg-background border-t py-12 lg:py-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          <div className="space-y-8">
            <Link href="/" className="flex flex-col group w-fit">
              <div className="text-4xl font-black tracking-tighter leading-none group-hover:scale-105 transition-transform">
                M
              </div>
              <div className="text-[8px] font-bold tracking-[0.4em] uppercase mt-2">
                Division
              </div>
            </Link>
            <p className="text-zinc-500 text-xs uppercase tracking-[0.2em] leading-loose max-w-xs">
              Streetwear inspired by moments, curated for the modern individual. Minimalist aesthetics, premium quality.
            </p>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-10 text-zinc-400">{t("nav.shop")}</h4>
            <ul className="space-y-6 text-[10px] font-bold uppercase tracking-widest">
              <li><Link href="/shop?category=t-shirts" className="hover:text-brand transition-colors">{t("shop.tshirts")}</Link></li>
              <li><Link href="/shop?category=hoodies" className="hover:text-brand transition-colors">{t("shop.hoodies")}</Link></li>
              <li><Link href="/shop?category=pants" className="hover:text-brand transition-colors">{t("shop.pants")}</Link></li>
              <li><Link href="/shop?category=shoes" className="hover:text-brand transition-colors">{t("shop.shoes")}</Link></li>
              <li><Link href="/shop?category=accessories" className="hover:text-brand transition-colors">{t("shop.accessories")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-10 text-zinc-400">Division</h4>
            <ul className="space-y-6 text-[10px] font-bold uppercase tracking-widest">
              <li><Link href="/about" className="hover:text-brand transition-colors">{t("nav.about")}</Link></li>
              <li><Link href="/collections" className="hover:text-brand transition-colors">{t("nav.collections")}</Link></li>
              <li><Link href="/stores" className="hover:text-brand transition-colors">{t("nav.stores")}</Link></li>
              <li><Link href="/contact" className="hover:text-brand transition-colors">{t("nav.contact")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-10 text-zinc-400">{t("footer.newsletter")}</h4>
            <p className="text-zinc-500 text-[10px] uppercase tracking-widest leading-loose mb-8">
              {t("footer.newsletter_desc")}
            </p>
            <form className="flex flex-col gap-4">
              <input
                type="email"
                placeholder={t("footer.email_placeholder")}
                className="bg-accent border-none px-6 py-4 text-[10px] font-bold uppercase tracking-widest w-full focus:ring-1 focus:ring-brand outline-none transition-all"
              />
              <button className="bg-foreground text-background px-8 py-4 font-black uppercase text-[10px] tracking-[0.3em] hover:bg-brand transition-colors">
                {t("footer.subscribe")}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-24 pt-12 border-t flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            <p className="text-[8px] text-zinc-500 uppercase tracking-[0.2em]">
              © 2026 Memories Division. {t("footer.rights")}.
            </p>
            <div className="flex gap-8 text-[8px] text-zinc-500 uppercase tracking-[0.2em] font-bold">
              <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            </div>
          </div>

            {/* Footer Settings - Minimalist */}
            <div className="flex items-center gap-10 border-t md:border-t-0 pt-8 md:pt-0 w-full md:w-auto">
              <div className="flex flex-col gap-3">
                <span className="text-[7px] text-zinc-500 uppercase tracking-[0.3em] font-black">Language</span>
                <div className="flex gap-4">
                  {["en", "es", "jp"].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setLanguage(lang as any)}
                      className={`text-[9px] font-black uppercase tracking-widest transition-colors ${
                        language === lang ? "text-brand" : "text-zinc-400 hover:text-foreground"
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-[7px] text-zinc-500 uppercase tracking-[0.3em] font-black">Currency</span>
                <div className="flex gap-4">
                  {["USD", "EUR", "JPY"].map((curr) => (
                    <button
                      key={curr}
                      onClick={() => setCurrency(curr as any)}
                      className={`text-[9px] font-black uppercase tracking-widest transition-colors ${
                        currency === curr ? "text-brand" : "text-zinc-400 hover:text-foreground"
                      }`}
                    >
                      {curr}
                    </button>
                  ))}
                </div>
              </div>
            </div>

        </div>
      </div>
    </footer>
  );
};
