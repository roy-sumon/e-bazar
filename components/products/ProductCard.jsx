"use client";

import React from "react";
import { useStore } from "@/context/StoreContext";
import { Star, Heart, Eye, ShoppingCart, CheckCircle2, Shield } from "lucide-react";

export default function ProductCard({ product, viewMode = "grid" }) {
  const {
    vendors,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setQuickViewProduct,
    setActiveVendorId,
    formatPrice
  } = useStore();

  const vendor = vendors.find((v) => v.id === product.vendorId);
  const isFav = isInWishlist(product.id);

  if (viewMode === "list") {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row gap-5 group">
        {/* Thumbnail */}
        <div
          className="relative w-full sm:w-48 h-48 rounded-xl overflow-hidden bg-slate-100 shrink-0 cursor-pointer"
          onClick={() => setQuickViewProduct(product)}
        >
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {product.discountPercentage > 0 && (
            <span className="absolute top-2.5 left-2.5 bg-rose-600 text-white text-[11px] font-black px-2 py-0.5 rounded-md shadow-sm">
              -{product.discountPercentage}%
            </span>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            {/* Vendor badge */}
            {vendor && (
              <div className="flex items-center gap-1.5 mb-1.5">
                <button
                  onClick={() => setActiveVendorId(vendor.id)}
                  className="text-xs font-semibold text-brand-600 hover:text-brand-800 hover:underline flex items-center gap-1"
                >
                  <Shield className="w-3.5 h-3.5 text-brand-500" />
                  <span>{vendor.name}</span>
                </button>
                <span className="text-[10px] bg-slate-100 text-slate-600 font-medium px-1.5 py-0.5 rounded">
                  {vendor.badge}
                </span>
              </div>
            )}

            <h3
              onClick={() => setQuickViewProduct(product)}
              className="text-base font-bold text-slate-900 hover:text-brand-600 cursor-pointer line-clamp-1 mb-1.5"
            >
              {product.title}
            </h3>

            <p className="text-xs text-slate-500 line-clamp-2 mb-3">
              {product.description}
            </p>

            {/* Ratings & Tags */}
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <div className="flex items-center gap-1 text-xs text-amber-500 font-bold bg-amber-50 px-2 py-0.5 rounded-md">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{product.rating}</span>
                <span className="text-slate-400 font-normal">({product.reviewsCount})</span>
              </div>
              {product.tags?.slice(0, 2).map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Pricing & Actions */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-black text-slate-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-slate-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleWishlist(product)}
                className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-rose-600 hover:border-rose-200 transition-colors"
                title="Wishlist"
              >
                <Heart className={`w-4 h-4 ${isFav ? "fill-rose-500 text-rose-500" : ""}`} />
              </button>
              <button
                onClick={() => setQuickViewProduct(product)}
                className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-brand-600 hover:border-brand-200 transition-colors"
                title="Quick View"
              >
                <Eye className="w-4 h-4" />
              </button>
              <button
                onClick={() => addToCart(product, 1)}
                className="bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid view (Default)
  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-4 hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col justify-between group relative">
      {/* Discount Badge */}
      {product.discountPercentage > 0 && (
        <span className="absolute top-3.5 left-3.5 z-10 bg-rose-600 text-white text-[11px] font-black px-2.5 py-1 rounded-lg shadow-sm">
          -{product.discountPercentage}%
        </span>
      )}

      {/* Wishlist Heart button */}
      <button
        onClick={() => toggleWishlist(product)}
        className="absolute top-3.5 right-3.5 z-10 p-2 rounded-full bg-white/90 hover:bg-white text-slate-600 hover:text-rose-500 shadow-sm transition-all"
        title="Wishlist"
      >
        <Heart className={`w-4 h-4 ${isFav ? "fill-rose-500 text-rose-500" : ""}`} />
      </button>

      {/* Product Image */}
      <div
        className="relative aspect-square rounded-2xl overflow-hidden bg-slate-50 mb-3.5 cursor-pointer"
        onClick={() => setQuickViewProduct(product)}
      >
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Quick View Button on Hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="w-full bg-white/95 backdrop-blur-sm text-slate-900 hover:bg-white font-bold text-xs py-2 rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-brand-600" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Vendor Attribution */}
          {vendor && (
            <div className="flex items-center justify-between mb-1">
              <button
                onClick={() => setActiveVendorId(vendor.id)}
                className="text-[11px] font-semibold text-brand-600 hover:text-brand-800 hover:underline line-clamp-1 flex items-center gap-1 text-left"
              >
                <span>{vendor.name}</span>
                {vendor.verified && (
                  <CheckCircle2 className="w-3 h-3 fill-brand-600 text-white shrink-0" />
                )}
              </button>
            </div>
          )}

          {/* Title */}
          <h3
            onClick={() => setQuickViewProduct(product)}
            className="text-sm font-bold text-slate-900 group-hover:text-brand-600 cursor-pointer line-clamp-2 mb-2 leading-snug"
          >
            {product.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-3 text-xs">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
            </div>
            <span className="font-bold text-slate-800">{product.rating}</span>
            <span className="text-slate-400 text-[11px]">({product.reviewsCount})</span>
            {product.stock <= 15 && (
              <span className="ml-auto text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                Only {product.stock} left
              </span>
            )}
          </div>
        </div>

        <div>
          {/* Price */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-lg font-black text-slate-900">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through font-medium">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => addToCart(product, 1)}
            className="w-full bg-slate-900 hover:bg-brand-600 text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-sm active:scale-95"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}

