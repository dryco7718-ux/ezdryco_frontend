import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, TrendingUp, Clock, Users, ArrowUpRight, Pencil, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useGetBusinessStats, useGetRevenueTrend, useListOrders } from "@/lib/api-client-react";
import { getCurrentBusiness, updateBusinessSession } from "@/lib/session";
import { updateBusinessProfile } from "@/lib/profile-api";

const STATUS_COLORS: Record<string, string> = {
  requested: "bg-yellow-100 text-yellow-700",
  accepted: "bg-sky-100 text-sky-700",
  picked_up: "bg-blue-100 text-blue-700",
  cleaning: "bg-cyan-100 text-cyan-700",
  out_for_delivery: "bg-indigo-100 text-indigo-700",
  delivered: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function BusinessDashboard() {
  const business = getCurrentBusiness();
  const businessId = business?.id ?? "";
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileMessage, setProfileMessage] = useState("");
  const [profileForm, setProfileForm] = useState({
    name: business?.shopName ?? "",
    phone: business?.phone ?? "",
    email: business?.email ?? "",
    address: business?.address ?? "",
    city: business?.city ?? "",
    pincode: "",
    description: "",
  });
  const { data: stats } = useGetBusinessStats(businessId, { query: { enabled: !!businessId } as any });
  const { data: trend } = useGetRevenueTrend({ businessId: businessId || undefined, period: "week" }, { query: { enabled: !!businessId } as any });
  const { data: ordersData } = useListOrders({ businessId: businessId || undefined, limit: 5 }, { query: { enabled: !!businessId } as any });

  const chartData = (trend ?? []).map((p: any) => ({
    date: p.date?.slice(0, 3) || p.date,
    revenue: p.revenue,
    orders: p.orders,
  }));
  const recentOrders = ordersData?.orders ?? [];

  const handleSaveBusinessProfile = async () => {
    if (!businessId) return;
    if (!profileForm.name.trim() || !profileForm.address.trim() || !profileForm.city.trim()) {
      setProfileMessage("Shop name, address aur city required hain.");
      return;
    }

    setProfileSaving(true);
    setProfileMessage("");
    try {
      await updateBusinessProfile(businessId, {
        name: profileForm.name.trim(),
        phone: profileForm.phone.trim(),
        email: profileForm.email.trim(),
        address: profileForm.address.trim(),
        city: profileForm.city.trim(),
        pincode: profileForm.pincode.trim(),
        description: profileForm.description.trim(),
      });
      updateBusinessSession({
        shopName: profileForm.name.trim(),
        phone: profileForm.phone.trim(),
        email: profileForm.email.trim(),
        address: profileForm.address.trim(),
        city: profileForm.city.trim(),
      });
      setEditingProfile(false);
      setProfileMessage("Business profile updated.");
    } catch (error) {
      setProfileMessage(error instanceof Error ? error.message : "Business profile update failed.");
    } finally {
      setProfileSaving(false);
    }
  };

  const KPI_CARDS = [
    { label: "Total Orders", value: stats?.totalOrders ?? 0, icon: ShoppingCart, color: "text-sky-600", bg: "bg-sky-50", trend: `${stats?.ordersToday ?? 0} today` },
    { label: "Revenue Today", value: `₹${stats?.revenueToday?.toFixed(0) ?? "0"}`, icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50", trend: `₹${stats?.revenueThisMonth?.toFixed(0) ?? "0"} this month` },
    { label: "Pending", value: stats?.pendingPickups ?? 0, icon: Clock, color: "text-orange-600", bg: "bg-orange-50", trend: "Needs action" },
    { label: "Customers", value: stats?.totalCustomers ?? 0, icon: Users, color: "text-purple-600", bg: "bg-purple-50", trend: `${stats?.activeRiders ?? 0} active riders` },
  ];

  return (
    <div className="p-3 sm:p-4 space-y-4 max-w-6xl mx-auto">
      <div className="pt-1">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-400 text-sm">Your business overview</p>
      </div>

      <Card className="border border-sky-100 shadow-sm rounded-2xl">
        <CardHeader className="pb-2 px-4 pt-4 flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-semibold text-gray-700">Business Profile</CardTitle>
          <button onClick={() => setEditingProfile((prev) => !prev)} className="text-sm text-sky-600 font-medium flex items-center gap-1">
            <Pencil className="w-4 h-4" /> {editingProfile ? "Close" : "Edit"}
          </button>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          {editingProfile ? (
            <div className="grid gap-3 md:grid-cols-2">
              <Input value={profileForm.name} onChange={(e) => setProfileForm((prev) => ({ ...prev, name: e.target.value }))} placeholder="Shop name" />
              <Input value={profileForm.phone} onChange={(e) => setProfileForm((prev) => ({ ...prev, phone: e.target.value.replace(/\D/g, "").slice(0, 10) }))} placeholder="Phone" />
              <Input value={profileForm.email} onChange={(e) => setProfileForm((prev) => ({ ...prev, email: e.target.value }))} placeholder="Email" />
              <Input value={profileForm.city} onChange={(e) => setProfileForm((prev) => ({ ...prev, city: e.target.value }))} placeholder="City" />
              <Input value={profileForm.pincode} onChange={(e) => setProfileForm((prev) => ({ ...prev, pincode: e.target.value.replace(/\D/g, "").slice(0, 6) }))} placeholder="Pincode" />
              <Input value={profileForm.description} onChange={(e) => setProfileForm((prev) => ({ ...prev, description: e.target.value }))} placeholder="Short description" />
              <textarea
                value={profileForm.address}
                onChange={(e) => setProfileForm((prev) => ({ ...prev, address: e.target.value }))}
                placeholder="Business address"
                rows={3}
                className="md:col-span-2 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
              <div className="md:col-span-2">
                <Button onClick={handleSaveBusinessProfile} disabled={profileSaving} className="rounded-xl bg-sky-600 hover:bg-sky-700 text-white">
                  <Save className="w-4 h-4 mr-2" /> {profileSaving ? "Saving..." : "Save Business Profile"}
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid gap-1 text-sm text-gray-600 md:grid-cols-2">
              <p><span className="font-medium text-gray-900">Shop:</span> {business?.shopName ?? "-"}</p>
              <p><span className="font-medium text-gray-900">Phone:</span> {business?.phone ?? "-"}</p>
              <p><span className="font-medium text-gray-900">Email:</span> {business?.email ?? "-"}</p>
              <p><span className="font-medium text-gray-900">City:</span> {business?.city ?? "-"}</p>
              <p className="md:col-span-2"><span className="font-medium text-gray-900">Address:</span> {business?.address ?? "-"}</p>
            </div>
          )}
          {profileMessage && <p className="text-xs text-sky-600 mt-3">{profileMessage}</p>}
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        {KPI_CARDS.map((card, i) => (
          <motion.div key={card.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="border border-sky-100 shadow-sm rounded-2xl">
              <CardContent className="p-3 sm:p-4 min-h-[124px]">
                <div className={`w-9 h-9 ${card.bg} rounded-xl flex items-center justify-center mb-2`}>
                  <card.icon className={`w-4 h-4 ${card.color}`} />
                </div>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{card.value}</p>
                <p className="text-xs text-gray-500 mb-1">{card.label}</p>
                <p className="text-xs text-emerald-500 flex items-center gap-0.5 font-medium">
                  <ArrowUpRight className="w-3 h-3" />{card.trend}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <Card className="border border-sky-100 shadow-sm rounded-2xl">
          <CardHeader className="pb-2 px-4 pt-4">
            <CardTitle className="text-sm font-semibold text-gray-700">Revenue (7 Days)</CardTitle>
          </CardHeader>
          <CardContent className="px-2 pb-4">
            {chartData.length === 0 ? (
              <div className="flex h-[160px] items-center justify-center text-sm text-gray-400">
                No revenue data available yet.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={160}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f9ff" />
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} width={40} />
                  <Tooltip formatter={(val: any) => [`₹${val}`, "Revenue"]} />
                  <Line type="monotone" dataKey="revenue" stroke="#0ea5e9" strokeWidth={2.5} dot={{ fill: "#0ea5e9", r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card className="border border-sky-100 shadow-sm rounded-2xl">
          <CardHeader className="pb-2 px-4 pt-4">
            <CardTitle className="text-sm font-semibold text-gray-700">Orders (7 Days)</CardTitle>
          </CardHeader>
          <CardContent className="px-2 pb-4">
            {chartData.length === 0 ? (
              <div className="flex h-[160px] items-center justify-center text-sm text-gray-400">
                No order trend available yet.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f9ff" />
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} width={30} />
                  <Tooltip />
                  <Bar dataKey="orders" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="border border-sky-100 shadow-sm rounded-2xl">
        <CardHeader className="pb-2 px-4 pt-4">
          <CardTitle className="text-sm font-semibold text-gray-700">Recent Orders</CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          {recentOrders.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-6">No orders yet</p>
          ) : (
            <div className="space-y-2">
              {recentOrders.map(order => (
                <div key={order.id} className="flex items-center gap-3 p-3 bg-sky-50/50 rounded-xl active:scale-[0.99] transition-transform">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">#{order.id}</p>
                    <p className="text-xs text-gray-400 truncate">
                      {(order.items as any[]).map((i: any) => i.itemName).join(", ")}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-gray-900">₹{order.total}</p>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${STATUS_COLORS[order.status] ?? "bg-gray-100 text-gray-600"}`}>
                      {order.status.replace(/_/g, " ")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
