import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { CheckCircle, MapPin, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";

const LN_AREAS = [
  "Lajpat Nagar I — Central Market area",
  "Lajpat Nagar II — Meenakshi Garden",
  "Lajpat Nagar III — Near Metro Station",
  "Lajpat Nagar IV — Guru Nanak Nagar",
  "Andrews Ganj — All lanes",
  "Nizamuddin East — Extended area",
];

export default function LaundryServiceLajpatNagar() {
  const [, navigate] = useLocation();

  useSEO({
    title: "Laundry & Dry Cleaning in Lajpat Nagar Delhi | Free Pickup — Washify",
    description: "Book laundry, dry cleaning & ironing in Lajpat Nagar Delhi. Free pickup from LN I, II, III, IV & Andrews Ganj. Starting ₹199. Next-day delivery.",
    canonical: "https://washify.in/laundry-service-lajpat-nagar",
  });

  return (
    <div className="min-h-screen bg-white font-sans">
      <nav className="bg-white border-b border-sky-100 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="font-extrabold text-xl text-sky-600">Washify</button>
          <div className="hidden md:flex gap-4 text-sm text-gray-500">
            <button onClick={() => navigate("/laundry-service-delhi")} className="hover:text-sky-500">Delhi</button>
            <button onClick={() => navigate("/laundry-service-south-delhi")} className="hover:text-sky-500">South Delhi</button>
            <button onClick={() => navigate("/laundry-service-saket")} className="hover:text-sky-500">Saket</button>
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
            <p className="text-sky-600 text-sm font-semibold mb-3">📍 Lajpat Nagar I–IV, Andrews Ganj — PIN 110024</p>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-5">
              Laundry Service in<br />
              <span className="text-sky-500">Lajpat Nagar, Delhi</span>
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl mb-8">
              Reliable laundry pickup and delivery across all four blocks of Lajpat Nagar and Andrews Ganj. Fixed prices, verified partners, WhatsApp tracking — no more depending on an inconsistent local dhobi.
            </p>
            <Button onClick={() => navigate("/customer/register")}
              className="h-13 bg-sky-500 hover:bg-sky-600 text-white rounded-2xl font-bold px-8 text-base shadow-lg shadow-sky-200">
              Book Lajpat Nagar Pickup <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
            <div className="flex flex-wrap gap-5 mt-7">
              {["Free pickup", "24–48 hr return", "Starting ₹199", "Same-day express"].map((t) => (
                <div key={t} className="flex items-center gap-1.5 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-sky-500" /> {t}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* AREAS */}
      <section className="py-16 px-5 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Coverage in Lajpat Nagar</h2>
          <p className="text-gray-500 mb-8">We serve all residential and commercial lanes within PIN code 110024.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {LN_AREAS.map((area) => (
              <div key={area} className="flex items-start gap-3 bg-sky-50 rounded-2xl px-4 py-4 border border-sky-100">
                <MapPin className="w-4 h-4 text-sky-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-800">{area}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO USES */}
      <section className="py-16 px-5 bg-sky-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-5">Who Uses Washify in Lajpat Nagar</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Lajpat Nagar is a dense, mixed neighbourhood — middle-class families in block housing, working professionals in rented PGs, business owners who commute daily. Laundry needs range from high-volume weekly family washes to quick professional shirt ironing before an early meeting.
          </p>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: "👨‍💼", title: "Working Professionals", desc: "Weekly shirt and trouser pickup. Office-ready clothes by 8 AM." },
              { icon: "👨‍👩‍👧", title: "Families", desc: "High-volume laundry including bedsheets, kids' clothes, and curtains." },
              { icon: "🏠", title: "PG Residents", desc: "No washing machine? No problem. Book per-item, pay only for what you send." },
            ].map((u) => (
              <div key={u.title} className="bg-white rounded-2xl p-5 border border-sky-100">
                <div className="text-3xl mb-3">{u.icon}</div>
                <h3 className="font-bold text-gray-900 mb-1">{u.title}</h3>
                <p className="text-sm text-gray-500">{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES + PRICING */}
      <section className="py-16 px-5 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Services & Pricing — Lajpat Nagar</h2>
          <p className="text-gray-500 mb-8">Same fixed pricing as across Delhi. No area surcharges.</p>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { icon: "🧺", title: "Wash & Fold", items: ["Shirt — ₹25", "Trousers — ₹35", "Kurta — ₹30", "Bedsheet (double) — ₹70"] },
              { icon: "👔", title: "Dry Cleaning", items: ["Suit (2-piece) — ₹280", "Silk Saree — ₹200", "Woolen Coat — ₹200", "Blazer — ₹180"] },
              { icon: "♨️", title: "Ironing", items: ["Shirt — ₹12", "Trousers — ₹15", "Saree — ₹35", "Suit jacket — ₹40"] },
              { icon: "⚡", title: "Express Same-Day", items: ["Book before 10 AM", "Return by 7 PM", "+₹49 surcharge", "Limited daily slots"] },
            ].map((s) => (
              <div key={s.title} className="bg-sky-50 rounded-2xl p-5 border border-sky-100">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{s.icon}</span>
                  <h3 className="font-bold text-gray-900">{s.title}</h3>
                </div>
                <ul className="space-y-1">
                  {s.items.map((item) => (
                    <li key={item} className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-sky-400 rounded-full flex-shrink-0" />{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-5 bg-sky-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Lajpat Nagar Laundry FAQ</h2>
          <div className="space-y-4">
            {[
              { q: "Do you cover the Lajpat Nagar Metro area?", a: "Yes — we serve all of LN I–IV, including areas adjacent to the Lajpat Nagar Metro Station." },
              { q: "Is same-day service available in Lajpat Nagar?", a: "Yes — Express service is available. Book before 10 AM for same-day return by 7 PM." },
              { q: "What does a typical Lajpat Nagar order cost?", a: "Most customers spend ₹300–550 on a weekly pickup of 15–18 items." },
              { q: "Can I get both wash and dry cleaning in one order?", a: "Yes. Add different services in the same booking — we'll separate and process each item correctly." },
            ].map((faq, i) => (
              <div key={i} className="rounded-2xl border border-sky-100 p-5 bg-white">
                <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-5 bg-sky-500">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl font-extrabold mb-4">Book Laundry in Lajpat Nagar</h2>
          <p className="text-sky-100 mb-8">Covering LN I–IV, Andrews Ganj & Nizamuddin East. 7 days a week. First order ₹50 off — code WASH50.</p>
          <Button onClick={() => navigate("/customer/register")}
            className="h-14 bg-white text-sky-600 hover:bg-sky-50 rounded-2xl font-bold px-10 text-base">
            Book Now — Free Pickup <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400 py-8 px-5 text-center text-sm">
        <div className="max-w-5xl mx-auto space-y-3">
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => navigate("/laundry-service-delhi")} className="hover:text-white">All Delhi</button>
            <button onClick={() => navigate("/laundry-service-south-delhi")} className="hover:text-white">South Delhi</button>
            <button onClick={() => navigate("/laundry-service-saket")} className="hover:text-white">Saket</button>
            <button onClick={() => navigate("/")} className="hover:text-white">Home</button>
          </div>
          <p>© 2025 Washify. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
