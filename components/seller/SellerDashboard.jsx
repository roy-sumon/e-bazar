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
  Clock,
  CheckCircle2,
  AlertCircle,
  Truck,
  Image as ImageIcon,
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

  const [activeTab, setActiveTab] = useState("overview"); // 'overview' | 'add-product' | 'orders'

  // New product form state
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
    { label: "Premium Noise Isolating Pods", url: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=700&auto=format&fit=crop&q=80" },
    { label: "Smart Ceramic Coffee Mug", url: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=700&auto=format&fit=crop&q=80" },
    { label: "Minimalist Leather Backpack", url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700&auto=format&fit=crop&q=80" }
  ];

  if (!isSellerPortalOpen) return null;

  const handleProductSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.price) {
      alert("Please fill in the product title and price");
      return;
    }

    addSellerProduct(formData);
    // Reset form & go to overview
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col">
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 sm:p-8 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-600 flex items-center justify-center text-white shadow-lg shadow-brand-500/30">
              <Store className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black">Zenith Seller Center</h2>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  Verified Merchant Portal
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Manage your storefront catalog, list products across categories, and track order fulfillment.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsSellerPortalOpen(false)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-slate-50 px-6 sm:px-8 border-b border-slate-200 flex items-center justify-between text-xs font-bold uppercase tracking-wider">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab("overview")}
              className={`py-4 border-b-2 transition-colors ${
                activeTab === "overview"
                  ? "border-brand-600 text-brand-600"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              Merchant Analytics
            </button>
            <button
              onClick={() => setActiveTab("add-product")}
              className={`py-4 border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === "add-product"
                  ? "border-brand-600 text-brand-600"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              <span>List New Product</span>
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`py-4 border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === "orders"
                  ? "border-brand-600 text-brand-600"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Orders ({orders.length})</span>
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="p-6 sm:p-8 flex-1">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 shadow-sm">
                  <div className="flex items-center justify-between text-indigo-600 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider">Total Sales</span>
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <div className="text-2xl font-black text-slate-900">$48,290.00</div>
                  <div className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> +18.4% from last month
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 shadow-sm">
                  <div className="flex items-center justify-between text-emerald-600 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider">Dispatched Orders</span>
                    <Package className="w-5 h-5" />
                  </div>
                  <div className="text-2xl font-black text-slate-900">342 Orders</div>
                  <div className="text-[11px] text-emerald-600 font-semibold mt-1">
                    99.4% on-time fulfillment
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-white border border-amber-100 shadow-sm">
                  <div className="flex items-center justify-between text-amber-600 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider">Catalog Listings</span>
                    <Layers className="w-5 h-5" />
                  </div>
                  <div className="text-2xl font-black text-slate-900">{products.length} Products</div>
                  <div className="text-[11px] text-slate-500 font-semibold mt-1">
                    Across 6 Categories
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-gradient-to-br from-rose-50 to-white border border-rose-100 shadow-sm">
                  <div className="flex items-center justify-between text-rose-600 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider">Store Rating</span>
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div className="text-2xl font-black text-slate-900">4.9 / 5.0</div>
                  <div className="text-[11px] text-slate-500 font-semibold mt-1">
                    Verified Buyer Reviews
                  </div>
                </div>
              </div>

              {/* Quick Action Banner */}
              <div className="p-6 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold">Want to list your brand products?</h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Publish items immediately to the ZenithMart catalog with instant search indexing.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab("add-product")}
                  className="bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs px-5 py-3 rounded-xl flex items-center gap-2 shadow-lg shadow-brand-900/40 shrink-0"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Add Product Now</span>
                </button>
              </div>

              {/* Recent listings */}
              <div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4">
                  Active Store Inventory (Latest Listings)
                </h3>
                <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden bg-white">
                  {products.slice(0, 5).map((prod) => (
                    <div key={prod.id} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50">
                      <div className="flex items-center gap-3">
                        <img src={prod.image} alt="" className="w-12 h-12 rounded-xl object-cover bg-slate-100" />
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{prod.title}</h4>
                          <span className="text-[11px] text-slate-500">{prod.category} • Stock: {prod.stock}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-black text-slate-900 block">{formatPrice(prod.price)}</span>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          Live Active
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "add-product" && (
            <form onSubmit={handleProductSubmit} className="max-w-2xl mx-auto space-y-5">
              <h3 className="text-base font-extrabold text-slate-900">
                Create & Publish Marketplace Product
              </h3>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Product Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sony Premium Ergonomic Studio Headphones"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-600 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Marketplace Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-brand-600 focus:bg-white"
                  >
                    {CATEGORIES.filter(c => c.id !== "all").map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Fulfilling Vendor *
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
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-brand-600 focus:bg-white"
                  >
                    {vendors.map((v) => (
                      <option key={v.id} value={v.id}>{v.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Selling Price ($) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="99.00"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Original MSRP ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="120.00"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    placeholder="25"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-600 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Product Image URL
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-brand-600 focus:bg-white mb-2"
                />

                {/* Preset image suggestions */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase shrink-0">Sample Images:</span>
                  {PRESET_IMAGES.map((preset, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setFormData({ ...formData, image: preset.url })}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium shrink-0 border border-slate-200"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Description
                </label>
                <textarea
                  rows="3"
                  placeholder="Describe key features, warranty, and technical specifications..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-600 focus:bg-white"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all"
                >
                  Publish Product to ZenithMart Catalog
                </button>
              </div>
            </form>
          )}

          {activeTab === "orders" && (
            <div>
              <h3 className="text-base font-extrabold text-slate-900 mb-4">
                Customer Orders & Fulfillment Queue
              </h3>
              {orders.length === 0 ? (
                <div className="p-12 text-center bg-slate-50 rounded-2xl border border-slate-200">
                  <Package className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm font-bold text-slate-700">No customer orders placed yet</p>
                  <p className="text-xs text-slate-500 mt-1">Place an order from the cart to test the full multi-vendor fulfillment lifecycle!</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden bg-white">
                  {orders.map((order) => (
                    <div key={order.id} className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-xs font-black text-brand-600">{order.id}</span>
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                            {order.status}
                          </span>
                        </div>
                        <div className="text-xs text-slate-700 font-semibold">
                          Customer: {order.customer.fullName} ({order.customer.email})
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {order.items.length} items • Payment: {order.paymentMethod} • Delivery est: {order.estimatedDelivery}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-base font-black text-slate-900 block">{formatPrice(order.total)}</span>
                        <span className="text-[11px] text-slate-400">{new Date(order.date).toLocaleDateString()}</span>
                      </div>
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

