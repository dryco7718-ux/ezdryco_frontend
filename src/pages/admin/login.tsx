import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WashifyLogo } from "@/components/Logo";

const ADMIN_EMAIL = "kbdon7718@gmail.com";
const ADMIN_PASSWORD = "@Zad7718";

export default function AdminLogin() {
  const [, navigate] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setError("");
    if (!email || !password) return setError("Please enter both email and password.");

    setLoading(true);
    setTimeout(() => {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        localStorage.setItem("washify_admin_logged_in", "true");
        navigate("/admin/dashboard");
      } else {
        setError("Invalid credentials. Admin access only.");
      }
      setLoading(false);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <WashifyLogo size={60} className="justify-center mb-4" />
          <h1 className="text-2xl font-bold text-gray-900">EzDry Admin</h1>
          <p className="text-gray-400 text-sm mt-1">Cloth Spa — Platform Management</p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-8 border border-sky-100">
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-600 mb-1.5 block">Admin Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="email"
                  placeholder="admin@ezdry.app"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="pl-10 h-11 rounded-xl border-sky-100 focus-visible:ring-sky-400"
                  autoFocus
                />
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-600 mb-1.5 block">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="password"
                  placeholder="Admin password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="pl-10 h-11 rounded-xl border-sky-100 focus-visible:ring-sky-400"
                  onKeyDown={e => e.key === "Enter" && handleLogin()}
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-red-600 text-sm">{error}</div>
            )}

            <Button onClick={handleLogin} disabled={loading} className="w-full h-11 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-semibold">
              {loading ? "Verifying..." : "Access Admin Panel"}
            </Button>
          </div>
          <div className="mt-4 p-3 bg-sky-50 rounded-xl">
            <p className="text-xs text-sky-500 text-center font-medium">Restricted access — Authorized personnel only</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
