"use client";

import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";
import { CATEGORIES } from "@/data/mockData";
import {
  Search,
  ShoppingCart,
  Heart,
  Store,
  Menu,
  X,
  ShieldCheck,
  ChevronDown,
  Layers,
  Sparkles
} from "lucide-react";

export default function Navbar() {
  const {
    cartCount,
    cartSubtotal,
    wishlistCount,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsSellerPortalOpen,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    formatPrice
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Scroll smoothly down to product catalog section
    const catalogEl = document.getElementById("product-catalog");
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo */}
          <div className="flex items-center gap-6 shrink-0">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform">
                <Layers className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-1 font-[family-name:var(--font-geist-sans)]">
                  Zenith<span className="text-brand-600">Mart</span>
                  <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">
                    Pro
                  </span>
                </span>
                <span className="text-[11px] font-medium text-slate-500 tracking-wide">
                  Multi-Vendor Marketplace
                </span>
              </div>
            </a>
          </div>

          {/* Search Bar with Category Selector (Desktop & Tablet) */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-2xl items-center border-2 border-slate-200 focus-within:border-brand-600 rounded-full bg-slate-50 hover:bg-white transition-all overflow-hidden shadow-inner"
          >
            {/* Category Dropdown */}
            <div className="relative border-r border-slate-200">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none bg-transparent py-2.5 pl-4 pr-8 text-xs font-semibold text-slate-700 cursor-pointer focus:outline-none"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Input field */}
            <div className="flex-1 relative flex items-center">
              <input
                type="text"
                placeholder="Search across 50,000+ products, official stores, and brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent py-2.5 px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="mr-2 p-1 text-slate-400 hover:text-slate-600 rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-2.5 flex items-center gap-1.5 text-sm font-semibold transition-colors"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
          </form>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Seller Portal Button */}
            <button
              onClick={() => setIsSellerPortalOpen(true)}
              className="hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-bold transition-all hover:shadow-sm"
            >
              <Store className="w-4 h-4 text-brand-600" />
              <span>Seller Portal</span>
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2.5 rounded-xl text-slate-700 hover:text-brand-600 hover:bg-slate-100 transition-colors"
              title="View Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-white animate-fade-in">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2.5 p-2 sm:px-3.5 sm:py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white shadow-md shadow-brand-200 hover:shadow-lg transition-all"
              title="View Cart"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2.5 -right-2.5 bg-amber-400 text-slate-950 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-white">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-[10px] font-medium text-brand-200 uppercase leading-none">
                  My Cart
                </span>
                <span className="text-xs font-bold leading-tight">
                  {formatPrice(cartSubtotal)}
                </span>
              </div>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="pb-3 md:hidden">
          <form onSubmit={handleSearchSubmit} className="flex items-center rounded-xl border border-slate-300 bg-slate-50 px-3 py-2">
            <Search className="w-4 h-4 text-slate-400 mr-2" />
            <input
              type="text"
              placeholder="Search products or stores..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-sm text-slate-900 focus:outline-none"
            />
          </form>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3">
          <div className="font-semibold text-xs text-slate-400 uppercase tracking-wider">
            Explore Marketplace
          </div>
          <div className="grid grid-cols-2 gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2 rounded-lg text-sm font-medium ${
                  selectedCategory === cat.id
                    ? "bg-brand-50 text-brand-600 font-bold"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
          <div className="pt-3 border-t border-slate-100">
            <button
              onClick={() => {
                setIsSellerPortalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-50 text-indigo-700 font-bold text-sm"
            >
              <Store className="w-4 h-4" />
              <span>Multi-Vendor Seller Hub</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

