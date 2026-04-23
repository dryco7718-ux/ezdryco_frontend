import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { CheckCircle, MapPin, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";

const SAKET_LANDMARKS = [
  "DDA Flats (Pocket A, B, C, D)",
  "Press Enclave Road",
  "Select City Walk area",
  "Saket Court vicinity",
  "DLF South Square",
  "Sheikh Sarai Phase 1 & 2",
];

const REVIEWS = [
  { name: "Vivek T.", text: "Rider arrived exactly on time. My suits came back perfectly dry cleaned. Will book again.", stars: 5 },
  { name: "Meera K.", text: "Best ironing service in Saket. 25 shirts picked up at 8 AM, back the next evening perfectly pressed.", stars: 5 },
  { name: "Ritu S.", text: "Switched from local dhobi after he went on leave for 2 weeks. Washify is just more reliable.", stars: 5 },
];

export default function LaundryServiceSaket() {
  const [, navigate] = useLocation();

  useSEO({
    title: "Laundry & Dry Cleaning Service in Saket Delhi | Washify",
    description: "Book laundry, dry cleaning & ironing in Saket Delhi. Free pickup near Select Citywalk, Saket Court & DDA flats. Starting ₹199. Delivered in 24–48 hrs.",
    canonical: "https://washify.in/laundry-service-saket",
  });

  return (
    <div className="min-h-screen bg-white font-sans">
      <nav className="bg-white border-b border-sky-100 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="font-extrabold text-xl text-sky-600">Washify</button>
          <div className="hidden md:flex gap-4 text-sm text-gray-500">
            <button onClick={() => navigate("/laundry-service-delhi")} className="hover:text-sky-500">Delhi</button>
            <button onClick={() => navigate("/laundry-service-south-delhi")} className="hover:text-sky-500">South Delhi</button>
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
            <p className="text-sky-600 text-sm font-semibold mb-3">📍 Saket, South Delhi — PIN 110017</p>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-5">
              Laundry Service in<br />
              <span className="text-sky-500">Saket, Delhi</span>
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl mb-8">
              Doorstep laundry pickup from DDA flats, Select Citywalk area, Saket Court, Press Enclave and all of Saket (PIN 110017). Professional cleaning, free delivery, same-day express available.
            </p>
            <Button onClick={() => navigate("/customer/register")}
              className="h-13 bg-sky-500 hover:bg-sky-600 text-white rounded-2xl font-bold px-8 text-base shadow-lg shadow-sky-200">
              Book Saket Pickup <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
            <div className="flex flex-wrap gap-5 mt-7">
              {["Free pickup", "Next-day delivery", "Starting ₹199", "Same-day express"].map((t) => (
                <div key={t} className="flex items-center gap-1.5 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-sky-500" /> {t}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* LANDMARKS */}
      <section className="py-16 px-5 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Areas We Cover in Saket</h2>
          <p className="text-gray-500 mb-8">We pick up from all residential and commercial pockets of Saket (PIN 110017).</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SAKET_LANDMARKS.map((lm) => (
              <div key={lm} className="flex items-center gap-3 bg-sky-50 rounded-2xl px-4 py-3 border border-sky-100">
                <MapPin className="w-4 h-4 text-sky-500 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-800">{lm}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-400 mt-4">Not sure if you're covered? <button className="text-sky-500 underline" onClick={() => navigate("/customer/register")}>Enter your address to check →</button></p>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-16 px-5 bg-sky-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Services in Saket</h2>
          <p className="text-gray-500 mb-8">All four Washify services with the same pricing and quality as across Delhi.</p>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { icon: "🧺", title: "Wash & Fold", desc: "Shirts, trousers, kurtas, bedsheets. Picked up and returned folded in 24–48 hours. Most Saket customers do a weekly pickup of 15–20 items.", price: "From ₹25/item" },
              { icon: "👔", title: "Dry Cleaning in Saket", desc: "Suits for presentations, silk sarees before family functions, woolen coats at the start of winter. 48–72 hr professional dry cleaning.", price: "From ₹120/item" },
              { icon: "♨️", title: "Ironing Service", desc: "Office shirts for Monday morning. Festival outfits. Picked up and returned pressed the next day.", price: "From ₹10/item" },
              { icon: "⚡", title: "Same-Day Express", desc: "Book before 10 AM, back by 7 PM. Available in Saket. Limited slots daily.", price: "+₹49 surcharge" },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl p-5 border border-sky-100 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate("/customer/register")}>
                <div className="text-3xl mb-3">{s.icon}</div>
                <h3 className="font-bold text-gray-900 mb-1">{s.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{s.desc}</p>
                <span className="text-sky-600 font-semibold text-sm">{s.price}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-16 px-5 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8">What Saket Customers Say</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {REVIEWS.map((r, i) => (
              <div key={i} className="bg-sky-50 rounded-2xl p-5 border border-sky-100">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: r.stars }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-700 mb-4">"{r.text}"</p>
                <p className="font-semibold text-gray-900 text-sm">— {r.name}, Saket</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-16 px-5 bg-sky-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Laundry Prices in Saket</h2>
          <p className="text-gray-500 mb-8">Fixed pricing — same as across Delhi. No area surcharges.</p>
          <div className="overflow-x-auto rounded-2xl border border-sky-100 shadow-sm">
            <table className="w-full bg-white text-sm">
              <thead className="bg-sky-500 text-white">
                <tr>
                  <th className="text-left px-5 py-3 font-semibold">Item</th>
                  <th className="text-left px-5 py-3 font-semibold">Wash & Fold</th>
                  <th className="text-left px-5 py-3 font-semibold">Dry Clean</th>
                  <th className="text-left px-5 py-3 font-semibold">Iron</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sky-50">
                {[
                  ["Shirt", "₹25", "₹120", "₹12"],
                  ["Trousers", "₹35", "₹120", "₹15"],
                  ["Suit (2-piece)", "—", "₹280", "₹40"],
                  ["Silk Saree", "—", "₹200", "₹35"],
                  ["Bedsheet (double)", "₹70", "—", "₹25"],
                ].map(([item, wash, dry, iron]) => (
                  <tr key={item} className="hover:bg-sky-50">
                    <td className="px-5 py-3 font-medium text-gray-900">{item}</td>
                    <td className="px-5 py-3 text-gray-600">{wash}</td>
                    <td className="px-5 py-3 text-gray-600">{dry}</td>
                    <td className="px-5 py-3 text-gray-600">{iron}</td>
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
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Saket Laundry FAQ</h2>
          <div className="space-y-4">
            {[
              { q: "Do you cover Select Citywalk area?", a: "Yes. We serve all of Saket PIN 110017, including the residential areas near Select Citywalk, Saket Court, and DLF South Square." },
              { q: "Is same-day service available in Saket?", a: "Yes — Express service is available in Saket. Book before 10 AM for same-day return by 7 PM." },
              { q: "How much does a typical Saket order cost?", a: "Most Saket customers spend ₹350–550 on a weekly pickup of 15–18 clothing items." },
              { q: "Can I book dry cleaning for my wedding sherwani?", a: "Yes. Book at least 5–7 days before the event for wedding sherwanis and heavy garments." },
            ].map((faq, i) => (
              <div key={i} className="rounded-2xl border border-sky-100 p-5 bg-sky-50">
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
          <h2 className="text-3xl font-extrabold mb-4">Book Laundry Pickup in Saket</h2>
          <p className="text-sky-100 mb-8">Serving all of Saket, Delhi. 7 AM–8 PM, 7 days a week. First order ₹50 off — code WASH50.</p>
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
            <button onClick={() => navigate("/laundry-service-lajpat-nagar")} className="hover:text-white">Lajpat Nagar</button>
            <button onClick={() => navigate("/")} className="hover:text-white">Home</button>
          </div>
          <p>© 2025 Washify. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
