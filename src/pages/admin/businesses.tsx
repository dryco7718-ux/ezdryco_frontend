import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Store, Check, X, Clock, CheckCircle, XCircle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useListBusinesses, useUpdateBusiness } from "@/lib/api-client-react";

type BizStatus = "pending" | "active" | "inactive";

interface Business {
  id: string;
  name: string;
  ownerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  status: BizStatus;
  joinedAt: string;
}

export default function AdminBusinesses() {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"all" | "pending" | "active" | "inactive">("all");
  const { data, refetch } = useListBusinesses();
  const updateBusiness = useUpdateBusiness();
  const businesses = (data?.businesses ?? []) as Business[];

  const updateStatus = async (id: string, status: "active" | "inactive") => {
    await updateBusiness.mutateAsync({ id, data: { status } }).catch(() => {});
    refetch();
  };

  const filtered = businesses.filter(b => {
    const matchSearch = b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.ownerName.toLowerCase().includes(search.toLowerCase()) ||
      b.phone.includes(search);
    const matchTab = tab === "all" || b.status === tab;
    return matchSearch && matchTab;
  });

  const counts = {
    all: businesses.length,
    pending: businesses.filter(b => b.status === "pending").length,
    active: businesses.filter(b => b.status === "active").length,
    inactive: businesses.filter(b => b.status === "inactive").length,
  };

  const statusBadge = (status: BizStatus) => {
    if (status === "active") return <Badge className="bg-emerald-100 text-emerald-700 border-0"><CheckCircle className="w-3 h-3 mr-1" />Active</Badge>;
    if (status === "pending") return <Badge className="bg-yellow-100 text-yellow-700 border-0"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
    return <Badge className="bg-red-100 text-red-700 border-0"><XCircle className="w-3 h-3 mr-1" />Inactive</Badge>;
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Business Registrations</h2>
        <p className="text-gray-400 text-sm">Review and approve business partner requests</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {(["all", "pending", "active", "inactive"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              tab === t
                ? t === "pending" ? "bg-yellow-500 text-white" : t === "active" ? "bg-emerald-500 text-white" : t === "inactive" ? "bg-red-500 text-white" : "bg-sky-500 text-white"
                : "bg-sky-50 text-gray-600 hover:bg-sky-100"
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
            <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${tab === t ? "bg-white/20" : "bg-sky-100 text-sky-600"}`}>
              {counts[t]}
            </span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by shop name, owner or phone..." className="pl-10 rounded-xl border-sky-100" />
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="bg-white rounded-2xl border border-sky-100 p-12 text-center">
          <Users className="w-12 h-12 text-sky-200 mx-auto mb-4" />
          <p className="text-gray-400 font-medium">No {tab === "all" ? "" : tab} business registrations</p>
          <p className="text-gray-300 text-sm mt-1">When businesses register, they'll appear here</p>
        </div>
      )}

      {/* Cards */}
      <div className="grid gap-4">
        {filtered.map((biz, i) => (
          <motion.div
            key={biz.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-2xl border border-sky-100 p-5 shadow-sm"
          >
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-sky-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="text-sky-600 font-bold text-lg">{biz.name[0]}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900">{biz.name}</h3>
                    {statusBadge(biz.status)}
                  </div>
                  <p className="text-sm text-gray-500">{biz.ownerName} • {biz.city}</p>
                  <div className="flex gap-4 mt-1">
                    <span className="text-xs text-gray-400">📞 +91 {biz.phone}</span>
                    <span className="text-xs text-gray-400">✉️ {biz.email}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">📍 {biz.address}</p>
                  <p className="text-xs text-gray-300 mt-1">Submitted: {new Date(biz.joinedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                </div>
              </div>

              {biz.status === "pending" && (
                <div className="flex gap-2 flex-shrink-0">
                  <Button
                    onClick={() => updateStatus(biz.id, "active")}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl h-10 px-5 text-sm font-semibold gap-1.5"
                  >
                    <Check className="w-4 h-4" /> Approve
                  </Button>
                  <Button
                    onClick={() => updateStatus(biz.id, "inactive")}
                    variant="outline"
                    className="border-red-200 text-red-500 hover:bg-red-50 rounded-xl h-10 px-5 text-sm font-semibold gap-1.5"
                  >
                    <X className="w-4 h-4" /> Reject
                  </Button>
                </div>
              )}

              {biz.status === "active" && (
                <div className="flex gap-2 flex-shrink-0">
                  <Button
                    onClick={() => updateStatus(biz.id, "inactive")}
                    variant="outline"
                    className="border-red-200 text-red-500 hover:bg-red-50 rounded-xl h-10 px-4 text-sm gap-1.5"
                  >
                    <X className="w-4 h-4" /> Revoke
                  </Button>
                </div>
              )}

              {biz.status === "inactive" && (
                <div className="flex gap-2 flex-shrink-0">
                  <Button
                    onClick={() => updateStatus(biz.id, "active")}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl h-10 px-4 text-sm gap-1.5"
                  >
                    <Check className="w-4 h-4" /> Re-Approve
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
