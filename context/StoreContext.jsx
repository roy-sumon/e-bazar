"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { PRODUCTS, VENDORS, COUPONS } from "@/data/mockData";

const StoreContext = createContext();

export function StoreProvider({ children }) {
  // Products state (includes default products + seller-created products)
  const [products, setProducts] = useState(PRODUCTS);
  const [vendors, setVendors] = useState(VENDORS);

  // Cart state
  const [cart, setCart] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Wishlist state
  const [wishlist, setWishlist] = useState([]);

  // Orders state
  const [orders, setOrders] = useState([]);

  // Currency
  const [currency, setCurrency] = useState("USD");
  const currencyRates = {
    USD: { symbol: "$", rate: 1 },
    EUR: { symbol: "€", rate: 0.92 },
    BDT: { symbol: "৳", rate: 120 }
  };

  // Modals & Drawers state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSellerPortalOpen, setIsSellerPortalOpen] = useState(false);
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [activeVendorId, setActiveVendorId] = useState(null);

  // Filters state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedVendor, setSelectedVendor] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 2500]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("featured");

  // Toasts
  const [toasts, setToasts] = useState([]);

  // Load saved state from LocalStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("zenith_cart");
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem("zenith_wishlist");
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedOrders = localStorage.getItem("zenith_orders");
      if (savedOrders) setOrders(JSON.parse(savedOrders));

      const savedSellerProds = localStorage.getItem("zenith_seller_products");
      if (savedSellerProds) {
        const parsed = JSON.parse(savedSellerProds);
        setProducts([...parsed, ...PRODUCTS]);
      }
    } catch (e) {
      console.error("Failed to load local storage", e);
    }
  }, []);

  // Sync cart to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem("zenith_cart", JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Sync wishlist to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem("zenith_wishlist", JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Sync orders to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem("zenith_orders", JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  // Toast helper
  const addToast = (message, type = "success") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Format currency
  const formatPrice = (usdAmount) => {
    const { symbol, rate } = currencyRates[currency] || currencyRates.USD;
    const converted = usdAmount * rate;
    if (currency === "BDT") {
      return `${symbol}${Math.round(converted).toLocaleString()}`;
    }
    return `${symbol}${converted.toFixed(2)}`;
  };

  // Cart operations
  const addToCart = (product, quantity = 1, options = {}) => {
    setCart((prevCart) => {
      const itemKey = `${product.id}-${options.color || ""}-${options.size || ""}`;
      const existingIndex = prevCart.findIndex((item) => item.key === itemKey);

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            key: itemKey,
            product,
            quantity,
            selectedColor: options.color || null,
            selectedSize: options.size || null,
            addedAt: Date.now()
          }
        ];
      }
    });
    addToast(`Added "${product.title.slice(0, 28)}..." to cart!`, "success");
  };

  const removeFromCart = (itemKey) => {
    setCart((prev) => prev.filter((item) => item.key !== itemKey));
    addToast("Item removed from cart", "info");
  };

  const updateQuantity = (itemKey, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemKey);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.key === itemKey ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Multi-vendor grouping for cart
  const cartByVendor = cart.reduce((acc, item) => {
    const vId = item.product.vendorId || "zenith-direct";
    if (!acc[vId]) {
      const vendorData = vendors.find((v) => v.id === vId) || {
        id: vId,
        name: "Zenith Direct Marketplace",
        badge: "Marketplace Verified"
      };
      acc[vId] = {
        vendor: vendorData,
        items: [],
        vendorSubtotal: 0
      };
    }
    acc[vId].items.push(item);
    acc[vId].vendorSubtotal += item.product.price * item.quantity;
    return acc;
  }, {});

  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Discount calculation
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === "percent") {
      discountAmount = cartSubtotal * appliedCoupon.discount;
    } else if (appliedCoupon.type === "fixed") {
      discountAmount = Math.min(appliedCoupon.discount, cartSubtotal);
    }
  }

  // Shipping calculation: Free over $150 or if FREESHIP applied
  const standardShippingFee = cart.length > 0 ? (cartSubtotal >= 150 ? 0 : 15.00) : 0;
  const shippingFee = appliedCoupon?.code === "FREESHIP" ? 0 : standardShippingFee;
  const cartFinalTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  const applyCoupon = (code) => {
    const trimmed = code.trim().toUpperCase();
    if (COUPONS[trimmed]) {
      const coupon = { code: trimmed, ...COUPONS[trimmed] };
      if (coupon.minSpend && cartSubtotal < coupon.minSpend) {
        addToast(`Minimum spend of $${coupon.minSpend} required for ${trimmed}`, "error");
        return false;
      }
      setAppliedCoupon(coupon);
      addToast(`Coupon "${trimmed}" applied successfully!`, "success");
      return true;
    } else {
      addToast("Invalid coupon code. Try 'ZENITH20' or 'WELCOME10'", "error");
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast("Coupon removed", "info");
  };

  // Wishlist operations
  const toggleWishlist = (product) => {
    const exists = wishlist.some((item) => item.id === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      addToast(`Removed from wishlist`, "info");
    } else {
      setWishlist((prev) => [...prev, product]);
      addToast(`Added to your wishlist!`, "success");
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  // Order Placement
  const placeOrder = (customerDetails) => {
    const newOrder = {
      id: `ZM-${Date.now().toString().slice(-6)}`,
      date: new Date().toISOString(),
      customer: customerDetails,
      items: [...cart],
      itemsByVendor: { ...cartByVendor },
      subtotal: cartSubtotal,
      discount: discountAmount,
      shipping: shippingFee,
      total: cartFinalTotal,
      couponCode: appliedCoupon?.code || null,
      paymentMethod: customerDetails.paymentMethod,
      status: "Processing",
      estimatedDelivery: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric"
      })
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  // Seller Dashboard: Add New Product
  const addSellerProduct = (newProductData) => {
    const created = {
      id: `custom-${Date.now()}`,
      title: newProductData.title,
      category: newProductData.category,
      vendorId: newProductData.vendorId || "anker-tech",
      price: parseFloat(newProductData.price),
      originalPrice: parseFloat(newProductData.originalPrice || newProductData.price),
      discountPercentage: Math.max(0, Math.round(((newProductData.originalPrice - newProductData.price) / (newProductData.originalPrice || 1)) * 100)),
      rating: 5.0,
      reviewsCount: 1,
      stock: parseInt(newProductData.stock) || 10,
      isFlashSale: !!newProductData.isFlashSale,
      tags: ["New Seller Listing", "Verified Quality"],
      image: newProductData.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700&auto=format&fit=crop&q=80",
      gallery: [newProductData.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700&auto=format&fit=crop&q=80"],
      variants: {
        colors: newProductData.colors ? newProductData.colors.split(",").map(c => c.trim()) : ["Default"],
        specs: ["Authentic Manufacturer Warranty"]
      },
      description: newProductData.description || "High quality product listed by verified vendor.",
      specifications: {
        "Listed By": newProductData.vendorName || "Verified Vendor",
        "Condition": "Brand New, Sealed",
        "Delivery": "3-5 Business Days"
      }
    };

    // Update state & persist custom products
    setProducts((prev) => [created, ...prev]);
    try {
      const savedSellerProds = localStorage.getItem("zenith_seller_products");
      const currentList = savedSellerProds ? JSON.parse(savedSellerProds) : [];
      localStorage.setItem("zenith_seller_products", JSON.stringify([created, ...currentList]));
    } catch (e) {
      console.error(e);
    }

    addToast(`"${created.title.slice(0, 24)}..." published to marketplace!`, "success");
    return created;
  };

  // Filter Reset
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedVendor("all");
    setPriceRange([0, 2500]);
    setMinRating(0);
    setSortBy("featured");
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        vendors,
        cart,
        cartByVendor,
        cartCount,
        cartSubtotal,
        discountAmount,
        shippingFee,
        cartFinalTotal,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        wishlist,
        toggleWishlist,
        isInWishlist,
        wishlistCount: wishlist.length,
        orders,
        placeOrder,
        addSellerProduct,
        currency,
        setCurrency,
        formatPrice,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isSellerPortalOpen,
        setIsSellerPortalOpen,
        isOrderHistoryOpen,
        setIsOrderHistoryOpen,
        quickViewProduct,
        setQuickViewProduct,
        activeVendorId,
        setActiveVendorId,
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
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}

