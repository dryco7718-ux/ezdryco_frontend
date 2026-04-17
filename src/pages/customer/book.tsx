import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Plus, Minus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useListBusinesses, useListItems } from "@/lib/api-client-react";

const CATEGORIES = [
  { id: "wash", label: "Wash", icon: "🧺", color: "from-sky-400 to-sky-600" },
  { id: "dry_clean", label: "Dry Clean", icon: "👔", color: "from-blue-400 to-blue-600" },
  { id: "iron", label: "Iron", icon: "♨️", color: "from-cyan-400 to-cyan-600" },
];

const CATEGORY_ICONS: Record<string, string> = {
  wash: "🧺",
  dry_clean: "👔",
  iron: "♨️",
  fold: "🧼",
};

const SELECTED_BUSINESS_STORAGE_KEY = "washify_selected_business";

export default function BookOrder() {
  const [, navigate] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("wash");
  const [cart, setCart] = useState<Record<string, { qty: number; price: number; name: string; serviceType: string }>>({});
  const { data: businessesData } = useListBusinesses({ limit: 20, status: "active" });
  const activeBusinesses = businessesData?.businesses?.filter((business) => business.status === "active") ?? [];
  const [selectedBusinessId, setSelectedBusinessId] = useState<string>(() => {
    try {
      const saved = sessionStorage.getItem(SELECTED_BUSINESS_STORAGE_KEY);
      return saved ? JSON.parse(saved).id ?? "" : "";
    } catch {
      return "";
    }
  });
  const selectedBusiness = activeBusinesses.find((business) => business.id === selectedBusinessId) ?? activeBusinesses[0];
  const businessId = selectedBusiness?.id;
  const { data: apiItems, isLoading } = useListItems(
    { businessId },
    { query: { enabled: !!businessId } as any },
  );

  useEffect(() => {
    if (!selectedBusinessId && activeBusinesses[0]?.id) {
      setSelectedBusinessId(activeBusinesses[0].id);
    }
  }, [activeBusinesses, selectedBusinessId]);

  useEffect(() => {
    if (!selectedBusiness) return;
    sessionStorage.setItem(
      SELECTED_BUSINESS_STORAGE_KEY,
      JSON.stringify({ id: selectedBusiness.id, name: selectedBusiness.name }),
    );
  }, [selectedBusiness]);

  const getPrice = (item: any) => {
    if (selectedCategory === "wash") return Number(item.priceWash);
    if (selectedCategory === "dry_clean") return Number(item.priceDryClean);
    if (selectedCategory === "iron") return Number(item.priceIron);
    return 0;
  };

  const filteredItems = (apiItems ?? []).filter(item => {
    if (selectedCategory === "wash") return item.priceWash != null;
    if (selectedCategory === "dry_clean") return item.priceDryClean != null;
    if (selectedCategory === "iron") return item.priceIron != null;
    return true;
  });

  const itemKey = (item: any) => `${item.id}-${selectedCategory}`;

  const addToCart = (item: any) => {
    const key = itemKey(item);
    const price = getPrice(item);
    setCart(prev => ({
      ...prev,
      [key]: { qty: (prev[key]?.qty ?? 0) + 1, price, name: item.name, serviceType: selectedCategory },
    }));
  };

  const removeFromCart = (item: any) => {
    const key = itemKey(item);
    setCart(prev => {
      const current = prev[key]?.qty ?? 0;
      if (current <= 1) {
        const next = { ...prev };
        delete next[key];
        return next;
      }
      return { ...prev, [key]: { ...prev[key], qty: current - 1 } };
    });
  };

  const cartTotal = Object.values(cart).reduce((sum, { qty, price }) => sum + qty * price, 0);
  const cartCount = Object.values(cart).reduce((sum, { qty }) => sum + qty, 0);

  const handleCheckout = () => {
    if (!selectedBusinessId) return;
    const cartItems = Object.entries(cart).map(([key, val]) => ({
      itemId: key.split("-")[0],
      itemName: val.name,
      serviceType: val.serviceType,
      quantity: val.qty,
      unitPrice: val.price,
      totalPrice: val.qty * val.price,
      businessId: selectedBusinessId,
    }));
    sessionStorage.setItem("cart", JSON.stringify(cartItems));
    navigate("/customer/schedule");
  };

  const handleBusinessSelect = (nextBusinessId: string) => {
    setSelectedBusinessId(nextBusinessId);
    setCart({});
  };

  const activeCat = CATEGORIES.find(c => c.id === selectedCategory)!;

  return (
    <div className="min-h-full bg-sky-50 flex flex-col">
      {/* Header */}
      <div className={`bg-gradient-to-r ${activeCat.color} px-5 pt-5 pb-6`}>
        <div className="flex items-center gap-3 mb-5">
          <button onClick={() => navigate("/customer/home")} className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <h1 className="font-bold text-lg text-white">Select Items</h1>
            <p className="text-white/70 text-xs">Choose items & quantity to add</p>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                selectedCategory === cat.id
                  ? "bg-white text-gray-800 shadow-md"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              <span>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {activeBusinesses.length > 0 && (
          <div className="mt-4 space-y-2">
            <p className="text-xs font-medium text-white/80">Choose laundry partner</p>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {activeBusinesses.map((business) => (
                <button
                  key={business.id}
                  type="button"
                  onClick={() => handleBusinessSelect(business.id)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                    businessId === business.id ? "bg-white text-gray-900" : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                >
                  {business.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Items Grid */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-32">
        {!businessId && !isLoading && (
          <div className="rounded-2xl bg-white p-5 text-center text-sm text-gray-500 shadow-sm">
            Abhi koi active business available nahi hai.
          </div>
        )}

        {businessId && !isLoading && filteredItems.length === 0 && (
          <div className="rounded-2xl bg-white p-5 text-center text-sm text-gray-500 shadow-sm">
            {selectedBusiness?.name ?? "Is business"} ne abhi tak koi items add nahi kiye hain.
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            {filteredItems.map((item, i) => {
              const key = itemKey(item);
              const qty = cart[key]?.qty ?? 0;
              const price = getPrice(item);

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className={`flex items-center justify-between bg-white rounded-2xl p-4 shadow-sm border transition-all ${
                    qty > 0 ? "border-sky-300 shadow-sky-100" : "border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-2xl ${qty > 0 ? "bg-sky-100" : "bg-sky-50"}`}>
                      {item.icon || CATEGORY_ICONS[item.category] || "🧺"}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{item.name}</p>
                      <p className="text-sky-500 font-bold text-sm">₹{price}<span className="text-gray-400 font-normal text-xs">/pc</span></p>
                    </div>
                  </div>

                  {qty === 0 ? (
                    <button
                      onClick={() => addToCart(item)}
                      className="w-9 h-9 rounded-full bg-sky-500 hover:bg-sky-600 text-white flex items-center justify-center shadow-sm transition-all active:scale-95"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => removeFromCart(item)}
                        className="w-9 h-9 rounded-full border-2 border-sky-400 text-sky-500 flex items-center justify-center hover:bg-sky-50 transition-all active:scale-95"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-bold text-gray-900 w-6 text-center text-base">{qty}</span>
                      <button
                        onClick={() => addToCart(item)}
                        className="w-9 h-9 rounded-full bg-sky-500 hover:bg-sky-600 text-white flex items-center justify-center shadow-sm transition-all active:scale-95"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Cart Bottom Bar */}
      <AnimatePresence>
        {cartCount > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 px-5 pb-6 pt-3 bg-white border-t border-sky-100 shadow-lg"
          >
            <Button
              onClick={handleCheckout}
              className="w-full h-14 bg-sky-500 hover:bg-sky-600 text-white rounded-2xl font-semibold shadow-lg shadow-sky-200"
            >
              <div className="flex items-center justify-between w-full px-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <span className="font-bold">{cartCount} item{cartCount > 1 ? "s" : ""}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-lg">₹{cartTotal}</span>
                  <div className="bg-white/20 rounded-full px-3 py-1 text-xs font-semibold">Next →</div>
                </div>
              </div>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
