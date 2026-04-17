import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Tag, Percent, DollarSign, Calendar, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useListCoupons, useCreateCoupon } from "@/lib/api-client-react";
import { getCurrentBusiness } from "@/lib/session";

export default function Coupons() {
  const business = getCurrentBusiness();
  const businessId = business?.id;
  const { data: coupons, refetch } = useListCoupons({ businessId }, { query: { enabled: !!businessId } as any });
  const createCoupon = useCreateCoupon();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ code: "", discountType: "flat", discountValue: "", minOrderValue: "", maxDiscount: "", expiryDate: "", usageLimit: "" });

  const handleCreate = async () => {
    if (!businessId) return;
    await createCoupon.mutateAsync({
      data: {
        code: form.code,
        discountType: form.discountType as "flat" | "percentage",
        discountValue: Number(form.discountValue),
        minOrderValue: form.minOrderValue ? Number(form.minOrderValue) : undefined,
        maxDiscount: form.maxDiscount ? Number(form.maxDiscount) : undefined,
        expiryDate: form.expiryDate || undefined,
        usageLimit: form.usageLimit ? Number(form.usageLimit) : undefined,
        businessId,
      }
    }).catch(() => {});
    setOpen(false);
    refetch();
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Coupons & Offers</h2>
          <p className="text-gray-500 text-sm">Create and manage discount codes</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-500 hover:bg-green-600 text-white rounded-xl gap-2">
              <Plus className="w-4 h-4" /> Create Coupon
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-2xl">
            <DialogHeader>
              <DialogTitle>Create New Coupon</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-2">
              <div>
                <Label className="text-sm font-medium mb-1.5 block">Coupon Code</Label>
                <Input value={form.code} onChange={e => setForm(p => ({ ...p, code: e.target.value.toUpperCase() }))} placeholder="e.g. SUMMER30" className="rounded-xl font-mono" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">Discount Type</Label>
                  <Select value={form.discountType} onValueChange={v => setForm(p => ({ ...p, discountType: v }))}>
                    <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="flat">Flat Amount</SelectItem>
                      <SelectItem value="percentage">Percentage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">
                    {form.discountType === "flat" ? "Discount (₹)" : "Discount (%)"}
                  </Label>
                  <Input type="number" value={form.discountValue} onChange={e => setForm(p => ({ ...p, discountValue: e.target.value }))} placeholder="0" className="rounded-xl" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">Min Order (₹)</Label>
                  <Input type="number" value={form.minOrderValue} onChange={e => setForm(p => ({ ...p, minOrderValue: e.target.value }))} placeholder="0" className="rounded-xl" />
                </div>
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">Max Discount (₹)</Label>
                  <Input type="number" value={form.maxDiscount} onChange={e => setForm(p => ({ ...p, maxDiscount: e.target.value }))} placeholder="Optional" className="rounded-xl" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">Expiry Date</Label>
                  <Input type="date" value={form.expiryDate} onChange={e => setForm(p => ({ ...p, expiryDate: e.target.value }))} className="rounded-xl" />
                </div>
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">Usage Limit</Label>
                  <Input type="number" value={form.usageLimit} onChange={e => setForm(p => ({ ...p, usageLimit: e.target.value }))} placeholder="Unlimited" className="rounded-xl" />
                </div>
              </div>
              <Button onClick={handleCreate} disabled={!form.code || !form.discountValue || createCoupon.isPending} className="w-full bg-green-500 hover:bg-green-600 text-white rounded-xl">
                {createCoupon.isPending ? "Creating..." : "Create Coupon"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {(coupons ?? []).map((coupon: any, i: number) => (
          <motion.div key={coupon.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono font-bold text-lg text-gray-900">{coupon.code}</span>
                  <Badge className={coupon.isActive ? "bg-green-100 text-green-700 border-0" : "bg-gray-100 text-gray-500 border-0"}>
                    {coupon.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  {coupon.discountType === "flat" ? (
                    <DollarSign className="w-4 h-4 text-green-600" />
                  ) : (
                    <Percent className="w-4 h-4 text-blue-600" />
                  )}
                  <span className="font-semibold text-gray-800">
                    {coupon.discountType === "flat" ? `₹${coupon.discountValue} off` : `${coupon.discountValue}% off`}
                  </span>
                </div>
                {coupon.minOrderValue && <p className="text-xs text-gray-500 mb-1">Min order: ₹{coupon.minOrderValue}</p>}
                {coupon.expiryDate && (
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> Expires {coupon.expiryDate}
                  </p>
                )}
                <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-500">{coupon.usedCount ?? 0} / {coupon.usageLimit ?? "∞"} used</span>
                  <div className="w-24 bg-gray-200 rounded-full h-1.5">
                    <div className="bg-green-500 h-1.5 rounded-full" style={{ width: coupon.usageLimit ? `${Math.min(100, (coupon.usedCount / coupon.usageLimit) * 100)}%` : "0%" }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
        {(!coupons || coupons.length === 0) && (
          <div className="col-span-3 text-center py-12 text-gray-400">
            <Tag className="w-12 h-12 mx-auto text-gray-200 mb-2" />
            <p className="text-sm">No coupons yet. Create your first one!</p>
          </div>
        )}
      </div>
    </div>
  );
}
