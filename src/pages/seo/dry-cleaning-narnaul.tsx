import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { CheckCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";
import PublicLayout from "@/layouts/public-layout";
import { FAQAccordion } from "@/components/FAQAccordion";

const DRY_CLEAN_FAQS = [
  { q: "How long does dry cleaning take in Narnaul?", a: "Standard: 48–72 hours from pickup. Heavy items like blankets and curtains: allow up to 96 hours." },
  { q: "Is dry cleaning safe for my silk saree?", a: "Yes — silk responds well to dry cleaning and poorly to water washing. We recommend dry cleaning for all silk garments." },
  { q: "Can dry cleaning remove all stains?", a: "Most stains are removed successfully. Old or dye-based stains may not fully come out. We inform you before returning the garment." },
  { q: "What should I tell you before pickup?", a: "Mention any specific stains or concerns in the order notes or tell our pickup agent. It helps us pre-treat correctly." },
  { q: "Do you dry clean wedding outfits in Narnaul?", a: "Yes. For sherwanis, lehengas, and bridal wear — book at least 7 days before the event." },
];

const DRY_CLEAN_ITEMS = [
  { icon: "🤵", cat: "Formal Wear", items: ["Suit (2-piece) — ₹280", "Blazer — ₹180", "Formal trousers — ₹120", "Waistcoat — ₹100"] },
  { icon: "🥻", cat: "Indian Traditional Wear", items: ["Silk saree — ₹200", "Cotton/chiffon saree — ₹160", "Lehenga — ₹350+", "Sherwani — ₹350"] },
  { icon: "🧥", cat: "Woolen & Winter Clothes", items: ["Woolen coat — ₹200", "Sweater/cardigan — ₹150", "Blanket — ₹250", "Jacket — ₹180"] },
  { icon: "🪟", cat: "Home Textiles", items: ["Curtain (per panel) — ₹180", "Sofa cover (per seat) — ₹150", "Quilt/comforter — ₹300", "Tablecloth — ₹100"] },
];

export default function DryCleaningNarnaul() {
  const [, navigate] = useLocation();

  useSEO({
    title: "Dry Cleaning Service in Narnaul | Suits, Sarees, Woolens — EZDRY",
    description: "Professional dry cleaning in Narnaul, Haryana. Free doorstep pickup for suits, silk sarees, woolens, sherwanis. Starting ₹120/item. 48–72 hr turnaround. Book EZDRY.",
    canonical: "https://ezdry.in/dry-cleaning-narnaul",
  });

  return (
    <PublicLayout>

      {/* HERO */}
      <section className="bg-gradient-to-br from-sky-50 to-white py-16 px-5">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-sky-600 text-sm font-semibold mb-3">📍 Narnaul, Haryana — Free Doorstep Pickup</p>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-5">
              Dry Cleaning Service<br />
              <span className="text-sky-500">in Narnaul</span>
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl mb-8">
              Professional solvent-based dry cleaning for suits, silk sarees, sherwanis, woolen coats, and household textiles — with free doorstep pickup across Narnaul. No water, no shrinkage, no colour bleed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={() => navigate("/customer/register")}
                className="h-13 bg-sky-500 hover:bg-sky-600 text-white rounded-2xl font-bold px-8 text-base shadow-lg shadow-sky-200">
                Book Dry Cleaning Pickup <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-5 mt-7">
              {["Free pickup", "48–72 hr turnaround", "From ₹120/item", "Insured care"].map((t) => (
                <div key={t} className="flex items-center gap-1.5 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-sky-500" /> {t}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHY DRY CLEAN */}
      <section className="py-16 px-5 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-5">Why Dry Cleaning Matters</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 leading-relaxed mb-4">
                Despite the name, dry cleaning isn't completely "dry" — it uses chemical solvents instead of water. This matters because water damages certain fabrics in irreversible ways that most people don't discover until it's too late.
              </p>
              <p className="text-gray-600 leading-relaxed">
                In Narnaul's climate — dry summers and cold winters — woolen and structured garments are especially vulnerable to water damage. Dry cleaning keeps them looking new for years longer.
              </p>
            </div>
            <div className="space-y-3">
              {[
                { fabric: "Wool & cashmere", risk: "Water causes permanent shrinkage and matting (felting)" },
                { fabric: "Silk sarees", risk: "Water leaves irreversible tide marks and distorts the weave" },
                { fabric: "Tailored suits & blazers", risk: "Water collapses internal canvas, destroying the garment shape" },
                { fabric: "Embroidered items", risk: "Agitation loosens zari, mirror work, and thread embellishments" },
              ].map((item) => (
                <div key={item.fabric} className="bg-sky-50 rounded-xl p-4 border border-sky-100">
                  <p className="font-semibold text-gray-900 text-sm">{item.fabric}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.risk}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE DRY CLEAN */}
      <section className="py-16 px-5 bg-sky-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">What We Dry Clean in Narnaul</h2>
          <p className="text-gray-500 mb-10">From wedding sherwanis to everyday blazers — we handle all fabric types professionally.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {DRY_CLEAN_ITEMS.map((cat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl p-5 border border-sky-100 shadow-sm">
                <div className="text-3xl mb-3">{cat.icon}</div>
                <h3 className="font-bold text-gray-900 mb-3">{cat.cat}</h3>
                <ul className="space-y-1">
                  {cat.items.map((item) => (
                    <li key={item} className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-sky-400 rounded-full flex-shrink-0" />{item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-16 px-5 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Our Dry Cleaning Process</h2>
          <div className="grid sm:grid-cols-4 gap-6">
            {[
              { num: "1", title: "Inspection & Tagging", desc: "Each garment is checked for damage and tagged with your order ID." },
              { num: "2", title: "Stain Pre-Treatment", desc: "Visible stains get targeted spotting treatment before the main cycle." },
              { num: "3", title: "Solvent Cleaning", desc: "Processed in professional dry cleaning machines with commercial-grade solvents." },
              { num: "4", title: "Finishing & Sealing", desc: "Steam-pressed, reshaped, and sealed in a protective cover for delivery." },
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div className="w-10 h-10 bg-sky-500 rounded-full text-white font-bold flex items-center justify-center mx-auto mb-3">{step.num}</div>
                <h3 className="font-bold text-gray-900 mb-1 text-sm">{step.title}</h3>
                <p className="text-xs text-gray-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQAccordion
        items={DRY_CLEAN_FAQS}
        heading="Dry Cleaning FAQ — Narnaul"
        bg="bg-sky-50"
      />

      {/* CTA */}
      <section className="py-16 px-5 bg-sky-500">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl font-extrabold mb-4">Book Dry Cleaning Pickup in Narnaul</h2>
          <p className="text-sky-100 mb-8">Professional care for your valuable garments. Free pickup across Narnaul. First order ₹50 off — code FIRST50.</p>
          <Button onClick={() => navigate("/customer/register")}
            className="h-14 bg-white text-sky-600 hover:bg-sky-50 rounded-2xl font-bold px-10 text-base">
            Book Dry Cleaning Now <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </section>

    </PublicLayout>
  );
}
