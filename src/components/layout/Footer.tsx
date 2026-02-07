"use client";

import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-black border-t border-zinc-900 py-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center gap-6">
          <Link href="/" className="font-display text-2xl font-bold italic text-white">
            M<span className="text-red-700">.</span>
          </Link>

          <div className="flex items-center gap-8">
            <a
              href="https://www.instagram.com/_memoriesdivision_/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 hover:text-red-600 transition-colors"
            >
              Instagram
            </a>
            <span className="w-[3px] h-[3px] bg-red-700 rounded-full" />
            <a
              href="https://www.tiktok.com/@memories_division"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 hover:text-red-600 transition-colors"
            >
              TikTok
            </a>
          </div>

          <p className="text-[9px] text-zinc-700 uppercase tracking-[0.3em]">
            &copy; 2025 Memories Division
          </p>
        </div>
      </div>
    </footer>
  );
};
