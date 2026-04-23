import { motion } from "framer-motion";
import { useSEO } from "@/hooks/useSEO";
import PublicLayout from "@/layouts/public-layout";

const SECTIONS = [
  { title: "Acceptance of Terms", content: "By accessing or using EZDRY's website or services, you agree to be bound by these Terms of Use. If you do not agree to any part of these terms, please do not use our platform. We reserve the right to update these terms at any time; continued use constitutes acceptance." },
  { title: "Service Description", content: "EZDRY is a laundry and dry cleaning platform operating in Narnaul, Haryana, India. We connect customers with verified local laundry service partners for wash & fold, dry cleaning, and ironing services with doorstep pickup and delivery." },
  { title: "User Accounts", content: "To book services, you must create an account with accurate information. You are responsible for maintaining the confidentiality of your account credentials. EZDRY is not liable for any loss resulting from unauthorized use of your account. You must notify us immediately of any suspected breach." },
  { title: "Booking and Orders", content: "Orders placed through EZDRY constitute a service agreement between you and our platform. We reserve the right to cancel or modify orders due to service unavailability, address coverage limitations, or other operational constraints. You will be notified promptly if any such changes are required." },
  { title: "Pricing and Payment", content: "All prices are listed transparently on our platform before booking. We reserve the right to revise pricing with 7 days' notice. Payment is processed securely through our payment partner. EZDRY does not store card details. All prices are in Indian Rupees (₹) and inclusive of applicable taxes." },
  { title: "Cancellations", content: "You may cancel a booking up to 1 hour before the scheduled pickup time at no charge. Cancellations made less than 1 hour before pickup may incur a ₹30 convenience fee. No-shows without cancellation will be treated as a completed pickup attempt." },
  { title: "Liability Limitations", content: "EZDRY's liability for any lost, damaged, or delayed items is limited to the documented value of the garment, up to a maximum of ₹2,000 per item. Claims must be reported within 24 hours of delivery. EZDRY is not liable for pre-existing damage, color bleeding from customer's own garments mixed in loads, or damage from undisclosed fabric care requirements." },
  { title: "Prohibited Use", content: "You agree not to use EZDRY to: submit false or fraudulent orders; damage EZDRY's reputation or operations; interfere with our platform's technical functioning; or engage in any activity that violates applicable law. Violations may result in account suspension." },
  { title: "Governing Law", content: "These Terms are governed by the laws of India, specifically applicable laws in Haryana. Any disputes arising from these terms shall be subject to the jurisdiction of courts in Mahendragarh, Haryana." },
  { title: "Contact", content: "Questions about these Terms? Contact us: Email: dryco7718@gmail.com | Phone: +91 80533 17489 | Address: Narnaul, Mahendragarh, Haryana — 123001" },
];

export default function TermsOfUse() {
  useSEO({
    title: "Terms of Use — EZDRY Narnaul",
    description: "Read EZDRY's Terms of Use covering bookings, payments, cancellations, and liability for our laundry service in Narnaul.",
    canonical: "https://ezdry.in/terms",
  });

  return (
    <PublicLayout>
      <section className="bg-gradient-to-br from-sky-50 to-white py-14 px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
          <span className="inline-block bg-sky-100 text-sky-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-5">Legal</span>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Terms of Use</h1>
          <p className="text-gray-500">Last updated: April 23, 2025</p>
        </motion.div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-gray-600 leading-relaxed mb-10 p-5 bg-sky-50 rounded-2xl border border-sky-100">
            These Terms of Use govern your access to and use of EZDRY's services. Please read them carefully before booking.
          </p>
          <div className="space-y-8">
            {SECTIONS.map((section, i) => (
              <div key={i}>
                <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-sky-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                  {section.title}
                </h2>
                <p className="text-gray-600 leading-relaxed pl-9">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
