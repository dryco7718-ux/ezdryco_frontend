import { useState } from "react";
import { motion } from "framer-motion";
import { Percent, Save, TrendingUp, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useListBusinesses, useUpdateBusiness } from "@/lib/api-client-react";

export default function Commission() {
  const { data: businesses, refetch } = useListBusinesses({ limit: 50 });
  const updateBusiness = useUpdateBusiness();
  const [editing, setEditing] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState<string | null>(null);
  const businessList = businesses?.businesses ?? [];

  const handleSave = async (bizId: string) => {
    const rate = Number(editing[bizId]);
    if (!rate || rate < 0 || rate > 50) return;
    await updateBusiness.mutateAsync({ id: bizId, data: { commissionRate: rate } }).catch(() => {});
    setSaved(bizId);
    setTimeout(() => setSaved(null), 2000);
    refetch();
  };

  const totalCommission = businessList.reduce((sum: number, b: any) => sum + (b.commissionRate ?? 20), 0);
  const avgCommission = businessList.length ? (totalCommission / businessList.length).toFixed(1) : "20.0";

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Commission Management</h2>
        <p className="text-gray-500 text-sm">Configure revenue-sharing rates per business</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Platform Avg Commission", value: `${avgCommission}%`, icon: Percent, color: "text-purple-600", bg: "bg-purple-50" },
          { label: "Commission This Month", value: "₹4.8L", icon: DollarSign, color: "text-green-600", bg: "bg-green-50" },
          { label: "Commission Growth", value: "+18%", icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-50" },
        ].map(stat => (
          <Card key={stat.label} className="border-0 shadow-sm">
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.bg}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Business Commission Rates</h3>
          <p className="text-sm text-gray-500">Edit individual rates below. Changes take effect immediately.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Business</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">City</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Current Rate</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">New Rate</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {businessList.map((biz: any, i: number) => (
                <motion.tr key={biz.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-xl flex items-center justify-center text-green-600 font-bold text-sm">{biz.name[0]}</div>
                      <p className="text-sm font-medium text-gray-900">{biz.name}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{biz.city}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 font-bold text-gray-900">
                      <Percent className="w-3.5 h-3.5 text-gray-400" />{biz.commissionRate ?? 20}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Input
                      type="number"
                      min={1} max={50}
                      placeholder={String(biz.commissionRate ?? 20)}
                      value={editing[biz.id] ?? ""}
                      onChange={e => setEditing(p => ({ ...p, [biz.id]: e.target.value }))}
                      className="h-8 w-20 rounded-lg text-sm"
                    />
                  </td>
                  <td className="px-4 py-3">
                    {saved === biz.id ? (
                      <span className="text-xs text-green-600 font-medium">Saved!</span>
                    ) : (
                      <Button size="sm" onClick={() => handleSave(biz.id)} disabled={!editing[biz.id] || updateBusiness.isPending} className="h-7 text-xs bg-purple-600 hover:bg-purple-700 text-white rounded-lg gap-1">
                        <Save className="w-3 h-3" /> Save
                      </Button>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
