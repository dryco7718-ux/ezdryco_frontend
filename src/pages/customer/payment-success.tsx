import { useEffect } from "react";
import { useLocation, Link } from "wouter";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentSuccess() {
  const [location] = useLocation();
  const params = new URLSearchParams(location.split("?")[1] || "");
  const orderId = params.get("orderId") || "1";

  return (
    <div className="min-h-full bg-white flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="mb-6"
      >
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-14 h-14 text-green-500" />
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
        <p className="text-gray-500 mb-1">Your order has been placed</p>
        <p className="text-blue-600 font-semibold mb-6">Order #{orderId}</p>

        <div className="bg-gray-50 rounded-2xl p-4 mb-6 text-left space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Pickup scheduled for</span>
            <span className="font-medium text-gray-900">Tomorrow, 9 AM</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Estimated delivery</span>
            <span className="font-medium text-gray-900">2-3 days</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Payment method</span>
            <span className="font-medium text-gray-900">UPI</span>
          </div>
        </div>

        <Link href={`/customer/track/${orderId}`}>
          <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl mb-3 font-semibold">
            Track Order <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
        <Link href="/customer/home">
          <Button variant="outline" className="w-full h-12 rounded-2xl border-gray-200 text-gray-600">
            Back to Home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
