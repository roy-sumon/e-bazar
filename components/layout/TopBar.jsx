"use client";

import React from "react";
import { useStore } from "@/context/StoreContext";
import { Sparkles, Store, Globe, PackageCheck } from "lucide-react";

export default function TopBar() {
  const { currency, setCurrency, setIsSellerPortalOpen, setIsOrderHistoryOpen, orders } = useStore();

  return (
    <div className="bg-slate-950 text-slate-300 text-xs py-2 px-3 sm:px-4 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Left: Announcement / Promo */}
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="inline-flex items-center gap-1 bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-bold px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] uppercase tracking-wider shrink-0">
            <Sparkles className="w-3 h-3" /> E-Bazar Deals
          </span>
          <span className="text-slate-300 text-[11px] sm:text-xs truncate">
            Use code <strong className="text-emerald-400 font-mono">EBAZAR20</strong> for 20% off all stores!
          </span>
        </div>

        {/* Right: Quick actions, currency, seller portal link */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0 divide-x divide-slate-800">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Vendor Portal Trigger */}
            <button
              onClick={() => setIsSellerPortalOpen(true)}
              className="flex items-center gap-1 text-emerald-400 hover:text-white font-medium text-[11px] sm:text-xs transition-colors"
            >
              <Store className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Seller Hub</span>
            </button>

            {/* Order History */}
            <button
              onClick={() => setIsOrderHistoryOpen(true)}
              className="flex items-center gap-1 text-slate-300 hover:text-white text-[11px] sm:text-xs transition-colors"
            >
              <PackageCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>Track {orders.length > 0 && `(${orders.length})`}</span>
            </button>
          </div>

          {/* Currency Switcher */}
          <div className="pl-3 sm:pl-4 flex items-center gap-1">
            <Globe className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-transparent text-slate-300 hover:text-white cursor-pointer focus:outline-none text-[11px] sm:text-xs font-semibold"
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
