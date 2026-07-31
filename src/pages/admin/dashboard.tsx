import { Store, Users, DollarSign, TrendingUp, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  useGetPlatformAnalytics,
  useListBusinesses,
  useGetRevenueTrend,
} from "@/lib/api-client-react";
import {
  PageHeader,
  StatCard,
  LoadingState,
  ErrorState,
  EmptyState,
} from "@/components/states";

function formatCurrency(value: number): string {
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(1)}K`;
  return `₹${value.toFixed(0)}`;
}

export default function AdminDashboard() {
  const statsQuery = useGetPlatformAnalytics();
  const businessesQuery = useListBusinesses({ limit: 5 });
  const trendQuery = useGetRevenueTrend({ period: "month" });

  const stats = statsQuery.data as
    | {
        totalBusinesses?: number;
        totalUsers?: number;
        totalRevenue?: number;
        totalCommission?: number;
        totalOrders?: number;
        newUsersThisMonth?: number;
        newBusinessesThisMonth?: number;
      }
    | undefined;

  const businessList = (businessesQuery.data as { businesses?: any[] } | undefined)?.businesses ?? [];
  const pendingApprovals = businessList.filter((b: any) => b.status === "pending").length;

  // Revenue trend API returns { date, revenue, orders }.
  const chartData = ((trendQuery.data as any[]) ?? []).map((p) => ({
    date: typeof p.date === "string" ? p.date.slice(5) : p.date,
    revenue: Number(p.revenue ?? 0),
    orders: Number(p.orders ?? 0),
  }));

  const loading = statsQuery.isLoading;

  const kpis = [
    {
      label: "Total Businesses",
      value: stats?.totalBusinesses ?? 0,
      icon: Store,
      hint: `+${stats?.newBusinessesThisMonth ?? 0} this month`,
    },
    {
      label: "Total Customers",
      value: stats?.totalUsers ?? 0,
      icon: Users,
      hint: `+${stats?.newUsersThisMonth ?? 0} this month`,
    },
    {
      label: "Platform GMV",
      value: formatCurrency(Number(stats?.totalRevenue ?? 0)),
      icon: DollarSign,
      hint: `${stats?.totalOrders ?? 0} total orders`,
    },
    {
      label: "Platform Commission",
      value: formatCurrency(Number(stats?.totalCommission ?? 0)),
      icon: TrendingUp,
      hint: `${pendingApprovals} pending approvals`,
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      <PageHeader
        title="Platform Analytics"
        subtitle={
          <span className="flex items-center gap-1.5">
            <Activity className="h-4 w-4 text-emerald-500" aria-hidden="true" /> Platform
            engine is healthy
          </span>
        }
      />

      {statsQuery.isError ? (
        <ErrorState
          message="We couldn't load platform analytics."
          onRetry={() => statsQuery.refetch()}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {kpis.map((card) => (
            <StatCard
              key={card.label}
              label={card.label}
              value={card.value}
              icon={card.icon}
              hint={card.hint}
              loading={loading}
            />
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-bold uppercase tracking-wide">
              Revenue Trend (30 days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {trendQuery.isLoading ? (
              <LoadingState label="Loading trend…" />
            ) : trendQuery.isError ? (
              <ErrorState onRetry={() => trendQuery.refetch()} />
            ) : chartData.length === 0 ? (
              <EmptyState
                title="No revenue yet"
                message="Revenue trend will appear once orders start coming in."
              />
            ) : (
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(199 89% 48%)" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="hsl(199 89% 48%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fontWeight: 700, fill: "#94a3b8" }}
                    dy={10}
                    interval={4}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fontWeight: 700, fill: "#94a3b8" }}
                    tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="hsl(199 89% 48%)"
                    strokeWidth={3}
                    fill="url(#revGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-bold uppercase tracking-wide">
              New Partners
            </CardTitle>
          </CardHeader>
          <CardContent>
            {businessesQuery.isLoading ? (
              <LoadingState label="Loading partners…" />
            ) : businessesQuery.isError ? (
              <ErrorState onRetry={() => businessesQuery.refetch()} />
            ) : businessList.length === 0 ? (
              <EmptyState title="No businesses yet" message="Approved partners will show up here." />
            ) : (
              <div className="space-y-3">
                {businessList.map((biz: any) => (
                  <div
                    key={biz.id}
                    className="flex items-center gap-4 rounded-xl bg-muted/40 p-3"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-background shadow-sm">
                      <span className="text-lg font-bold text-primary">
                        {(biz.name ?? biz.shopName ?? "?").toString().charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-foreground">
                        {biz.name ?? biz.shopName ?? "Business"}
                      </p>
                      <p className="text-xs text-muted-foreground">{biz.city ?? "—"}</p>
                    </div>
                    <Badge variant={biz.status === "active" ? "default" : "secondary"}>
                      {biz.status ?? "pending"}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
