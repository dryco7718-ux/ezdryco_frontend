import { ReactNode } from "react";
import { useLocation, Link } from "wouter";
import {
  LayoutDashboard, ShoppingCart, DollarSign, Tag,
  Bike, Users, Bell, LogOut, Store, Menu, X
} from "lucide-react";
import { useState } from "react";
import { EZDRYLogo } from "@/components/Logo";
import { NotificationBell } from "@/components/NotificationPanel";
import { clearBusinessSession } from "@/lib/session";

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
    try { return JSON.parse(localStorage.getItem("ezdry_current_business") || "{}"); } catch { return {}; }
  })();

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Desktop Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl shadow-gray-200/50 flex flex-col transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:shadow-none lg:border-r lg:border-gray-100`}>
        <div className="p-6 border-b border-gray-50">
          <EZDRYLogo size={36} />
          <div className="mt-4 px-3 py-2 bg-indigo-50 rounded-xl border border-indigo-100/50">
            <p className="text-[10px] text-indigo-400 font-black uppercase tracking-widest mb-0.5">Shop Instance</p>
            <p className="text-sm text-indigo-900 font-bold truncate">{currentBusiness.shopName || "Business Portal"}</p>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map(item => (
            <Link key={item.href} href={item.href}>
              <div
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all cursor-pointer ${
                  location.startsWith(item.href)
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <item.icon className={`w-5 h-5 ${location.startsWith(item.href) ? "text-white" : "text-gray-400"}`} />
                {item.label}
              </div>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-50">
          <button onClick={() => { clearBusinessSession(); navigate("/business/login"); }} className="flex items-center gap-3 px-4 py-3 w-full rounded-2xl text-sm font-bold text-red-500 hover:bg-red-50 transition-colors">
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
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center gap-4 sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label={sidebarOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={sidebarOpen}
            className="lg:hidden p-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex-1">
            <h1 className="font-black text-gray-900 text-lg tracking-tight">
              {NAV_ITEMS.find(i => location.startsWith(i.href))?.label ?? "Dashboard"}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <NotificationBell />
            <div className="h-8 w-[1px] bg-gray-100 hidden sm:block" />
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-black text-gray-900 leading-none mb-1">{currentBusiness.ownerName || "Business Owner"}</p>
                <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-tighter">Partner Account</p>
              </div>
              <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100 border-2 border-white">
                <span className="text-white font-black text-sm">
                  {(currentBusiness.ownerName || "B")[0].toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content - scrollable */}
        <main className="flex-1 overflow-auto p-6 pb-24 lg:pb-6">
          {children}
        </main>

        {/* Mobile Bottom Nav */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-100 z-30 shadow-[0_-10px_30px_rgba(0,0,0,0.03)]">
          <div className="flex justify-around items-center px-4 py-3 pb-[calc(1rem+env(safe-area-inset-bottom))]">
            {NAV_ITEMS.slice(0, 5).map(item => (
              <Link key={item.href} href={item.href}>
                <div className={`flex flex-col items-center gap-1 min-w-16 px-2 py-2 rounded-2xl transition-all ${location.startsWith(item.href) ? "text-indigo-600 bg-indigo-50" : "text-gray-400"}`}>
                  <item.icon className={`w-5 h-5 ${location.startsWith(item.href) ? "fill-indigo-100" : ""}`} />
                  <span className="text-[10px] font-bold tracking-tight">{item.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
