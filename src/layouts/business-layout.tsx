import { ReactNode } from "react";
import { useLocation, Link } from "wouter";
import {
  LayoutDashboard, ShoppingCart, DollarSign, Tag,
  Bike, Users, Bell, LogOut, Store, Menu, X
} from "lucide-react";
import { useState } from "react";
import { WashifyLogo } from "@/components/Logo";
import { NotificationBell } from "@/components/NotificationPanel";

const NAV_ITEMS = [
  { href: "/business/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/business/orders", icon: ShoppingCart, label: "Orders" },
  { href: "/business/pricing", icon: DollarSign, label: "Pricing" },
  { href: "/business/coupons", icon: Tag, label: "Coupons" },
  { href: "/business/riders", icon: Bike, label: "Riders" },
  { href: "/business/customers", icon: Users, label: "Customers" },
  { href: "/business/notifications", icon: Bell, label: "Alerts" },
];

interface Props { children: ReactNode; }

export function BusinessLayout({ children }: Props) {
  const [location, navigate] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isLogin = location.includes("/login");

  if (isLogin) return <>{children}</>;

  const currentBusiness = (() => {
    try { return JSON.parse(localStorage.getItem("washify_current_business") || "{}"); } catch { return {}; }
  })();

  return (
    <div className="min-h-screen bg-sky-50 flex">
      {/* Desktop Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-60 bg-white shadow-sm flex flex-col transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:shadow-none lg:border-r lg:border-sky-100`}>
        <div className="p-5 border-b border-sky-50">
          <WashifyLogo size={32} />
          <p className="text-xs text-gray-400 mt-2 font-medium">{currentBusiness.shopName || "Business Portal"}</p>
        </div>
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {NAV_ITEMS.map(item => (
            <Link key={item.href} href={item.href}>
              <div
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  location.startsWith(item.href)
                    ? "bg-sky-50 text-sky-600 font-semibold"
                    : "text-gray-500 hover:bg-sky-50 hover:text-gray-800"
                }`}
              >
                <item.icon className={`w-5 h-5 ${location.startsWith(item.href) ? "text-sky-500" : "text-gray-400"}`} />
                {item.label}
              </div>
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-sky-50">
          <button onClick={() => navigate("/business/login")} className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-sm text-red-400 hover:bg-red-50">
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/20 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-white border-b border-sky-100 px-4 py-3 flex items-center gap-3 sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 rounded-xl hover:bg-sky-50">
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <h1 className="font-semibold text-gray-700 text-base flex-1">
            {NAV_ITEMS.find(i => location.startsWith(i.href))?.label ?? "Dashboard"}
          </h1>
          <div className="flex items-center gap-2">
            <NotificationBell />
            <span className="text-sm text-gray-400 hidden sm:block">{currentBusiness.ownerName || "Business Owner"}</span>
            <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center">
              <span className="text-sky-600 font-bold text-sm">
                {(currentBusiness.ownerName || "B")[0].toUpperCase()}
              </span>
            </div>
          </div>
        </header>

        {/* Page Content - scrollable */}
        <main className="flex-1 overflow-auto pb-24 lg:pb-0">
          {children}
        </main>

        {/* Mobile Bottom Nav */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-sky-100 z-30">
          <div className="flex justify-around items-center px-2 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
            {NAV_ITEMS.slice(0, 5).map(item => (
              <Link key={item.href} href={item.href}>
                <div className={`flex flex-col items-center gap-0.5 min-w-14 px-2 py-1.5 rounded-xl transition-all ${location.startsWith(item.href) ? "text-sky-500 bg-sky-50" : "text-gray-400"}`}>
                  <item.icon className={`w-5 h-5 ${location.startsWith(item.href) ? "fill-sky-100" : ""}`} />
                  <span className="text-[9px] font-medium">{item.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
