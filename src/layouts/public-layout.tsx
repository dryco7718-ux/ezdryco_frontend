import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { EZDRYLogo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { MapPin, Menu, X, ChevronRight } from "lucide-react";

interface PublicLayoutProps {
  children: React.ReactNode;
}

const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
];

const FOOTER_COLS = [
  {
    heading: "Pages",
    links: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Pricing", href: "/pricing" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Narnaul Services",
    links: [
      { label: "Laundry Service Narnaul", href: "/laundry-service-narnaul" },
      { label: "Dry Cleaning Narnaul", href: "/dry-cleaning-narnaul" },
      { label: "Laundry Near Me", href: "/laundry-near-me-narnaul" },
      { label: "Blog", href: "/blog" },
    ],
  },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Refund Policy", href: "/refund" },
];

export default function PublicLayout({ children }: PublicLayoutProps) {
  const [location, navigate] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">

      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-sky-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">

          {/* Logo */}
          <button onClick={() => navigate("/")} className="focus:outline-none flex-shrink-0">
            <EZDRYLogo size={34} />
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm text-gray-600">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => navigate(link.href)}
                className={`hover:text-sky-500 transition-colors font-medium ${location === link.href ? "text-sky-500" : ""}`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => navigate("/customer/login")}
              className="text-sm text-gray-600 hover:text-sky-500 font-medium transition-colors"
            >
              Login
            </button>
            <Button
              onClick={() => navigate("/customer/register")}
              className="bg-sky-500 hover:bg-sky-600 text-white rounded-full px-5 py-2 text-sm font-semibold"
            >
              Book Now
            </Button>
          </div>

          {/* Mobile: Book Now + Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <Button
              onClick={() => navigate("/customer/register")}
              className="bg-sky-500 hover:bg-sky-600 text-white rounded-full px-4 py-1.5 text-xs font-semibold h-8"
            >
              Book Now
            </Button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg text-gray-700 hover:bg-sky-50 transition-colors"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* ── MOBILE MENU DRAWER ── */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="bg-white border-t border-sky-100 px-4 py-5 space-y-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => navigate(link.href)}
                className={`w-full text-left flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${location === link.href ? "bg-sky-50 text-sky-600" : "text-gray-700 hover:bg-sky-50 hover:text-sky-600"}`}
              >
                {link.label}
                <ChevronRight className="w-4 h-4 opacity-40" />
              </button>
            ))}
            <div className="border-t border-gray-100 pt-4 mt-4 flex flex-col gap-2">
              <Button
                onClick={() => navigate("/customer/register")}
                className="w-full bg-sky-500 hover:bg-sky-600 text-white rounded-xl h-11 font-semibold"
              >
                Book Pickup — Free Delivery
              </Button>
              <Button
                onClick={() => navigate("/customer/login")}
                variant="outline"
                className="w-full border-sky-200 text-sky-600 rounded-xl h-11 font-medium"
              >
                Login to My Account
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay for mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* ── PAGE CONTENT ── */}
      <main className="flex-1 pt-[57px] sm:pt-[65px]">
        {children}
      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-900 text-white pt-12 pb-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          {/* Top grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

            {/* Brand column */}
            <div className="sm:col-span-2 lg:col-span-1">
              <EZDRYLogo size={34} textColor="text-white" className="mb-4" />
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Narnaul's professional laundry & dry cleaning service. Free doorstep pickup. Starting ₹199.
              </p>
              <p className="flex items-center gap-1.5 text-sky-400 text-sm font-medium">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0" /> Serving Narnaul, Haryana
              </p>
              <div className="mt-4 space-y-1 text-sm text-gray-500">
                <p>📞 +91 80533 17489</p>
                <p>✉️ dryco7718@gmail.com</p>
                <p>🕗 Mon–Sun, 8 AM – 8 PM</p>
              </div>
            </div>

            {/* Link columns */}
            {FOOTER_COLS.map((col) => (
              <div key={col.heading}>
                <p className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">{col.heading}</p>
                <div className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
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
            ))}

            {/* Legal */}
            <div>
              <p className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Legal</p>
              <div className="flex flex-col gap-2.5">
                {LEGAL_LINKS.map((link) => (
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
          </div>

          {/* Bottom bar */}
          <div className="border-t border-gray-800 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <p className="text-gray-500 text-sm">© 2025 EZDRY. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-4 text-gray-600 text-sm">
              {LEGAL_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => navigate(link.href)}
                  className="hover:text-white transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => navigate("/admin/login")}
                className="text-gray-700 hover:text-gray-500 text-xs transition-colors"
              >
                Admin
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
