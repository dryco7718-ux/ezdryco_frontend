import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ChevronLeft, User, Phone, MapPin, Lock, Eye, EyeOff, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerCustomer } from "@/lib/auth-api";
import { WashifyLogo } from "@/components/Logo";

export default function CustomerRegister() {
  const [, navigate] = useLocation();
  const [form, setForm] = useState({ name: "", phone: "", address: "", password: "", confirmPassword: "" });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleRegister = async () => {
    setError("");
    if (!form.name.trim()) return setError("Please enter your full name.");
    if (form.phone.length < 10) return setError("Enter a valid 10-digit phone number.");
    if (!form.address.trim()) return setError("Please enter your address.");
    if (form.password.length < 6) return setError("Password must be at least 6 characters.");
    if (form.password !== form.confirmPassword) return setError("Passwords do not match.");

    setLoading(true);
    try {
      await registerCustomer({
        name: form.name,
        phone: form.phone,
        password: form.password,
        address: form.address,
        city: "Narnaul",
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
      <div className="min-h-full bg-white flex flex-col items-center justify-center px-6">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <div className="w-20 h-20 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-sky-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to EzDry!</h2>
          <p className="text-gray-500 text-sm mb-8">Your account has been created successfully.<br />Please login with your phone number & password.</p>
          <Button onClick={() => navigate("/customer/login")} className="bg-sky-500 hover:bg-sky-600 text-white rounded-2xl px-10 h-12 font-semibold">
            Go to Login
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-white flex flex-col">
      <div className="bg-gradient-to-br from-sky-400 to-sky-600 px-6 pt-8 pb-16">
        <button onClick={() => navigate("/customer/login")} className="mb-6 text-white/80 flex items-center gap-1 text-sm">
          <ChevronLeft className="w-4 h-4" /> Back to Login
        </button>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <WashifyLogo size={56} textColor="text-white" className="mb-4" />
          <h1 className="text-2xl font-bold text-white mb-1">Create Account</h1>
          <p className="text-sky-100 text-sm">Join EzDry - Cloth Spa awaits you!</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="flex-1 bg-white rounded-t-3xl -mt-8 px-6 pt-8 pb-8 shadow-xl overflow-y-auto"
      >
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Aarav Sharma"
                value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                className="pl-10 h-12 rounded-xl border-sky-100 focus-visible:ring-sky-400"
              />
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Phone Number</Label>
            <div className="flex gap-2">
              <div className="bg-sky-50 rounded-xl px-3 flex items-center text-gray-700 font-medium text-sm border border-sky-100 h-12">+91</div>
              <Input
                type="tel"
                placeholder="98765 43210"
                value={form.phone}
                onChange={e => setForm(p => ({ ...p, phone: e.target.value.replace(/\D/g, "").slice(0, 10) }))}
                className="flex-1 h-12 rounded-xl border-sky-100 focus-visible:ring-sky-400"
              />
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Address</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
              <textarea
                placeholder="Flat no, Street, Area, City"
                value={form.address}
                onChange={e => setForm(p => ({ ...p, address: e.target.value }))}
                rows={2}
                className="w-full pl-10 pr-4 pt-3 pb-3 rounded-xl border border-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm resize-none"
              />
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type={showPass ? "text" : "password"}
                placeholder="Minimum 6 characters"
                value={form.password}
                onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                className="pl-10 pr-10 h-12 rounded-xl border-sky-100 focus-visible:ring-sky-400"
              />
              <button onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Confirm Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="password"
                placeholder="Re-enter password"
                value={form.confirmPassword}
                onChange={e => setForm(p => ({ ...p, confirmPassword: e.target.value }))}
                className="pl-10 h-12 rounded-xl border-sky-100 focus-visible:ring-sky-400"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-red-600 text-sm">
              {error}
            </div>
          )}

          <Button
            onClick={handleRegister}
            disabled={loading}
            className="w-full h-12 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-semibold"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </Button>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <button onClick={() => navigate("/customer/login")} className="text-sky-500 font-semibold hover:underline">
              Login here
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
