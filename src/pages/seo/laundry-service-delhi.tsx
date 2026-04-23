import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { CheckCircle, MapPin, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";

const AREAS = [
  { name: "Saket", href: "/laundry-service-saket" },
  { name: "Lajpat Nagar", href: "/laundry-service-lajpat-nagar" },
  { name: "Hauz Khas", href: "#" },
  { name: "Vasant Kunj", href: "#" },
  { name: "Greater Kailash", href: "#" },
  { name: "Dwarka", href: "#" },
  { name: "Rohini", href: "#" },
  { name: "Connaught Place", href: "#" },
];

const SERVICES = [
  { icon: "🧺", title: "Wash & Fold", desc: "Everyday clothes washed, dried and folded. From ₹25/item.", href: "/customer/register" },
  { icon: "👔", title: "Dry Cleaning", desc: "Suits, sarees, woolens — solvent-cleaned to preserve fabric. From ₹120/item.", href: "/customer/register" },
  { icon: "♨️", title: "Ironing & Steam Press", desc: "Crisp, wrinkle-free finish every time. From ₹10/item.", href: "/customer/register" },
  { icon: "⚡", title: "Express Same-Day", desc: "Book before 10 AM, back by 7 PM. +₹49 surcharge.", href: "/customer/register" },
];

const FAQS = [
  { q: "Which areas do you serve in Delhi?", a: "We currently serve Saket, Lajpat Nagar, Hauz Khas, Vasant Kunj, Greater Kailash, Dwarka, Rohini, Janakpuri, Karol Bagh, and Connaught Place." },
  { q: "How long does laundry take?", a: "Wash & fold: 24–48 hours. Dry cleaning: 48–72 hours. Same-day express available if booked before 10 AM." },
  { q: "What is the minimum order?", a: "₹199. Most orders are ₹350–600 for a weekly household pickup." },
  { q: "Is free delivery available?", a: "Yes — delivery is free on orders above ₹299." },
  { q: "Are my clothes insured?", a: "Yes. If anything is lost or damaged, we cover it. Every item is tagged with your unique order ID." },
  { q: "Can I book for office delivery in Delhi?", a: "Yes. Many customers in CP, Nehru Place and Saket Court use Washify for office pickups and delivery." },
];

export default function LaundryServiceDelhi() {
  const [, navigate] = useLocation();

  useSEO({
    title: "Laundry & Dry Cleaning Service in Delhi | Free Pickup & Delivery — Washify",
    description: "Book laundry, dry cleaning & ironing in Delhi online. Free doorstep pickup. Trusted laundry partners. Clothes back in 24–48 hrs. Starting ₹199.",
    canonical: "https://washify.in/laundry-service-delhi",
  });

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* NAV */}
      <nav className="bg-white border-b border-sky-100 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="font-extrabold text-xl text-sky-600 tracking-tight">
            Washify
          </button>
          <Button onClick={() => navigate("/customer/register")} className="bg-sky-500 hover:bg-sky-600 text-white rounded-full px-5 text-sm">
            Book Pickup
          </Button>
        </div>
      </nav>

      {/* HERO */}
      <section className="bg-gradient-to-br from-sky-50 to-white py-16 px-5">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-sky-600 text-sm font-semibold mb-3">📍 Serving Delhi — Free Doorstep Pickup</p>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-5">
              Laundry & Dry Cleaning<br />
              <span className="text-sky-500">Service in Delhi</span>
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl mb-8">
              Professional laundry pickup and delivery across Delhi. Wash & fold, dry cleaning, ironing, and same-day express — all booked online, delivered to your door.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => navigate("/customer/register")}
                className="h-13 bg-sky-500 hover:bg-sky-600 text-white rounded-2xl font-bold px-8 text-base shadow-lg shadow-sky-200"
              >
                Book a Delhi Pickup <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
              <Button
                onClick={() => navigate("/laundry-service-south-delhi")}
                variant="outline"
                className="h-13 border-sky-200 text-sky-600 hover:bg-sky-50 rounded-2xl font-semibold px-8 text-base"
              >
                South Delhi Coverage
              </Button>
            </div>
            <div className="flex flex-wrap gap-5 mt-7">
              {["Free pickup & delivery", "24–48 hr turnaround", "Starting ₹199", "7 days a week"].map((t) => (
                <div key={t} className="flex items-center gap-1.5 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-sky-500" /> {t}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-16 px-5 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Laundry Services in Delhi</h2>
          <p className="text-gray-500 mb-10">Everything your wardrobe needs, picked up and delivered across Delhi.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-sky-50 rounded-2xl p-5 border border-sky-100 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate(s.href)}
              >
                <div className="text-4xl mb-3">{s.icon}</div>
                <h3 className="font-bold text-gray-900 mb-1">{s.title}</h3>
                <p className="text-sm text-gray-500">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 px-5 bg-sky-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">How It Works in Delhi</h2>
          <p className="text-gray-500 mb-10">Three steps to clean clothes — no trips, no waiting.</p>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { num: "1", icon: "📱", title: "Book Online", desc: "Pick service, choose a Delhi pickup slot, enter your address. Done in 60 seconds." },
              { num: "2", icon: "🚴", title: "We Pickup", desc: "Our partner arrives at your Delhi address at the scheduled time. Hand over clothes in any bag." },
              { num: "3", icon: "✨", title: "Delivered Fresh", desc: "Cleaned, folded or pressed, and back at your door within 24–48 hours." },
            ].map((step) => (
              <div key={step.num} className="bg-white rounded-2xl p-6 shadow-sm border border-sky-100">
                <div className="text-3xl mb-3">{step.icon}</div>
                <div className="w-7 h-7 bg-sky-500 rounded-full text-white text-sm font-bold flex items-center justify-center mb-3">{step.num}</div>
                <h3 className="font-bold text-gray-900 mb-1">{step.title}</h3>
                <p className="text-sm text-gray-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AREAS */}
      <section className="py-16 px-5 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Areas We Serve in Delhi</h2>
          <p className="text-gray-500 mb-8">Doorstep laundry pickup available across South, West, Central, and North Delhi.</p>
          <div className="flex flex-wrap gap-3">
            {AREAS.map((area) => (
              <button
                key={area.name}
                onClick={() => area.href !== "#" ? navigate(area.href) : navigate("/customer/register")}
                className="flex items-center gap-1.5 bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-700 font-medium px-4 py-2 rounded-full text-sm transition-colors"
              >
                <MapPin className="w-3.5 h-3.5" /> {area.name}
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-400 mt-5">More areas being added every month. <button className="text-sky-500 underline" onClick={() => navigate("/customer/register")}>Check if we're in your area →</button></p>
        </div>
      </section>

      {/* PRICING SNAPSHOT */}
      <section className="py-16 px-5 bg-sky-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Transparent Pricing — Delhi 2025</h2>
          <p className="text-gray-500 mb-8">Fixed per-item rates. No hidden charges. Free delivery above ₹299.</p>
          <div className="overflow-x-auto rounded-2xl border border-sky-100 shadow-sm">
            <table className="w-full bg-white text-sm">
              <thead className="bg-sky-500 text-white">
                <tr>
                  <th className="text-left px-5 py-3 font-semibold">Service</th>
                  <th className="text-left px-5 py-3 font-semibold">Starting Price</th>
                  <th className="text-left px-5 py-3 font-semibold">Example</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sky-50">
                {[
                  ["Wash & Fold", "₹25/item", "Shirt ₹25 · Trousers ₹35"],
                  ["Dry Cleaning", "₹120/item", "Suit ₹280 · Saree ₹200"],
                  ["Ironing", "₹10/item", "Shirt ₹12 · Trousers ₹15"],
                  ["Express Same-Day", "+₹49 surcharge", "Book before 10 AM"],
                ].map(([svc, price, ex]) => (
                  <tr key={svc} className="hover:bg-sky-50 transition-colors">
                    <td className="px-5 py-3 font-medium text-gray-900">{svc}</td>
                    <td className="px-5 py-3 text-sky-600 font-semibold">{price}</td>
                    <td className="px-5 py-3 text-gray-500">{ex}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-5 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-10">Frequently Asked Questions — Delhi Laundry Service</h2>
          <div className="space-y-5">
            {FAQS.map((faq, i) => (
              <div key={i} className="rounded-2xl border border-sky-100 p-5 bg-sky-50">
                <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-5 bg-sky-500">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl font-extrabold mb-4">Ready to Book Your Delhi Laundry Pickup?</h2>
          <p className="text-sky-100 mb-8">Join 500+ Delhi customers getting fresh clothes delivered to their door. First order: ₹50 off with code WASH50.</p>
          <Button
            onClick={() => navigate("/customer/register")}
            className="h-14 bg-white text-sky-600 hover:bg-sky-50 rounded-2xl font-bold px-10 text-base shadow-lg"
          >
            Book Now — Free Pickup <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </section>

      {/* FOOTER NAV */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-5 text-center text-sm">
        <div className="max-w-5xl mx-auto space-y-3">
          <p className="text-white font-semibold">Washify — Laundry & Dry Cleaning Delhi</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => navigate("/laundry-service-south-delhi")} className="hover:text-white">South Delhi</button>
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
