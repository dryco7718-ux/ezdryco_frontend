import { useState } from "react";
import { useLocation, Link } from "wouter";
import { motion } from "framer-motion";
import { User, MapPin, Clock, LogOut, ChevronRight, Pencil, Save, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useListOrders, useListAddresses, useCreateAddress } from "@/lib/api-client-react";
import { NotificationBell } from "@/components/NotificationPanel";
import { clearCustomerSession, getCurrentCustomer, updateCustomerSession } from "@/lib/session";
import { updateCustomerProfile } from "@/lib/profile-api";

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  requested: { label: "Placed", color: "bg-yellow-100 text-yellow-700" },
  accepted: { label: "Accepted", color: "bg-blue-100 text-blue-700" },
  picked_up: { label: "Picked Up", color: "bg-indigo-100 text-indigo-700" },
  cleaning: { label: "Cleaning", color: "bg-orange-100 text-orange-700" },
  out_for_delivery: { label: "Out for Delivery", color: "bg-purple-100 text-purple-700" },
  delivered: { label: "Delivered", color: "bg-green-100 text-green-700" },
  cancelled: { label: "Cancelled", color: "bg-red-100 text-red-700" },
};

export default function Profile() {
  const [, navigate] = useLocation();
  const customer = getCurrentCustomer();
  const customerId = customer?.id ?? "";
  const { data: ordersData } = useListOrders({ customerId }, { query: { enabled: !!customerId } as any });
  const { data: addresses, refetch: refetchAddresses } = useListAddresses(customerId, { query: { enabled: !!customerId } as any });
  const createAddress = useCreateAddress();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [profileForm, setProfileForm] = useState({
    name: customer?.name ?? "",
    address: customer?.address ?? "",
    city: customer?.city ?? "Narnaul",
    pincode: customer?.pincode ?? "",
    lat: "",
    lng: "",
  });

  const orders = ordersData?.orders ?? [];

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setMessage("Browser current location support nahi deta.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setProfileForm((prev) => ({
          ...prev,
          lat: position.coords.latitude.toFixed(6),
          lng: position.coords.longitude.toFixed(6),
          address: prev.address || "Current location selected",
        }));
      },
      () => setMessage("Current location fetch nahi ho paayi. Manual address enter karo."),
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  const handleSaveProfile = async () => {
    if (!customerId) return;
    if (!profileForm.name.trim() || !profileForm.address.trim() || !profileForm.city.trim() || !profileForm.pincode.trim()) {
      setMessage("Name, address, city aur pincode required hain.");
      return;
    }

    setSaving(true);
    setMessage("");
    try {
      await updateCustomerProfile(customerId, {
        name: profileForm.name.trim(),
        address: profileForm.address.trim(),
        city: profileForm.city.trim(),
        pincode: profileForm.pincode.trim(),
        lat: profileForm.lat ? Number(profileForm.lat) : null,
        lng: profileForm.lng ? Number(profileForm.lng) : null,
      });

      await createAddress.mutateAsync({
        customerId,
        data: {
          label: "home",
          line1: profileForm.address.trim(),
          city: profileForm.city.trim(),
          pincode: profileForm.pincode.trim(),
          lat: profileForm.lat ? Number(profileForm.lat) : undefined,
          lng: profileForm.lng ? Number(profileForm.lng) : undefined,
          isDefault: true,
        },
      });

      updateCustomerSession({
        name: profileForm.name.trim(),
        address: profileForm.address.trim(),
        city: profileForm.city.trim(),
        pincode: profileForm.pincode.trim(),
      });
      await refetchAddresses();
      setEditing(false);
      setMessage("Profile updated.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Profile update failed.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-full bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 px-5 pt-8 pb-12">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{customer?.name ?? "Customer"}</h2>
              <p className="text-blue-100 text-sm">+91 {customer?.phone ?? ""}</p>
            </div>
          </div>
          <NotificationBell />
        </div>
      </div>

      <div className="px-5 -mt-6 space-y-4 pb-6">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">Profile Details</h3>
            <button onClick={() => setEditing((prev) => !prev)} className="text-blue-600 text-sm font-medium flex items-center gap-1">
              <Pencil className="w-4 h-4" /> {editing ? "Close" : "Edit"}
            </button>
          </div>

          {editing ? (
            <div className="space-y-3">
              <Input value={profileForm.name} onChange={(e) => setProfileForm((prev) => ({ ...prev, name: e.target.value }))} placeholder="Full name" />
              <textarea
                value={profileForm.address}
                onChange={(e) => setProfileForm((prev) => ({ ...prev, address: e.target.value }))}
                placeholder="Manual address"
                rows={3}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <div className="grid grid-cols-2 gap-3">
                <Input value={profileForm.city} onChange={(e) => setProfileForm((prev) => ({ ...prev, city: e.target.value }))} placeholder="City" />
                <Input value={profileForm.pincode} onChange={(e) => setProfileForm((prev) => ({ ...prev, pincode: e.target.value.replace(/\D/g, "").slice(0, 6) }))} placeholder="Pincode" />
              </div>
              <div className="flex items-center justify-between gap-2">
                <button type="button" onClick={handleUseCurrentLocation} className="text-xs text-blue-600 font-medium flex items-center gap-1">
                  <Navigation className="w-3.5 h-3.5" /> Use current location
                </button>
                {(profileForm.lat || profileForm.lng) && <span className="text-[11px] text-green-600">Coords linked</span>}
              </div>
              <Button onClick={handleSaveProfile} disabled={saving} className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white">
                <Save className="w-4 h-4 mr-2" /> {saving ? "Saving..." : "Save Profile"}
              </Button>
            </div>
          ) : (
            <div className="space-y-1 text-sm text-gray-600">
              <p><span className="font-medium text-gray-900">Name:</span> {customer?.name ?? "-"}</p>
              <p><span className="font-medium text-gray-900">Address:</span> {customer?.address ?? "Not saved"}</p>
              <p><span className="font-medium text-gray-900">City:</span> {customer?.city ?? "-"}</p>
              <p><span className="font-medium text-gray-900">Pincode:</span> {customer?.pincode ?? "-"}</p>
            </div>
          )}

          {message && <p className="text-xs text-blue-600 mt-3">{message}</p>}
        </div>

        {/* Order History */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2"><Clock className="w-4 h-4 text-blue-500" /> Order History</h3>
          <div className="space-y-3">
            {orders.slice(0, 3).map(order => (
              <Link key={order.id} href={`/customer/track/${order.id}`}>
                <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0 cursor-pointer hover:bg-gray-50 rounded-lg px-1">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Order #{order.id}</p>
                    <p className="text-xs text-gray-500">{order.pickupDate}</p>
                  </div>
                  <div className="text-right flex items-center gap-2">
                    <div>
                      <p className="text-sm font-bold text-gray-900">₹{order.total}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_LABELS[order.status]?.color ?? "bg-gray-100 text-gray-600"}`}>
                        {STATUS_LABELS[order.status]?.label ?? order.status}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </Link>
            ))}
            {orders.length === 0 && <p className="text-sm text-gray-400 text-center py-4">No orders yet</p>}
          </div>
        </div>

        {/* Addresses */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2"><MapPin className="w-4 h-4 text-red-500" /> Saved Addresses</h3>
          <div className="space-y-2">
            {(addresses ?? []).map(addr => (
              <div key={addr.id} className="flex items-start gap-3 py-2">
                <div className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-gray-600" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-medium text-gray-900 capitalize">{addr.label}</p>
                    {addr.isDefault && <Badge className="text-xs bg-blue-100 text-blue-600 border-0 px-1.5 py-0">Default</Badge>}
                  </div>
                  <p className="text-xs text-gray-500">{addr.line1}{addr.line2 ? `, ${addr.line2}` : ""}, {addr.city}</p>
                </div>
              </div>
            ))}
            {(!addresses || addresses.length === 0) && (
              <p className="text-sm text-gray-400 text-center py-2">No addresses saved</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
          <h3 className="font-semibold text-gray-900">Use EzDry Like an App</h3>
          <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
            <li>Open EzDry in Chrome on your phone.</li>
            <li>Tap browser menu and choose "Add to Home Screen".</li>
            <li>Home screen icon se open karoge to app jaisa full-screen experience milega.</li>
            <li>Notifications allow karo to order updates turant milenge.</li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
          <h3 className="font-semibold text-gray-900">About EzDry</h3>
          <p className="text-sm text-gray-600">
            EzDry ek doorstep laundry and dry-cleaning platform hai jahan aap pickup schedule kar sakte ho,
            order live track kar sakte ho, aur delivery status real-time me dekh sakte ho.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl bg-sky-50 p-3">
              <p className="font-medium text-gray-800">Core Services</p>
              <p className="text-gray-600 mt-1">Wash & Fold, Dry Cleaning, Steam Iron, Express Delivery</p>
            </div>
            <div className="rounded-xl bg-sky-50 p-3">
              <p className="font-medium text-gray-800">Coverage</p>
              <p className="text-gray-600 mt-1">Doorstep pickup and drop with business-partner network</p>
            </div>
            <div className="rounded-xl bg-sky-50 p-3">
              <p className="font-medium text-gray-800">Safety</p>
              <p className="text-gray-600 mt-1">Order history, status timeline, and secure account access</p>
            </div>
            <div className="rounded-xl bg-sky-50 p-3">
              <p className="font-medium text-gray-800">Support</p>
              <p className="text-gray-600 mt-1">Call support for pickup, delay, or delivery help anytime</p>
            </div>
          </div>
        </div>

        {/* Sign Out */}
        <button
          onClick={() => {
            clearCustomerSession();
            navigate("/customer/login");
          }}
          className="w-full flex items-center gap-3 bg-white rounded-2xl p-4 shadow-sm text-red-500 hover:bg-red-50"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
}
