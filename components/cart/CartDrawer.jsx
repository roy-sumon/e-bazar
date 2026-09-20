"use client";

import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";
import {
  X,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Store,
  Tag,
  ShieldCheck,
  ShoppingBag,
  Truck
} from "lucide-react";

export default function CartDrawer() {
  const {
    cart,
    cartByVendor,
    cartSubtotal,
    discountAmount,
    shippingFee,
    cartFinalTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    updateQuantity,
    removeFromCart,
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
    formatPrice
  } = useStore();

  const [couponCodeInput, setCouponCodeInput] = useState("");

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (applyCoupon(couponCodeInput)) {
      setCouponCodeInput("");
    }
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const vendorGroups = Object.entries(cartByVendor);
  const freeShippingThreshold = 150;
  const freeShippingNeeded = Math.max(0, freeShippingThreshold - cartSubtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-black text-slate-900">E-Bazar Cart</h2>
                <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium">
                  {cart.length} item{cart.length !== 1 ? "s" : ""} across {vendorGroups.length} store{vendorGroups.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {cart.length > 0 && (
            <div className="bg-emerald-50 border-b border-emerald-100 p-2.5 px-4 sm:px-6">
              <div className="flex items-center justify-between text-[11px] font-bold mb-1">
                <span className="flex items-center gap-1 text-emerald-900">
                  <Truck className="w-3.5 h-3.5 text-emerald-600" />
                  {freeShippingNeeded === 0 ? "Unlocked Free Express Shipping!" : `Add ${formatPrice(freeShippingNeeded)} for Free Shipping`}
                </span>
                <span className="text-emerald-700">{Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100))}%</span>
              </div>
              <div className="w-full h-1 bg-emerald-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (cartSubtotal / freeShippingThreshold) * 100)}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-sm font-bold text-slate-800">Your cart is empty</h3>
                <p className="text-xs text-slate-500 mt-1 mb-4">Explore verified vendor collections on E-Bazar.</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2 rounded-xl"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              vendorGroups.map(([vId, group], groupIdx) => (
                <div key={vId} className="rounded-xl border border-slate-200 bg-slate-50/50 p-3 space-y-2.5">
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-200 text-xs">
                    <div className="flex items-center gap-1.5">
                      <Store className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="font-bold text-slate-900 truncate max-w-[180px]">
                        Pkg {groupIdx + 1}: {group.vendor.name}
                      </span>
                    </div>
                    <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                      Direct
                    </span>
                  </div>

                  <div className="space-y-2">
                    {group.items.map((item) => (
                      <div key={item.key} className="flex gap-2.5 bg-white p-2.5 rounded-xl border border-slate-100 shadow-sm">
                        <img
                          src={item.product.image}
                          alt={item.product.title}
                          className="w-14 h-14 rounded-lg object-cover bg-slate-100 shrink-0"
                        />
                        <div className="flex-1 flex flex-col justify-between min-w-0">
                          <div>
                            <div className="flex justify-between items-start gap-1">
                              <h4 className="text-xs font-bold text-slate-900 truncate pr-1">
                                {item.product.title}
                              </h4>
                              <button onClick={() => removeFromCart(item.key)} className="text-slate-400 hover:text-rose-500 shrink-0">
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            {(item.selectedColor || item.selectedSize) && (
                              <div className="text-[10px] text-slate-400">
                                {item.selectedColor && `${item.selectedColor} `}
                                {item.selectedSize && `• ${item.selectedSize}`}
                              </div>
                            )}
                          </div>

                          <div className="flex items-center justify-between mt-1.5">
                            <span className="text-xs font-black text-slate-900">
                              {formatPrice(item.product.price * item.quantity)}
                            </span>

                            <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                              <button onClick={() => updateQuantity(item.key, item.quantity - 1)} className="p-0.5 px-1.5 text-slate-600">
                                <Minus className="w-2.5 h-2.5" />
                              </button>
                              <span className="px-1.5 text-xs font-bold text-slate-900">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.key, item.quantity + 1)} className="p-0.5 px-1.5 text-slate-600">
                                <Plus className="w-2.5 h-2.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 space-y-3">
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2 bg-emerald-50 border border-emerald-200 rounded-lg text-xs">
                  <span className="text-emerald-800 font-bold flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" /> Coupon &quot;{appliedCoupon.code}&quot;
                  </span>
                  <button onClick={removeCoupon} className="text-rose-600 font-bold text-[11px]">Remove</button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-1.5">
                  <input
                    type="text"
                    placeholder="Coupon (e.g. EBAZAR20)"
                    value={couponCodeInput}
                    onChange={(e) => setCouponCodeInput(e.target.value)}
                    className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs uppercase font-semibold focus:outline-none"
                  />
                  <button type="submit" className="bg-slate-900 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl">
                    Apply
                  </button>
                </form>
              )}

              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">{formatPrice(cartSubtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span className="font-semibold text-slate-900">
                    {shippingFee === 0 ? "FREE" : formatPrice(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black text-slate-900 pt-1.5 border-t border-slate-200">
                  <span>Total</span>
                  <span className="text-emerald-600">{formatPrice(cartFinalTotal)}</span>
                </div>
              </div>

              <button
                onClick={handleProceedCheckout}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 sm:py-3 rounded-xl shadow-md flex items-center justify-center gap-1.5 text-xs transition-all"
              >
                <span>Proceed to E-Bazar Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
