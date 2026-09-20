"use client";

import React from "react";
import { useStore } from "@/context/StoreContext";
import { Sparkles, Store, ShieldCheck, Globe, Clock, PackageCheck } from "lucide-react";

export default function TopBar() {
  const { currency, setCurrency, setIsSellerPortalOpen, setIsOrderHistoryOpen, orders } = useStore();

  return (
    <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
        {/* Left: Announcement / Promo */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-500 to-rose-500 text-white font-semibold px-2 py-0.5 rounded-full text-[11px] uppercase tracking-wider">
            <Sparkles className="w-3 h-3" /> Flash Deals Live
          </span>
          <span className="text-slate-300 hidden sm:inline">
            Use code <strong className="text-amber-400 font-mono">ZENITH20</strong> for 20% off verified multi-vendor orders!
          </span>
        </div>

        {/* Right: Quick actions, currency, seller portal link */}
        <div className="flex items-center gap-4 divide-x divide-slate-800">
          <div className="flex items-center gap-3">
            {/* Vendor Portal Trigger */}
            <button
              onClick={() => setIsSellerPortalOpen(true)}
              className="flex items-center gap-1.5 text-indigo-300 hover:text-white font-medium transition-colors"
            >
              <Store className="w-3.5 h-3.5 text-indigo-400" />
              <span>Seller Hub / Open Shop</span>
            </button>

            {/* Order History */}
            <button
              onClick={() => setIsOrderHistoryOpen(true)}
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <PackageCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Track Orders {orders.length > 0 && `(${orders.length})`}</span>
            </button>
          </div>

          {/* Currency Switcher */}
          <div className="pl-4 flex items-center gap-1">
            <Globe className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-transparent text-slate-300 hover:text-white cursor-pointer focus:outline-none text-xs font-medium"
            >
              <option value="USD" className="bg-slate-900 text-white">USD ($)</option>
              <option value="EUR" className="bg-slate-900 text-white">EUR (€)</option>
              <option value="BDT" className="bg-slate-900 text-white">BDT (৳)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

