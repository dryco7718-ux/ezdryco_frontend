import { useLocation } from "wouter";
import { WashifyLogo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

interface PublicLayoutProps {
  children: React.ReactNode;
}

const NAV_LINKS = [
  { label: "Services", href: "/#services" },
  { label: "Narnaul", href: "/laundry-service-narnaul" },
  { label: "Dry Cleaning", href: "/dry-cleaning-narnaul" },
  { label: "Blog", href: "/blog" },
];

const FOOTER_LINKS = [
  { label: "Laundry Service Narnaul", href: "/laundry-service-narnaul" },
  { label: "Dry Cleaning Narnaul", href: "/dry-cleaning-narnaul" },
  { label: "Laundry Near Me", href: "/laundry-near-me-narnaul" },
  { label: "Blog", href: "/blog" },
  { label: "Home", href: "/" },
];

export default function PublicLayout({ children }: PublicLayoutProps) {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-sky-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="focus:outline-none">
            <WashifyLogo size={36} />
          </button>

          <div className="hidden md:flex items-center gap-7 text-sm text-gray-600">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => navigate(link.href)}
                className="hover:text-sky-500 transition-colors font-medium"
              >
                {link.label}
              </button>
            ))}
          </div>

          <Button
            onClick={() => navigate("/customer/login")}
            className="bg-sky-500 hover:bg-sky-600 text-white rounded-full px-5 py-2 text-sm font-semibold"
          >
            Book Now
          </Button>
        </div>
      </nav>

      {/* ── PAGE CONTENT ── padded for fixed navbar */}
      <main className="flex-1 pt-[65px]">
        {children}
      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-900 text-white pt-10 pb-6">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <WashifyLogo size={36} textColor="text-white" className="mb-3" />
              <p className="text-gray-400 text-sm leading-relaxed">
                Narnaul's professional laundry & dry cleaning service. Free doorstep pickup. Starting ₹199.
              </p>
              <p className="flex items-center gap-1.5 text-sky-400 text-sm mt-3 font-medium">
                <MapPin className="w-3.5 h-3.5" /> Serving Narnaul, Haryana
              </p>
            </div>

            {/* Links */}
            <div>
              <p className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Services</p>
              <div className="flex flex-col gap-2.5">
                {FOOTER_LINKS.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => navigate(link.href)}
                    className="text-gray-400 hover:text-white text-sm text-left transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <p className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Contact</p>
              <div className="space-y-2 text-sm text-gray-400">
                <p>📞 +91 80533 17489</p>
                <p>✉️ dryco7718@gmail.com</p>
                <p>🕗 Mon–Sun, 8 AM – 8 PM</p>
                <p>📍 Narnaul, Mahendragarh, Haryana</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-gray-500 text-sm">© 2025 EZDRY. All rights reserved.</p>
            <div className="flex gap-5 text-gray-500 text-sm">
              <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-white cursor-pointer transition-colors">Terms of Use</span>
              <button onClick={() => navigate("/admin/login")} className="hover:text-gray-400 text-gray-700 text-xs transition-colors">Admin</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
