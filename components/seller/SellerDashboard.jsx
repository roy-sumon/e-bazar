"use client";

import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";
import { CATEGORIES } from "@/data/mockData";
import {
  X,
  Store,
  DollarSign,
  Package,
  TrendingUp,
  PlusCircle,
  CheckCircle2,
  Layers
} from "lucide-react";

export default function SellerDashboard() {
  const {
    isSellerPortalOpen,
    setIsSellerPortalOpen,
    vendors,
    products,
    addSellerProduct,
    orders,
    formatPrice
  } = useStore();

  const [activeTab, setActiveTab] = useState("overview");

  const [formData, setFormData] = useState({
    title: "",
    category: "electronics",
    vendorId: "anker-tech",
    vendorName: "Anker Innovations Hub",
    price: "",
    originalPrice: "",
    stock: "25",
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=700&auto=format&fit=crop&q=80",
    description: "",
    colors: "Black, Silver"
  });

  const PRESET_IMAGES = [
    { label: "Vintage Polaroid Camera", url: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=700&auto=format&fit=crop&q=80" },
    { label: "Noise Isolating Pods", url: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=700&auto=format&fit=crop&q=80" },
    { label: "Smart Ceramic Coffee Mug", url: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=700&auto=format&fit=crop&q=80" },
    { label: "Minimalist Leather Backpack", url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700&auto=format&fit=crop&q=80" }
  ];

  if (!isSellerPortalOpen) return null;

  const handleProductSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.price) return;
    addSellerProduct(formData);
    setFormData({
      title: "",
      category: "electronics",
      vendorId: "anker-tech",
      vendorName: "Anker Innovations Hub",
      price: "",
      originalPrice: "",
      stock: "25",
      image: PRESET_IMAGES[0].url,
      description: "",
      colors: "Black, Silver"
    });
    setActiveTab("overview");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col">
        {/* Header */}
        <div className="bg-slate-950 text-white p-4 sm:p-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md">
              <Store className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-xl font-black">E-Bazar Seller Hub</h2>
                <span className="bg-emerald-500/20 text-emerald-300 text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  Verified Merchant
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
                Manage inventory, publish new listings, and monitor fulfillment.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsSellerPortalOpen(false)}
            className="p-1.5 sm:p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-slate-50 px-4 sm:px-6 border-b border-slate-200 flex gap-4 sm:gap-6 text-xs font-bold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab("overview")}
            className={`py-3 sm:py-3.5 border-b-2 transition-colors ${
              activeTab === "overview" ? "border-emerald-600 text-emerald-600" : "border-transparent text-slate-500"
            }`}
          >
            Analytics
          </button>
          <button
            onClick={() => setActiveTab("add-product")}
            className={`py-3 sm:py-3.5 border-b-2 transition-colors flex items-center gap-1 ${
              activeTab === "add-product" ? "border-emerald-600 text-emerald-600" : "border-transparent text-slate-500"
            }`}
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Add Product</span>
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`py-3 sm:py-3.5 border-b-2 transition-colors flex items-center gap-1 ${
              activeTab === "orders" ? "border-emerald-600 text-emerald-600" : "border-transparent text-slate-500"
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Orders ({orders.length})</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 flex-1">
          {activeTab === "overview" && (
            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
                <div className="p-3.5 sm:p-4 rounded-xl bg-emerald-50/70 border border-emerald-100">
                  <div className="flex items-center justify-between text-emerald-700 text-xs font-bold mb-1">
                    <span>Revenue</span>
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <div className="text-lg sm:text-xl font-black text-slate-900">$48,290.00</div>
                  <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1 mt-0.5">
                    <TrendingUp className="w-3 h-3" /> +18.4%
                  </span>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between text-slate-700 text-xs font-bold mb-1">
                    <span>Orders</span>
                    <Package className="w-4 h-4" />
                  </div>
                  <div className="text-lg sm:text-xl font-black text-slate-900">342</div>
                  <span className="text-[10px] text-slate-500 font-semibold block mt-0.5">
                    99.4% on-time
                  </span>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between text-slate-700 text-xs font-bold mb-1">
                    <span>Listings</span>
                    <Layers className="w-4 h-4" />
                  </div>
                  <div className="text-lg sm:text-xl font-black text-slate-900">{products.length}</div>
                  <span className="text-[10px] text-slate-500 font-semibold block mt-0.5">
                    6 Categories
                  </span>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between text-slate-700 text-xs font-bold mb-1">
                    <span>Rating</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-lg sm:text-xl font-black text-slate-900">4.9 / 5.0</div>
                  <span className="text-[10px] text-slate-500 font-semibold block mt-0.5">
                    Verified Reviews
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 text-white flex items-center justify-between gap-3">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold">List brand products to E-Bazar catalog</h4>
                  <p className="text-[11px] text-slate-400">Products are indexed instantly.</p>
                </div>
                <button
                  onClick={() => setActiveTab("add-product")}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-2 rounded-lg shrink-0"
                >
                  List Now
                </button>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  Active Store Inventory
                </h4>
                <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden bg-white">
                  {products.slice(0, 4).map((prod) => (
                    <div key={prod.id} className="p-3 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img src={prod.image} alt="" className="w-10 h-10 rounded-lg object-cover bg-slate-100 shrink-0" />
                        <div className="min-w-0">
                          <h5 className="text-xs font-bold text-slate-900 truncate">{prod.title}</h5>
                          <span className="text-[10px] text-slate-400">{prod.category} • Stock: {prod.stock}</span>
                        </div>
                      </div>
                      <span className="text-xs font-black text-slate-900 shrink-0">{formatPrice(prod.price)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "add-product" && (
            <form onSubmit={handleProductSubmit} className="max-w-xl mx-auto space-y-3.5">
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                Publish Product to E-Bazar Catalog
              </h3>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Product Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Wireless Pro Earbuds"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-2 text-xs font-semibold focus:outline-none"
                  >
                    {CATEGORIES.filter(c => c.id !== "all").map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Vendor *
                  </label>
                  <select
                    value={formData.vendorId}
                    onChange={(e) => {
                      const v = vendors.find(item => item.id === e.target.value);
                      setFormData({
                        ...formData,
                        vendorId: e.target.value,
                        vendorName: v ? v.name : "Verified Vendor"
                      });
                    }}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-2 text-xs font-semibold focus:outline-none"
                  >
                    {vendors.map((v) => (
                      <option key={v.id} value={v.id}>{v.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Price ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="99.00"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-2 text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">MSRP ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="120.00"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-2 text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Stock</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-2 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Image URL</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none mb-1.5"
                />
                <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                  {PRESET_IMAGES.map((preset, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setFormData({ ...formData, image: preset.url })}
                      className="px-2 py-0.5 rounded bg-slate-100 text-[10px] font-medium shrink-0 border"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Description</label>
                <textarea
                  rows="2"
                  placeholder="Key features..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl shadow-md text-xs"
              >
                Publish to E-Bazar
              </button>
            </form>
          )}

          {activeTab === "orders" && (
            <div>
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">Customer Orders</h4>
              {orders.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500">
                  No customer orders recorded yet.
                </div>
              ) : (
                <div className="divide-y divide-slate-100 border rounded-xl overflow-hidden bg-white">
                  {orders.map((order) => (
                    <div key={order.id} className="p-3 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-mono font-black text-emerald-600 block">{order.id}</span>
                        <span className="text-slate-600">{order.customer.fullName} • {order.items.length} items</span>
                      </div>
                      <span className="font-black text-slate-900">{formatPrice(order.total)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
