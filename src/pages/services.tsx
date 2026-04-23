import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { CheckCircle, ChevronRight, Clock, Shield, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";
import PublicLayout from "@/layouts/public-layout";

const SERVICES = [
  {
    id: "wash-fold",
    icon: "🧺",
    title: "Wash & Fold",
    tagline: "Everyday Laundry, Done Right",
    desc: "We pick up your everyday clothes, wash them with premium detergents, dry them perfectly, and fold them neatly. No more weekends wasted at the laundromat.",
    features: ["Cotton, linen, synthetics", "Gentle machine wash", "Folded & bagged clean", "24–48 hr turnaround"],
    price: "From ₹25/item",
    items: [["Shirt / T-shirt", "₹25"], ["Trousers / Jeans", "₹35"], ["Salwar Kameez", "₹60"], ["Bedsheet", "₹70"], ["Towel", "₹30"]],
    color: "from-sky-400 to-sky-600",
  },
  {
    id: "dry-cleaning",
    icon: "👔",
    title: "Dry Cleaning",
    tagline: "Professional Care for Premium Fabrics",
    desc: "Suits, silk sarees, sherwanis, woolen shawls — our dry cleaning uses professional-grade solvents to clean without water damage. Ideal for Narnaul's wedding season and winter wardrobe.",
    features: ["Suits, blazers, sherwanis", "Silk sarees & dupattas", "Woolens & coats", "Embroidered garments"],
    price: "From ₹120/item",
    items: [["Suit (2-piece)", "₹280"], ["Blazer", "₹180"], ["Silk Saree", "₹200"], ["Sherwani", "₹350"], ["Woolen Coat", "₹200"]],
    color: "from-indigo-400 to-indigo-600",
  },
  {
    id: "ironing",
    icon: "♨️",
    title: "Steam Ironing",
    tagline: "Crisp, Wrinkle-Free Every Time",
    desc: "Professional steam pressing gives your clothes a sharp, ready-to-wear finish. Perfect for office shirts, formal trousers, and occasion wear in Narnaul.",
    features: ["Steam & dry press", "All fabric types", "Hang-ready finish", "Same-day available"],
    price: "From ₹10/item",
    items: [["Shirt", "₹12"], ["Trousers", "₹15"], ["Saree", "₹35"], ["Kurta", "₹18"], ["Suit (press only)", "₹60"]],
    color: "from-emerald-400 to-emerald-600",
  },
];

const FAQS = [
  { q: "Which service is right for my clothes?", a: "Everyday cotton and synthetics go for Wash & Fold. Suits, silk, and woolens need Dry Cleaning. If your clothes just need a crease removed, Steam Ironing is perfect." },
  { q: "Can I mix services in one order?", a: "Yes. Add any combination — wash some items, dry-clean others, iron a few — all in a single pickup." },
  { q: "How do I know my clothes won't be mixed with someone else's?", a: "Every order gets a unique tracking tag. Your clothes are processed separately and returned in sealed bags with your order ID." },
  { q: "Do you offer same-day service in Narnaul?", a: "Yes — Express Same-Day is available if booked before 10 AM. A ₹49 surcharge applies. Your clothes return by 7 PM." },
];

export default function Services() {
  const [, navigate] = useLocation();

  useSEO({
    title: "Laundry & Dry Cleaning Services in Narnaul — EZDRY",
    description: "Wash & Fold, Dry Cleaning, and Steam Ironing with free doorstep pickup in Narnaul. Professional service from ₹25/item. Book EZDRY today.",
    canonical: "https://ezdry.in/services",
  });

  return (
    <PublicLayout>
      {/* HERO */}
      <section className="bg-gradient-to-br from-sky-50 to-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block bg-sky-100 text-sky-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-5">📍 Narnaul, Haryana</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-5 leading-tight">
              Our Laundry <span className="text-sky-500">Services</span>
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Three professional services — one platform. Free pickup, expert cleaning, doorstep delivery across Narnaul.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      {SERVICES.map((svc, i) => (
        <section key={svc.id} id={svc.id} className={`py-16 px-6 ${i % 2 === 1 ? "bg-sky-50" : "bg-white"}`}>
          <div className="max-w-6xl mx-auto">
            <div className={`grid md:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
              <motion.div initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${svc.color} flex items-center justify-center text-4xl mb-6 shadow-lg`}>
                  {svc.icon}
                </div>
                <p className="text-sky-600 font-semibold text-sm mb-2">{svc.tagline}</p>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-4">{svc.title}</h2>
                <p className="text-gray-500 leading-relaxed mb-6">{svc.desc}</p>
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {svc.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-sky-500 flex-shrink-0" /> {f}
                    </div>
                  ))}
                </div>
                <Button onClick={() => navigate("/customer/register")}
                  className="bg-sky-500 hover:bg-sky-600 text-white rounded-2xl px-7 h-12 font-semibold">
                  Book {svc.title} <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: i % 2 === 0 ? 20 : -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                <div className="bg-white rounded-3xl border border-sky-100 shadow-sm overflow-hidden">
                  <div className={`bg-gradient-to-br ${svc.color} p-5`}>
                    <p className="text-white font-bold text-lg">Sample Pricing</p>
                    <p className="text-white/80 text-sm">{svc.price}</p>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {svc.items.map(([item, price]) => (
                      <div key={item} className="flex justify-between items-center px-5 py-3.5">
                        <span className="text-sm text-gray-700">{item}</span>
                        <span className="text-sm font-bold text-sky-600">{price}</span>
                      </div>
                    ))}
                  </div>
                  <div className="p-5 bg-sky-50 border-t border-sky-100">
                    <p className="text-xs text-gray-500 flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-sky-500" /> All orders insured. No hidden charges.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* TRUST BADGES */}
      <section className="py-12 bg-gray-900">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { icon: <Clock className="w-6 h-6" />, label: "24–48 hr Turnaround" },
            { icon: <Shield className="w-6 h-6" />, label: "Insured Orders" },
            { icon: <Star className="w-6 h-6" />, label: "4.9★ Rated Service" },
            { icon: <CheckCircle className="w-6 h-6" />, label: "7 Days a Week" },
          ].map((b) => (
            <div key={b.label} className="flex flex-col items-center gap-2 text-white">
              <div className="text-sky-400">{b.icon}</div>
              <p className="text-sm font-semibold">{b.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-10 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <div key={i} className="rounded-2xl border border-sky-100 bg-sky-50 p-5">
                <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-sky-500">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl font-extrabold mb-4">Book Your First Pickup in Narnaul</h2>
          <p className="text-sky-100 mb-8">Free pickup. Starting ₹199. 24-hr turnaround. ₹50 off with code FIRST50.</p>
          <Button onClick={() => navigate("/customer/register")}
            className="h-14 bg-white text-sky-600 hover:bg-sky-50 rounded-2xl font-bold px-10 text-base shadow-lg">
            Book Now — Free Pickup <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </section>
    </PublicLayout>
  );
}
