import { Link } from "wouter";
import { Clock, ChevronRight } from "lucide-react";
import { getCurrentCustomer } from "@/lib/session";
import { useListOrders } from "@/lib/api-client-react";

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  requested: { label: "Placed", color: "bg-yellow-100 text-yellow-700" },
  accepted: { label: "Accepted", color: "bg-blue-100 text-blue-700" },
  cleaning: { label: "In Process", color: "bg-orange-100 text-orange-700" },
  ready: { label: "Ready", color: "bg-purple-100 text-purple-700" },
  delivered: { label: "Delivered", color: "bg-green-100 text-green-700" },
  cancelled: { label: "Cancelled", color: "bg-red-100 text-red-700" },
};

export default function CustomerOrders() {
  const customer = getCurrentCustomer();
  const customerId = customer?.id ?? "";
  const { data: ordersData } = useListOrders({ customerId }, { query: { enabled: !!customerId } as any });
  const orders = ordersData?.orders ?? [];

  return (
    <div className="min-h-full bg-gray-50 pb-6">
      <div className="px-5 pt-6">
        <h2 className="text-lg font-semibold text-gray-900">Your Orders</h2>
        <p className="text-sm text-gray-500">All recent orders and their statuses</p>
      </div>

      <div className="px-5 mt-4 space-y-3">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2"><Clock className="w-4 h-4 text-blue-500" /> Orders</h3>
          <div className="space-y-3">
            {orders.map((order: any) => (
              <Link key={order.id} href={`/customer/track/${order.id}`}>
                <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0 cursor-pointer hover:bg-gray-50 rounded-lg px-1">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Order #{String(order.id).slice(-6).padStart(6, '0')}</p>
                    <p className="text-xs text-gray-500">{order.pickupDate ? new Date(order.pickupDate).toLocaleString() : (order.createdAt ? new Date(order.createdAt).toLocaleString() : '-')}</p>
                  </div>
                  <div className="text-right flex items-center gap-2">
                    <div>
                      <p className="text-sm font-bold text-gray-900">₹{order.total}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_LABELS[order.status]?.color ?? "bg-gray-100 text-gray-600"}`}>
                        {STATUS_LABELS[order.status]?.label ?? order.status}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </Link>
            ))}

            {orders.length === 0 && <p className="text-sm text-gray-400 text-center py-4">No orders yet</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
