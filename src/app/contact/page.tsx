"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Instagram, Twitter, Facebook } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-6">
        <header className="mb-24">
          <h1 className="text-sm font-bold uppercase tracking-[0.3em] text-brand mb-4">Connection</h1>
          <h2 className="text-4xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter">Contact Us</h2>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">First Name</label>
                  <input
                    type="text"
                    className="w-full bg-accent border-none px-6 py-4 focus:ring-1 focus:ring-brand outline-none transition-all font-medium"
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Last Name</label>
                  <input
                    type="text"
                    className="w-full bg-accent border-none px-6 py-4 focus:ring-1 focus:ring-brand outline-none transition-all font-medium"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Email Address</label>
                <input
                  type="email"
                  className="w-full bg-accent border-none px-6 py-4 focus:ring-1 focus:ring-brand outline-none transition-all font-medium"
                  placeholder="john@example.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Message</label>
                <textarea
                  rows={6}
                  className="w-full bg-accent border-none px-6 py-4 focus:ring-1 focus:ring-brand outline-none transition-all font-medium resize-none"
                  placeholder="How can we help you?"
                />
              </div>
              <button className="w-full bg-foreground text-background py-5 font-bold uppercase tracking-[0.2em] text-sm hover:bg-brand transition-all">
                Send Message
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-16"
          >
            <div className="space-y-8">
              <h3 className="text-2xl font-bold uppercase tracking-tighter">Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-brand" />
                  <div>
                    <h4 className="font-bold uppercase tracking-widest text-xs mb-1">Email</h4>
                    <p className="text-zinc-500 font-medium">contact@memoriesdivision.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-brand" />
                  <div>
                    <h4 className="font-bold uppercase tracking-widest text-xs mb-1">Phone</h4>
                    <p className="text-zinc-500 font-medium">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-brand" />
                  <div>
                    <h4 className="font-bold uppercase tracking-widest text-xs mb-1">Location</h4>
                    <p className="text-zinc-500 font-medium">789 Urban Ave, Los Angeles, CA 90001</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="text-2xl font-bold uppercase tracking-tighter">Follow the Division</h3>
              <div className="flex gap-6">
                <a href="#" className="w-12 h-12 flex items-center justify-center bg-accent hover:bg-brand hover:text-white transition-all">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-12 h-12 flex items-center justify-center bg-accent hover:bg-brand hover:text-white transition-all">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-12 h-12 flex items-center justify-center bg-accent hover:bg-brand hover:text-white transition-all">
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div className="p-8 bg-zinc-900 text-white">
              <h4 className="text-lg font-bold uppercase tracking-tighter mb-4">Drop Ins Welcome</h4>
              <p className="text-zinc-400 text-sm mb-6">
                Our flagship store is open daily from 10am to 8pm. Come experience the division in person.
              </p>
              <span className="text-xs font-bold uppercase tracking-widest text-brand">View Map</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
