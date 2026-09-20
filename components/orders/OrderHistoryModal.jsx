"use client";

import React from "react";
import { useStore } from "@/context/StoreContext";
import { X, PackageCheck, Truck, Clock, Store, ChevronRight } from "lucide-react";

export default function OrderHistoryModal() {
  const { isOrderHistoryOpen, setIsOrderHistoryOpen, orders, formatPrice } = useStore();

  if (!isOrderHistoryOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col">
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-brand-600 text-white flex items-center justify-center">
              <PackageCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black">My Order History & Live Tracking</h3>
              <p className="text-[11px] text-slate-400">Track multi-vendor shipments in real time</p>
            </div>
          </div>

          <button
            onClick={() => setIsOrderHistoryOpen(false)}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 flex-1 space-y-4">
          {orders.length === 0 ? (
            <div className="py-12 text-center">
              <Truck className="w-14 h-14 text-slate-300 mx-auto mb-3" />
              <h4 className="text-base font-bold text-slate-800">No active orders found</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                Once you place an order, your vendor tracking status and carrier tracking codes will appear here.
              </p>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-black text-brand-600">{order.id}</span>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                        {order.status}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400">
                      Placed on {new Date(order.date).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-black text-slate-900">{formatPrice(order.total)}</span>
                    <span className="block text-[11px] text-emerald-600 font-medium">
                      Est. Arrival: {order.estimatedDelivery}
                    </span>
                  </div>
                </div>

                {/* Items in order */}
                <div className="space-y-2">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <img src={item.product.image} alt="" className="w-9 h-9 rounded-lg object-cover" />
                        <span className="font-semibold text-slate-800 line-clamp-1 max-w-xs">
                          {item.product.title} (x{item.quantity})
                        </span>
                      </div>
                      <span className="font-mono text-slate-600">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

