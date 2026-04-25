import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { CheckCircle, MapPin, ChevronRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";
import PublicLayout from "@/layouts/public-layout";
import { FAQAccordion } from "@/components/FAQAccordion";

const NEAR_ME_FAQS = [
  { q: "Do I need to pack my clothes before pickup?", a: "No, just keep them ready in any bag. Our rider will transfer them to a reusable EZDRY bag." },
  { q: "Can I schedule a pickup for a specific time?", a: "Yes, you can choose a convenient 2-hour time slot for pickup during booking." },
  { q: "Is there a minimum order amount for free pickup?", a: "Yes, free pickup is available for orders above ₹199. Orders below this amount have a small convenience fee." }
];

const LOCALITIES = [
  { name: "Old Narnaul", detail: "Market area, old city lanes" },
  { name: "New Colony", detail: "Residential colony sector" },
  { name: "Mandi Area", detail: "Near grain market, main bazaar" },
  { name: "Bus Stand Area", detail: "Commercial hub, nearby streets" },
  { name: "Sadar Bazar", detail: "Central market area" },
  { name: "Housing Board", detail: "Colony sectors" },
  { name: "Haryana Colony", detail: "Residential blocks" },
  { name: "Mahendragarh Road", detail: "Along highway to Mahendragarh" },
];

export default function LaundryNearMeNarnaul() {
  const [, navigate] = useLocation();

  useSEO({
    title: "Laundry Near Me in Narnaul | Pickup & Delivery at Your Door — EZDRY",
    description: "Looking for laundry near you in Narnaul? EZDRY picks up from your door — no trip needed. Available across all Narnaul localities. Starting ₹199. Book now.",
    canonical: "https://ezdry.in/laundry-near-me-narnaul",
  });

  return (
    <PublicLayout>

      {/* HERO */}
      <section className="bg-gradient-to-br from-sky-50 to-white py-16 px-5">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-sky-600 text-sm font-semibold mb-3">📍 Narnaul, Haryana — We Come to You</p>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-5">
              Laundry Near Me<br />
              <span className="text-sky-500">in Narnaul</span>
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl mb-8">
              Forget searching for "laundry near me" and walking somewhere with a bag of clothes. EZDRY is the laundry service that comes to you — pickup from your door, delivery back to your door, anywhere in Narnaul.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={() => navigate("/customer/register")}
                className="h-13 bg-sky-500 hover:bg-sky-600 text-white rounded-2xl font-bold px-8 text-base shadow-lg shadow-sky-200">
                Book Pickup Near You <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-5 mt-7">
              {["No travel required", "We come to you", "Starting ₹199", "All of Narnaul covered"].map((t) => (
                <div key={t} className="flex items-center gap-1.5 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-sky-500" /> {t}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* THE PROBLEM WE SOLVE */}
      <section className="py-16 px-5 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-5">The Problem With "Laundry Near Me" in Narnaul</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "😤", title: "Walk + Wait", desc: "Local dhobis require you to carry clothes there, wait days, and carry them back. Your time is worth more than that." },
              { icon: "❓", title: "Inconsistent Quality", desc: "The quality and care varies day to day. There's no accountability when something goes wrong." },
              { icon: "📵", title: "No Tracking", desc: "You don't know when it'll be ready. You call, you wait, you walk back — sometimes for nothing." },
            ].map((p) => (
              <div key={p.title} className="bg-sky-50 rounded-2xl p-5 border border-sky-100">
                <div className="text-3xl mb-3">{p.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{p.title}</h3>
                <p className="text-sm text-gray-500">{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-sky-500 rounded-2xl p-6 text-white text-center">
            <p className="font-bold text-xl mb-2">EZDRY solves all three.</p>
            <p className="text-sky-100 text-sm">We pick up from your door, clean professionally, and deliver back — with WhatsApp updates every step of the way.</p>
          </div>
        </div>
      </section>

      {/* LOCALITIES */}
      <section className="py-16 px-5 bg-sky-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">We Cover All of Narnaul</h2>
          <p className="text-gray-500 mb-8">Wherever you are in Narnaul — we come to you.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {LOCALITIES.map((loc) => (
              <div key={loc.name} className="bg-white rounded-2xl p-4 border border-sky-100 shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-4 h-4 text-sky-500 flex-shrink-0" />
                  <p className="font-semibold text-gray-900 text-sm">{loc.name}</p>
                </div>
                <p className="text-xs text-gray-500 pl-6">{loc.detail}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-400 mt-5">
            Not listed above? <button className="text-sky-500 underline" onClick={() => navigate("/customer/register")}>Book and enter your address — we likely cover it.</button>
          </p>
        </div>
      </section>

      {/* COMPARE */}
      <section className="py-16 px-5 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8">EZDRY vs. Local Dhobi in Narnaul</h2>
          <div className="overflow-x-auto rounded-2xl border border-sky-100 shadow-sm">
            <table className="w-full bg-white text-sm">
              <thead className="bg-sky-500 text-white">
                <tr>
                  <th className="text-left px-5 py-3 font-semibold">Factor</th>
                  <th className="text-center px-5 py-3 font-semibold">Local Dhobi</th>
                  <th className="text-center px-5 py-3 font-semibold">EZDRY</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sky-50">
                {[
                  ["Travel Required", "Yes — you carry clothes", "No — we come to you"],
                  ["Fixed Pricing", "Negotiated each time", "Listed publicly, fixed"],
                  ["Dry Cleaning", "Usually not available", "Yes — professional"],
                  ["Tracking", "None", "WhatsApp updates"],
                  ["Availability", "Closed on festivals/randomly", "7 days a week"],
                  ["Accountability", "None if clothes lost", "Fully insured orders"],
                ].map(([factor, dhobi, ezdry]) => (
                  <tr key={factor} className="hover:bg-sky-50">
                    <td className="px-5 py-3 font-medium text-gray-900">{factor}</td>
                    <td className="px-5 py-3 text-center text-gray-500">{dhobi}</td>
                    <td className="px-5 py-3 text-center text-sky-600 font-medium">{ezdry}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* HOW TO BOOK */}
      <section className="py-16 px-5 bg-sky-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8">How to Book Laundry Near You in Narnaul</h2>
          <div className="grid sm:grid-cols-4 gap-6">
            {[
              { num: "1", icon: "📱", title: "Open EZDRY", desc: "Go to ezdry.in or open the app." },
              { num: "2", icon: "🏠", title: "Enter Address", desc: "Your Narnaul address — any area, any lane." },
              { num: "3", icon: "🧺", title: "Select Service", desc: "Wash, dry clean, iron, or express." },
              { num: "4", icon: "🎁", title: "Done!", desc: "We pickup, clean, and deliver back. You relax." },
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div className="text-3xl mb-2">{step.icon}</div>
                <div className="w-7 h-7 bg-sky-500 rounded-full text-white text-sm font-bold flex items-center justify-center mx-auto mb-2">{step.num}</div>
                <h3 className="font-bold text-gray-900 mb-1 text-sm">{step.title}</h3>
                <p className="text-xs text-gray-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQAccordion
        items={NEAR_ME_FAQS}
        heading="Frequently Asked Questions"
        bg="bg-white"
      />

      {/* CTA */}
      <section className="py-16 px-5 bg-sky-500">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl font-extrabold mb-4">Stop Searching — EZDRY Comes to You</h2>
          <p className="text-sky-100 mb-8">The easiest laundry in Narnaul. Book now and get ₹50 off your first order — code FIRST50.</p>
          <Button onClick={() => navigate("/customer/register")}
            className="h-14 bg-white text-sky-600 hover:bg-sky-50 rounded-2xl font-bold px-10 text-base">
            Book Pickup Now <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </section>

    </PublicLayout>
  );
}
