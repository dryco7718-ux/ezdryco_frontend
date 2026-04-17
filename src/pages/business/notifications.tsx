import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Bell, Users, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSendNotification } from "@/lib/api-client-react";
import { getCurrentBusiness } from "@/lib/session";

export default function BusinessNotifications() {
  const sendNotification = useSendNotification();
  const business = getCurrentBusiness();
  const businessId = business?.id;
  const [form, setForm] = useState({ title: "", message: "", type: "promotion", targetAudience: "customers" });
  const [sent, setSent] = useState<number | null>(null);

  const handleSend = async () => {
    if (!businessId) return;
    const result = await sendNotification.mutateAsync({ data: { ...form, type: form.type as any, targetAudience: form.targetAudience as any, businessId } }).catch(() => null);
    if (result) setSent(result.sent);
  };

  const TEMPLATES = [
    { title: "Weekend Offer", message: "Get 20% off all laundry this weekend! Use code WEEKEND20." },
    { title: "New Pickup Slots", message: "We've added evening pickup slots (6-9 PM). Book now!" },
    { title: "Order Update", message: "Your order is ready. Our rider will pick up within 2 hours." },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Notifications</h2>
        <p className="text-gray-500 text-sm">Send broadcast messages to your customers</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2"><Megaphone className="w-4 h-4 text-blue-500" /> Compose Message</h3>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-1.5 block">Notification Title</Label>
                <Input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="e.g. Weekend Special Offer" className="rounded-xl" />
              </div>
              <div>
                <Label className="text-sm font-medium mb-1.5 block">Message</Label>
                <Textarea value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} placeholder="Enter your message..." rows={4} className="rounded-xl resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">Type</Label>
                  <Select value={form.type} onValueChange={v => setForm(p => ({ ...p, type: v }))}>
                    <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="promotion">Promotion</SelectItem>
                      <SelectItem value="order_update">Order Update</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">Target</Label>
                  <Select value={form.targetAudience} onValueChange={v => setForm(p => ({ ...p, targetAudience: v }))}>
                    <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="customers">Customers Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {sent !== null && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-green-50 border border-green-200 rounded-xl p-3 text-sm text-green-700 font-medium">
                  Notification sent to {sent} users successfully!
                </motion.div>
              )}
              <Button onClick={handleSend} disabled={!form.title || !form.message || sendNotification.isPending} className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl gap-2">
                <Send className="w-4 h-4" />
                {sendNotification.isPending ? "Sending..." : "Send Notification"}
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-3">Quick Templates</h3>
            <div className="space-y-2">
              {TEMPLATES.map(tpl => (
                <button key={tpl.title} onClick={() => setForm(p => ({ ...p, title: tpl.title, message: tpl.message }))} className="w-full text-left p-3 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all">
                  <p className="text-sm font-medium text-gray-900">{tpl.title}</p>
                  <p className="text-xs text-gray-500 truncate mt-0.5">{tpl.message}</p>
                </button>
              ))}
            </div>
          </div>
          <div className="bg-blue-50 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <Bell className="w-4 h-4 text-blue-600" />
              <p className="text-sm font-semibold text-blue-800">WhatsApp Integration</p>
            </div>
            <p className="text-xs text-blue-600">Connect WhatsApp Business API to send messages directly to customers via WhatsApp.</p>
            <Button size="sm" className="mt-3 bg-green-500 hover:bg-green-600 text-white rounded-lg text-xs">Setup WhatsApp</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
