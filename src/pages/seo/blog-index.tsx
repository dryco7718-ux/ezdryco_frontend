import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ChevronRight, Clock, MapPin } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { WashifyLogo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { BlogCard } from "@/components/BlogCard";

export const SEO_BLOGS = [
  {
    id: "best-laundry-service-narnaul",
    title: "Best Laundry Service in Narnaul — EZDRY vs Local Dhobi",
    excerpt: "Is the local dhobi still the best option in Narnaul? We compare traditional laundry services with EZDRY's doorstep model on price, quality, and reliability.",
    date: "April 22, 2025",
    readTime: "5 min read",
    category: "Narnaul Guide",
    slug: "/blog/best-laundry-service-narnaul",
    author: "EZDRY Team",
    createdAt: new Date("2025-04-22").toISOString(),
  },
  {
    id: "laundry-vs-dry-cleaning-narnaul",
    title: "Laundry vs Dry Cleaning in Narnaul — Which Does Your Clothes Need?",
    excerpt: "Kurtas, suits, woolen shawls — not everything should go in the wash. Here's how to decide for every garment in your Narnaul wardrobe.",
    date: "April 20, 2025",
    readTime: "6 min read",
    category: "Fabric Care",
    slug: "/blog/laundry-vs-dry-cleaning-narnaul",
    author: "EZDRY Team",
    createdAt: new Date("2025-04-20").toISOString(),
  },
  {
    id: "affordable-laundry-narnaul",
    title: "Affordable Laundry Service in Narnaul — Prices, Plans & What to Expect",
    excerpt: "How much should laundry actually cost in Narnaul? We break down fair prices for wash & fold, dry cleaning, and ironing — and what red flags to watch for.",
    date: "April 18, 2025",
    readTime: "5 min read",
    category: "Pricing Guide",
    slug: "/blog/affordable-laundry-narnaul",
    author: "EZDRY Team",
    createdAt: new Date("2025-04-18").toISOString(),
  },
];

export default function BlogIndex() {
  const [, navigate] = useLocation();

  useSEO({
    title: "Laundry Tips & Narnaul Service Guides — EZDRY Blog",
    description: "Laundry tips, fabric care guides, and Narnaul laundry service information from the EZDRY team.",
    canonical: "https://ezdry.in/blog",
  });

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* NAVBAR — matches landing page */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-sky-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <WashifyLogo size={36} />
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-600">
            <button onClick={() => navigate("/#services")} className="hover:text-sky-500 transition-colors">Services</button>
            <button onClick={() => navigate("/blog")} className="text-sky-500 font-semibold transition-colors">Blog</button>
            <button onClick={() => navigate("/laundry-service-narnaul")} className="hover:text-sky-500 transition-colors">Narnaul</button>
          </div>
          <Button onClick={() => navigate("/customer/login")} className="bg-sky-500 hover:bg-sky-600 text-white rounded-full px-5 text-sm">
            Book Now
          </Button>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-28 pb-14 bg-gradient-to-br from-sky-50 via-white to-sky-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
              <button onClick={() => navigate("/")} className="hover:text-sky-500">Home</button>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-gray-700 font-medium">Blog</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
              EZDRY <span className="text-sky-500">Blog</span>
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl">
              Laundry tips, fabric care advice, and Narnaul service guides from the EZDRY team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* BLOG CARDS using shared BlogCard */}
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6">
            {SEO_BLOGS.map((post) => (
              <BlogCard key={post.id} {...post} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-sky-50">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-3">Ready to Try EZDRY in Narnaul?</h2>
          <p className="text-gray-500 mb-6">Professional laundry pickup across Narnaul. Starting ₹199.</p>
          <Button onClick={() => navigate("/customer/register")}
            className="h-12 bg-sky-500 hover:bg-sky-600 text-white rounded-2xl font-bold px-8 text-sm">
            Book Your First Pickup <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </section>

      {/* INTERNAL LINKS */}
      <section className="py-8 bg-sky-50 border-t border-sky-100">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-sm font-semibold text-gray-500 mb-4">EZDRY Services in Narnaul</p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Laundry Service Narnaul", href: "/laundry-service-narnaul" },
              { label: "Dry Cleaning Narnaul", href: "/dry-cleaning-narnaul" },
              { label: "Laundry Near Me Narnaul", href: "/laundry-near-me-narnaul" },
            ].map((link) => (
              <button key={link.href} onClick={() => navigate(link.href)}
                className="flex items-center gap-1.5 text-sm text-sky-700 bg-white border border-sky-200 hover:bg-sky-50 rounded-full px-4 py-1.5 transition-colors">
                <MapPin className="w-3.5 h-3.5" /> {link.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER — matches landing page */}
      <footer className="bg-gray-900 text-white py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <WashifyLogo size={32} textColor="text-white" />
          </div>
          <div className="flex items-center gap-6 text-gray-400 text-sm">
            <button onClick={() => navigate("/")} className="hover:text-white">Home</button>
            <button onClick={() => navigate("/laundry-service-narnaul")} className="hover:text-white">Narnaul</button>
            <button onClick={() => navigate("/dry-cleaning-narnaul")} className="hover:text-white">Dry Cleaning</button>
            <button onClick={() => navigate("/blog")} className="hover:text-white">Blog</button>
          </div>
          <p className="text-gray-500 text-sm">© 2025 EZDRY. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
