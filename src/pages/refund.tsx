import { motion } from "framer-motion";
import { useSEO } from "@/hooks/useSEO";
import PublicLayout from "@/layouts/public-layout";

const POLICY = [
  { title: "Cancellation Before Pickup", content: "Cancel up to 1 hour before your scheduled pickup for a full refund. No questions asked. Cancellations made less than 1 hour before the pickup window will incur a ₹30 convenience fee, deducted from the refund." },
  { title: "Order Never Picked Up", content: "If our rider was unable to reach you and no one was available at the address, we will attempt to reschedule at no charge. If the order cannot be fulfilled, a full refund will be issued within 3–5 business days." },
  { title: "Damaged or Lost Items", content: "If any item is returned damaged due to our handling, or if an item is lost, EZDRY will compensate up to ₹2,000 per item based on the documented purchase value. Claims must be filed within 24 hours of delivery via WhatsApp (+91 80533 17489) or email (dryco7718@gmail.com) with photographs." },
  { title: "Quality Issues", content: "If you're unsatisfied with the cleaning quality, report the issue within 24 hours of delivery. We will either re-clean the item free of charge or issue a partial/full refund depending on the nature of the issue. Our team reviews each case individually." },
  { title: "Late Delivery", content: "If your order is not delivered within 72 hours of pickup (standard) or by 7 PM on the same day (express), you are eligible for a ₹50 credit on your next order. This does not apply to delays caused by circumstances outside our control (festivals, natural events)." },
  { title: "Non-Refundable Situations", content: "Refunds will NOT be issued for: orders where incorrect care instructions were provided by the customer; pre-existing stains that were disclosed as 'may not be removable' before processing; fabric damage due to the nature of the fabric (very old, degraded, or chemically damaged fabric); or orders where the item was returned and accepted without complaint within 24 hours." },
  { title: "How to Request a Refund", content: "1. Contact us within 24 hours of delivery via WhatsApp at +91 80533 17489 or email at dryco7718@gmail.com. 2. Share your order number and describe the issue (photographs help). 3. Our team will respond within 24 hours. 4. Approved refunds are processed to the original payment method within 5–7 business days." },
  { title: "Refund Processing Time", content: "Credit/debit card refunds: 5–7 business days. UPI refunds: 1–3 business days. Cash orders: reimbursed at next pickup or via UPI transfer. EZDRY credits (if chosen): applied instantly to your account." },
];

export default function RefundPolicy() {
  useSEO({
    title: "Refund & Cancellation Policy — EZDRY Narnaul",
    description: "EZDRY's refund and cancellation policy for laundry services in Narnaul. Cancel up to 1 hour before pickup for a full refund. Damaged items covered up to ₹2,000.",
    canonical: "https://ezdry.in/refund",
  });

  return (
    <PublicLayout>
      <section className="bg-gradient-to-br from-sky-50 to-white py-14 px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
          <span className="inline-block bg-sky-100 text-sky-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-5">Legal</span>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Refund & Cancellation Policy</h1>
          <p className="text-gray-500 mb-6">Last updated: April 23, 2025</p>
          <div className="grid grid-cols-3 gap-4">
            {[["Full refund if cancelled 1hr before pickup", "✅"], ["Damaged items covered up to ₹2,000", "🛡️"], ["5–7 day refund processing", "⏱️"]].map(([t, icon]) => (
              <div key={t} className="bg-white rounded-xl border border-sky-100 p-4 text-center shadow-sm">
                <div className="text-2xl mb-2">{icon}</div>
                <p className="text-xs text-gray-600 leading-tight">{t}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto space-y-8">
          {POLICY.map((section, i) => (
            <div key={i}>
              <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-sky-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                {section.title}
              </h2>
              <p className="text-gray-600 leading-relaxed pl-9">{section.content}</p>
            </div>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
}
