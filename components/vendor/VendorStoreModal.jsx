"use client";

import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";
import ProductCard from "@/components/products/ProductCard";
import {
  X,
  Star,
  CheckCircle2,
  MapPin,
  MessageCircle,
  Search,
  Users,
  Store,
  Share2,
  Truck,
  ShieldCheck
} from "lucide-react";

export default function VendorStoreModal() {
  const { activeVendorId, setActiveVendorId, vendors, products, addToast } = useStore();
  const [vendorSearch, setVendorSearch] = useState("");
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState("products");

  if (!activeVendorId) return null;

  const vendor = vendors.find((v) => v.id === activeVendorId);
  if (!vendor) return null;

  const vendorProducts = products.filter((p) => {
    if (p.vendorId !== vendor.id) return false;
    if (vendorSearch.trim()) {
      const q = vendorSearch.toLowerCase();
      return p.title.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q);
    }
    return true;
  });

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
    addToast(isFollowing ? `Unfollowed ${vendor.name}` : `Following ${vendor.name}!`, "info");
  };

  const handleChatWithSeller = () => {
    addToast(`Connecting to ${vendor.name} merchant support...`, "info");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-50 rounded-2xl sm:rounded-3xl max-w-6xl w-full max-h-[94vh] overflow-y-auto shadow-2xl border border-slate-200 relative flex flex-col">
        <button
          onClick={() => setActiveVendorId(null)}
          className="absolute top-3 right-3 z-30 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Banner */}
        <div className="relative h-32 sm:h-56 w-full bg-slate-900 overflow-hidden shrink-0">
          <img
            src={vendor.banner}
            alt={vendor.name}
            className="w-full h-full object-cover opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        </div>

        {/* Profile */}
        <div className="bg-white px-4 sm:px-8 pb-4 sm:pb-6 border-b border-slate-200 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-6 -mt-10 sm:-mt-16 mb-4 sm:mb-6">
            <div className="flex items-end gap-3 sm:gap-4">
              <div className="relative">
                <img
                  src={vendor.avatar}
                  alt={vendor.name}
                  className="w-16 h-16 sm:w-24 sm:h-24 rounded-xl sm:rounded-2xl border-2 sm:border-4 border-white shadow-xl object-cover bg-white"
                />
                {vendor.verified && (
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 fill-emerald-600 text-white absolute -bottom-1 -right-1" />
                )}
              </div>

              <div>
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-[10px] sm:text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                    {vendor.badge}
                  </span>
                  <span className="text-[10px] text-slate-500">Since {vendor.joinedDate}</span>
                </div>
                <h1 className="text-base sm:text-2xl font-black text-slate-900">
                  {vendor.name}
                </h1>
                <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                  <span className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>{vendor.rating}</span>
                  </span>
                  <span>•</span>
                  <span>{vendor.salesCount} orders</span>
                  <span>•</span>
                  <span>{vendor.location}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleFollowToggle}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isFollowing ? "bg-slate-100 text-slate-800 border" : "bg-emerald-600 text-white"
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>{isFollowing ? "Following" : "Follow Store"}</span>
              </button>

              <button
                onClick={handleChatWithSeller}
                className="px-3 py-2 rounded-xl text-xs font-bold border border-slate-300 text-slate-700 hover:bg-slate-50 flex items-center gap-1"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Chat</span>
              </button>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-2 p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-100 text-center text-xs">
            <div>
              <span className="text-slate-400 text-[10px] block">On-Time Dispatch</span>
              <span className="font-bold text-emerald-600 text-xs sm:text-sm">{vendor.shipOnTime}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">Response Speed</span>
              <span className="font-bold text-slate-800 text-xs sm:text-sm">{vendor.responseTime}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">E-Bazar Escrow</span>
              <span className="font-bold text-emerald-600 text-xs sm:text-sm">100% Insured</span>
            </div>
          </div>

          {/* Store Tabs */}
          <div className="flex items-center justify-between border-b border-slate-200 mt-4 -mb-4">
            <div className="flex gap-4 sm:gap-6">
              <button
                onClick={() => setActiveTab("products")}
                className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors ${
                  activeTab === "products" ? "text-emerald-600 border-b-2 border-emerald-600" : "text-slate-500"
                }`}
              >
                Catalog ({vendorProducts.length})
              </button>
              <button
                onClick={() => setActiveTab("about")}
                className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors ${
                  activeTab === "about" ? "text-emerald-600 border-b-2 border-emerald-600" : "text-slate-500"
                }`}
              >
                Store Policies
              </button>
            </div>

            {activeTab === "products" && (
              <div className="relative pb-2">
                <input
                  type="text"
                  placeholder="Search store..."
                  value={vendorSearch}
                  onChange={(e) => setVendorSearch(e.target.value)}
                  className="bg-slate-100 text-slate-800 text-xs px-2.5 py-1 pl-7 rounded-lg w-36 sm:w-56 focus:outline-none focus:bg-white"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-2.5" />
              </div>
            )}
          </div>
        </div>

        {/* Products in Store (2-column mobile grid) */}
        <div className="p-3 sm:p-6 lg:p-8 flex-1">
          {activeTab === "products" ? (
            vendorProducts.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center border border-slate-200">
                <Store className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                <h3 className="text-sm font-bold text-slate-800">No products found</h3>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-5">
                {vendorProducts.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            )
          ) : (
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 space-y-4 max-w-2xl">
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">About the Merchant</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{vendor.description}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100">
                <div className="p-3 rounded-xl bg-slate-50 border text-xs">
                  <span className="font-bold text-slate-800 flex items-center gap-1 mb-1">
                    <Truck className="w-3.5 h-3.5 text-emerald-600" /> Shipping Guarantee
                  </span>
                  <p className="text-[11px] text-slate-600">Dispatched within 24 business hours with direct door courier tracking.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border text-xs">
                  <span className="font-bold text-slate-800 flex items-center gap-1 mb-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> E-Bazar Buyer Shield
                  </span>
                  <p className="text-[11px] text-slate-600">30-day replacement on damaged or mismatched merchandise.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
