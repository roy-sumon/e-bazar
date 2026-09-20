"use client";

import React from "react";
import { useStore } from "@/context/StoreContext";
import { CheckCircle2, Star, ArrowRight, Store, ShieldCheck, Zap } from "lucide-react";

export default function FeaturedVendors() {
  const { vendors, products, setActiveVendorId } = useStore();

  return (
    <section id="featured-vendors" className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider mb-1">
            <Store className="w-4 h-4" />
            <span>Multi-Vendor Network</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Shop Verified Flagship Stores
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Direct access to official brands, authorized distributors, and vetted artisan studios.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-100 px-3.5 py-1.5 rounded-full">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>All 6 Stores Identity-Verified</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {vendors.map((vendor) => {
          // Get sample products for this vendor
          const vendorProducts = products.filter((p) => p.vendorId === vendor.id).slice(0, 3);

          return (
            <div
              key={vendor.id}
              className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-2xl hover:border-emerald-300/80 transition-all duration-300 flex flex-col justify-between group hover-lift"
            >
              {/* Vendor Cover Banner */}
              <div className="relative h-28 w-full bg-slate-800 overflow-hidden">
                <img
                  src={vendor.banner}
                  alt={vendor.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-slate-800 text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{vendor.rating}</span>
                  <span className="text-slate-400 font-normal">({vendor.salesCount})</span>
                </div>
              </div>

              {/* Vendor Info Section */}
              <div className="p-5 pt-0 relative flex-1 flex flex-col justify-between">
                <div>
                  {/* Floating Avatar */}
                  <div className="relative -mt-10 mb-3 flex items-end justify-between">
                    <div className="relative">
                      <img
                        src={vendor.avatar}
                        alt={vendor.name}
                        className="w-16 h-16 rounded-2xl border-4 border-white shadow-md object-cover bg-white group-hover:scale-105 group-hover:shadow-lg transition-all duration-300"
                      />
                      {vendor.verified && (
                        <CheckCircle2 className="w-5 h-5 fill-brand-600 text-white absolute -bottom-1 -right-1" />
                      )}
                    </div>

                    <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-lg">
                      {vendor.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-1">
                    {vendor.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {vendor.description}
                  </p>

                  {/* Vendor Metrics */}
                  <div className="grid grid-cols-3 gap-2 py-3 my-3 border-y border-slate-100 text-center text-xs">
                    <div>
                      <span className="block text-[10px] text-slate-400 font-medium">Location</span>
                      <span className="font-bold text-slate-700 truncate block">{vendor.location.split(",")[0]}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-400 font-medium">On-Time Ship</span>
                      <span className="font-bold text-emerald-600">{vendor.shipOnTime}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-400 font-medium">Response</span>
                      <span className="font-bold text-slate-700">{vendor.responseTime}</span>
                    </div>
                  </div>

                  {/* Products Preview Thumbnails */}
                  {vendorProducts.length > 0 && (
                    <div className="mb-4">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                        Popular Listings:
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {vendorProducts.map((p) => (
                          <div
                            key={p.id}
                            className="aspect-square rounded-xl bg-slate-100 overflow-hidden border border-slate-200/60"
                          >
                            <img
                              src={p.image}
                              alt={p.title}
                              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Visit Store Button */}
                <button
                  onClick={() => setActiveVendorId(vendor.id)}
                  className="w-full mt-2 bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-800 font-bold text-xs py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Visit Storefront</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

