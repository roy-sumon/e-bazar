"use client";

import React, { useState, useMemo } from "react";
import { useStore } from "@/context/StoreContext";
import ProductCard from "./ProductCard";
import { CATEGORIES } from "@/data/mockData";
import {
  Filter,
  SlidersHorizontal,
  Grid3X3,
  List,
  RotateCcw,
  Star,
  Check,
  Search,
  Store,
  ChevronDown
} from "lucide-react";

export default function ProductCatalog() {
  const {
    products,
    vendors,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedVendor,
    setSelectedVendor,
    priceRange,
    setPriceRange,
    minRating,
    setMinRating,
    sortBy,
    setSortBy,
    resetFilters,
    formatPrice
  } = useStore();

  const [viewMode, setViewMode] = useState("grid");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter & Sort computation
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = p.title.toLowerCase().includes(q);
          const matchDesc = p.description?.toLowerCase().includes(q);
          const matchTag = p.tags?.some((t) => t.toLowerCase().includes(q));
          if (!matchTitle && !matchDesc && !matchTag) return false;
        }

        // Category
        if (selectedCategory !== "all" && p.category !== selectedCategory) {
          return false;
        }

        // Vendor
        if (selectedVendor !== "all" && p.vendorId !== selectedVendor) {
          return false;
        }

        // Price range
        if (p.price < priceRange[0] || p.price > priceRange[1]) {
          return false;
        }

        // Rating
        if (minRating > 0 && p.rating < minRating) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "discount") return (b.discountPercentage || 0) - (a.discountPercentage || 0);
        return 0; // default featured
      });
  }, [products, searchQuery, selectedCategory, selectedVendor, priceRange, minRating, sortBy]);

  const activeCategoryObj = CATEGORIES.find((c) => c.id === selectedCategory);

  return (
    <section id="product-catalog" className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Section Title & Highlights */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider mb-1">
            <Filter className="w-4 h-4" />
            <span>Marketplace Directory</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {activeCategoryObj ? activeCategoryObj.name : "All Products"}
          </h2>
          {searchQuery && (
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Search results matching <strong className="text-slate-900">"{searchQuery}"</strong>
            </p>
          )}
        </div>

        {/* Toolbar: Sort, View mode & Mobile Filter toggle */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 text-xs font-bold shadow-sm"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-600" />
            <span>{mobileFilterOpen ? "Hide Filters" : "Filters"}</span>
          </button>

          {/* Sort Selector */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-slate-200 text-slate-800 text-xs font-bold py-2 sm:py-2.5 pl-3 pr-7 sm:pr-8 rounded-xl shadow-sm focus:outline-none cursor-pointer"
            >
              <option value="featured">Sort by: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Customer Rated</option>
              <option value="discount">Biggest Discount</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* View Mode Switcher */}
          <div className="hidden sm:flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === "grid" ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-900"
              }`}
              title="Grid View"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === "list" ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-900"
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
        {/* Left Filter Sidebar */}
        <aside
          className={`lg:block ${
            mobileFilterOpen ? "block" : "hidden"
          } space-y-6 bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-sm h-fit sticky top-28`}
        >
          <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-slate-100">
            <h3 className="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
              <span>Filter Catalog</span>
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={resetFilters}
                className="text-[11px] font-bold text-slate-500 hover:text-rose-600 flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
              {mobileFilterOpen && (
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="lg:hidden text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg transition-colors"
                >
                  Done
                </button>
              )}
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block mb-3">
              Categories
            </label>
            <div className="space-y-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                    selectedCategory === cat.id
                      ? "bg-emerald-50 text-emerald-700 font-bold"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span>{cat.name}</span>
                  {selectedCategory === cat.id && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                </button>
              ))}
            </div>
          </div>

          {/* Multi-Vendor Filter */}
          <div className="pt-4 border-t border-slate-100">
            <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block mb-3">
              Verified Vendors
            </label>
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              <button
                onClick={() => setSelectedVendor("all")}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between ${
                  selectedVendor === "all"
                    ? "bg-slate-900 text-white font-bold"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <span>All Marketplace Vendors</span>
                {selectedVendor === "all" && <Check className="w-3 h-3 text-amber-400" />}
              </button>

              {vendors.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVendor(v.id)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition-colors ${
                    selectedVendor === v.id
                      ? "bg-slate-900 text-white font-bold"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <span className="truncate pr-2">{v.name}</span>
                {selectedVendor === v.id && <Check className="w-3 h-3 text-amber-400 shrink-0" />}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div className="pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
              Max Price
            </label>
            <span className="text-xs font-black text-emerald-600">
              {formatPrice(priceRange[1])}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="2500"
            step="50"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, Number(e.target.value)])}
            className="w-full accent-emerald-600 cursor-pointer"
          />
            <div className="flex justify-between text-[10px] text-slate-400 font-semibold mt-1">
              <span>$0</span>
              <span>$2,500+</span>
            </div>
          </div>

          {/* Customer Rating Filter */}
          <div className="pt-4 border-t border-slate-100">
            <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block mb-3">
              Minimum Rating
            </label>
            <div className="space-y-1">
              {[4.8, 4.5, 4.0, 0].map((star) => (
                <button
                  key={star}
                  onClick={() => setMinRating(star)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between ${
                    minRating === star
                      ? "bg-amber-50 text-amber-900 border border-amber-200"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{star === 0 ? "Any Customer Rating" : `${star}★ & Above`}</span>
                  </div>
                  {minRating === star && <Check className="w-3 h-3 text-amber-600" />}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Right Catalog Grid/List */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-1">
                No matching products found
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mb-6">
                Try adjusting your search criteria, clearing vendor selections, or increasing your price ceiling.
              </p>
              <button
                onClick={resetFilters}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-6 py-2.5 rounded-xl transition-colors shadow-sm"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-2.5 sm:gap-6"
                  : "flex flex-col gap-3 sm:gap-4"
              }
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} viewMode={viewMode} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

