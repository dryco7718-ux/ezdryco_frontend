import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import PublicLayout from "@/layouts/public-layout";

export default function Contact() {
  useSEO({
    title: "Contact EZDRY — Laundry Service Narnaul",
    description: "Get in touch with EZDRY Narnaul. Call, email, or WhatsApp us. Serving all areas of Narnaul, Haryana. Open 7 days a week, 8 AM to 8 PM.",
    canonical: "https://ezdry.in/contact",
  });

  return (
    <PublicLayout>
      {/* HERO */}
      <section className="bg-gradient-to-br from-sky-50 to-white py-16 px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-5">
            Contact <span className="text-sky-500">EZDRY</span>
          </h1>
          <p className="text-gray-500 text-lg">
            Questions, feedback, or just want to know if we cover your area? We respond fast.
          </p>
        </motion.div>
      </section>

      {/* CONTACT CARDS */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="space-y-5">
            {[
              { icon: <Phone className="w-6 h-6" />, title: "Call or WhatsApp", value: "+91 80533 17489", note: "Mon–Sun, 8 AM – 8 PM", href: "tel:+918053317489" },
              { icon: <Mail className="w-6 h-6" />, title: "Email Us", value: "dryco7718@gmail.com", note: "Response within 24 hours", href: "mailto:dryco7718@gmail.com" },
              { icon: <MapPin className="w-6 h-6" />, title: "Service Area", value: "Narnaul, Haryana", note: "All localities within Narnaul city", href: null },
              { icon: <Clock className="w-6 h-6" />, title: "Operating Hours", value: "8 AM – 8 PM", note: "7 days a week, including holidays", href: null },
            ].map((card) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex gap-5 p-5 bg-sky-50 rounded-2xl border border-sky-100"
              >
                <div className="w-12 h-12 bg-sky-500 rounded-xl text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-sky-200">
                  {card.icon}
                </div>
                <div>
                  <p className="text-xs font-semibold text-sky-600 uppercase tracking-wide mb-1">{card.title}</p>
                  {card.href ? (
                    <a href={card.href} className="text-lg font-bold text-gray-900 hover:text-sky-500 transition-colors">{card.value}</a>
                  ) : (
                    <p className="text-lg font-bold text-gray-900">{card.value}</p>
                  )}
                  <p className="text-sm text-gray-500 mt-0.5">{card.note}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            className="bg-gray-900 rounded-3xl p-8 text-white flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-extrabold mb-3">Serving All of Narnaul</h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                EZDRY is a Narnaul-only service. We don't try to cover all of Haryana — we focus entirely on delivering the best laundry experience in Narnaul. If your area isn't listed below, book and enter your address — we likely cover it.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Old Narnaul", "New Colony", "Mandi Area", "Bus Stand", "Sadar Bazar", "Housing Board", "Haryana Colony", "Mahendragarh Road"].map((loc) => (
                  <span key={loc} className="bg-gray-800 text-gray-300 text-xs px-3 py-1.5 rounded-full flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-sky-400" /> {loc}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-800">
              <p className="text-sm text-gray-400 mb-1">For business partnerships:</p>
              <a href="mailto:dryco7718@gmail.com" className="text-sky-400 text-sm font-semibold hover:text-sky-300">dryco7718@gmail.com</a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 bg-sky-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-10 text-center">Common Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Do you serve my area in Narnaul?", a: "We cover all major localities in Narnaul. If unsure, just book and enter your address — our system will confirm coverage." },
              { q: "How quickly do you respond to messages?", a: "WhatsApp and phone calls are answered during business hours (8 AM–8 PM) within minutes. Email responses within 24 hours." },
              { q: "Can I cancel or reschedule a pickup?", a: "Yes. Cancel or reschedule up to 1 hour before the pickup time with no charge. Message us on WhatsApp or call." },
              { q: "Do you have a physical store in Narnaul?", a: "EZDRY is a doorstep service — no store visit needed. We come to your home or office for pickup and delivery." },
            ].map((faq, i) => (
              <div key={i} className="rounded-2xl bg-white border border-sky-100 p-5 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
