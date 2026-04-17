import { useState } from "react";
import { motion } from "framer-motion";
import { Search, User, ShoppingBag, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useListCustomers, useGetCustomerStats } from "@/lib/api-client-react";

function CustomerRow({ customer }: { customer: any }) {
  const { data: stats } = useGetCustomerStats(customer.id);
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-bold text-sm">{customer.name[0]}</span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{customer.name}</p>
            <p className="text-xs text-gray-500">{customer.phone}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 text-sm text-gray-700">{stats?.totalOrders ?? "-"}</td>
      <td className="px-4 py-3 text-sm font-medium text-gray-900">{stats ? `₹${stats.totalSpend?.toFixed(0)}` : "-"}</td>
      <td className="px-4 py-3 text-sm text-gray-600">{stats ? `₹${stats.averageOrderValue?.toFixed(0)}` : "-"}</td>
      <td className="px-4 py-3">
        <span className={`text-xs px-2 py-1 rounded-full ${customer.isBlocked ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>
          {customer.isBlocked ? "Blocked" : "Active"}
        </span>
      </td>
    </tr>
  );
}

export default function BusinessCustomers() {
  const [search, setSearch] = useState("");
  const { data: result } = useListCustomers({ search, limit: 20 });
  const customers = result?.customers ?? [];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Customer CRM</h2>
        <p className="text-gray-500 text-sm">View and manage your customer relationships</p>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total Customers", value: result?.total ?? 0, icon: User, color: "bg-blue-50 text-blue-600" },
          { label: "Orders This Month", value: 48, icon: ShoppingBag, color: "bg-green-50 text-green-600" },
          { label: "Avg. Lifetime Value", value: "₹1,240", icon: TrendingUp, color: "bg-purple-50 text-purple-600" },
        ].map(stat => (
          <div key={stat.label} className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search customers..." className="pl-10 rounded-xl" />
      </div>
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Customer</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Orders</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Total Spend</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Avg Order</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {customers.map(c => <CustomerRow key={c.id} customer={c} />)}
            </tbody>
          </table>
          {customers.length === 0 && (
            <div className="text-center py-10 text-gray-400 text-sm">No customers found</div>
          )}
        </div>
      </div>
    </div>
  );
}
