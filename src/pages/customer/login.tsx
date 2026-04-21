import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ChevronLeft, Phone, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginCustomer } from "@/lib/auth-api";
import { saveCustomerSession } from "@/lib/session";
import { WashifyLogo } from "@/components/Logo";

export default function CustomerLogin() {
  const [, navigate] = useLocation();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    if (phone.length < 10) return setError("Enter a valid 10-digit phone number.");
    if (!password) return setError("Please enter your password.");

    setLoading(true);
    try {
      const result = await loginCustomer({ phone, password });
      saveCustomerSession(result.user, result.token);
      navigate("/customer/home");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full bg-white flex flex-col">
      <div className="bg-gradient-to-br from-sky-400 to-sky-600 px-6 pt-8 pb-16">
        <button onClick={() => navigate("/")} className="mb-6 text-white/80 flex items-center gap-1 text-sm">
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <WashifyLogo size={56} textColor="text-white" className="mb-4" />
          <p className="text-sky-100 text-sm leading-relaxed">Washify - Cloth Spa, Wear Fresh Every Day</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="flex-1 bg-white rounded-t-3xl -mt-8 px-6 pt-8 shadow-xl"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-1">Welcome back!</h2>
        <p className="text-sm text-gray-500 mb-6">Login with your phone number & password</p>

        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Phone Number</Label>
            <div className="flex gap-2">
              <div className="bg-sky-50 rounded-xl px-3 flex items-center text-gray-700 font-medium text-sm border border-sky-100 h-12">+91</div>
              <Input
                type="tel"
                placeholder="98765 43210"
                value={phone}
                onChange={e => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                className="flex-1 h-12 rounded-xl border-sky-100 focus-visible:ring-sky-400"
                autoFocus
              />
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type={showPass ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="pl-10 pr-10 h-12 rounded-xl border-sky-100 focus-visible:ring-sky-400"
                onKeyDown={e => e.key === "Enter" && handleLogin()}
              />
              <button onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-red-600 text-sm">
              {error}
            </div>
          )}

          <Button
            onClick={handleLogin}
            disabled={loading}
            className="w-full h-12 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-semibold"
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

          <div className="text-center">
            <p className="text-sm text-gray-500">
              New to Washify?{" "}
              <button onClick={() => navigate("/customer/register")} className="text-sky-500 font-semibold hover:underline">
                Create Account
              </button>
            </p>
          </div>
        </div>

        <div className="mt-6 p-3 bg-sky-50 rounded-xl">
          <p className="text-xs text-sky-500 text-center">Register first, then login with your phone & password</p>
        </div>
      </motion.div>
    </div>
  );
}
