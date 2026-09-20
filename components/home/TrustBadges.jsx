"use client";

import React from "react";
import { Truck, ShieldCheck, Headphones, RefreshCw } from "lucide-react";

export default function TrustBadges() {
  const BADGES = [
    {
      icon: Truck,
      title: "Free Express Fulfillment",
      description: "On all multi-vendor orders over $150 with tracked courier.",
      color: "text-blue-600 bg-blue-50 border-blue-100"
    },
    {
      icon: ShieldCheck,
      title: "100% Verified Sellers",
      description: "Every merchant undergoes rigorous quality & business vetting.",
      color: "text-emerald-600 bg-emerald-50 border-emerald-100"
    },
    {
      icon: RefreshCw,
      title: "30-Day Hassle-Free Returns",
      description: "Instant doorstep pickup and zero question replacement warranty.",
      color: "text-amber-600 bg-amber-50 border-amber-100"
    },
    {
      icon: Headphones,
      title: "24/7 Dedicated Support",
      description: "Real human concierge assistance for orders, claims and disputes.",
      color: "text-indigo-600 bg-indigo-50 border-indigo-100"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {BADGES.map((b, idx) => {
          const Icon = b.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex items-center gap-4"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${b.color}`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 leading-snug">
                  {b.title}
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {b.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

