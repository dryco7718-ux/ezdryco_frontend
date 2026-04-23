import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { CheckCircle, MapPin, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";
import PublicLayout from "@/layouts/public-layout";

const FAQS = [
  { q: "Which areas do you serve in Narnaul?", a: "We serve all localities within Narnaul including Old Narnaul, New Colony, Mandi area, Bus Stand area, and surrounding neighbourhoods in Mahendragarh district." },
  { q: "How long does laundry take?", a: "Wash & fold: 24–48 hours. Dry cleaning: 48–72 hours. Same-day express available if booked before 10 AM." },
  { q: "What is the minimum order?", a: "₹199. Most orders are ₹300–500 for a weekly household pickup." },
  { q: "Is delivery free in Narnaul?", a: "Yes — delivery is free on orders above ₹299 within Narnaul." },
  { q: "Are my clothes safe?", a: "Yes. Every item is tagged with your unique order ID before processing. We've delivered hundreds of orders without a single lost-item complaint." },
  { q: "Do you operate on Sundays?", a: "Yes. We're open 7 days a week, 8 AM to 8 PM." },
];

const SERVICES = [
  { icon: "🧺", title: "Wash & Fold", desc: "Everyday clothes washed, dried, and neatly folded. From ₹25/item.", href: "/customer/register" },
  { icon: "👔", title: "Dry Cleaning", desc: "Suits, sherwanis, silk dupattas — solvent-cleaned to preserve fabric. From ₹120/item.", href: "/customer/register" },
  { icon: "♨️", title: "Ironing & Steam Press", desc: "Crisp, wrinkle-free clothes every time. Professional steam iron. From ₹10/item.", href: "/customer/register" },
  { icon: "⚡", title: "Express Same-Day", desc: "Book before 10 AM, back by 7 PM. Available in Narnaul. +₹49 surcharge.", href: "/customer/register" },
];

export default function LaundryServiceNarnaul() {
  const [, navigate] = useLocation();

  useSEO({
    title: "Best Laundry Service in Narnaul | Free Pickup & Delivery — EZDRY",
    description: "Professional laundry, dry cleaning & ironing in Narnaul, Haryana. Free doorstep pickup. Trusted local partners. Clothes back in 24–48 hrs. Starting ₹199. Book EZDRY now.",
    canonical: "https://ezdry.in/laundry-service-narnaul",
  });

  return (
    <PublicLayout>

      {/* HERO */}
      <section className="bg-gradient-to-br from-sky-50 to-white py-16 px-5">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-sky-600 text-sm font-semibold mb-3">📍 Narnaul, Haryana — Doorstep Pickup & Delivery</p>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-5">
              Laundry & Dry Cleaning<br />
              <span className="text-sky-500">Service in Narnaul</span>
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl mb-8">
              Narnaul's most reliable laundry service — wash & fold, dry cleaning, ironing, and same-day express. Book online, get free doorstep pickup, and receive fresh clothes within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => navigate("/customer/register")}
                className="h-13 bg-sky-500 hover:bg-sky-600 text-white rounded-2xl font-bold px-8 text-base shadow-lg shadow-sky-200"
              >
                Book Narnaul Pickup <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
              <Button
                onClick={() => navigate("/dry-cleaning-narnaul")}
                variant="outline"
                className="h-13 border-sky-200 text-sky-600 hover:bg-sky-50 rounded-2xl font-semibold px-8 text-base"
              >
                Dry Cleaning Narnaul
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
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Our Services in Narnaul</h2>
          <p className="text-gray-500 mb-10">Everything your wardrobe needs — picked up and delivered across Narnaul.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-sky-50 rounded-2xl p-5 border border-sky-100 hover:shadow-md transition-shadow cursor-pointer text-center"
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
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">How It Works in Narnaul</h2>
          <p className="text-gray-500 mb-10">Three steps to fresh clothes — no trip required.</p>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { num: "1", icon: "📱", title: "Book Online", desc: "Pick your service and time slot on EZDRY. Takes 60 seconds — no app download needed." },
              { num: "2", icon: "🚴", title: "We Pickup From Your Door", desc: "Our Narnaul partner arrives at your address at the chosen time. Hand over clothes in any bag." },
              { num: "3", icon: "✨", title: "Fresh Clothes Delivered", desc: "Cleaned, folded or pressed, and back at your Narnaul address within 24–48 hours." },
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

      {/* WHY EZDRY */}
      <section className="py-16 px-5 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-5">Why Narnaul Chooses EZDRY</h2>
          <div className="grid md:grid-cols-2 gap-10">
            <p className="text-gray-600 leading-relaxed">
              Narnaul's traditional dhobi network is reliable for everyday clothes — but inconsistent for valuable garments, unpredictable during festivals, and unavailable for proper dry cleaning. EZDRY brings professional laundry with fixed pricing, verified partners, and WhatsApp tracking to every home in Narnaul.
            </p>
            <div className="space-y-4">
              {[
                { title: "Transparent Pricing", desc: "Fixed rates listed publicly — ₹25/shirt wash. No surprise bills." },
                { title: "Verified Local Partners", desc: "Every laundry shop on EZDRY passes our quality check before going live." },
                { title: "WhatsApp Tracking", desc: "Updates at pickup, during cleaning, and out for delivery. Real humans respond." },
                { title: "Insured Orders", desc: "If anything is lost or damaged, we cover it. Every item gets a unique tag." },
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

      {/* PRICING */}
      <section className="py-16 px-5 bg-sky-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Laundry Prices in Narnaul</h2>
          <p className="text-gray-500 mb-8">Fixed per-item pricing. No hidden charges. Free delivery above ₹299.</p>
          <div className="overflow-x-auto rounded-2xl border border-sky-100 shadow-sm">
            <table className="w-full bg-white text-sm">
              <thead className="bg-sky-500 text-white">
                <tr>
                  <th className="text-left px-5 py-3 font-semibold">Service</th>
                  <th className="text-left px-5 py-3 font-semibold">Starting Price</th>
                  <th className="text-left px-5 py-3 font-semibold">Popular Items</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sky-50">
                {[
                  ["Wash & Fold", "₹25/item", "Shirt ₹25 · Trousers ₹35 · Bedsheet ₹70"],
                  ["Dry Cleaning", "₹120/item", "Suit ₹280 · Saree ₹200 · Blazer ₹180"],
                  ["Ironing", "₹10/item", "Shirt ₹12 · Trousers ₹15 · Saree ₹35"],
                  ["Express Same-Day", "+₹49/order", "Book before 10 AM · Return by 7 PM"],
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
          <h2 className="text-3xl font-extrabold text-gray-900 mb-10">Frequently Asked Questions — Narnaul Laundry</h2>
          <div className="space-y-4">
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
          <h2 className="text-3xl font-extrabold mb-4">Book Your Narnaul Laundry Pickup Today</h2>
          <p className="text-sky-100 mb-8">Join hundreds of Narnaul customers getting fresh clothes at their door. First order ₹50 off — code FIRST50.</p>
          <Button onClick={() => navigate("/customer/register")}
            className="h-14 bg-white text-sky-600 hover:bg-sky-50 rounded-2xl font-bold px-10 text-base shadow-lg">
            Book Now — Free Pickup <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </section>


    </PublicLayout>
  );
}
