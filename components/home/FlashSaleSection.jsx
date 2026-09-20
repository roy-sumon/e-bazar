"use client";

import React, { useState, useEffect } from "react";
import { useStore } from "@/context/StoreContext";
import { Flame, Clock, ShoppingCart, Eye, Heart, Check, Sparkles } from "lucide-react";

export default function FlashSaleSection() {
  const { products, vendors, addToCart, toggleWishlist, isInWishlist, setQuickViewProduct, setActiveVendorId, formatPrice } = useStore();

  // Live countdown timer state (initially 7 hrs 42 mins 18 secs)
  const [timeLeft, setTimeLeft] = useState({
    hours: 7,
    minutes: 42,
    seconds: 18
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 8, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const flashProducts = products.filter((p) => p.isFlashSale).slice(0, 4);

  return (
    <section id="flash-deals" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-gradient-to-r from-rose-500 via-rose-600 to-amber-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        {/* Header with Live Countdown */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-white/20">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-inner">
              <Flame className="w-7 h-7 fill-white animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                  Flash Deals of the Day
                </h2>
                <span className="bg-white text-rose-600 text-xs font-black px-2.5 py-0.5 rounded-full uppercase">
                  Limited Time
                </span>
              </div>
              <p className="text-rose-100 text-xs sm:text-sm mt-0.5">
                Massive discounts directly sponsored by verified flagship brand partners.
              </p>
            </div>
          </div>

          {/* Live Timer Boxes */}
          <div className="flex items-center gap-2 bg-black/30 backdrop-blur-md p-2.5 rounded-2xl border border-white/10 self-stretch sm:self-auto justify-center">
            <Clock className="w-4 h-4 text-amber-300 mr-1" />
            <span className="text-xs font-medium text-rose-200 mr-2 uppercase tracking-wider hidden sm:inline">
              Ends In:
            </span>
            <div className="flex items-center gap-1.5 font-mono font-black text-sm sm:text-base">
              <div className="bg-white/20 px-2.5 py-1 rounded-lg">
                {String(timeLeft.hours).padStart(2, "0")}
                <span className="block text-[9px] font-sans font-normal text-rose-200 text-center">HRS</span>
              </div>
              <span className="text-amber-300 font-bold">:</span>
              <div className="bg-white/20 px-2.5 py-1 rounded-lg">
                {String(timeLeft.minutes).padStart(2, "0")}
                <span className="block text-[9px] font-sans font-normal text-rose-200 text-center">MIN</span>
              </div>
              <span className="text-amber-300 font-bold">:</span>
              <div className="bg-white/20 px-2.5 py-1 rounded-lg text-amber-300">
                {String(timeLeft.seconds).padStart(2, "0")}
                <span className="block text-[9px] font-sans font-normal text-rose-200 text-center">SEC</span>
              </div>
            </div>
          </div>
        </div>

        {/* Flash Sale Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-6">
          {flashProducts.map((product) => {
            const vendor = vendors.find((v) => v.id === product.vendorId);
            const isFav = isInWishlist(product.id);
            const claimed = product.claimedPercent || 75;

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl p-4 text-slate-900 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative"
              >
                {/* Discount Ribbon */}
                <div className="absolute top-3 left-3 z-10 bg-rose-600 text-white text-xs font-black px-2.5 py-1 rounded-lg shadow-sm">
                  -{product.discountPercentage}% OFF
                </div>

                {/* Wishlist Quick Button */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 hover:bg-white text-slate-600 hover:text-rose-500 shadow-sm transition-all"
                  title="Add to Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isFav ? "fill-rose-500 text-rose-500" : ""}`} />
                </button>

                {/* Product Image */}
                <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 mb-3 cursor-pointer"
                  onClick={() => setQuickViewProduct(product)}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Quick View overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white/95 text-slate-900 text-xs font-bold px-3 py-1.5 rounded-lg shadow-md flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" /> Quick View
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    {/* Vendor Name Pill */}
                    {vendor && (
                      <button
                        onClick={() => setActiveVendorId(vendor.id)}
                        className="text-[11px] font-semibold text-brand-600 hover:text-brand-800 hover:underline line-clamp-1 mb-1 text-left"
                      >
                        {vendor.name}
                      </button>
                    )}

                    <h3
                      onClick={() => setQuickViewProduct(product)}
                      className="text-sm font-bold text-slate-900 hover:text-brand-600 cursor-pointer line-clamp-2 mb-2 leading-snug"
                    >
                      {product.title}
                    </h3>
                  </div>

                  <div>
                    {/* Price */}
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-lg font-black text-rose-600">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-slate-400 line-through font-medium">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>

                    {/* Stock Claimed Progress Bar */}
                    <div className="mb-3.5">
                      <div className="flex justify-between text-[11px] font-semibold text-slate-500 mb-1">
                        <span>Sold: {claimed}%</span>
                        <span className="text-amber-600">Few left!</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-rose-500 rounded-full transition-all duration-1000"
                          style={{ width: `${claimed}%` }}
                        />
                      </div>
                    </div>

                    {/* Add to Cart CTA */}
                    <button
                      onClick={() => addToCart(product, 1)}
                      className="w-full bg-slate-900 hover:bg-brand-600 text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

