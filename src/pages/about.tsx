import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ChevronRight, MapPin, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";
import PublicLayout from "@/layouts/public-layout";

export default function About() {
  const [, navigate] = useLocation();

  useSEO({
    title: "About EZDRY — Narnaul's Laundry & Dry Cleaning Platform",
    description: "EZDRY was built for Narnaul. Learn about our story, our mission to modernize laundry in Haryana, and the values that drive us.",
    canonical: "https://ezdry.in/about",
  });

  return (
    <PublicLayout>
      {/* HERO */}
      <section className="bg-gradient-to-br from-sky-50 to-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              Built for <span className="text-sky-500">Narnaul</span>.<br />Built for You.
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              EZDRY started because laundry was broken in small-city India — unreliable dhobis, no dry cleaning options, and zero accountability. We decided to fix it, starting in Narnaul.
            </p>
          </motion.div>
        </div>
      </section>

      {/* STORY */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}>
            <p className="text-sky-600 font-semibold text-sm mb-3 uppercase tracking-wide">Our Story</p>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-5">Why We Started EZDRY</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed text-sm">
              <p>
                In Narnaul, getting your clothes cleaned has always meant a trip to the local dhobi — with no price list, no accountability, and no dry cleaning for valuable garments.
              </p>
              <p>
                When wedding season arrived or a woolen coat needed cleaning, people either drove to Rewari or Mahendragarh, or risked leaving a ₹5,000 sherwani with someone they hoped was careful.
              </p>
              <p>
                EZDRY was built to change that. A platform where prices are published, partners are verified, every garment is tagged, and you don't have to leave your house.
              </p>
              <p>
                We're starting in Narnaul — and we're here to stay.
              </p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            className="bg-sky-50 rounded-3xl p-8 border border-sky-100">
            <div className="grid grid-cols-2 gap-6">
              {[
                { num: "500+", label: "Orders Delivered" },
                { num: "4.9★", label: "Average Rating" },
                { num: "100%", label: "On-Time Pickup" },
                { num: "₹0", label: "Hidden Charges" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-3xl font-black text-sky-600 mb-1">{s.num}</p>
                  <p className="text-sm text-gray-500">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-16 px-6 bg-sky-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-10 text-center">What We Stand For</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "🏷️", title: "Transparent Pricing", desc: "Every price is published publicly before you book. What you see is what you pay — no negotiation, no surprises." },
              { icon: "✅", title: "Verified Partners", desc: "Every laundry shop on EZDRY passes a quality check. We don't list just anyone — we verify, monitor, and curate." },
              { icon: "🛡️", title: "Insured Orders", desc: "If anything is lost or damaged, we cover it. Every garment gets a unique tag. You're protected on every order." },
              { icon: "📱", title: "Real-Time Tracking", desc: "WhatsApp updates at pickup, during cleaning, and out for delivery. You always know where your clothes are." },
              { icon: "📍", title: "Local First", desc: "We serve Narnaul — not Delhi, not Gurgaon. Our partners are local businesses we've hand-selected in your area." },
              { icon: "⚡", title: "Fast Turnaround", desc: "24–48 hour standard return. Same-day express available on weekdays if booked before 10 AM." },
            ].map((v) => (
              <div key={v.title} className="bg-white rounded-2xl p-6 border border-sky-100 shadow-sm">
                <div className="text-3xl mb-4">{v.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Proudly Serving Narnaul</h2>
          <p className="text-gray-500 mb-8 max-w-xl mx-auto">
            EZDRY is a Narnaul-first platform. We cover all localities within Narnaul and Mahendragarh district. If you're not sure we cover your area — just book and enter your address.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Old Narnaul", "New Colony", "Mandi Area", "Bus Stand", "Sadar Bazar", "Housing Board", "Haryana Colony", "Mahendragarh Road"].map((loc) => (
              <span key={loc} className="flex items-center gap-1.5 bg-sky-50 text-sky-700 border border-sky-200 rounded-full px-4 py-1.5 text-sm font-medium">
                <MapPin className="w-3.5 h-3.5" /> {loc}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-sky-500">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl font-extrabold mb-4">Experience EZDRY in Narnaul</h2>
          <p className="text-sky-100 mb-8">Free pickup. Starting ₹199. ₹50 off your first order with code FIRST50.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => navigate("/customer/register")}
              className="h-13 bg-white text-sky-600 hover:bg-sky-50 rounded-2xl font-bold px-8 text-base shadow-lg">
              Book Pickup <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
            <Button onClick={() => navigate("/contact")} variant="outline"
              className="h-13 border-white text-white hover:bg-sky-400 rounded-2xl font-semibold px-8 text-base">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
