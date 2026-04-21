import React, { useState } from "react";
import { useLocation } from "wouter";
import { BadgePlus, BadgeMinus } from "lucide-react";

type ServiceType = "wash" | "dry" | "iron";

const SERVICE_LABEL: Record<ServiceType, string> = {
  wash: "Wash",
  dry: "Dry Clean",
  iron: "Iron",
};

const SAMPLE_ITEMS = [
  { id: "shirt", name: "Shirt", prices: { wash: 30, dry: 80, iron: 20 } },
  { id: "pant", name: "Pant/Trouser", prices: { wash: 40, dry: 100, iron: 25 } },
  { id: "suit", name: "Suit (2pc)", prices: { wash: 0, dry: 250, iron: 0 } },
];

export default function CustomerSelectItems() {
  const [, navigate] = useLocation();
  const [service, setService] = useState<ServiceType>("wash");
  const [quantities, setQuantities] = useState<Record<string, number>>(() => {
    const q: Record<string, number> = {};
    SAMPLE_ITEMS.forEach((i) => (q[i.id] = 0));
    return q;
  });

  function inc(id: string) {
    setQuantities((s) => ({ ...s, [id]: (s[id] || 0) + 1 }));
  }
  function dec(id: string) {
    setQuantities((s) => ({ ...s, [id]: Math.max(0, (s[id] || 0) - 1) }));
  }

  const subtotal = SAMPLE_ITEMS.reduce((sum, it) => sum + (it.prices[service] || 0) * (quantities[it.id] || 0), 0);

  return (
    <div className="min-h-screen bg-sky-50 pb-32">
      <header className="px-4 pt-6 pb-3 bg-white shadow-sm sticky top-0 z-20">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="text-gray-600">Back</button>
          <h1 className="text-lg font-semibold">Select Items</h1>
          <div className="text-sm text-gray-500">{Object.values(quantities).reduce((a,b)=>a+b,0)} items</div>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-4 pt-4">
        <div className="flex gap-3 mb-4">
          <button onClick={() => setService("wash")} className={`px-3 py-2 rounded-full ${service==='wash'?'bg-white shadow':'bg-white/60'}`}>Wash</button>
          <button onClick={() => setService("dry")} className={`px-3 py-2 rounded-full ${service==='dry'?'bg-white shadow':'bg-white/60'}`}>Dry Clean</button>
          <button onClick={() => setService("iron")} className={`px-3 py-2 rounded-full ${service==='iron'?'bg-white shadow':'bg-white/60'}`}>Iron</button>
        </div>

        <div className="space-y-3">
          {SAMPLE_ITEMS.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center text-sky-600 font-bold">{item.name.charAt(0)}</div>
                  <div>
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-sm text-gray-500">{SERVICE_LABEL[service]} ₹{item.prices[service]}</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => dec(item.id)} className="w-9 h-9 bg-sky-50 rounded-full flex items-center justify-center text-sky-600">
                  <BadgeMinus className="w-4 h-4" />
                </button>
                <div className="w-9 text-center">{quantities[item.id]}</div>
                <button onClick={() => inc(item.id)} className="w-9 h-9 bg-sky-600 text-white rounded-full flex items-center justify-center">
                  <BadgePlus className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between text-gray-700 font-semibold">
            <div>Subtotal</div>
            <div>₹{subtotal}</div>
          </div>
        </div>

        <div className="mt-6">
          <button onClick={() => navigate('/customer/checkout')} className="w-full h-14 bg-sky-600 text-white rounded-2xl font-semibold">Proceed (₹{subtotal})</button>
        </div>
      </main>
    </div>
  );
}
