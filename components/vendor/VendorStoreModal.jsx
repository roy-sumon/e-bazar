"use client";

import React, { useState, useMemo } from "react";
import { useStore } from "@/context/StoreContext";
import ProductCard from "@/components/products/ProductCard";
import {
  X,
  Star,
  CheckCircle2,
  ShieldCheck,
  MapPin,
  Clock,
  Truck,
  MessageCircle,
  Search,
  Users,
  Store,
  Share2
} from "lucide-react";

export default function VendorStoreModal() {
  const { activeVendorId, setActiveVendorId, vendors, products, addToast } = useStore();
  const [vendorSearch, setVendorSearch] = useState("");
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState("products"); // 'products' | 'about'

  if (!activeVendorId) return null;

  const vendor = vendors.find((v) => v.id === activeVendorId);
  if (!vendor) return null;

  // Filter vendor products
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
    addToast(isFollowing ? `Unfollowed ${vendor.name}` : `You are now following ${vendor.name}!`, "info");
  };

  const handleChatWithSeller = () => {
    addToast(`Connecting you to ${vendor.name} verified support agent...`, "info");
  };

  const handleShareStore = () => {
    navigator.clipboard?.writeText(window.location.href);
    addToast(`Storefront link copied to clipboard!`, "success");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-50 rounded-3xl max-w-6xl w-full max-h-[95vh] overflow-y-auto shadow-2xl border border-slate-200 relative flex flex-col">
        {/* Close Button */}
        <button
          onClick={() => setActiveVendorId(null)}
          className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors"
          title="Close Storefront"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Store Banner */}
        <div className="relative h-48 sm:h-64 w-full bg-slate-900 overflow-hidden shrink-0">
          <img
            src={vendor.banner}
            alt={vendor.name}
            className="w-full h-full object-cover opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Quick Share */}
          <button
            onClick={handleShareStore}
            className="absolute top-4 right-16 z-20 p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-sm transition-colors"
            title="Share Storefront"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* Store Header / Profile Info */}
        <div className="bg-white px-6 sm:px-10 pb-6 border-b border-slate-200 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 -mt-16 sm:-mt-20 mb-6">
            {/* Avatar & Title */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
              <div className="relative">
                <img
                  src={vendor.avatar}
                  alt={vendor.name}
                  className="w-24 sm:w-28 h-24 sm:h-28 rounded-2xl border-4 border-white shadow-xl object-cover bg-white"
                />
                {vendor.verified && (
                  <CheckCircle2 className="w-6 h-6 fill-brand-600 text-white absolute -bottom-1 -right-1" />
                )}
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-brand-700 bg-brand-50 border border-brand-200 px-2.5 py-0.5 rounded-lg">
                    {vendor.badge}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">Joined {vendor.joinedDate}</span>
                </div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                  {vendor.name}
                </h1>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                  <span className="flex items-center gap-1 font-bold text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{vendor.rating} / 5.0</span>
                    <span className="text-slate-400 font-normal">({vendor.reviewsCount} reviews)</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {vendor.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Vendor Actions: Follow & Message */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleFollowToggle}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2 ${
                  isFollowing
                    ? "bg-slate-100 text-slate-800 border border-slate-300"
                    : "bg-brand-600 hover:bg-brand-700 text-white"
                }`}
              >
                <Users className="w-4 h-4" />
                <span>{isFollowing ? "Following Store" : "Follow Store (+2.4k)"}</span>
              </button>

              <button
                onClick={handleChatWithSeller}
                className="px-4 py-2.5 rounded-xl text-xs font-bold border border-slate-300 text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-brand-600" />
                <span>Chat with Seller</span>
              </button>
            </div>
          </div>

          {/* Performance KPIs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
            <div>
              <span className="text-slate-400 block mb-0.5">Total Sales Fulfilled</span>
              <span className="font-extrabold text-slate-800 text-sm">{vendor.salesCount}</span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">On-Time Dispatch</span>
              <span className="font-extrabold text-emerald-600 text-sm">{vendor.shipOnTime}</span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Avg Response Time</span>
              <span className="font-extrabold text-slate-800 text-sm">{vendor.responseTime}</span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Zenith Escrow Guarantee</span>
              <span className="font-extrabold text-brand-600 text-sm">100% Insured</span>
            </div>
          </div>

          {/* Store Tabs */}
          <div className="flex items-center justify-between border-b border-slate-200 mt-6 -mb-6">
            <div className="flex gap-6">
              <button
                onClick={() => setActiveTab("products")}
                className={`pb-4 text-xs font-black uppercase tracking-wider transition-colors relative ${
                  activeTab === "products"
                    ? "text-brand-600 border-b-2 border-brand-600"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                Store Catalog ({vendorProducts.length})
              </button>
              <button
                onClick={() => setActiveTab("about")}
                className={`pb-4 text-xs font-black uppercase tracking-wider transition-colors relative ${
                  activeTab === "about"
                    ? "text-brand-600 border-b-2 border-brand-600"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                About & Policies
              </button>
            </div>

            {/* In-Store Search */}
            {activeTab === "products" && (
              <div className="relative pb-2">
                <input
                  type="text"
                  placeholder={`Search ${vendor.name}...`}
                  value={vendorSearch}
                  onChange={(e) => setVendorSearch(e.target.value)}
                  className="bg-slate-100 text-slate-800 text-xs px-3 py-1.5 pl-8 rounded-lg focus:outline-none focus:bg-white border border-transparent focus:border-brand-500 transition-all w-48 sm:w-64"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3 -translate-y-1/2" />
              </div>
            )}
          </div>
        </div>

        {/* Store Content */}
        <div className="p-6 sm:p-10 flex-1">
          {activeTab === "products" ? (
            vendorProducts.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                <Store className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">No products matched</h3>
                <p className="text-xs text-slate-500 mt-1">Try clearing your search query for this store.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {vendorProducts.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            )
          ) : (
            /* About Tab */
            <div className="bg-white rounded-2xl p-8 border border-slate-200 space-y-6 max-w-3xl">
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Merchant Biography</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{vendor.description}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-emerald-600" />
                    <span>Shipping Policy</span>
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    All orders are handled within 24 business hours from our certified regional fulfillment center. Express door-to-door courier tracking provided upon dispatch.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-brand-600" />
                    <span>Return & Warranty</span>
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Compliant with ZenithMart Buyer Protection. 30-day replacement on defective units with manufacturer authorized certificate.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

