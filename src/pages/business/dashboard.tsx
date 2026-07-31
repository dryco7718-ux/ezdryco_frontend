import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, TrendingUp, Clock, Users, ArrowUpRight, Pencil, Save, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useGetBusinessStats, useGetRevenueTrend, useListOrders } from "@/lib/api-client-react";
import { getCurrentBusiness, updateBusinessSession } from "@/lib/session";
import { updateBusinessProfile } from "@/lib/profile-api";
import { ErrorState } from "@/components/states";

const STATUS_COLORS: Record<string, string> = {
  requested: "bg-amber-100 text-amber-700",
  accepted: "bg-indigo-100 text-indigo-700",
  picked_up: "bg-blue-100 text-blue-700",
  cleaning: "bg-violet-100 text-violet-700",
  out_for_delivery: "bg-indigo-600 text-white shadow-sm",
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
  const statsQuery = useGetBusinessStats(businessId, { query: { enabled: !!businessId } as any });
  const stats = statsQuery.data as any;
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
      setProfileMessage("Shop name, address and city are required.");
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
      setProfileMessage("Business profile updated successfully.");
    } catch (error) {
      setProfileMessage(error instanceof Error ? error.message : "Profile update failed.");
    } finally {
      setProfileSaving(false);
    }
  };

  const KPI_CARDS = [
    { label: "Total Orders", value: stats?.totalOrders ?? 0, icon: ShoppingCart, color: "text-indigo-600", bg: "bg-indigo-50", trend: `${stats?.ordersToday ?? 0} new today` },
    { label: "Revenue Today", value: `₹${stats?.revenueToday?.toFixed(0) ?? "0"}`, icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50", trend: `₹${stats?.revenueThisMonth?.toFixed(0) ?? "0"} this month` },
    { label: "Pending", value: stats?.pendingPickups ?? 0, icon: Clock, color: "text-amber-600", bg: "bg-amber-50", trend: "Needs attention" },
    { label: "Customers", value: stats?.totalCustomers ?? 0, icon: Users, color: "text-violet-600", bg: "bg-violet-50", trend: `${stats?.activeRiders ?? 0} riders online` },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h2 className="text-2xl font-black text-gray-900 tracking-tight">Business Overview</h2>
        <p className="text-gray-400 text-sm font-medium">Real-time performance metrics</p>
      </div>

      {statsQuery.isError ? (
        <ErrorState
          message="We couldn't load your business metrics."
          onRetry={() => statsQuery.refetch()}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {KPI_CARDS.map((card, i) => (
            <motion.div key={card.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="border-none bg-white shadow-xl shadow-gray-200/40 rounded-[2rem] overflow-hidden group hover:scale-[1.02] transition-all">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 ${card.bg} rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:rotate-12`}>
                    <card.icon className={`w-6 h-6 ${card.color}`} />
                  </div>
                  {statsQuery.isLoading ? (
                    <div className="h-8 w-24 animate-pulse rounded-md bg-gray-100 mb-1" />
                  ) : (
                    <p className="text-3xl font-black text-gray-900 tracking-tighter mb-1">{card.value}</p>
                  )}
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">{card.label}</p>
                  <div className="flex items-center gap-1.5 text-[11px] font-black text-emerald-500 uppercase tracking-tight bg-emerald-50 w-fit px-2 py-0.5 rounded-lg">
                    <ArrowUpRight className="w-3 h-3" />{card.trend}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="xl:col-span-1 border-none bg-white shadow-xl shadow-gray-200/40 rounded-[2.5rem]">
          <CardHeader className="p-8 pb-0 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base font-black text-gray-900 uppercase tracking-widest">Profile</CardTitle>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setEditingProfile((prev) => !prev)} 
              className="rounded-xl border-indigo-100 text-indigo-600 font-bold h-9"
            >
              {editingProfile ? "Cancel" : "Edit Profile"}
            </Button>
          </CardHeader>
          <CardContent className="p-8">
            {editingProfile ? (
              <div className="grid gap-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-gray-400 uppercase ml-1">Shop Name</p>
                  <Input value={profileForm.name} onChange={(e) => setProfileForm((prev) => ({ ...prev, name: e.target.value }))} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-gray-400 uppercase ml-1">Phone</p>
                    <Input value={profileForm.phone} onChange={(e) => setProfileForm((prev) => ({ ...prev, phone: e.target.value.replace(/\D/g, "").slice(0, 10) }))} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-gray-400 uppercase ml-1">Pincode</p>
                    <Input value={profileForm.pincode} onChange={(e) => setProfileForm((prev) => ({ ...prev, pincode: e.target.value.replace(/\D/g, "").slice(0, 6) }))} />
                  </div>
                </div>
                <textarea
                  value={profileForm.address}
                  onChange={(e) => setProfileForm((prev) => ({ ...prev, address: e.target.value }))}
                  placeholder="Full business address"
                  rows={3}
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
                <Button onClick={handleSaveBusinessProfile} disabled={profileSaving} className="rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black h-12">
                  {profileSaving ? "Saving..." : "Update Business Profile"}
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center border-2 border-indigo-100">
                    <Users className="w-7 h-7 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-lg font-black text-gray-900 leading-tight">{business?.shopName || "EZDRY Partner"}</p>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{business?.city || "Narnaul"}</p>
                  </div>
                </div>
                <div className="space-y-4 pt-4 border-t border-gray-50">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-400 uppercase">Phone</span>
                    <span className="text-sm font-black text-gray-900">{business?.phone || "Not provided"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-400 uppercase">Email</span>
                    <span className="text-sm font-black text-gray-900 truncate max-w-[200px]">{business?.email || "Not provided"}</span>
                  </div>
                  <div className="pt-2">
                    <span className="text-xs font-bold text-gray-400 uppercase block mb-1">Address</span>
                    <p className="text-sm font-bold text-gray-700 leading-relaxed">{business?.address || "Address not updated"}</p>
                  </div>
                </div>
              </div>
            )}
            {profileMessage && <p className="text-xs text-center font-bold text-indigo-600 mt-6 bg-indigo-50 p-2 rounded-xl">{profileMessage}</p>}
          </CardContent>
        </Card>

        {/* Analytics Card */}
        <Card className="xl:col-span-2 border-none bg-white shadow-xl shadow-gray-200/40 rounded-[2.5rem]">
          <CardHeader className="p-8 pb-0">
            <CardTitle className="text-base font-black text-gray-900 uppercase tracking-widest">Revenue Insights</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            {chartData.length === 0 ? (
              <div className="flex h-[240px] items-center justify-center text-sm font-bold text-gray-300">
                No performance data available yet.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} 
                    tickFormatter={(val) => `₹${val}`}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', padding: '15px' }}
                    itemStyle={{ fontWeight: 800, fontSize: '14px' }}
                    labelStyle={{ fontWeight: 800, fontSize: '12px', color: '#94a3b8', marginBottom: '5px' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#4f46e5" 
                    strokeWidth={4} 
                    dot={{ fill: "#4f46e5", strokeWidth: 2, r: 6, stroke: '#fff' }} 
                    activeDot={{ r: 8, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-none bg-white shadow-xl shadow-gray-200/40 rounded-[2.5rem]">
          <CardHeader className="p-8 pb-4 flex flex-row items-center justify-between">
            <CardTitle className="text-base font-black text-gray-900 uppercase tracking-widest">Recent Activity</CardTitle>
            <Button variant="ghost" size="sm" className="text-indigo-600 font-bold hover:bg-indigo-50 rounded-xl">View Orders</Button>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            {recentOrders.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingCart className="w-8 h-8 text-gray-200" />
                </div>
                <p className="text-gray-400 font-bold">No recent orders found</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentOrders.map(order => (
                  <div key={order.id} className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-[1.5rem] transition-all group">
                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center font-black text-gray-400 text-xs group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
                      #{String(order.id).slice(-4).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-black text-gray-900 truncate">
                        {(order.items as any[]).map((i: any) => i.itemName).join(", ")}
                      </p>
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-tighter">
                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A"} at {order.createdAt ? new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "N/A"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-black text-gray-900 tracking-tighter">₹{order.total}</p>
                      <span className={`text-[9px] px-2.5 py-1 rounded-full font-black uppercase tracking-wider ${STATUS_COLORS[order.status] ?? "bg-gray-100 text-gray-600"}`}>
                        {order.status.replace(/_/g, " ")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-none bg-indigo-600 shadow-xl shadow-indigo-200 rounded-[2.5rem] text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Zap className="w-32 h-32" />
          </div>
          <CardHeader className="p-8">
            <CardTitle className="text-base font-black uppercase tracking-widest text-indigo-200">System Pulse</CardTitle>
          </CardHeader>
          <CardContent className="p-8 pt-0 space-y-6">
            <div className="space-y-1">
              <p className="text-3xl font-black tracking-tighter">Active Today</p>
              <p className="text-indigo-200 font-bold text-sm">Your business health score is Excellent</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-4 border border-white/10">
                <p className="text-2xl font-black tracking-tighter">{stats?.activeRiders ?? 0}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-200">Active Riders</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-4 border border-white/10">
                <p className="text-2xl font-black tracking-tighter">{stats?.ordersToday ?? 0}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-200">New Orders</p>
              </div>
            </div>
            <Button className="w-full h-14 bg-white text-indigo-600 hover:bg-indigo-50 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg">
              Manage Riders
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
