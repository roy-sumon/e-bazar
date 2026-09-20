"use client";

import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";
import {
  Layers,
  Store,
  ShieldCheck,
  CreditCard,
  Mail,
  Send,
  Heart,
  Globe,
  PhoneCall
} from "lucide-react";

export default function Footer() {
  const { setIsSellerPortalOpen, addToast } = useStore();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      addToast("Subscribed! Check your inbox for your 10% coupon code.", "success");
      setEmail("");
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      {/* Newsletter Bar */}
      <div className="border-b border-slate-800/80 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-600/20 text-brand-400 flex items-center justify-center border border-brand-500/20">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">Join the Zenith VIP Club</h4>
              <p className="text-xs text-slate-400">Get early access to Flash Sales, brand drops, and multi-vendor vouchers.</p>
            </div>
          </div>

          <form onSubmit={handleSubscribe} className="flex w-full md:w-auto gap-2">
            <input
              type="email"
              required
              placeholder="Enter your email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500 w-full sm:w-72"
            />
            <button
              type="submit"
              className="bg-brand-600 hover:bg-brand-500 text-white font-bold px-5 py-2.5 rounded-xl flex items-center gap-1.5 transition-colors shrink-0"
            >
              <span>Subscribe</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center text-white">
                <Layers className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                Zenith<span className="text-brand-500">Mart</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              ZenithMart is an enterprise-grade multi-vendor marketplace connecting vetted global flagship stores, artisan workshops, and technology leaders directly with millions of customers worldwide.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Escrow Protected
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] text-indigo-400 font-semibold bg-indigo-950/60 border border-indigo-500/20 px-2.5 py-1 rounded-lg">
                <Globe className="w-3.5 h-3.5" /> Global Fulfillment
              </span>
            </div>
          </div>

          {/* Col 2: Marketplace Directory */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">Marketplace</h5>
            <ul className="space-y-2">
              <li><a href="#flash-deals" className="hover:text-white transition-colors">Flash Sales</a></li>
              <li><a href="#featured-vendors" className="hover:text-white transition-colors">Top Brand Outlets</a></li>
              <li><a href="#product-catalog" className="hover:text-white transition-colors">Audio & Electronics</a></li>
              <li><a href="#product-catalog" className="hover:text-white transition-colors">Fashion & Apparel</a></li>
              <li><a href="#product-catalog" className="hover:text-white transition-colors">Home & Living</a></li>
            </ul>
          </div>

          {/* Col 3: Multi-Vendor Merchant Hub */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">For Sellers</h5>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setIsSellerPortalOpen(true)}
                  className="text-brand-400 hover:text-brand-300 font-bold transition-colors flex items-center gap-1"
                >
                  <Store className="w-3.5 h-3.5" /> Open Seller Shop
                </button>
              </li>
              <li><a href="#" className="hover:text-white transition-colors">Merchant Guidelines</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Commission Rates</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Zenith Multi-Carrier Express</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Seller Protection Policy</a></li>
            </ul>
          </div>

          {/* Col 4: Trust & Customer Care */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">Customer Support</h5>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Help Center & FAQs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Dispute Resolution</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Track Your Package</a></li>
              <li><a href="#" className="hover:text-white transition-colors">30-Day Return Terms</a></li>
              <li className="pt-2 text-slate-300 flex items-center gap-1.5 font-bold">
                <PhoneCall className="w-3.5 h-3.5 text-brand-400" />
                <span>+1 (800) 493-6484</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Payments & Copyright */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-[11px]">
            © {new Date().getFullYear()} ZenithMart Inc. All rights reserved. Architected with Senior-Developer Standards.
          </p>

          {/* Payment Badges */}
          <div className="flex items-center gap-3 text-[11px] font-bold text-slate-400">
            <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded">VISA</span>
            <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded">Mastercard</span>
            <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded">AMEX</span>
            <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded text-pink-400">bKash</span>
            <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded text-orange-400">Nagad</span>
            <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded">Escrow COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

