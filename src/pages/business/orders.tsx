import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Phone, MapPinned, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useListOrders, useUpdateOrder, useListRiders, useAssignRider } from "@/lib/api-client-react";
import { getCurrentBusiness } from "@/lib/session";

const STATUS_COLORS: Record<string, string> = {
  requested: "bg-yellow-100 text-yellow-700 border-yellow-200",
  accepted: "bg-blue-100 text-blue-700 border-blue-200",
  picked_up: "bg-indigo-100 text-indigo-700 border-indigo-200",
  cleaning: "bg-orange-100 text-orange-700 border-orange-200",
  out_for_delivery: "bg-purple-100 text-purple-700 border-purple-200",
  delivered: "bg-green-100 text-green-700 border-green-200",
  cancelled: "bg-red-100 text-red-700 border-red-200",
};

export default function BusinessOrders() {
  const business = getCurrentBusiness();
  const businessId = business?.id;
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const { data: ordersData, refetch } = useListOrders({ businessId, limit: 50, status: statusFilter === "all" ? undefined : statusFilter }, { query: { enabled: !!businessId } as any });
  const { data: riders } = useListRiders({ businessId }, { query: { enabled: !!businessId } as any });
  const updateOrder = useUpdateOrder();
  const assignRider = useAssignRider();

  const orders = ordersData?.orders ?? [];
  const filteredOrders = orders.filter((order) => {
    if (!search.trim()) return true;
    const q = search.trim().toLowerCase();
    return (
      order.id.toLowerCase().includes(q)
      || order.customer?.name?.toLowerCase().includes(q)
      || order.customer?.phone?.toLowerCase().includes(q)
      || order.customer?.address?.toLowerCase().includes(q)
    );
  });

  const handleStatusUpdate = async (orderId: string, status: string) => {
    await updateOrder.mutateAsync({ id: orderId, data: { status: status as any } });
    refetch();
  };

  const handleAssignRider = async (orderId: string, riderId: string) => {
    await assignRider.mutateAsync({ id: orderId, data: { riderId } });
    refetch();
  };

  const openMap = (order: any) => {
    const lat = order.customer?.lat ? Number(order.customer.lat) : null;
    const lng = order.customer?.lng ? Number(order.customer.lng) : null;
    const address = [order.customer?.address, order.customer?.city, order.customer?.pincode].filter(Boolean).join(", ");

    const url = lat != null && lng != null
      ? `https://www.google.com/maps?q=${lat},${lng}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address || order.customer?.name || "customer location")}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Orders</h2>
        <p className="text-gray-500 text-sm">Manage and track all customer orders</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input placeholder="Search orders..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10 rounded-xl" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48 rounded-xl">
            <Filter className="w-4 h-4 mr-2 text-gray-400" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="requested">Requested</SelectItem>
            <SelectItem value="accepted">Accepted</SelectItem>
            <SelectItem value="picked_up">Picked Up</SelectItem>
            <SelectItem value="cleaning">Cleaning</SelectItem>
            <SelectItem value="out_for_delivery">Out for Delivery</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Order</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Customer</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Items</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map(order => (
                <motion.tr key={order.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">#{order.id}</p>
                      <p className="text-xs text-gray-500">{order.pickupDate}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <UserCircle className="w-6 h-6 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{order.customer?.name ?? "Customer"}</p>
                        <p className="text-xs text-gray-500">{order.customer?.phone ?? ""}</p>
                        <p className="text-[11px] text-gray-400 max-w-[220px] truncate">{order.customer?.address ?? "Address unavailable"}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-gray-600">
                      {(order.items as any[]).slice(0, 2).map((i: any) => `${i.itemName}×${i.quantity}`).join(", ")}
                      {(order.items as any[]).length > 2 && " +more"}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm font-bold text-gray-900">₹{order.total}</p>
                    <p className="text-xs text-gray-500">{order.paymentMethod}</p>
                  </td>
                  <td className="px-4 py-3">
                    <Select value={order.status} onValueChange={(val) => handleStatusUpdate(order.id, val)}>
                      <SelectTrigger className={`w-36 h-8 text-xs border rounded-lg ${STATUS_COLORS[order.status]}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="requested">Requested</SelectItem>
                        <SelectItem value="accepted">Accepted</SelectItem>
                        <SelectItem value="picked_up">Picked Up</SelectItem>
                        <SelectItem value="cleaning">Cleaning</SelectItem>
                        <SelectItem value="out_for_delivery">Out for Delivery</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap items-center gap-2">
                      {order.status === "requested" && (
                        <Button size="sm" onClick={() => handleStatusUpdate(order.id, "accepted")} className="h-7 text-xs bg-green-500 hover:bg-green-600 text-white rounded-lg">Accept</Button>
                      )}
                      {!order.riderId && riders && riders.length > 0 && (
                        <Select onValueChange={(val) => handleAssignRider(order.id, val)}>
                          <SelectTrigger className="h-7 text-xs w-28 rounded-lg border-blue-200 text-blue-600">
                            <SelectValue placeholder="Assign" />
                          </SelectTrigger>
                          <SelectContent>
                            {riders.filter(r => r.isAvailable).map(r => (
                              <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                      {order.customer?.phone && (
                        <a
                          href={`tel:${order.customer.phone}`}
                          className="h-7 px-2 text-xs rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 inline-flex items-center gap-1"
                        >
                          <Phone className="w-3 h-3" /> Call
                        </a>
                      )}
                      <button
                        onClick={() => openMap(order)}
                        className="h-7 px-2 text-xs rounded-lg bg-sky-50 text-sky-700 border border-sky-200 inline-flex items-center gap-1"
                      >
                        <MapPinned className="w-3 h-3" /> Map
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {filteredOrders.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <ShoppingBagIcon />
              <p className="mt-2 text-sm">No orders found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ShoppingBagIcon() {
  return <svg className="w-12 h-12 mx-auto text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>;
}
