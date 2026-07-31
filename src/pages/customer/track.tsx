import { useRoute, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Phone, MessageCircle, Clock, CheckCircle2, Package } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGetOrder } from "@/lib/api-client-react";
import { NotificationBell } from "@/components/NotificationPanel";
import { OrderTimeline } from "@/components/OrderTimeline";
import { DeliveryETA } from "@/components/DeliveryETA";
import { RescheduleFlow } from "@/components/RescheduleFlow";
import { ReviewRequestFlow } from "@/components/ReviewRequestFlow";
import { trackWhatsAppClick, trackPhoneClick } from "@/lib/analytics";
import { LoadingState, ErrorState } from "@/components/states";
import { useState } from "react";

export default function TrackOrder() {
  const [, navigate] = useLocation();
  const [matched, params] = useRoute("/customer/track/:id");
  const orderId = params?.id ?? "1";

  const orderQuery = useGetOrder(orderId);
  const order = orderQuery.data as any;
  
  // Modal states
  const [showReschedule, setShowReschedule] = useState(false);
  const [showReview, setShowReview] = useState(false);

  // Map backend status to timeline status
  const getTimelineStatus = (status: string) => {
    const statusMap: Record<string, string> = {
      "requested": "pickup_scheduled",
      "accepted": "picked_up",
      "cleaning": "washing",
      "ready": "packing",
      "delivered": "delivered",
    };
    return statusMap[status] || status;
  };

  // Calculate item count for ETA
  const itemCount = order?.items?.reduce((sum: number, item: any) => sum + (item.qty || 1), 0) || 5;

  if (orderQuery.isLoading) {
    return (
      <div className="min-h-full bg-neutral-50 flex items-center justify-center p-6">
        <LoadingState label="Loading order…" />
      </div>
    );
  }

  if (orderQuery.isError || !order) {
    return (
      <div className="min-h-full bg-neutral-50 flex items-center justify-center p-6">
        <ErrorState
          title="Order not found"
          message="We couldn't load this order. It may have been removed or the link is invalid."
          onRetry={() => orderQuery.refetch()}
        />
      </div>
    );
  }

  return (
    <div className="min-h-full bg-neutral-50 flex flex-col">
      {/* Header */}
      <div className="bg-white px-6 pt-6 pb-6 border-b border-gray-100 shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/customer/home")} className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors">
              <ChevronLeft className="w-6 h-6 text-gray-900" />
            </button>
            <div>
              <h1 className="font-black text-xl text-gray-900 tracking-tight">Track Order</h1>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Order #{String(orderId).slice(-6).toUpperCase()}</p>
            </div>
          </div>
          <div className="bg-gray-50 p-1 rounded-full border border-gray-100">
            <NotificationBell />
          </div>
        </div>
      </div>

      <div className="flex-1 px-6 py-6 space-y-6 pb-32">
        {/* Status Badge */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Current Status</span>
          <span className="text-[10px] bg-indigo-600 text-white px-3 py-1 rounded-full font-black uppercase tracking-wider shadow-lg shadow-indigo-100">
            {order?.status?.replace(/_/g, " ") ?? "Processing..."}
          </span>
        </div>

        {/* Integrated Order Timeline */}
        {order && (
          <OrderTimeline 
            orderStatus={getTimelineStatus(order.status)}
            orderDate={order.createdAt || new Date().toISOString()}
            isExpress={order.isExpress || false}
            showDetailed={true}
          />
        )}

        {/* Delivery ETA - Only for non-delivered orders */}
        {order && order.status !== "delivered" && (
          <DeliveryETA 
            orderDate={order.createdAt || new Date().toISOString()}
            serviceType={order.isExpress ? "express" : "standard"}
            currentStatus={order.status}
            locality="Narnaul"
            itemCount={itemCount}
          />
        )}

        {/* Reschedule CTA - For scheduled/pending pickup */}
        {order && (order.status === "requested" || order.status === "accepted") && (
          <Card className="border-none bg-amber-50 rounded-2xl p-6 border border-amber-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-1">Need to reschedule?</h3>
                <p className="text-sm text-gray-600 mb-3">Change your pickup time or report an issue.</p>
                <Button 
                  onClick={() => setShowReschedule(true)}
                  variant="outline"
                  className="h-12 border-amber-300 text-amber-700 hover:bg-amber-100 rounded-xl font-bold"
                >
                  Reschedule Pickup
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Rider Info - If assigned */}
        {order?.rider && (
          <Card className="border-none bg-indigo-900 rounded-[2rem] p-6 shadow-xl relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full blur-2xl" />
            <h3 className="font-black text-indigo-200 uppercase tracking-widest text-[10px] mb-5">Your Rider</h3>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
                <span className="text-white font-black text-2xl uppercase">{order.rider.name?.[0] || "R"}</span>
              </div>
              <div className="flex-1">
                <p className="font-black text-white text-lg tracking-tight leading-tight">{order.rider.name || "Rider"}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] bg-amber-400 text-amber-950 font-black px-2 py-0.5 rounded-md">★ {order.rider.rating || "4.8"}</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => trackPhoneClick("contact_page", order.rider?.phone)}
                  className="w-11 h-11 bg-white text-indigo-900 rounded-2xl flex items-center justify-center shadow-lg active:scale-90 transition-transform"
                >
                  <Phone className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => trackWhatsAppClick("contact_page", order.rider?.phone)}
                  className="w-11 h-11 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-lg active:scale-90 transition-transform"
                >
                  <MessageCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
          </Card>
        )}

        {/* Order Details Summary */}
        {order?.items && (
          <Card className="border-none bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Package className="w-5 h-5 text-gray-400" />
              <h3 className="font-bold text-gray-900">Order Summary</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Items</span>
                <span className="font-bold">{itemCount} items</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total</span>
                <span className="font-bold">₹{order.total || 0}</span>
              </div>
              {order?.customer?.name && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Customer</span>
                  <span className="font-bold">{order.customer.name}</span>
                </div>
              )}
            </div>
          </Card>
        )}
      </div>

      {/* Sticky Action Footer */}
      <div className="px-6 pb-6 pt-4 bg-white border-t border-gray-100 sticky bottom-0 z-20">
        {order?.status === "delivered" ? (
          <Button
            onClick={() => setShowReview(true)}
            className="w-full h-16 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-black text-base shadow-xl flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>Rate Your Experience</span>
          </Button>
        ) : (
          <div className="flex gap-3">
            <Button
              onClick={() => {
                trackWhatsAppClick("contact_page", "order_inquiry");
                window.open(`https://wa.me/919671869470?text=Hi%20EZDRY%2C%20I%20have%20a%20question%20about%20order%20${orderId}`, "_blank");
              }}
              variant="outline"
              className="flex-1 h-14 border-gray-200 text-gray-700 rounded-xl font-bold"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Ask Question
            </Button>
            <Button
              onClick={() => navigate("/customer/book")}
              className="flex-1 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold"
            >
              Book Again
            </Button>
          </div>
        )}
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showReschedule && (
          <RescheduleFlow
            orderId={orderId}
            currentSlot={{ date: order?.pickupDate || "Today", time: order?.pickupSlot || "10:00 AM" }}
            locality="Narnaul"
            onReschedule={(date, time, reason) => {
              console.log("Rescheduled:", { date, time, reason });
              setShowReschedule(false);
            }}
            onCancel={() => setShowReschedule(false)}
          />
        )}
        
        {showReview && (
          <ReviewRequestFlow
            orderId={orderId}
            customerName={order?.customer?.name || "Customer"}
            locality="Narnaul"
            deliveryDate={order?.deliveryDate || new Date().toISOString()}
            onClose={() => setShowReview(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
