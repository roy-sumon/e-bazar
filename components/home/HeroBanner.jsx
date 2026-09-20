"use client";

import React, { useState, useEffect } from "react";
import { useStore } from "@/context/StoreContext";
import {
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Zap,
  ArrowRight,
  Store,
  Sparkles,
  Tag
} from "lucide-react";

const HERO_SLIDES = [
  {
    id: 1,
    badge: "Official Brand Flagship",
    badgeColor: "bg-indigo-600 text-white",
    title: "Next-Gen Wireless Sound & Pro Imaging",
    subtitle: "Experience crystal clarity with Sony's industry-leading noise cancellation and 4K cinema cameras.",
    discount: "Up to 25% Off + 2-Yr Warranty",
    ctaText: "Shop Sony Official",
    category: "audio",
    vendorId: "sony-official",
    bgGradient: "from-slate-950 via-slate-900 to-indigo-950",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    badge: "Milan Fashion Week Collection",
    badgeColor: "bg-amber-600 text-white",
    title: "Artisanal Cashmere & Italian Tailoring",
    subtitle: "Contemporary structured coats and minimalist garments crafted from sustainable Mongolian cashmere.",
    discount: "Exclusive New Season Drops",
    ctaText: "Explore Aetheria Studio",
    category: "fashion",
    vendorId: "aetheria-apparel",
    bgGradient: "from-stone-950 via-zinc-900 to-amber-950",
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    badge: "Cutting-Edge Power Innovation",
    badgeColor: "bg-emerald-600 text-white",
    title: "Ultra-Fast GaN Multi-Device Charging",
    subtitle: "Power up your laptops, phones, and peripherals with intelligent digital display power banks.",
    discount: "Free Anker Braided Cable with Prime Series",
    ctaText: "Discover Anker Hub",
    category: "electronics",
    vendorId: "anker-tech",
    bgGradient: "from-slate-950 via-blue-950 to-slate-900",
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&auto=format&fit=crop&q=80"
  }
];

export default function HeroBanner() {
  const { setSelectedCategory, setActiveVendorId, setIsSellerPortalOpen } = useStore();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  const handleCtaClick = () => {
    if (slide.category) {
      setSelectedCategory(slide.category);
    }
    const catalogEl = document.getElementById("product-catalog");
    if (catalogEl) catalogEl.scrollIntoView({ behavior: "smooth" });
  };

  const handleVendorClick = () => {
    setActiveVendorId(slide.vendorId);
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch">
        {/* Main Hero Slider (8 Cols on Desktop) */}
        <div className="lg:col-span-8 relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl bg-gradient-to-r text-white min-h-[380px] sm:min-h-[480px] flex items-center transition-all duration-700">
          {/* Background image & gradient overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-r ${slide.bgGradient} opacity-95 transition-all duration-700`}
          />
          <img
            src={slide.image}
            alt={slide.title}
            className="absolute right-0 top-0 bottom-0 w-full sm:w-1/2 h-full object-cover object-center mix-blend-luminosity opacity-35 sm:opacity-70 mask-radial"
          />
          <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />

          {/* Slide Content */}
          <div className="relative z-10 p-5 sm:p-10 lg:p-12 max-w-xl flex flex-col justify-center h-full">
            <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
              <span
                className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-sm ${slide.badgeColor}`}
              >
                {slide.badge}
              </span>
              <span className="text-[10px] sm:text-xs text-amber-300 font-semibold flex items-center gap-1 bg-amber-950/60 border border-amber-500/30 px-2 sm:px-2.5 py-0.5 rounded-full">
                <Tag className="w-3 h-3" /> {slide.discount}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white mb-3 sm:mb-4">
              {slide.title}
            </h1>

            <p className="text-slate-300 text-xs sm:text-base leading-relaxed mb-6 sm:mb-8 line-clamp-3 sm:line-clamp-none">
              {slide.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-2.5 sm:gap-4">
              <button
                onClick={handleCtaClick}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-xl shadow-lg shadow-emerald-950/40 flex items-center gap-2 text-xs sm:text-sm transition-all hover:scale-105 active:scale-95"
              >
                <span>{slide.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleVendorClick}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-medium px-4 sm:px-5 py-2.5 sm:py-3.5 rounded-xl text-xs sm:text-sm backdrop-blur-sm transition-all"
              >
                Visit Storefront
              </button>
            </div>
          </div>

          {/* Slider Controls */}
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() =>
                setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
              }
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <div className="flex gap-1 sm:gap-1.5 px-1 sm:px-2">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-1.5 sm:h-2 rounded-full transition-all ${
                    currentSlide === idx ? "w-5 sm:w-6 bg-emerald-500" : "w-1.5 sm:w-2 bg-white/40"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Side Banner Cards (4 Cols on Desktop) */}
        <div className="lg:col-span-4 flex flex-col gap-4 sm:gap-6">
          {/* Card 1: Multi-Vendor Seller Call to Action */}
          <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white border border-emerald-800/40 relative overflow-hidden shadow-xl flex flex-col justify-between flex-1 group">
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
                <Store className="w-4 h-4 text-amber-400" />
                <span>Multi-Vendor Ecosystem</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white leading-snug mb-2">
                Sell to 1.2M+ Shoppers on E-Bazar
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed mb-4">
                Open your verified store in minutes. 0% setup fee, automated multi-carrier logistics, and instant daily payouts.
              </p>
            </div>

            <div className="relative z-10 pt-2">
              <button
                onClick={() => setIsSellerPortalOpen(true)}
                className="w-full bg-white text-emerald-950 font-bold py-2.5 sm:py-3 rounded-xl hover:bg-emerald-50 shadow-md transition-all flex items-center justify-center gap-2 text-xs sm:text-sm"
              >
                <span>Launch Vendor Dashboard</span>
                <ArrowRight className="w-4 h-4 text-emerald-600" />
              </button>
            </div>
          </div>

          {/* Card 2: Exclusive E-Bazar Guarantee */}
          <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 bg-white border border-slate-200 shadow-xl flex flex-col justify-between flex-1">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <span className="text-[11px] sm:text-xs font-bold text-emerald-600 uppercase tracking-wider">
                  E-Bazar Buyer Shield™
                </span>
                <h4 className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
                  100% Escrow Protection
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Funds are held securely until you inspect and accept your package from our verified sellers.
                </p>
              </div>
            </div>

            <div className="mt-3 sm:mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] sm:text-xs text-slate-600">
              <span className="flex items-center gap-1 font-semibold text-slate-800">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> 30-Day Free Return
              </span>
              <span className="text-slate-400">|</span>
              <span className="font-semibold text-emerald-600">Full Refund Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

