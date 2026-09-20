"use client";

import React from "react";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import CategoryNav from "@/components/layout/CategoryNav";
import HeroBanner from "@/components/home/HeroBanner";
import TrustBadges from "@/components/home/TrustBadges";
import FlashSaleSection from "@/components/home/FlashSaleSection";
import FeaturedVendors from "@/components/home/FeaturedVendors";
import ProductCatalog from "@/components/products/ProductCatalog";
import ProductQuickViewModal from "@/components/products/ProductQuickViewModal";
import VendorStoreModal from "@/components/vendor/VendorStoreModal";
import SellerDashboard from "@/components/seller/SellerDashboard";
import CartDrawer from "@/components/cart/CartDrawer";
import WishlistDrawer from "@/components/wishlist/WishlistDrawer";
import CheckoutModal from "@/components/checkout/CheckoutModal";
import OrderHistoryModal from "@/components/orders/OrderHistoryModal";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-slate-50 selection:bg-indigo-600 selection:text-white">
      {/* Top Bar with Promotions & Currency Switcher */}
      <TopBar />

      {/* Main Sticky Header Navigation */}
      <Navbar />

      {/* Quick Category & Deals Navigation Ribbon */}
      <CategoryNav />

      {/* Hero Showcase with Slider and Seller Spotlight */}
      <HeroBanner />

      {/* Trust Badges: Buyer Protection, Free Shipping, Verified Sellers */}
      <TrustBadges />

      {/* Real-time Flash Sale Countdown Section */}
      <FlashSaleSection />

      {/* Featured Verified Multi-Vendor Stores */}
      <FeaturedVendors />

      {/* Main Marketplace Product Catalog with Advanced Sidebar Filtering */}
      <ProductCatalog />

      {/* Global Interactive Drawers & Modals */}
      <ProductQuickViewModal />
      <VendorStoreModal />
      <SellerDashboard />
      <CartDrawer />
      <WishlistDrawer />
      <CheckoutModal />
      <OrderHistoryModal />

      {/* Comprehensive Footer */}
      <Footer />
    </main>
  );
}
