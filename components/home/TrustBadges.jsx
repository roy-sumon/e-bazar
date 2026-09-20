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
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        {BADGES.map((b, idx) => {
          const Icon = b.icon;
          return (
            <div
              key={idx}
              className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-emerald-300/60 transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center gap-2.5 sm:gap-4 hover-lift group"
            >
              <div
                className={`w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 border ${b.color} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}
              >
                <Icon className="w-4 h-4 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                  {b.title}
                </h4>
                <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1 leading-tight sm:leading-relaxed line-clamp-2">
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

