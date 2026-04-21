import { useState } from "react";
import { useLocation, Link } from "wouter";
import { motion } from "framer-motion";
import { MapPin, ChevronRight, Clock, RefreshCw, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NotificationBell } from "@/components/NotificationPanel";
import { useListOrders } from "@/lib/api-client-react";
import { getCurrentCustomer } from "@/lib/session";

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  requested: { label: "Order Placed", color: "bg-sky-50 text-sky-700" },
  accepted: { label: "Accepted", color: "bg-sky-100 text-sky-700" },
  cleaning: { label: "In Process", color: "bg-cyan-100 text-cyan-700" },
  ready: { label: "Ready", color: "bg-blue-100 text-blue-700" },
  delivered: { label: "Delivered", color: "bg-emerald-100 text-emerald-700" },
  cancelled: { label: "Cancelled", color: "bg-red-100 text-red-700" },
};

export default function CustomerHome() {
  const [, navigate] = useLocation();
  const customer = getCurrentCustomer();
  const customerId = customer?.id;
  const { data: ordersData } = useListOrders(
    { customerId: customerId ?? undefined, limit: 3 },
    { query: { enabled: !!customerId } as any },
  );

  const orders = ordersData?.orders ?? [];
  const lastOrder = orders[0];

  return (
    <div className="min-h-full bg-sky-50">
      {/* Header */}
      <div className="bg-sky-500 px-5 pt-5 pb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-1 text-sky-100 text-xs mb-1">
              <MapPin className="w-3 h-3" /> Delivering to
            </div>
            <p className="text-white font-semibold text-sm">Narnaul, Haryana</p>
          </div>
          <NotificationBell />
        </div>
        <h2 className="text-white font-bold text-xl mb-1">
          Hello, {customer?.name?.split(" ")[0] || "there"}!
        </h2>
        <p className="text-sky-100 text-sm">Ready for your Cloth Spa today?</p>
      </div>

      {/* Book Pickup CTA */}
      <div className="px-5 -mt-4">
        <motion.div whileTap={{ scale: 0.98 }}>
          <Button
            onClick={() => navigate("/customer/book")}
            className="w-full h-14 bg-white hover:bg-sky-50 text-sky-600 rounded-2xl font-bold text-base shadow-md shadow-sky-200 border border-sky-100"
          >
            <Zap className="w-5 h-5 mr-2 text-sky-500" />
            Book Pickup Now
          </Button>
        </motion.div>
      </div>

      {/* Quick Reorder */}
      {lastOrder && (
        <div className="px-5 mt-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-700 flex items-center gap-1.5 text-sm">
              <Clock className="w-4 h-4 text-sky-500" /> Last Order
            </h3>
            <Link href={`/customer/track/${lastOrder.id}`} className="text-sky-500 text-xs font-medium flex items-center gap-0.5">
              Track <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-sky-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-600">Order #{String(lastOrder.id).slice(-6).padStart(6, '0')}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_LABELS[lastOrder.status]?.color ?? "bg-gray-100 text-gray-600"}`}>
                {STATUS_LABELS[lastOrder.status]?.label ?? lastOrder.status}
              </span>
            </div>
            <div className="text-sm text-gray-500 mb-3">
              {(lastOrder.items as any[]).slice(0, 2).map((item: any, i: number) => (
                <span key={i}>{i > 0 ? " + " : ""}{item.itemName} x{item.quantity}</span>
              ))}
              {(lastOrder.items as any[]).length > 2 && <span> & more</span>}
            </div>
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-900">₹{lastOrder.total}</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => navigate("/customer/book")}
                className="text-xs h-8 border-sky-200 text-sky-600 hover:bg-sky-50"
              >
                <RefreshCw className="w-3 h-3 mr-1" /> Reorder
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="pb-6" />
    </div>
  );
}
