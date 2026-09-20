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
    clearCart,
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
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-brand-600 text-white flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-black text-slate-900">Your Shopping Cart</h2>
                <span className="text-[11px] text-slate-500 font-medium">
                  {cart.length} unique item{cart.length !== 1 ? "s" : ""} across {vendorGroups.length} vendor{vendorGroups.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          {cart.length > 0 && (
            <div className="bg-brand-50 border-b border-brand-100 p-3.5 px-6">
              <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                <span className="flex items-center gap-1.5 text-brand-900">
                  <Truck className="w-4 h-4 text-brand-600" />
                  {freeShippingNeeded === 0 ? "You unlocked Free Express Shipping!" : `Add ${formatPrice(freeShippingNeeded)} more for Free Shipping`}
                </span>
                <span className="text-brand-700">{Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100))}%</span>
              </div>
              <div className="w-full h-1.5 bg-brand-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-600 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (cartSubtotal / freeShippingThreshold) * 100)}%` }}
                />
              </div>
            </div>
          )}

          {/* Scrollable Cart Items grouped by Vendor */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="text-center py-16">
                <ShoppingBag className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-base font-bold text-slate-800">Your cart is empty</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto mb-6">
                  Explore verified vendor collections and flash sale discounts to add items to your bag.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              vendorGroups.map(([vId, group], groupIdx) => (
                <div
                  key={vId}
                  className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 space-y-3"
                >
                  {/* Vendor Package Header */}
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <div className="flex items-center gap-2">
                      <Store className="w-3.5 h-3.5 text-brand-600" />
                      <span className="text-xs font-bold text-slate-900 truncate max-w-[200px]">
                        Package {groupIdx + 1}: {group.vendor.name}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Direct Dispatch
                    </span>
                  </div>

                  {/* Vendor Items */}
                  <div className="space-y-3">
                    {group.items.map((item) => (
                      <div
                        key={item.key}
                        className="flex gap-3 bg-white p-3 rounded-xl border border-slate-100 shadow-sm"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.title}
                          className="w-16 h-16 rounded-lg object-cover bg-slate-100 shrink-0"
                        />
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start">
                              <h4 className="text-xs font-bold text-slate-900 line-clamp-1 pr-2">
                                {item.product.title}
                              </h4>
                              <button
                                onClick={() => removeFromCart(item.key)}
                                className="text-slate-400 hover:text-rose-500 transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            {(item.selectedColor || item.selectedSize) && (
                              <div className="text-[10px] text-slate-500 font-medium">
                                {item.selectedColor && `Color: ${item.selectedColor} `}
                                {item.selectedSize && `• Size: ${item.selectedSize}`}
                              </div>
                            )}
                          </div>

                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs font-black text-slate-900">
                              {formatPrice(item.product.price * item.quantity)}
                            </span>

                            {/* Quantity buttons */}
                            <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                              <button
                                onClick={() => updateQuantity(item.key, item.quantity - 1)}
                                className="p-1 hover:bg-slate-200 text-slate-600"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-2 text-xs font-bold text-slate-900">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.key, item.quantity + 1)}
                                className="p-1 hover:bg-slate-200 text-slate-600"
                              >
                                <Plus className="w-3 h-3" />
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

          {/* Footer & Order Summary */}
          {cart.length > 0 && (
            <div className="p-6 bg-slate-50 border-t border-slate-200 space-y-4">
              {/* Coupon input */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold">
                    <Tag className="w-4 h-4 text-emerald-600" />
                    <span>Coupon "{appliedCoupon.code}" Applied</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs font-bold text-rose-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon code (e.g. ZENITH20)"
                    value={couponCodeInput}
                    onChange={(e) => setCouponCodeInput(e.target.value)}
                    className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs uppercase font-semibold focus:outline-none focus:border-brand-600"
                  />
                  <button
                    type="submit"
                    className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}

              {/* Price breakdown */}
              <div className="space-y-1.5 text-xs">
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
                  <span>Estimated Shipping</span>
                  <span className="font-semibold text-slate-900">
                    {shippingFee === 0 ? "FREE" : formatPrice(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total Due</span>
                  <span className="text-base text-brand-600">{formatPrice(cartFinalTotal)}</span>
                </div>
              </div>

              {/* Proceed to Checkout CTA */}
              <button
                onClick={handleProceedCheckout}
                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-brand-500/30 flex items-center justify-center gap-2 text-xs transition-all active:scale-95"
              >
                <span>Proceed to Multi-Vendor Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>256-bit Encrypted Multi-Vendor Escrow Checkout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

