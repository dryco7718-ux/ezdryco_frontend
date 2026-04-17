import { useRoute, useLocation } from "wouter";
import { motion } from "framer-motion";
import { ChevronLeft, Phone, MessageCircle, CheckCircle, Circle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetOrder } from "@/lib/api-client-react";
import { NotificationBell } from "@/components/NotificationPanel";

const ORDER_STEPS = [
  { key: "requested", label: "Order Placed", desc: "Your order has been received" },
  { key: "accepted", label: "Accepted", desc: "Dry cleaner has accepted your order" },
  { key: "picked_up", label: "Picked Up", desc: "Your clothes have been picked up" },
  { key: "cleaning", label: "Cleaning in Progress", desc: "Your garments are being cleaned" },
  { key: "out_for_delivery", label: "Out for Delivery", desc: "Your order is on its way" },
  { key: "delivered", label: "Delivered", desc: "Your clothes have been delivered!" },
];

const STATUS_ORDER = ["requested", "accepted", "picked_up", "cleaning", "out_for_delivery", "delivered"];

export default function TrackOrder() {
  const [, navigate] = useLocation();
  const [matched, params] = useRoute("/customer/track/:id");
  const orderId = params?.id ?? "1";

  const { data: order } = useGetOrder(orderId);

  const currentStep = STATUS_ORDER.indexOf(order?.status ?? "requested");

  return (
    <div className="min-h-full bg-gray-50 flex flex-col">
      <div className="bg-white px-5 pt-5 pb-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/customer/home")} className="p-2 rounded-full hover:bg-gray-100">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-bold text-lg text-gray-900">Track Order</h1>
              <p className="text-xs text-gray-500">Order #{orderId}</p>
            </div>
          </div>
          <NotificationBell />
        </div>
      </div>

      <div className="flex-1 px-5 py-5 space-y-4">
        {/* Progress Bar */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900">Order Status</h3>
            <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-medium capitalize">
              {order?.status?.replace(/_/g, " ") ?? "Loading..."}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / STATUS_ORDER.length) * 100}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="bg-blue-600 h-2 rounded-full"
            />
          </div>
          <p className="text-xs text-gray-400 text-right">{currentStep + 1} of {STATUS_ORDER.length} steps</p>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Order Timeline</h3>
          <div className="space-y-0">
            {ORDER_STEPS.map((step, i) => {
              const isCompleted = i <= currentStep;
              const isActive = i === currentStep;
              return (
                <div key={step.key} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <motion.div
                      initial={false}
                      animate={{ scale: isActive ? [1, 1.2, 1] : 1 }}
                      transition={{ duration: 0.3, repeat: isActive ? Infinity : 0, repeatDelay: 1.5 }}
                    >
                      {isCompleted ? (
                        <CheckCircle className={`w-5 h-5 ${isActive ? "text-blue-600" : "text-green-500"}`} />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-300" />
                      )}
                    </motion.div>
                    {i < ORDER_STEPS.length - 1 && (
                      <div className={`w-0.5 h-8 mt-1 mb-1 ${i < currentStep ? "bg-green-400" : "bg-gray-200"}`} />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className={`text-sm font-medium ${isCompleted ? "text-gray-900" : "text-gray-400"}`}>{step.label}</p>
                    <p className={`text-xs ${isCompleted ? "text-gray-500" : "text-gray-300"}`}>{step.desc}</p>
                    {isActive && <p className="text-xs text-blue-600 font-medium mt-0.5 flex items-center gap-1"><Clock className="w-3 h-3" /> In Progress</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Rider Info */}
        {order?.rider && (
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-3">Delivery Agent</h3>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-lg">{order.rider.name[0]}</span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{order.rider.name}</p>
                <p className="text-xs text-yellow-600 font-medium">★ {order.rider.rating ?? "4.8"} • {order.rider.totalDeliveries} deliveries</p>
              </div>
              <div className="flex gap-2">
                <a href={`tel:${order.rider.phone}`} className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Phone className="w-4 h-4 text-green-600" />
                </a>
                <a href={`https://wa.me/${order.rider.phone?.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Review CTA if delivered */}
      {order?.status === "delivered" && (
        <div className="px-5 pb-4 pt-2 bg-white border-t border-gray-100">
          <Button
            onClick={() => navigate(`/customer/review/${orderId}`)}
            className="w-full h-12 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-2xl font-semibold"
          >
            Rate this Order ★
          </Button>
        </div>
      )}
    </div>
  );
}
