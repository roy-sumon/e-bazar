"use client";

import React from "react";
import { useStore } from "@/context/StoreContext";
import { CATEGORIES } from "@/data/mockData";
import { Flame, Award, Truck, Sparkles } from "lucide-react";

export default function CategoryNav() {
  const { selectedCategory, setSelectedCategory } = useStore();

  const handleFlashClick = () => {
    const flashEl = document.getElementById("flash-deals");
    if (flashEl) flashEl.scrollIntoView({ behavior: "smooth" });
  };

  const handleVendorsClick = () => {
    const vendorEl = document.getElementById("featured-vendors");
    if (vendorEl) vendorEl.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="bg-slate-50 border-b border-slate-200 text-slate-700 text-xs font-semibold overflow-x-auto no-scrollbar">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between min-w-max h-11 gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-1">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  const catalogEl = document.getElementById("product-catalog");
                  if (catalogEl) catalogEl.scrollIntoView({ behavior: "smooth" });
                }}
                className={`px-2.5 py-1.5 sm:px-3 rounded-full transition-all flex items-center gap-1 text-[11px] sm:text-xs ${
                  isActive
                    ? "bg-slate-900 text-white shadow-sm font-bold"
                    : "hover:bg-slate-200 text-slate-600 hover:text-slate-900"
                }`}
              >
                {cat.id === "all" && <Sparkles className="w-3 h-3 text-amber-400" />}
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Shortcuts */}
        <div className="flex items-center gap-3 sm:gap-4 pl-4 border-l border-slate-200">
          <button
            onClick={handleFlashClick}
            className="flex items-center gap-1 text-rose-600 hover:text-rose-700 font-bold text-[11px] sm:text-xs"
          >
            <Flame className="w-3.5 h-3.5 fill-rose-500 animate-pulse" />
            <span>Flash Deals</span>
          </button>

          <button
            onClick={handleVendorsClick}
            className="flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-bold text-[11px] sm:text-xs"
          >
            <Award className="w-3.5 h-3.5" />
            <span>Brand Outlets</span>
          </button>

          <div className="hidden lg:flex items-center gap-1 text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 text-[11px]">
            <Truck className="w-3 h-3 text-emerald-600" />
            <span>Free Express over $150</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
