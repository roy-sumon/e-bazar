"use client";

import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";
import {
  X,
  CheckCircle2,
  ShieldCheck,
  CreditCard,
  Smartphone,
  Banknote,
  Store,
  ArrowRight
} from "lucide-react";

export default function CheckoutModal() {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartByVendor,
    cartSubtotal,
    discountAmount,
    shippingFee,
    cartFinalTotal,
    placeOrder,
    formatPrice
  } = useStore();

  const [step, setStep] = useState(1);
  const [completedOrder, setCompletedOrder] = useState(null);

  const [shippingInfo, setShippingInfo] = useState({
    fullName: "Roy Sullivan",
    email: "customer@ebazar.com",
    phone: "+1 (555) 234-5678",
    address: "742 Evergreen Terrace",
    city: "San Francisco",
    postalCode: "94107",
    paymentMethod: "credit-card"
  });

  if (!isCheckoutOpen) return null;

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      const order = placeOrder(shippingInfo);
      setCompletedOrder(order);
      setStep(3);
    }
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setStep(1);
    setCompletedOrder(null);
  };

  const vendorEntries = Object.entries(cartByVendor);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 relative flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-950 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black">E-Bazar Secure Checkout</h3>
              <p className="text-[10px] sm:text-[11px] text-slate-400">Escrow-protected multi-vendor order</p>
            </div>
          </div>

          <button onClick={handleClose} className="p-1.5 rounded-lg bg-white/10 text-slate-300">
            <X className="w-4 h-4" />
          </button>
        </div>

        {step < 3 && (
          <div className="grid grid-cols-2 text-center text-xs font-bold border-b border-slate-200 bg-slate-50">
            <div className={`py-2.5 ${step === 1 ? "text-emerald-600 border-b-2 border-emerald-600 bg-white" : "text-slate-400"}`}>
              1. Shipping Address
            </div>
            <div className={`py-2.5 ${step === 2 ? "text-emerald-600 border-b-2 border-emerald-600 bg-white" : "text-slate-400"}`}>
              2. Payment & Place Order
            </div>
          </div>
        )}

        <div className="p-4 sm:p-6 flex-1">
          {step === 1 && (
            <form onSubmit={handleNextStep} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.fullName}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={shippingInfo.email}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Phone *</label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.phone}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Address *</label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.address}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.city}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Postal Code *</label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.postalCode}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, postalCode: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 sm:py-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleNextStep} className="space-y-3.5">
              <div className="space-y-2">
                <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer ${
                  shippingInfo.paymentMethod === "credit-card" ? "border-emerald-600 bg-emerald-50/50" : "border-slate-200"
                }`}>
                  <div className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name="payment"
                      checked={shippingInfo.paymentMethod === "credit-card"}
                      onChange={() => setShippingInfo({ ...shippingInfo, paymentMethod: "credit-card" })}
                      className="accent-emerald-600"
                    />
                    <CreditCard className="w-4 h-4 text-emerald-600" />
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">Credit / Debit Card</span>
                      <span className="text-[10px] text-slate-400">Visa, Mastercard, AMEX</span>
                    </div>
                  </div>
                  <span className="text-[9px] font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">Instant</span>
                </label>

                <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer ${
                  shippingInfo.paymentMethod === "bkash-nagad" ? "border-emerald-600 bg-emerald-50/50" : "border-slate-200"
                }`}>
                  <div className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name="payment"
                      checked={shippingInfo.paymentMethod === "bkash-nagad"}
                      onChange={() => setShippingInfo({ ...shippingInfo, paymentMethod: "bkash-nagad" })}
                      className="accent-emerald-600"
                    />
                    <Smartphone className="w-4 h-4 text-pink-600" />
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">bKash / Nagad / Mobile Wallet</span>
                      <span className="text-[10px] text-slate-400">Instant verification</span>
                    </div>
                  </div>
                  <span className="text-[9px] font-bold text-pink-700 bg-pink-50 px-1.5 py-0.5 rounded">0% Fee</span>
                </label>

                <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer ${
                  shippingInfo.paymentMethod === "cod" ? "border-emerald-600 bg-emerald-50/50" : "border-slate-200"
                }`}>
                  <div className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name="payment"
                      checked={shippingInfo.paymentMethod === "cod"}
                      onChange={() => setShippingInfo({ ...shippingInfo, paymentMethod: "cod" })}
                      className="accent-emerald-600"
                    />
                    <Banknote className="w-4 h-4 text-emerald-600" />
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">Cash on Delivery (COD)</span>
                      <span className="text-[10px] text-slate-400">Pay when your packages arrive</span>
                    </div>
                  </div>
                  <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">Shield</span>
                </label>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border text-xs space-y-1">
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
                <div className="flex justify-between text-sm font-black text-slate-900 pt-1 border-t">
                  <span>Total Due</span>
                  <span className="text-emerald-600">{formatPrice(cartFinalTotal)}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 rounded-xl border text-xs font-bold text-slate-700"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Confirm Order ({formatPrice(cartFinalTotal)})</span>
                </button>
              </div>
            </form>
          )}

          {step === 3 && completedOrder && (
            <div className="text-center py-4 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900">
                  Thank you for shopping at E-Bazar!
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Your multi-vendor order has been placed successfully.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border text-left text-xs space-y-1.5">
                <div className="flex justify-between border-b pb-1.5">
                  <span className="text-slate-500">Tracking ID:</span>
                  <span className="font-mono font-black text-emerald-600">{completedOrder.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Estimated Delivery:</span>
                  <span className="font-bold text-slate-800">{completedOrder.estimatedDelivery}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Payment:</span>
                  <span className="font-bold text-slate-800 uppercase">{completedOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between border-t pt-1.5 text-sm font-black text-slate-900">
                  <span>Grand Total:</span>
                  <span className="text-emerald-600">{formatPrice(completedOrder.total)}</span>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs"
              >
                Continue Shopping on E-Bazar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
