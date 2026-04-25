import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginBusiness } from "@/lib/auth-api";
import { saveBusinessSession } from "@/lib/session";
import { EZDRYLogo } from "@/components/Logo";

export default function BusinessLogin() {
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
      const result = await loginBusiness({ phone, password });
      saveBusinessSession(result.business, result.token);
      navigate("/business/dashboard");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <button onClick={() => navigate("/")} className="mb-6 text-gray-500 flex items-center gap-1 text-sm hover:text-sky-500">
          <ChevronLeft className="w-4 h-4" /> Back to Home
        </button>

        <div className="text-center mb-8">
          <EZDRYLogo size={60} className="justify-center mb-4" />
          <h1 className="text-2xl font-bold text-gray-900">Business Login</h1>
          <p className="text-gray-400 text-sm mt-1">Login with your registered phone & password</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8 border border-sky-100">
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-600 mb-1.5 block">Phone Number</Label>
              <div className="flex gap-2">
                <div className="bg-sky-50 rounded-xl px-3 flex items-center text-gray-700 font-medium text-sm border border-sky-100 h-12">+91</div>
                <Input
                  type="tel"
                  placeholder="98765 43210"
                  value={phone}
                  onChange={e => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  className="flex-1 h-12 rounded-xl border-sky-100 focus-visible:ring-sky-400"
                />
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-600 mb-1.5 block">Password</Label>
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
              <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-red-600 text-sm">{error}</div>
            )}

            <Button onClick={handleLogin} disabled={loading} className="w-full h-12 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-semibold">
              {loading ? "Logging in..." : "Login"}
            </Button>
          </div>

          <div className="mt-4 p-3 bg-sky-50 rounded-xl">
            <p className="text-xs text-sky-500 text-center font-medium">
              Not registered yet?{" "}
              <button onClick={() => navigate("/business/register")} className="underline font-semibold">Submit Registration</button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
