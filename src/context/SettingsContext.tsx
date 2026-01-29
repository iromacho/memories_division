"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "es" | "jp";
type Currency = "USD" | "EUR" | "JPY";

interface SettingsContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (curr: Currency) => void;
  t: (key: string) => string;
  formatPrice: (price: number) => string;
}

const translations = {
  en: {
    "nav.shop": "Shop",
    "nav.collections": "Collections",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.stores": "Our Stores",
    "shop.title": "Store",
    "shop.subtitle": "Collections",
    "shop.sort": "Sort By",
    "shop.all": "All",
    "shop.tshirts": "T-Shirts",
    "shop.hoodies": "Hoodies",
    "shop.pants": "Pants",
    "shop.accessories": "Accessories",
    "shop.shoes": "Shoes",
    "shop.search": "Search products...",
    "shop.lowToHigh": "Price: Low to High",
    "shop.highToLow": "Price: High to Low",
    "shop.newest": "Newest",
    "footer.newsletter": "Join the Division",
    "footer.newsletter_desc": "Stay updated on new drops and secret releases.",
    "footer.email_placeholder": "Email Address",
    "footer.subscribe": "Subscribe",
    "footer.rights": "All Rights Reserved",
    "stores.title": "Our Stores",
    "stores.subtitle": "Find us in the world's fashion capitals.",
    "stores.madrid": "Madrid Flagship",
    "stores.tokyo": "Tokyo Division",
    "stores.ny": "New York Loft",
      "product.details": "View Details",
      "cart.title": "Your Bag",
      "cart.empty": "Your bag is empty",
      "cart.checkout": "Checkout",
      "wishlist.title": "Wishlist",
      "wishlist.empty": "Your wishlist is empty",
      "wishlist.back": "Back to Shop",
    },
    es: {
      "nav.shop": "Tienda",
      "nav.collections": "Colecciones",
      "nav.about": "Sobre Nosotros",
      "nav.contact": "Contacto",
      "nav.stores": "Nuestras Tiendas",
      "shop.title": "Tienda",
      "shop.subtitle": "Colecciones",
      "shop.sort": "Ordenar Por",
      "shop.all": "Todo",
      "shop.tshirts": "Camisetas",
      "shop.hoodies": "Sudaderas",
      "shop.pants": "Pantalones",
      "shop.accessories": "Accesorios",
      "shop.shoes": "Zapatos",
      "shop.outerwear": "Abrigos",
      "shop.search": "Buscar productos...",
      "shop.lowToHigh": "Precio: Menor a Mayor",
      "shop.highToLow": "Precio: Mayor a Menor",
      "shop.newest": "Novedades",
      "footer.newsletter": "Únete a la División",
      "footer.newsletter_desc": "Mantente al día sobre nuevos lanzamientos y ediciones secretas.",
      "footer.email_placeholder": "Correo Electrónico",
      "footer.subscribe": "Suscribirse",
      "footer.rights": "Todos los derechos reservados",
      "stores.title": "Nuestras Tiendas",
      "stores.subtitle": "Encuéntranos en las capitales de la moda del mundo.",
      "stores.madrid": "Madrid Flagship",
      "stores.tokyo": "Tokio Division",
      "stores.ny": "New York Loft",
      "product.details": "Ver Detalles",
      "cart.title": "Tu Bolsa",
      "cart.empty": "Tu bolsa está vacía",
      "cart.checkout": "Finalizar Compra",
      "wishlist.title": "Lista de Deseos",
      "wishlist.empty": "Tu lista de deseos está vacía",
      "wishlist.back": "Volver a la Tienda",
    },
    jp: {
      "nav.shop": "ショップ",
      "nav.collections": "コレクション",
      "nav.about": "アバウト",
      "nav.contact": "コンタクト",
      "nav.stores": "店舗情報",
      "shop.title": "ストア",
      "shop.subtitle": "コレクション",
      "shop.sort": "並べ替え",
      "shop.all": "すべて",
      "shop.tshirts": "Tシャツ",
      "shop.hoodies": "フーディー",
      "shop.pants": "パンツ",
      "shop.accessories": "アクセサリー",
      "shop.shoes": "シューズ",
      "shop.outerwear": "アウター",
      "shop.search": "商品を検索...",
      "shop.lowToHigh": "価格の安い順",
      "shop.highToLow": "価格の高い順",
      "shop.newest": "新着順",
      "footer.newsletter": "ディビジョンに参加",
      "footer.newsletter_desc": "最新作や限定リリースの情報をお届けします。",
      "footer.email_placeholder": "メールアドレス",
      "footer.subscribe": "購読する",
      "footer.rights": "全著作権所有",
      "stores.title": "店舗情報",
      "stores.subtitle": "世界のファッションの中心地でお待ちしています。",
      "stores.madrid": "マドリード旗艦店",
      "stores.tokyo": "東京ディビジョン",
      "stores.ny": "ニューヨークロフト",
      "product.details": "詳細を見る",
      "cart.title": "ショッピングバッグ",
      "cart.empty": "バッグは空です",
      "cart.checkout": "チェックアウト",
      "wishlist.title": "ウィッシュリスト",
      "wishlist.empty": "ウィッシュリストは空です",
      "wishlist.back": "ショップに戻る",
    },

};

const exchangeRates = {
  USD: 1,
  EUR: 0.92,
  JPY: 150,
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("en");
  const [currency, setCurrency] = useState<Currency>("USD");

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language;
    const savedCurr = localStorage.getItem("currency") as Currency;
    if (savedLang) setLanguage(savedLang);
    if (savedCurr) setCurrency(savedCurr);
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const handleSetCurrency = (curr: Currency) => {
    setCurrency(curr);
    localStorage.setItem("currency", curr);
  };

  const t = (key: string) => {
    return (translations[language] as any)[key] || key;
  };

  const formatPrice = (price: number) => {
    const converted = price * exchangeRates[currency];
    return new Intl.NumberFormat(language === "jp" ? "ja-JP" : language === "es" ? "es-ES" : "en-US", {
      style: "currency",
      currency: currency,
    }).format(converted);
  };

  return (
    <SettingsContext.Provider
      value={{
        language,
        setLanguage: handleSetLanguage,
        currency,
        setCurrency: handleSetCurrency,
        t,
        formatPrice,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error("useSettings must be used within a SettingsProvider");
  return context;
};
