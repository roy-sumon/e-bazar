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
  ShoppingBag
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
    const catalogEl = document.getElementById("product-catalog");
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <a href="#" className="flex items-center gap-2 group">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-200 group-hover:scale-105 transition-transform">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                  E-<span className="text-emerald-600">Bazar</span>
                </span>
                <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 tracking-wide hidden xs:inline">
                  Multi-Vendor Marketplace
                </span>
              </div>
            </a>
          </div>

          {/* Search Bar (Desktop & Tablet) */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-2xl items-center relative rounded-full border-2 border-slate-200 bg-slate-50/80 hover:bg-white focus-within:bg-white focus-within:border-emerald-600 focus-within:ring-4 focus-within:ring-emerald-500/15 transition-all shadow-sm group p-1"
          >
            <div className="pl-3 pr-2 text-slate-400 flex items-center shrink-0 pointer-events-none">
              <Search className="w-4 h-4 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
            </div>

            <input
              type="text"
              placeholder="Search products, verified stores, brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent py-1.5 px-1 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors mr-1 shrink-0"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white px-5 py-2 rounded-full flex items-center gap-1.5 text-xs font-bold transition-all shadow-sm hover:shadow shrink-0 ml-1"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search</span>
            </button>
          </form>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={() => setIsSellerPortalOpen(true)}
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold transition-all"
            >
              <Store className="w-4 h-4 text-emerald-600" />
              <span>Seller Portal</span>
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2 rounded-xl text-slate-700 hover:text-emerald-600 hover:bg-slate-100 transition-all active:scale-95 group"
              title="View Wishlist"
            >
              <Heart className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white animate-scale-up">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 p-2 sm:px-3.5 sm:py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-200 hover:shadow-lg transition-all active:scale-95 group btn-interactive"
              title="View Cart"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                {cartCount > 0 && (
                  <span className="absolute -top-2.5 -right-2.5 bg-amber-400 text-slate-950 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white animate-scale-up">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-[9px] font-medium text-emerald-100 uppercase leading-none">
                  Cart
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
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="pb-3 md:hidden">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center rounded-full border-2 border-slate-200 bg-slate-50 focus-within:bg-white focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-500/15 p-1 transition-all shadow-sm"
          >
            <div className="pl-3 pr-1 text-slate-400 flex items-center shrink-0 pointer-events-none">
              <Search className="w-4 h-4 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search products, brands or stores..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent py-1 px-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-slate-400 hover:text-slate-600 p-1 mr-1 shrink-0"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white p-1.5 rounded-full shrink-0 transition-colors"
              title="Search"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3 animate-slide-up">
          <div className="font-semibold text-xs text-slate-400 uppercase tracking-wider">
            Explore Categories
          </div>
          <div className="grid grid-cols-2 gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2 rounded-lg text-xs font-medium ${
                  selectedCategory === cat.id
                    ? "bg-emerald-50 text-emerald-700 font-bold"
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
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-50 text-emerald-700 font-bold text-xs"
            >
              <Store className="w-4 h-4" />
              <span>E-Bazar Seller Hub</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
