import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";
import PublicLayout from "@/layouts/public-layout";

const STEPS = [
  {
    num: "01", icon: "📱", title: "Book in 60 Seconds",
    desc: "Open EZDRY, select your services (wash, dry clean, iron), choose a pickup time, and enter your Narnaul address. No app download needed.",
    detail: ["Pick your service type", "Select a time slot (8 AM – 8 PM)", "Enter your Narnaul address", "Confirm booking — done!"],
  },
  {
    num: "02", icon: "🚴", title: "We Pickup from Your Door",
    desc: "Our local Narnaul partner arrives at your doorstep at the chosen time. Hand over your clothes in any bag — we provide clean bags on return.",
    detail: ["On-time arrival guaranteed", "Hand over in any bag", "Instant WhatsApp confirmation", "Unique tag assigned to your order"],
  },
  {
    num: "03", icon: "✨", title: "Expert Cleaning",
    desc: "Your clothes are processed by verified local partners using professional machines. Each item is handled individually — never mixed with other orders.",
    detail: ["Professional-grade detergents", "Fabric-specific care", "Quality inspection on every item", "WhatsApp update when done"],
  },
  {
    num: "04", icon: "🎁", title: "Delivered Fresh to Your Door",
    desc: "Clean, folded or pressed clothes delivered back to your Narnaul address within 24–48 hours — neatly packed and sealed.",
    detail: ["Delivered in sealed bags", "Folded or hung as requested", "24–48 hr standard turnaround", "Same-day express available"],
  },
];

const FAQS = [
  { q: "How far in advance do I need to book?", a: "You can book same-day pickup if you book before 10 AM. Otherwise, next-day pickup is always available." },
  { q: "What if I'm not home during pickup?", a: "You can leave clothes with a family member or at the gate. Just mention it in the order notes." },
  { q: "How do I track my order?", a: "You'll receive WhatsApp updates at pickup, during cleaning, and when out for delivery. You can also track in the app." },
  { q: "What if something goes wrong with my clothes?", a: "Every order is insured. If anything is damaged or lost, we cover the cost. All items get a unique tag before processing." },
  { q: "Can I give specific instructions for my clothes?", a: "Yes. Add notes for any garment in the order — cold wash, hang dry, light starch — our team will follow them." },
];

export default function HowItWorks() {
  const [, navigate] = useLocation();

  useSEO({
    title: "How EZDRY Works — Laundry Pickup & Delivery in Narnaul",
    description: "Book, pickup, clean, deliver — EZDRY's laundry service in Narnaul is 4 simple steps. Free doorstep pickup, WhatsApp tracking, 24-hr return.",
    canonical: "https://ezdry.in/how-it-works",
  });

  return (
    <PublicLayout>
      {/* HERO */}
      <section className="bg-gradient-to-br from-sky-50 to-white py-16 px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
          <span className="inline-block bg-sky-100 text-sky-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-5">Simple. Fast. Reliable.</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-5 leading-tight">
            How EZDRY <span className="text-sky-500">Works</span>
          </h1>
          <p className="text-gray-500 text-lg">
            Four steps from booking to fresh clothes at your Narnaul door. Takes less than 60 seconds to start.
          </p>
        </motion.div>
      </section>

      {/* STEPS */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto space-y-16">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={`grid md:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}
            >
              <div>
                <div className="flex items-center gap-4 mb-5">
                  <div className="text-5xl">{step.icon}</div>
                  <div className="w-12 h-12 bg-sky-500 rounded-2xl text-white font-black text-lg flex items-center justify-center shadow-md shadow-sky-200">
                    {step.num}
                  </div>
                </div>
                <h2 className="text-2xl font-extrabold text-gray-900 mb-3">{step.title}</h2>
                <p className="text-gray-500 leading-relaxed mb-5">{step.desc}</p>
                <Button onClick={() => navigate("/customer/register")}
                  variant="outline" className="border-sky-200 text-sky-600 hover:bg-sky-50 rounded-xl">
                  Get Started <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              <div className="bg-sky-50 rounded-3xl p-6 border border-sky-100">
                <p className="text-sm font-bold text-sky-700 mb-4 uppercase tracking-wide">What happens</p>
                <div className="space-y-3">
                  {step.detail.map((d, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-sky-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {j + 1}
                      </div>
                      <p className="text-sm text-gray-700">{d}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 bg-sky-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-10 text-center">Questions About the Process</h2>
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <div key={i} className="rounded-2xl bg-white border border-sky-100 p-5 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-sky-500">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl font-extrabold mb-4">Ready? It Takes 60 Seconds</h2>
          <p className="text-sky-100 mb-8">Book your first EZDRY pickup in Narnaul. Free delivery on orders above ₹299.</p>
          <Button onClick={() => navigate("/customer/register")}
            className="h-14 bg-white text-sky-600 hover:bg-sky-50 rounded-2xl font-bold px-10 text-base shadow-lg">
            Book Pickup Now <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </section>
    </PublicLayout>
  );
}
