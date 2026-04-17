import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Store, ChevronLeft, User, Phone, Mail, MapPin, Lock, Eye, EyeOff, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerBusiness } from "@/lib/auth-api";

export default function BusinessRegister() {
  const [, navigate] = useLocation();
  const [form, setForm] = useState({
    shopName: "", ownerName: "", email: "", phone: "", address: "",
    city: "", gstNumber: "", password: "", confirmPassword: ""
  });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [key]: e.target.value }));

  const handleSubmit = async () => {
    setError("");
    if (!form.shopName.trim()) return setError("Please enter your shop name.");
    if (!form.ownerName.trim()) return setError("Please enter owner's name.");
    if (!form.email.includes("@")) return setError("Enter a valid email address.");
    if (form.phone.length < 10) return setError("Enter a valid 10-digit phone number.");
    if (!form.address.trim()) return setError("Please enter your shop address.");
    if (!form.city.trim()) return setError("Please enter your city.");
    if (form.password.length < 6) return setError("Password must be at least 6 characters.");
    if (form.password !== form.confirmPassword) return setError("Passwords do not match.");

    setLoading(true);
    try {
      await registerBusiness({
        shopName: form.shopName,
        ownerName: form.ownerName,
        email: form.email,
        phone: form.phone,
        address: form.address,
        city: form.city,
        password: form.password,
        gstNumber: form.gstNumber || undefined,
      });
      setLoading(false);
      setDone(true);
    } catch (error) {
      setLoading(false);
      setError(error instanceof Error ? error.message : "Registration failed.");
    }
  };

  if (done) {
    return (
      <div className="min-h-screen bg-sky-50 flex flex-col items-center justify-center px-6">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-sm">
          <div className="w-24 h-24 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Clock className="w-12 h-12 text-sky-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Request Submitted!</h2>
          <p className="text-gray-500 text-sm mb-6 leading-relaxed">
            Your business registration request has been sent to the admin panel.
            Once approved, you will be able to login with your phone number and password.
          </p>
          <div className="bg-sky-50 border border-sky-100 rounded-2xl p-4 mb-8">
            <p className="text-sky-600 text-sm font-medium">Approval required before business dashboard access.</p>
          </div>
          <Button onClick={() => navigate("/")} className="bg-sky-500 hover:bg-sky-600 text-white rounded-2xl px-10 h-12 font-semibold">
            Back to Home
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white py-8 px-4">
      <div className="max-w-lg mx-auto">
        <button onClick={() => navigate("/")} className="mb-6 text-gray-500 flex items-center gap-1 text-sm hover:text-sky-500">
          <ChevronLeft className="w-4 h-4" /> Back to Home
        </button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl shadow-sm border border-sky-100 p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-sky-500 rounded-2xl flex items-center justify-center">
              <Store className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Join as Business Partner</h1>
              <p className="text-sm text-gray-400">Submit your registration request</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Shop Name *</Label>
                <div className="relative">
                  <Store className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input placeholder="CleanMaster Laundry" value={form.shopName} onChange={set("shopName")} className="pl-10 h-11 rounded-xl border-sky-100" />
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Owner Name *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input placeholder="Rajesh Kumar" value={form.ownerName} onChange={set("ownerName")} className="pl-10 h-11 rounded-xl border-sky-100" />
                </div>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Email Address *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input type="email" placeholder="owner@shop.in" value={form.email} onChange={set("email")} className="pl-10 h-11 rounded-xl border-sky-100" />
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Phone Number *</Label>
              <div className="flex gap-2">
                <div className="bg-sky-50 rounded-xl px-3 flex items-center text-gray-700 font-medium text-sm border border-sky-100 h-11">+91</div>
                <Input type="tel" placeholder="98765 43210" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value.replace(/\D/g, "").slice(0, 10) }))} className="flex-1 h-11 rounded-xl border-sky-100" />
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Shop Address *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <textarea placeholder="Shop no., Street, Area" value={form.address} onChange={set("address")} rows={2} className="w-full pl-10 pr-4 pt-3 pb-3 rounded-xl border border-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm resize-none" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-1.5 block">City *</Label>
                <Input placeholder="Bangalore" value={form.city} onChange={set("city")} className="h-11 rounded-xl border-sky-100" />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-1.5 block">GST Number</Label>
                <Input placeholder="Optional" value={form.gstNumber} onChange={set("gstNumber")} className="h-11 rounded-xl border-sky-100" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Password *</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input type={showPass ? "text" : "password"} placeholder="Min 6 chars" value={form.password} onChange={set("password")} className="pl-10 pr-8 h-11 rounded-xl border-sky-100" />
                  <button onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {showPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Confirm Password *</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input type="password" placeholder="Re-enter" value={form.confirmPassword} onChange={set("confirmPassword")} className="pl-10 h-11 rounded-xl border-sky-100" />
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-red-600 text-sm">{error}</div>
            )}

            <Button onClick={handleSubmit} disabled={loading} className="w-full h-12 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-semibold">
              {loading ? "Submitting..." : "Submit Registration Request"}
            </Button>

            <p className="text-center text-sm text-gray-500">
              Already registered & approved?{" "}
              <button onClick={() => navigate("/business/login")} className="text-sky-500 font-semibold hover:underline">Login here</button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
