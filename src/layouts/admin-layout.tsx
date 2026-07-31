import { ReactNode, useState } from "react";
import { useLocation, Link } from "wouter";
import {
  LayoutDashboard, Store, Percent,
  Users, Bell, LogOut, ShieldCheck, Menu, X, BookOpen
} from "lucide-react";
import { EZDRYLogo } from "@/components/Logo";
import { clearAdminSession } from "@/lib/session";

const NAV_ITEMS = [
  { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/businesses", icon: Store, label: "Businesses" },
  { href: "/admin/commission", icon: Percent, label: "Commission" },
  { href: "/admin/users", icon: Users, label: "Users" },
  { href: "/admin/blogs", icon: BookOpen, label: "Blogs" },
  { href: "/admin/notifications", icon: Bell, label: "Notifications" },
];

interface Props { children: ReactNode; }

export function AdminLayout({ children }: Props) {
  const [location, navigate] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isLogin = location.includes("/login");

  if (isLogin) return <>{children}</>;

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-950 text-white flex flex-col transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static`}>
        <div className="p-8 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-2xl shadow-lg shadow-indigo-600/20">
              <EZDRYLogo size={28} iconOnly />
            </div>
            <div>
              <p className="font-black text-white text-base tracking-tight">Admin OS</p>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">EZDRY Central</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
          {NAV_ITEMS.map(item => (
            <Link key={item.href} href={item.href}>
              <div
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all cursor-pointer ${
                  location.startsWith(item.href)
                    ? "bg-indigo-600 text-white shadow-xl shadow-indigo-600/20"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <item.icon className={`w-5 h-5 ${location.startsWith(item.href) ? "text-white" : "text-gray-500"}`} />
                {item.label}
              </div>
            </Link>
          ))}
        </nav>
        <div className="p-6 border-t border-white/5">
          <button onClick={() => { clearAdminSession(); navigate("/admin/login"); }} className="flex items-center gap-4 px-4 py-3.5 w-full rounded-2xl text-sm font-bold text-red-400 hover:bg-red-500/10 transition-colors">
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 bg-gray-950/40 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-100 px-8 py-5 flex items-center gap-4 sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label={sidebarOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={sidebarOpen}
            className="lg:hidden p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex-1">
            <h1 className="font-black text-gray-900 text-xl tracking-tight">
              {NAV_ITEMS.find(i => location.startsWith(i.href))?.label ?? "Admin"}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-black text-gray-900">System Admin</p>
              <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Superuser</p>
            </div>
            <div className="w-11 h-11 bg-indigo-50 rounded-2xl flex items-center justify-center border-2 border-indigo-100 shadow-sm">
              <ShieldCheck className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
