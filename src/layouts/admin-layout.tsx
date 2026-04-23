import { ReactNode, useState } from "react";
import { useLocation, Link } from "wouter";
import {
  LayoutDashboard, Store, Percent,
  Users, Bell, LogOut, ShieldCheck, Menu, X, BookOpen
} from "lucide-react";
import { WashifyLogo } from "@/components/Logo";

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
    <div className="min-h-screen bg-sky-50 flex">
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-sky-100 flex flex-col transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static`}>
        <div className="p-6 border-b border-sky-50">
          <div className="flex items-center gap-2">
            <WashifyLogo size={34} iconOnly />
            <div>
              <p className="font-bold text-gray-900 text-sm">EZDRY Admin</p>
              <p className="text-xs text-gray-400">Super Admin Panel</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map(item => (
            <Link key={item.href} href={item.href}>
              <div
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  location.startsWith(item.href)
                    ? "bg-sky-500 text-white"
                    : "text-gray-500 hover:bg-sky-50 hover:text-gray-800"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </div>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-sky-50">
          <button onClick={() => navigate("/admin/login")} className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-sm text-red-400 hover:bg-red-50">
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 bg-black/20 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-sky-100 px-6 py-4 flex items-center gap-4">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 rounded-lg hover:bg-sky-50">
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <h1 className="font-semibold text-gray-700 text-lg flex-1">
            {NAV_ITEMS.find(i => location.startsWith(i.href))?.label ?? "Admin"}
          </h1>
          <div className="w-9 h-9 bg-sky-100 rounded-full flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-sky-500" />
          </div>
        </header>
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
