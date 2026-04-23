import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { CheckCircle, MapPin, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";

const SOUTH_AREAS = [
  { name: "Saket", href: "/laundry-service-saket", pin: "110017" },
  { name: "Lajpat Nagar", href: "/laundry-service-lajpat-nagar", pin: "110024" },
  { name: "Hauz Khas", href: "#", pin: "110016" },
  { name: "Greater Kailash I", href: "#", pin: "110048" },
  { name: "Greater Kailash II", href: "#", pin: "110048" },
  { name: "Vasant Kunj", href: "#", pin: "110070" },
  { name: "Malviya Nagar", href: "#", pin: "110017" },
  { name: "Defence Colony", href: "#", pin: "110024" },
  { name: "Kalkaji", href: "#", pin: "110019" },
  { name: "Vasant Vihar", href: "#", pin: "110057" },
];

export default function LaundryServiceSouthDelhi() {
  const [, navigate] = useLocation();

  useSEO({
    title: "Laundry & Dry Cleaning Service in South Delhi | Free Pickup — Washify",
    description: "Washify serves South Delhi with professional laundry, dry cleaning & ironing. Free pickup from Saket, GK, Lajpat Nagar, Hauz Khas. Starting ₹199.",
    canonical: "https://washify.in/laundry-service-south-delhi",
  });

  return (
    <div className="min-h-screen bg-white font-sans">
      <nav className="bg-white border-b border-sky-100 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="font-extrabold text-xl text-sky-600">Washify</button>
          <div className="hidden md:flex gap-5 text-sm text-gray-600">
            <button onClick={() => navigate("/laundry-service-delhi")} className="hover:text-sky-500">Delhi</button>
            <button onClick={() => navigate("/laundry-service-saket")} className="hover:text-sky-500">Saket</button>
            <button onClick={() => navigate("/laundry-service-lajpat-nagar")} className="hover:text-sky-500">Lajpat Nagar</button>
          </div>
          <Button onClick={() => navigate("/customer/register")} className="bg-sky-500 hover:bg-sky-600 text-white rounded-full px-5 text-sm">
            Book Pickup
          </Button>
        </div>
      </nav>

      {/* HERO */}
      <section className="bg-gradient-to-br from-sky-50 to-white py-16 px-5">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-sky-600 text-sm font-semibold mb-3">📍 South Delhi Coverage — All Major Areas</p>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-5">
              Laundry Service in<br />
              <span className="text-sky-500">South Delhi</span>
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl mb-8">
              South Delhi's busiest professionals and families trust Washify for consistent, doorstep laundry. We cover Saket, Lajpat Nagar, Hauz Khas, Greater Kailash, Vasant Kunj, and more — 7 days a week.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => navigate("/customer/register")}
                className="h-13 bg-sky-500 hover:bg-sky-600 text-white rounded-2xl font-bold px-8 text-base shadow-lg shadow-sky-200"
              >
                Book South Delhi Pickup <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-5 mt-7">
              {["Free pickup", "24–48 hr turnaround", "Starting ₹199", "Insured orders"].map((t) => (
                <div key={t} className="flex items-center gap-1.5 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-sky-500" /> {t}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* AREAS GRID */}
      <section className="py-16 px-5 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">South Delhi Areas We Cover</h2>
          <p className="text-gray-500 mb-8">Click your area for specific coverage details and local information.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SOUTH_AREAS.map((area) => (
              <motion.button
                key={area.name}
                whileHover={{ scale: 1.02 }}
                onClick={() => area.href !== "#" ? navigate(area.href) : navigate("/customer/register")}
                className="flex items-center justify-between bg-sky-50 border border-sky-100 rounded-2xl px-5 py-4 hover:shadow-md transition-shadow text-left"
              >
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-sky-500" />
                  <div>
                    <p className="font-semibold text-gray-900">{area.name}</p>
                    <p className="text-xs text-gray-400">PIN: {area.pin}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-sky-400" />
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* WHY SOUTH DELHI */}
      <section className="py-16 px-5 bg-sky-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-5">Why South Delhi Chooses Washify</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 leading-relaxed mb-4">
                South Delhi residents expect quality. Between DDA flat communities in Saket, the working professionals near Nehru Place, families in GK and Hauz Khas, and students near JNU — the demand for reliable, consistent laundry is high.
              </p>
              <p className="text-gray-600 leading-relaxed">
                The local dhobi is convenient until he's on leave for a week and your work shirts are with him. Washify gives South Delhi the reliability it deserves — fixed prices, confirmed slots, and WhatsApp updates.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { title: "Transparent Pricing", desc: "Listed publicly. ₹25/shirt wash. No haggling, no surprises." },
                { title: "Verified Partners", desc: "Every laundry shop on Washify passes our quality check first." },
                { title: "7-Day Service", desc: "Including Sundays. 8 AM to 8 PM pickup slots." },
                { title: "WhatsApp Tracking", desc: "Updates at pickup, during cleaning, and out for delivery." },
              ].map((item) => (
                <div key={item.title} className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-sky-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">{item.title}</p>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-16 px-5 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Services Available in South Delhi</h2>
          <p className="text-gray-500 mb-8">All services at the same price across every South Delhi area.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: "🧺", title: "Wash & Fold", price: "From ₹25/item" },
              { icon: "👔", title: "Dry Cleaning", price: "From ₹120/item" },
              { icon: "♨️", title: "Ironing", price: "From ₹10/item" },
              { icon: "⚡", title: "Express Same-Day", price: "+₹49 surcharge" },
            ].map((s, i) => (
              <div key={i} onClick={() => navigate("/customer/register")}
                className="bg-sky-50 rounded-2xl p-5 border border-sky-100 hover:shadow-md transition-shadow cursor-pointer text-center">
                <div className="text-4xl mb-3">{s.icon}</div>
                <h3 className="font-bold text-gray-900 mb-1">{s.title}</h3>
                <p className="text-sky-600 font-semibold text-sm">{s.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-5 bg-sky-500">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl font-extrabold mb-4">Book Your South Delhi Laundry Pickup</h2>
          <p className="text-sky-100 mb-8">Serving Saket, Lajpat Nagar, Hauz Khas, GK, Vasant Kunj & more. First order ₹50 off — code WASH50.</p>
          <Button onClick={() => navigate("/customer/register")}
            className="h-14 bg-white text-sky-600 hover:bg-sky-50 rounded-2xl font-bold px-10 text-base">
            Book Now — Free Pickup <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400 py-8 px-5 text-center text-sm">
        <div className="max-w-5xl mx-auto space-y-3">
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => navigate("/laundry-service-delhi")} className="hover:text-white">Delhi</button>
            <button onClick={() => navigate("/laundry-service-saket")} className="hover:text-white">Saket</button>
            <button onClick={() => navigate("/laundry-service-lajpat-nagar")} className="hover:text-white">Lajpat Nagar</button>
            <button onClick={() => navigate("/")} className="hover:text-white">Home</button>
          </div>
          <p>© 2025 Washify. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
