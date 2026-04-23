import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { CheckCircle, ChevronRight, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";
import PublicLayout from "@/layouts/public-layout";
import { FAQAccordion } from "@/components/FAQAccordion";

const PLANS = [
  {
    id: "basic",
    name: "Pay Per Order",
    tagline: "Perfect for occasional use",
    badge: null,
    price: "No subscription",
    sub: "Pay only when you order",
    features: [
      "Wash & Fold from ₹25/item",
      "Dry Cleaning from ₹120/item",
      "Steam Iron from ₹10/item",
      "Free pickup above ₹299",
      "24–48 hr turnaround",
      "WhatsApp tracking",
    ],
    cta: "Start Ordering",
    highlight: false,
  },
  {
    id: "weekly",
    name: "Weekly Plan",
    tagline: "Best for families",
    badge: "Most Popular",
    price: "₹999",
    sub: "per month · weekly pickups",
    features: [
      "1 pickup per week (4/month)",
      "Up to 5 kg per pickup",
      "Wash & Fold included",
      "10% discount on dry cleaning",
      "Priority scheduling",
      "Dedicated WhatsApp support",
    ],
    cta: "Get Weekly Plan",
    highlight: true,
  },
  {
    id: "monthly",
    name: "Monthly Bundle",
    tagline: "Max savings for heavy users",
    badge: "Best Value",
    price: "₹1,799",
    sub: "per month · unlimited pickups",
    features: [
      "Unlimited pickups",
      "Up to 15 kg / month",
      "Wash, dry clean & iron all included",
      "Express same-day for free (2×/month)",
      "Dedicated account manager",
      "Guaranteed 24-hr turnaround",
    ],
    cta: "Get Monthly Bundle",
    highlight: false,
  },
];

const PRICE_ITEMS = [
  { category: "Wash & Fold", items: [["Shirt / T-shirt", "₹25"], ["Trousers / Jeans", "₹35"], ["Kurta / Salwar set", "₹60"], ["Bedsheet", "₹70"], ["Towel", "₹30"], ["Jacket (light)", "₹80"]] },
  { category: "Dry Cleaning", items: [["Suit (2-piece)", "₹280"], ["Blazer", "₹180"], ["Silk Saree", "₹200"], ["Sherwani", "₹350"], ["Woolen Coat", "₹200"], ["Lehenga", "₹350+"]] },
  { category: "Steam Ironing", items: [["Shirt", "₹12"], ["Trousers", "₹15"], ["Kurta", "₹18"], ["Saree", "₹35"], ["Suit press", "₹60"], ["Bedsheet press", "₹30"]] },
];

const FAQS = [
  { q: "Is there a minimum order value?", a: "Yes — ₹199 minimum. Free pickup applies on orders above ₹299." },
  { q: "How is per-kg pricing different from per-item?", a: "EZDRY charges per item, not per kg. This means light, expensive garments aren't overcharged and you always know the price upfront." },
  { q: "Are there hidden charges?", a: "No. All prices are listed here. The only add-on is Express Same-Day (+₹49 per order if booked before 10 AM)." },
  { q: "Do plan prices include dry cleaning?", a: "The Weekly Plan covers Wash & Fold. Dry cleaning has a 10% discount on top. The Monthly Bundle includes all three services." },
];

export default function Pricing() {
  const [, navigate] = useLocation();

  useSEO({
    title: "Laundry Pricing in Narnaul — Transparent Rates | EZDRY",
    description: "Clear, per-item laundry pricing in Narnaul. Wash & Fold from ₹25, Dry Cleaning from ₹120, Ironing from ₹10. No hidden charges. View EZDRY's full price list.",
    canonical: "https://ezdry.in/pricing",
  });

  return (
    <PublicLayout>
      {/* HERO */}
      <section className="bg-gradient-to-br from-sky-50 to-white py-16 px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
          <span className="inline-block bg-sky-100 text-sky-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-5">
            <Shield className="w-3.5 h-3.5 inline mr-1" />No Hidden Charges
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-5 leading-tight">
            Simple, <span className="text-sky-500">Transparent</span> Pricing
          </h1>
          <p className="text-gray-500 text-lg">
            Fixed per-item rates. No surprises. Every price listed before you confirm.
          </p>
        </motion.div>
      </section>

      {/* PLANS */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {PLANS.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-3xl border p-6 relative ${plan.highlight
                  ? "border-sky-500 bg-sky-500 text-white shadow-xl shadow-sky-200"
                  : "border-sky-100 bg-white shadow-sm"}`}
              >
                {plan.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">
                    {plan.badge}
                  </span>
                )}
                <p className={`text-sm font-semibold mb-1 ${plan.highlight ? "text-sky-100" : "text-sky-600"}`}>{plan.tagline}</p>
                <h2 className={`text-xl font-extrabold mb-1 ${plan.highlight ? "text-white" : "text-gray-900"}`}>{plan.name}</h2>
                <div className="my-4">
                  <span className={`text-3xl font-black ${plan.highlight ? "text-white" : "text-gray-900"}`}>{plan.price}</span>
                  <p className={`text-xs mt-1 ${plan.highlight ? "text-sky-200" : "text-gray-400"}`}>{plan.sub}</p>
                </div>
                <div className="space-y-2.5 mb-6">
                  {plan.features.map((f) => (
                    <div key={f} className={`flex items-start gap-2 text-sm ${plan.highlight ? "text-sky-50" : "text-gray-600"}`}>
                      <CheckCircle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.highlight ? "text-sky-200" : "text-sky-500"}`} /> {f}
                    </div>
                  ))}
                </div>
                <Button
                  onClick={() => navigate("/customer/register")}
                  className={`w-full rounded-2xl font-bold h-11 ${plan.highlight ? "bg-white text-sky-600 hover:bg-sky-50" : "bg-sky-500 hover:bg-sky-600 text-white"}`}
                >
                  {plan.cta}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICE TABLE */}
      <section className="py-16 px-6 bg-sky-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2 text-center">Full Price List — Narnaul</h2>
          <p className="text-gray-500 text-center mb-10">Per-item pricing. No minimums per category.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {PRICE_ITEMS.map((cat) => (
              <div key={cat.category} className="bg-white rounded-3xl overflow-hidden border border-sky-100 shadow-sm">
                <div className="bg-sky-500 px-5 py-4">
                  <h3 className="text-white font-bold text-base">{cat.category}</h3>
                </div>
                <div className="divide-y divide-gray-50">
                  {cat.items.map(([item, price]) => (
                    <div key={item} className="flex justify-between items-center px-5 py-3">
                      <span className="text-sm text-gray-700">{item}</span>
                      <span className="text-sm font-bold text-sky-600">{price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 bg-sky-100 rounded-2xl p-5 text-center">
            <p className="text-sky-800 text-sm font-medium">
              <Zap className="w-4 h-4 inline mr-1" />
              Express Same-Day add-on: +₹49 per order (book before 10 AM, return by 7 PM) · Free delivery on orders ₹299+
            </p>
          </div>
        </div>
      </section>

      <FAQAccordion
        items={FAQS}
        heading="Pricing FAQs"
        bg="bg-white"
      />

      {/* CTA */}
      <section className="py-16 px-6 bg-sky-500">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl font-extrabold mb-4">Get ₹50 Off Your First Order</h2>
          <p className="text-sky-100 mb-8">Use code FIRST50 at checkout. Free pickup in Narnaul. No minimum subscription.</p>
          <Button onClick={() => navigate("/customer/register")}
            className="h-14 bg-white text-sky-600 hover:bg-sky-50 rounded-2xl font-bold px-10 text-base shadow-lg">
            Book Now — Free Pickup <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </section>
    </PublicLayout>
  );
}
