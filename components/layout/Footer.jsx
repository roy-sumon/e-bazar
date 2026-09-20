"use client";

import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";
import {
  ShoppingBag,
  Store,
  ShieldCheck,
  Mail,
  Send,
  Globe,
  PhoneCall
} from "lucide-react";

export default function Footer() {
  const { setIsSellerPortalOpen, addToast } = useStore();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      addToast("Subscribed to E-Bazar VIP Club! Coupon sent.", "success");
      setEmail("");
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs mt-auto">
      {/* Newsletter */}
      <div className="border-b border-slate-800/80 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-3 sm:gap-4 text-center md:text-left">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center border border-emerald-500/20 shrink-0">
              <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white">Join the E-Bazar VIP Club</h4>
              <p className="text-xs text-slate-400">Get early access to Flash Deals, brand drops, and discount vouchers.</p>
            </div>
          </div>

          <form onSubmit={handleSubscribe} className="flex w-full md:w-auto gap-2">
            <input
              type="email"
              required
              placeholder="Enter your email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 w-full sm:w-72"
            />
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 sm:px-5 py-2.5 rounded-xl flex items-center gap-1.5 transition-colors shrink-0 text-xs"
            >
              <span>Subscribe</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* Main Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-10">
          <div className="col-span-2 space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <span className="text-xl sm:text-2xl font-black text-white tracking-tight">
                E-<span className="text-emerald-500">Bazar</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              E-Bazar is an enterprise-grade multi-vendor marketplace connecting verified global flagship stores, local boutiques, and technology pioneers directly with shoppers.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Escrow Protected
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] text-teal-400 font-semibold bg-teal-950/60 border border-teal-500/20 px-2.5 py-1 rounded-lg">
                <Globe className="w-3.5 h-3.5" /> Global Fulfillment
              </span>
            </div>
          </div>

          <div className="space-y-2.5 sm:space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">Marketplace</h5>
            <ul className="space-y-1.5 sm:space-y-2 text-xs">
              <li><a href="#flash-deals" className="hover:text-white transition-colors">Flash Deals</a></li>
              <li><a href="#featured-vendors" className="hover:text-white transition-colors">Brand Outlets</a></li>
              <li><a href="#product-catalog" className="hover:text-white transition-colors">Electronics & Tech</a></li>
              <li><a href="#product-catalog" className="hover:text-white transition-colors">Fashion Apparel</a></li>
              <li><a href="#product-catalog" className="hover:text-white transition-colors">Home & Living</a></li>
            </ul>
          </div>

          <div className="space-y-2.5 sm:space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">For Merchants</h5>
            <ul className="space-y-1.5 sm:space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setIsSellerPortalOpen(true)}
                  className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors flex items-center gap-1"
                >
                  <Store className="w-3.5 h-3.5" /> Open Seller Shop
                </button>
              </li>
              <li><a href="#" className="hover:text-white transition-colors">Merchant Guidelines</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Commission Rates</a></li>
              <li><a href="#" className="hover:text-white transition-colors">E-Bazar Express Logistics</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Seller Protection</a></li>
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-1 space-y-2.5 sm:space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">Customer Care</h5>
            <ul className="space-y-1.5 sm:space-y-2 text-xs">
              <li><a href="#" className="hover:text-white transition-colors">Help Center & FAQs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Dispute Resolution</a></li>
              <li><a href="#" className="hover:text-white transition-colors">30-Day Return Terms</a></li>
              <li className="pt-2 text-slate-300 flex items-center gap-1.5 font-bold">
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                <span>+1 (800) 493-6484</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 sm:mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-[10px] sm:text-[11px] text-center sm:text-left">
            © 2026 E-Bazar Inc. All rights reserved. Senior-Developer Engineered Multi-Vendor Platform.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] font-bold text-slate-400">
            <span className="px-2 py-0.5 bg-slate-900 border border-slate-800 rounded">VISA</span>
            <span className="px-2 py-0.5 bg-slate-900 border border-slate-800 rounded">Mastercard</span>
            <span className="px-2 py-0.5 bg-slate-900 border border-slate-800 rounded">AMEX</span>
            <span className="px-2 py-0.5 bg-slate-900 border border-slate-800 rounded text-pink-400">bKash</span>
            <span className="px-2 py-0.5 bg-slate-900 border border-slate-800 rounded text-orange-400">Nagad</span>
            <span className="px-2 py-0.5 bg-slate-900 border border-slate-800 rounded text-emerald-400">Escrow COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
