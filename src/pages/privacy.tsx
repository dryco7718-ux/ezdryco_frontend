import { motion } from "framer-motion";
import { useSEO } from "@/hooks/useSEO";
import PublicLayout from "@/layouts/public-layout";

const SECTIONS = [
  {
    title: "Information We Collect",
    content: "When you use EZDRY, we collect information you provide directly: name, phone number, email address, and pickup/delivery address in Narnaul. We also collect order details (services selected, items, scheduling preferences) and payment information (processed securely — we do not store card numbers). Device and usage data such as browser type and IP address may also be collected automatically.",
  },
  {
    title: "How We Use Your Information",
    content: "We use your information to: process and fulfill your laundry orders; communicate pickup and delivery status via WhatsApp and SMS; respond to your queries and support requests; improve our services and platform experience; send order-related notifications (we do not send unsolicited marketing without your consent).",
  },
  {
    title: "Information Sharing",
    content: "We share your information only with: verified local laundry partners in Narnaul who process your orders (name, address, and order details only); payment processors for secure transaction handling; and as required by law. We do not sell, rent, or trade your personal information to third parties.",
  },
  {
    title: "Data Security",
    content: "We use industry-standard security measures to protect your data including HTTPS encryption for all data in transit, secure servers, and access controls. While we take every reasonable precaution, no system is 100% immune to security risks.",
  },
  {
    title: "Your Rights",
    content: "You may request access to, correction of, or deletion of your personal data at any time by contacting us at dryco7718@gmail.com. You may also opt out of non-essential communications. For active orders, some data must be retained to fulfill service obligations.",
  },
  {
    title: "Cookies",
    content: "EZDRY uses minimal cookies for session management and platform functionality. We do not use third-party advertising cookies. You can control cookie settings through your browser.",
  },
  {
    title: "Changes to This Policy",
    content: "We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date. Continued use of EZDRY after changes constitutes acceptance of the updated policy.",
  },
  {
    title: "Contact Us",
    content: "Questions about your privacy or this policy? Reach us at: Email: dryco7718@gmail.com | Phone: +91 80533 17489 | Location: Narnaul, Mahendragarh, Haryana — 123001",
  },
];

export default function PrivacyPolicy() {
  useSEO({
    title: "Privacy Policy — EZDRY Narnaul",
    description: "EZDRY's privacy policy explains how we collect, use, and protect your personal data when you use our laundry service in Narnaul.",
    canonical: "https://ezdry.in/privacy",
  });

  return (
    <PublicLayout>
      <section className="bg-gradient-to-br from-sky-50 to-white py-14 px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
          <span className="inline-block bg-sky-100 text-sky-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-5">Legal</span>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Privacy Policy</h1>
          <p className="text-gray-500">Last updated: April 23, 2025</p>
        </motion.div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-gray-600 leading-relaxed mb-10 p-5 bg-sky-50 rounded-2xl border border-sky-100">
            EZDRY ("we", "us", "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our laundry and dry cleaning platform serving Narnaul, Haryana.
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
