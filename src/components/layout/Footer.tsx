import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-background border-t py-12 lg:py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <Link href="/" className="text-xl font-bold tracking-[0.2em] uppercase">
              Memories Division
            </Link>
            <p className="text-zinc-500 max-w-xs">
              Streetwear inspired by moments, curated for the modern individual. Minimalist aesthetics, premium quality.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Shop</h4>
            <ul className="space-y-4 text-zinc-500">
              <li><Link href="/shop?category=t-shirts" className="hover:text-brand transition-colors">T-Shirts</Link></li>
              <li><Link href="/shop?category=hoodies" className="hover:text-brand transition-colors">Hoodies</Link></li>
              <li><Link href="/shop?category=pants" className="hover:text-brand transition-colors">Pants</Link></li>
              <li><Link href="/shop?category=accessories" className="hover:text-brand transition-colors">Accessories</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Company</h4>
            <ul className="space-y-4 text-zinc-500">
              <li><Link href="/about" className="hover:text-brand transition-colors">Our Story</Link></li>
              <li><Link href="/collections" className="hover:text-brand transition-colors">Collections</Link></li>
              <li><Link href="/contact" className="hover:text-brand transition-colors">Contact</Link></li>
              <li><Link href="/faq" className="hover:text-brand transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Newsletter</h4>
            <p className="text-zinc-500 mb-6">Join the division for exclusive drops and updates.</p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="bg-accent border-none px-4 py-2 w-full focus:ring-1 focus:ring-brand outline-none transition-all"
              />
              <button className="bg-foreground text-background px-6 py-2 font-bold uppercase text-xs tracking-widest hover:bg-brand transition-colors">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-zinc-500 uppercase tracking-widest">
          <p>© 2026 Memories Division. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-brand transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-brand transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
