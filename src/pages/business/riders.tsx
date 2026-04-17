import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Star, Phone, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useListRiders, useCreateRider } from "@/lib/api-client-react";
import { getCurrentBusiness } from "@/lib/session";

export default function Riders() {
  const business = getCurrentBusiness();
  const businessId = business?.id;
  const { data: riders, refetch } = useListRiders({ businessId }, { query: { enabled: !!businessId } as any });
  const createRider = useCreateRider();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "" });

  const handleCreate = async () => {
    if (!businessId) return;
    await createRider.mutateAsync({ data: { name: form.name, phone: form.phone, businessId } }).catch(() => {});
    setOpen(false);
    setForm({ name: "", phone: "" });
    refetch();
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Delivery Riders</h2>
          <p className="text-gray-500 text-sm">Manage your delivery team</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-500 hover:bg-green-600 text-white rounded-xl gap-2">
              <Plus className="w-4 h-4" /> Add Rider
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-2xl">
            <DialogHeader><DialogTitle>Add New Rider</DialogTitle></DialogHeader>
            <div className="space-y-4 mt-2">
              <div>
                <Label className="text-sm font-medium mb-1.5 block">Full Name</Label>
                <Input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Ravi Kumar" className="rounded-xl" />
              </div>
              <div>
                <Label className="text-sm font-medium mb-1.5 block">Phone Number</Label>
                <Input value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="+91 98765 43210" className="rounded-xl" />
              </div>
              <Button onClick={handleCreate} disabled={!form.name || !form.phone || createRider.isPending} className="w-full bg-green-500 hover:bg-green-600 text-white rounded-xl">
                {createRider.isPending ? "Adding..." : "Add Rider"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {(riders ?? []).map((rider: any, i: number) => (
          <motion.div key={rider.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-lg">{rider.name[0]}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{rider.name}</p>
                    <div className="flex items-center gap-1 text-xs text-yellow-600">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span>{rider.rating ?? 4.7}</span>
                    </div>
                  </div>
                </div>
                <Badge className={rider.isAvailable ? "bg-green-100 text-green-700 border-0" : "bg-red-100 text-red-700 border-0"}>
                  {rider.isAvailable ? "Available" : "On Delivery"}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                <div className="flex items-center gap-1.5">
                  <Package className="w-4 h-4 text-gray-400" />
                  <span>{rider.totalDeliveries ?? 0} deliveries</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-xs">{rider.phone}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <a href={`tel:${rider.phone}`} className="flex-1 h-8 flex items-center justify-center gap-1.5 rounded-lg border border-green-200 text-green-600 text-xs font-medium hover:bg-green-50">
                  <Phone className="w-3.5 h-3.5" /> Call
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
