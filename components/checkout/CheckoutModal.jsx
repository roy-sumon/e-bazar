"use client";

import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";
import {
  X,
  CheckCircle2,
  ShieldCheck,
  Truck,
  CreditCard,
  Smartphone,
  Banknote,
  Store,
  ArrowRight,
  PackageCheck
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
    appliedCoupon,
    placeOrder,
    formatPrice
  } = useStore();

  const [step, setStep] = useState(1); // 1: Info, 2: Payment, 3: Success
  const [completedOrder, setCompletedOrder] = useState(null);

  // Form states
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "Roy Sullivan",
    email: "customer@zenithmart.com",
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
      // Place order!
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 relative flex flex-col">
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black">ZenithMart Secure Checkout</h3>
              <p className="text-[11px] text-slate-400">Escrow-backed multi-vendor order settlement</p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Indicator */}
        {step < 3 && (
          <div className="grid grid-cols-2 text-center text-xs font-bold border-b border-slate-200 bg-slate-50">
            <div
              className={`py-3 flex items-center justify-center gap-2 ${
                step === 1 ? "text-brand-600 border-b-2 border-brand-600 bg-white" : "text-slate-400"
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-[10px]">
                1
              </span>
              <span>Shipping & Delivery</span>
            </div>
            <div
              className={`py-3 flex items-center justify-center gap-2 ${
                step === 2 ? "text-brand-600 border-b-2 border-brand-600 bg-white" : "text-slate-400"
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-[10px]">
                2
              </span>
              <span>Payment & Review</span>
            </div>
          </div>
        )}

        {/* Form Body */}
        <div className="p-6 sm:p-8 flex-1">
          {step === 1 && (
            <form onSubmit={handleNextStep} className="space-y-4">
              <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                Shipping Destination
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.fullName}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-600"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={shippingInfo.email}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.phone}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-600"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.address}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.city}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-600"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.postalCode}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, postalCode: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-600"
                  />
                </div>
              </div>

              {/* Vendor Fulfillment Package Preview */}
              <div className="mt-4 pt-4 border-t border-slate-200">
                <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  Fulfillment Packages ({vendorEntries.length} Vendors):
                </h5>
                <div className="space-y-2">
                  {vendorEntries.map(([vId, group], idx) => (
                    <div key={vId} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                      <div className="flex items-center gap-2">
                        <Store className="w-3.5 h-3.5 text-brand-600" />
                        <span className="font-semibold text-slate-800">
                          Package {idx + 1}: {group.vendor.name} ({group.items.length} items)
                        </span>
                      </div>
                      <span className="font-bold text-emerald-700">Tracked Express</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleNextStep} className="space-y-5">
              <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                Select Payment Method
              </h4>

              {/* Payment Method Cards */}
              <div className="space-y-2.5">
                <label
                  className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    shippingInfo.paymentMethod === "credit-card"
                      ? "border-brand-600 bg-brand-50/50 shadow-sm"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={shippingInfo.paymentMethod === "credit-card"}
                      onChange={() => setShippingInfo({ ...shippingInfo, paymentMethod: "credit-card" })}
                      className="accent-brand-600"
                    />
                    <CreditCard className="w-5 h-5 text-brand-600" />
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">Credit or Debit Card</span>
                      <span className="text-[10px] text-slate-500">Visa, Mastercard, American Express</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">Instant</span>
                </label>

                <label
                  className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    shippingInfo.paymentMethod === "bkash-nagad"
                      ? "border-brand-600 bg-brand-50/50 shadow-sm"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={shippingInfo.paymentMethod === "bkash-nagad"}
                      onChange={() => setShippingInfo({ ...shippingInfo, paymentMethod: "bkash-nagad" })}
                      className="accent-brand-600"
                    />
                    <Smartphone className="w-5 h-5 text-pink-600" />
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">bKash / Nagad / Mobile Wallet</span>
                      <span className="text-[10px] text-slate-500">Direct mobile banking with instant verification</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-pink-700 bg-pink-50 px-2 py-0.5 rounded">0% Fee</span>
                </label>

                <label
                  className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    shippingInfo.paymentMethod === "cod"
                      ? "border-brand-600 bg-brand-50/50 shadow-sm"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={shippingInfo.paymentMethod === "cod"}
                      onChange={() => setShippingInfo({ ...shippingInfo, paymentMethod: "cod" })}
                      className="accent-brand-600"
                    />
                    <Banknote className="w-5 h-5 text-emerald-600" />
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">Cash on Delivery (COD)</span>
                      <span className="text-[10px] text-slate-500">Pay when your multi-vendor packages arrive</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Buyer Shield</span>
                </label>
              </div>

              {/* Order Final Summary Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">{formatPrice(cartSubtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Coupon Discount</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>Shipping Fee</span>
                  <span className="font-semibold text-slate-900">
                    {shippingFee === 0 ? "FREE" : formatPrice(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total Due</span>
                  <span className="text-base text-brand-600">{formatPrice(cartFinalTotal)}</span>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-3 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Confirm Order ({formatPrice(cartFinalTotal)})</span>
                </button>
              </div>
            </form>
          )}

          {step === 3 && completedOrder && (
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-black text-emerald-600 uppercase tracking-wider">
                  Order Successfully Placed
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-1">
                  Thank you for shopping at ZenithMart!
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  We've notified the verified merchants. Your packages are now being prepared for dispatch.
                </p>
              </div>

              {/* Order Receipt Card */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2 text-xs">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Order Tracking ID:</span>
                  <span className="font-mono font-black text-brand-600">{completedOrder.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Estimated Delivery:</span>
                  <span className="font-bold text-slate-800">{completedOrder.estimatedDelivery}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Payment Mode:</span>
                  <span className="font-bold text-slate-800 uppercase">{completedOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Delivering To:</span>
                  <span className="font-bold text-slate-800">{completedOrder.customer.address}, {completedOrder.customer.city}</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-2 text-sm font-black text-slate-900">
                  <span>Grand Total Paid:</span>
                  <span className="text-brand-600">{formatPrice(completedOrder.total)}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleClose}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl text-xs transition-colors shadow-md"
                >
                  Continue Browsing Marketplace
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

