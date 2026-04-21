import { ReactNode } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Search, Clock, User } from "lucide-react";
import { Link } from "wouter";

interface CustomerLayoutProps {
  children: ReactNode;
}

export function CustomerLayout({ children }: CustomerLayoutProps) {
  const [location] = useLocation();

  const isAuthPage = location.includes("/login") || location.includes("/register");

  return (
    <div className="min-h-[100dvh] bg-sky-100 flex items-center justify-center sm:p-4">
      <div className="w-full h-[100dvh] sm:h-[850px] sm:max-w-[430px] bg-white sm:rounded-[3rem] sm:shadow-2xl overflow-hidden relative flex flex-col sm:border-[8px] border-gray-900">
        
        {/* Mobile Status Bar Simulation */}
        <div className="hidden sm:flex justify-between items-center px-6 py-3 bg-white text-xs font-medium text-black z-50">
          <span>9:41</span>
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21L15.6 16.2C14.6 15.45 13.35 15 12 15C10.65 15 9.4 15.45 8.4 16.2L12 21ZM12 3C7.95 3 4.2 4.65 1.2 7.05L12 21L22.8 7.05C19.8 4.65 16.05 3 12 3Z" />
            </svg>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.67 4H14V2H10V4H8.33C7.6 4 7 4.6 7 5.33V20.67C7 21.4 7.6 22 8.33 22H15.67C16.4 22 17 21.4 17 20.67V5.33C17 4.6 16.4 4 15.67 4Z" />
            </svg>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-sky-50 pb-20 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={location}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="min-h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Navigation */}
        {!isAuthPage && (
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-sky-100 flex justify-around items-center px-6 py-4 pb-safe">
            <NavItem href="/customer/home" icon={Home} label="Home" active={location === "/customer/home"} />
            <NavItem href="/customer/book" icon={Search} label="Book" active={location.includes("/customer/book")} />
            <NavItem href="/customer/orders" icon={Clock} label="Orders" active={location.includes("/customer/orders") || location.includes("/customer/track")} />
            <NavItem href="/customer/profile" icon={User} label="Profile" active={location === "/customer/profile"} />
          </div>
        )}
      </div>
    </div>
  );
}

function NavItem({ href, icon: Icon, label, active }: { href: string; icon: any; label: string; active: boolean }) {
  return (
    <Link href={href} className={`flex flex-col items-center gap-1 focus:outline-none ${active ? "text-sky-500" : "text-gray-400 hover:text-gray-500"}`}>
      <Icon className={`w-6 h-6 ${active ? "fill-sky-100" : ""}`} />
      <span className="text-[10px] font-medium">{label}</span>
    </Link>
  );
}
