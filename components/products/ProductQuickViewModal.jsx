"use client";

import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";
import {
  X,
  Star,
  ShieldCheck,
  Truck,
  Heart,
  ShoppingCart,
  Zap,
  CheckCircle2,
  Store,
  ChevronRight
} from "lucide-react";

export default function ProductQuickViewModal() {
  const {
    quickViewProduct,
    setQuickViewProduct,
    vendors,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setActiveVendorId,
    setIsCheckoutOpen,
    formatPrice
  } = useStore();

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const vendor = vendors.find((v) => v.id === product.vendorId);
  const isFav = isInWishlist(product.id);
  const activeImage = selectedImage || product.image;

  const handleAddToCart = () => {
    addToCart(product, quantity, {
      color: selectedColor || (product.variants?.colors ? product.variants.colors[0] : null),
      size: selectedSize || (product.variants?.sizes ? product.variants.sizes[0] : null)
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setQuickViewProduct(null);
    setIsCheckoutOpen(true);
  };

  const handleVisitVendor = () => {
    if (vendor) {
      setQuickViewProduct(null);
      setActiveVendorId(vendor.id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Gallery */}
        <div className="md:w-1/2 p-6 bg-slate-50 flex flex-col justify-between border-r border-slate-100">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-sm mb-4">
            <img
              src={activeImage}
              alt={product.title}
              className="w-full h-full object-cover transition-all duration-300"
            />
            {product.discountPercentage > 0 && (
              <span className="absolute top-3 left-3 bg-rose-600 text-white text-xs font-black px-2.5 py-1 rounded-lg">
                -{product.discountPercentage}% OFF
              </span>
            )}
          </div>

          {/* Thumbnail Gallery */}
          {product.gallery && product.gallery.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {product.gallery.map((imgUrl, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(imgUrl)}
                  className={`w-16 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                    activeImage === imgUrl ? "border-brand-600 scale-95" : "border-slate-200 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Info & Purchase Controls */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            {/* Vendor Callout Card */}
            {vendor && (
              <div
                onClick={handleVisitVendor}
                className="mb-3 p-2.5 rounded-xl bg-slate-50 hover:bg-indigo-50/60 border border-slate-200/80 cursor-pointer transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5">
                  <img
                    src={vendor.avatar}
                    alt={vendor.name}
                    className="w-7 h-7 rounded-lg object-cover"
                  />
                  <div>
                    <div className="flex items-center gap-1 text-xs font-bold text-slate-900 group-hover:text-brand-600">
                      <span>{vendor.name}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 fill-brand-600 text-white" />
                    </div>
                    <span className="text-[10px] text-slate-500">{vendor.badge} • ⭐ {vendor.rating}</span>
                  </div>
                </div>
                <div className="flex items-center text-[11px] font-bold text-brand-600">
                  <span>Visit Shop</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            )}

            {/* Product Title */}
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug mb-2">
              {product.title}
            </h2>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-3 mb-4 text-xs">
              <div className="flex items-center gap-1 text-amber-500 font-bold bg-amber-50 px-2 py-0.5 rounded-md">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{product.rating}</span>
              </div>
              <span className="text-slate-500 font-medium">
                ({product.reviewsCount} verified customer reviews)
              </span>
              <span className="text-slate-300">|</span>
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> In Stock ({product.stock})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-2xl sm:text-3xl font-black text-slate-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-slate-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Color Variants (if any) */}
            {product.variants?.colors && (
              <div className="mb-4">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">
                  Select Color / Finish:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.colors.map((color, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                        (selectedColor || product.variants.colors[0]) === color
                          ? "border-slate-950 bg-slate-950 text-white font-bold"
                          : "border-slate-200 text-slate-700 hover:border-slate-400"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Variants (if any) */}
            {product.variants?.sizes && (
              <div className="mb-4">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">
                  Select Size:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.sizes.map((size, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                        (selectedSize || product.variants.sizes[0]) === size
                          ? "border-slate-950 bg-slate-950 text-white font-bold"
                          : "border-slate-200 text-slate-700 hover:border-slate-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Specifications Summary */}
            {product.specifications && (
              <div className="mb-6 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                <span className="font-bold text-slate-700 block mb-1.5">Key Highlights:</span>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-slate-600">
                  {Object.entries(product.specifications).slice(0, 4).map(([k, v]) => (
                    <div key={k} className="flex justify-between">
                      <span className="text-slate-400">{k}:</span>
                      <span className="font-medium text-slate-800 truncate ml-1">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <div className="flex items-center gap-3">
              {/* Quantity Changer */}
              <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-slate-600 hover:bg-slate-100 font-bold"
                >
                  -
                </button>
                <span className="px-3 py-2 text-xs font-bold text-slate-900 min-w-[32px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  className="px-3 py-2 text-slate-600 hover:bg-slate-100 font-bold"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              {/* Wishlist Toggle */}
              <button
                onClick={() => toggleWishlist(product)}
                className="p-3 rounded-xl border border-slate-200 text-slate-600 hover:text-rose-600 transition-colors"
                title="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isFav ? "fill-rose-500 text-rose-500" : ""}`} />
              </button>
            </div>

            {/* Buy Now Button */}
            <button
              onClick={handleBuyNow}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Instant Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

