import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const REVENUE_DATA = Array.from({ length: 12 }, (_, i) => ({
  month: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i],
  gmv: Math.floor(Math.random() * 500000 + 300000),
  commission: Math.floor(Math.random() * 100000 + 60000),
}));

const SERVICE_DATA = [
  { name: "Wash", value: 45, color: "#2563EB" },
  { name: "Dry Clean", value: 30, color: "#16A34A" },
  { name: "Iron", value: 15, color: "#9333EA" },
  { name: "Express", value: 10, color: "#F59E0B" },
];

const CITY_DATA = [
  { city: "Bangalore", orders: 1240, revenue: 890000 },
  { city: "Mumbai", orders: 980, revenue: 750000 },
  { city: "Delhi", orders: 840, revenue: 620000 },
  { city: "Chennai", orders: 620, revenue: 480000 },
  { city: "Hyderabad", orders: 510, revenue: 390000 },
];

export default function Analytics() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Platform Analytics</h2>
        <p className="text-gray-500 text-sm">Comprehensive performance metrics</p>
      </div>

      {/* Revenue Trend */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-gray-900">Annual GMV & Commission</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={REVENUE_DATA}>
              <defs>
                <linearGradient id="gmv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="comm" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9333EA" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#9333EA" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
              <Tooltip formatter={(v: any, n: string) => [`₹${v.toLocaleString()}`, n === "gmv" ? "GMV" : "Commission"]} />
              <Legend />
              <Area type="monotone" dataKey="gmv" stroke="#2563EB" fill="url(#gmv)" strokeWidth={2} name="gmv" />
              <Area type="monotone" dataKey="commission" stroke="#9333EA" fill="url(#comm)" strokeWidth={2} name="commission" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Service Distribution */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-gray-900">Service Mix</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <ResponsiveContainer width={160} height={160}>
                <PieChart>
                  <Pie data={SERVICE_DATA} dataKey="value" cx="50%" cy="50%" innerRadius={50} outerRadius={70}>
                    {SERVICE_DATA.map(entry => <Cell key={entry.name} fill={entry.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 flex-1">
                {SERVICE_DATA.map(d => (
                  <div key={d.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ background: d.color }} />
                      <span className="text-gray-700">{d.name}</span>
                    </div>
                    <span className="font-semibold text-gray-900">{d.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* City-wise Performance */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-gray-900">Top Cities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {CITY_DATA.map((city, i) => (
                <div key={city.city} className="flex items-center gap-3">
                  <span className="text-xs font-bold text-gray-400 w-4">{i + 1}</span>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-900">{city.city}</span>
                      <span className="text-gray-500">{city.orders.toLocaleString()} orders</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${(city.orders / CITY_DATA[0].orders) * 100}%` }} />
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-green-600">₹{(city.revenue / 1000).toFixed(0)}k</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
