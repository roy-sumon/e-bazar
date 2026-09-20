"use client";

import React from "react";
import { useStore } from "@/context/StoreContext";
import { X, Heart, Trash2, ShoppingCart, ArrowRight } from "lucide-react";

export default function WishlistDrawer() {
  const {
    wishlist,
    toggleWishlist,
    addToCart,
    isWishlistOpen,
    setIsWishlistOpen,
    formatPrice
  } = useStore();

  if (!isWishlistOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-rose-500 text-white flex items-center justify-center">
                <Heart className="w-5 h-5 fill-white" />
              </div>
              <div>
                <h2 className="text-base font-black text-slate-900">Saved Wishlist</h2>
                <span className="text-[11px] text-slate-500 font-medium">
                  {wishlist.length} item{wishlist.length !== 1 ? "s" : ""} saved
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlist.length === 0 ? (
              <div className="text-center py-16">
                <Heart className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-base font-bold text-slate-800">Your wishlist is empty</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto mb-6">
                  Save items you love by clicking the heart icon on any product card.
                </p>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl transition-colors"
                >
                  Explore Products
                </button>
              </div>
            ) : (
              wishlist.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3.5 rounded-2xl border border-slate-200 bg-white hover:shadow-md transition-shadow"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 rounded-xl object-cover bg-slate-100 shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs font-bold text-slate-900 line-clamp-1 pr-2">
                          {item.title}
                        </h4>
                        <button
                          onClick={() => toggleWishlist(item)}
                          className="text-slate-400 hover:text-rose-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="text-[10px] text-slate-400 capitalize">{item.category}</span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs font-black text-slate-900">
                        {formatPrice(item.price)}
                      </span>
                      <button
                        onClick={() => {
                          addToCart(item, 1);
                          toggleWishlist(item);
                        }}
                        className="bg-brand-600 hover:bg-brand-700 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors shadow-sm"
                      >
                        <ShoppingCart className="w-3 h-3" />
                        <span>Move to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {wishlist.length > 0 && (
            <div className="p-6 bg-slate-50 border-t border-slate-200">
              <button
                onClick={() => {
                  wishlist.forEach((item) => addToCart(item, 1));
                  setIsWishlistOpen(false);
                }}
                className="w-full bg-slate-900 hover:bg-brand-600 text-white font-bold py-3.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>Move All to Cart ({wishlist.length})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

