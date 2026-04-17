import { useState } from "react";
import { useRoute, useLocation } from "wouter";
import { motion } from "framer-motion";
import { ChevronLeft, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCreateReview, useListBusinesses } from "@/lib/api-client-react";
import { getCurrentCustomer } from "@/lib/session";

export default function ReviewOrder() {
  const [, navigate] = useLocation();
  const [, params] = useRoute("/customer/review/:id");
  const orderId = params?.id ?? "1";
  const customer = getCurrentCustomer();
  const { data: businessesData } = useListBusinesses({ limit: 1 });
  const businessId = businessesData?.businesses?.[0]?.id;
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");
  const createReview = useCreateReview();

  const QUICK_TAGS = ["Great quality", "Fast delivery", "Well packaged", "Friendly rider", "Will order again"];

  const handleSubmit = async () => {
    try {
      if (!customer?.id || !businessId) throw new Error("Missing customer or business session");
      await createReview.mutateAsync({ data: { orderId, customerId: customer.id, businessId, rating, comment } });
    } catch {}
    navigate("/customer/home");
  };

  return (
    <div className="min-h-full bg-white flex flex-col">
      <div className="bg-white px-5 pt-5 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/customer/home")} className="p-2 rounded-full hover:bg-gray-100">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="font-bold text-lg text-gray-900">Rate Your Order</h1>
        </div>
      </div>

      <div className="flex-1 px-6 py-8 flex flex-col items-center">
        <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
          <Star className="w-10 h-10 text-yellow-400 fill-yellow-400" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">How was your experience?</h2>
        <p className="text-sm text-gray-500 mb-6">Order #{orderId} with CleanMaster Laundry</p>

        {/* Star Rating */}
        <div className="flex gap-3 mb-6">
          {[1, 2, 3, 4, 5].map(star => (
            <motion.button
              key={star}
              whileTap={{ scale: 0.85 }}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
            >
              <Star className={`w-10 h-10 transition-all ${(hovered || rating) >= star ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
            </motion.button>
          ))}
        </div>

        {rating > 0 && (
          <p className="text-sm font-medium text-gray-600 mb-5">
            {rating === 5 ? "Excellent!" : rating === 4 ? "Good!" : rating === 3 ? "Average" : rating === 2 ? "Poor" : "Terrible"}
          </p>
        )}

        {/* Quick Tags */}
        <div className="flex flex-wrap gap-2 mb-5 justify-center">
          {QUICK_TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => setComment(prev => prev ? `${prev}, ${tag}` : tag)}
              className="px-3 py-1.5 rounded-full border border-gray-200 text-xs text-gray-600 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Text Feedback */}
        <div className="w-full">
          <Textarea
            placeholder="Tell us more about your experience... (optional)"
            value={comment}
            onChange={e => setComment(e.target.value)}
            rows={3}
            className="rounded-xl border-gray-200 resize-none"
          />
        </div>
      </div>

      <div className="px-5 pb-4 pt-2 bg-white border-t border-gray-100">
        <Button
          onClick={handleSubmit}
          disabled={rating === 0 || createReview.isPending}
          className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-semibold"
        >
          {createReview.isPending ? "Submitting..." : "Submit Review"}
        </Button>
      </div>
    </div>
  );
}
