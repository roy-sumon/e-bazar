"use client";

import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";
import {
  X,
  Star,
  Heart,
  ShoppingCart,
  Zap,
  CheckCircle2,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 relative flex flex-col md:flex-row">
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Gallery */}
        <div className="md:w-1/2 p-4 sm:p-6 bg-slate-50 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-100">
          <div className="relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-white shadow-sm mb-3">
            <img
              src={activeImage}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            {product.discountPercentage > 0 && (
              <span className="absolute top-2.5 left-2.5 bg-rose-600 text-white text-[10px] sm:text-xs font-black px-2 py-0.5 rounded-md">
                -{product.discountPercentage}% OFF
              </span>
            )}
          </div>

          {product.gallery && product.gallery.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              {product.gallery.map((imgUrl, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(imgUrl)}
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                    activeImage === imgUrl ? "border-emerald-600 scale-95" : "border-slate-200 opacity-70"
                  }`}
                >
                  <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="md:w-1/2 p-4 sm:p-6 sm:p-8 flex flex-col justify-between">
          <div>
            {vendor && (
              <div
                onClick={handleVisitVendor}
                className="mb-2.5 p-2 rounded-xl bg-slate-50 hover:bg-emerald-50/60 border border-slate-200/80 cursor-pointer transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center gap-2">
                  <img
                    src={vendor.avatar}
                    alt={vendor.name}
                    className="w-6 h-6 rounded-lg object-cover"
                  />
                  <div>
                    <div className="flex items-center gap-1 text-[11px] sm:text-xs font-bold text-slate-900 group-hover:text-emerald-600">
                      <span>{vendor.name}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 fill-emerald-600 text-white" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center text-[10px] sm:text-[11px] font-bold text-emerald-600">
                  <span>Visit Shop</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            )}

            <h2 className="text-base sm:text-2xl font-black text-slate-900 leading-snug mb-1.5">
              {product.title}
            </h2>

            <div className="flex items-center gap-2 mb-3 text-[11px] sm:text-xs">
              <div className="flex items-center gap-1 text-amber-500 font-bold bg-amber-50 px-2 py-0.5 rounded-md">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{product.rating}</span>
              </div>
              <span className="text-slate-400 font-medium">({product.reviewsCount} reviews)</span>
              <span className="text-emerald-700 font-bold ml-auto text-[10px] sm:text-xs">
                In Stock ({product.stock})
              </span>
            </div>

            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-xl sm:text-3xl font-black text-slate-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs sm:text-sm text-slate-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 line-clamp-3 sm:line-clamp-none">
              {product.description}
            </p>

            {product.variants?.colors && (
              <div className="mb-3">
                <span className="text-[10px] sm:text-xs font-bold text-slate-700 uppercase block mb-1.5">
                  Color / Finish:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {product.variants.colors.map((color, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColor(color)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
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
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-2.5 py-1.5 sm:px-3 sm:py-2 text-slate-600 hover:bg-slate-100 font-bold text-xs"
                >
                  -
                </button>
                <span className="px-2 py-1.5 text-xs font-bold text-slate-900 min-w-[28px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  className="px-2.5 py-1.5 sm:px-3 sm:py-2 text-slate-600 hover:bg-slate-100 font-bold text-xs"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 sm:py-3 rounded-xl flex items-center justify-center gap-1.5 shadow-sm"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                className="p-2.5 sm:p-3 rounded-xl border border-slate-200 text-slate-600 hover:text-rose-600"
              >
                <Heart className={`w-4 h-4 ${isFav ? "fill-rose-500 text-rose-500" : ""}`} />
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2.5 sm:py-3 rounded-xl flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Instant Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
