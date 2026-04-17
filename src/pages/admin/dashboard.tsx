import { motion } from "framer-motion";
import { Store, Users, DollarSign, TrendingUp, ArrowUpRight, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useGetPlatformAnalytics, useListBusinesses, useGetRevenueTrend } from "@/lib/api-client-react";

export default function AdminDashboard() {
  const { data: stats } = useGetPlatformAnalytics();
  const { data: businesses } = useListBusinesses({ limit: 5 });
  const { data: trend } = useGetRevenueTrend({ period: "month" });
  const businessList = businesses?.businesses ?? [];
  const pendingApprovals = businessList.filter((business: any) => business.status === "pending").length;

  const chartData = (trend ?? []).map((p: any) => ({
    date: p.date?.slice(5) || p.date,
    gmv: p.gmv,
    commission: p.commission,
  }));

  const KPIS = [
    { label: "Total Businesses", value: stats?.totalBusinesses ?? 0, icon: Store, color: "text-blue-600", bg: "bg-blue-50", trend: `+${stats?.newBusinessesThisMonth ?? 0} this month` },
    { label: "Total Customers", value: stats?.totalUsers ?? 0, icon: Users, color: "text-green-600", bg: "bg-green-50", trend: `+${stats?.newUsersThisMonth ?? 0} this month` },
    { label: "Platform GMV", value: `₹${(((stats?.totalRevenue as number) ?? 0) / 100000).toFixed(1)}L`, icon: DollarSign, color: "text-purple-600", bg: "bg-purple-50", trend: `${stats?.totalOrders ?? 0} total orders` },
    { label: "Platform Commission", value: `₹${(((stats?.totalCommission as number) ?? 0) / 1000).toFixed(0)}K`, icon: TrendingUp, color: "text-orange-600", bg: "bg-orange-50", trend: `${pendingApprovals} pending approvals` },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Platform Overview</h2>
        <p className="text-gray-500 text-sm flex items-center gap-1"><Activity className="w-3.5 h-3.5 text-green-500" /> All systems operational</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {KPIS.map((card, i) => (
          <motion.div key={card.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className={`w-10 h-10 ${card.bg} rounded-xl flex items-center justify-center mb-3`}>
                  <card.icon className={`w-5 h-5 ${card.color}`} />
                </div>
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                <p className="text-sm text-gray-500 mb-1">{card.label}</p>
                <p className="text-xs text-green-600 flex items-center gap-0.5 font-medium"><ArrowUpRight className="w-3 h-3" />{card.trend}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Revenue Chart */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-gray-900">Platform GMV & Commission (30 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          {chartData.length === 0 ? (
            <div className="flex h-[240px] items-center justify-center text-sm text-gray-400">
              No revenue trend data available yet.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="gmvGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="commGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9333EA" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#9333EA" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} interval={4} />
                <YAxis tick={{ fontSize: 10 }} tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(val: any, name: string) => [`₹${val.toLocaleString()}`, name === "gmv" ? "GMV" : "Commission"]} />
                <Area type="monotone" dataKey="gmv" stroke="#2563EB" strokeWidth={2} fill="url(#gmvGrad)" />
                <Area type="monotone" dataKey="commission" stroke="#9333EA" strokeWidth={2} fill="url(#commGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* Recent Businesses */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-gray-900">Businesses on Platform</CardTitle>
        </CardHeader>
        <CardContent>
          {businessList.length === 0 ? (
            <p className="py-6 text-center text-sm text-gray-400">No businesses available yet.</p>
          ) : (
            <div className="space-y-3">
              {businessList.map((biz: any) => (
              <div key={biz.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <span className="text-green-600 font-bold">{biz.name[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{biz.name}</p>
                  <p className="text-xs text-gray-500">{biz.city} • {biz.phone}</p>
                </div>
                <div className="text-right">
                  <Badge className={biz.status === "active" ? "bg-green-100 text-green-700 border-0" : "bg-red-100 text-red-700 border-0"}>
                    {biz.status === "active" ? "Active" : biz.status}
                  </Badge>
                  <p className="text-xs text-gray-500 mt-0.5">{biz.commissionRate ?? 20}% comm.</p>
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
