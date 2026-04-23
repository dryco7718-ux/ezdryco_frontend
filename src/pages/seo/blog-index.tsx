import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { BlogCard } from "@/components/BlogCard";
import PublicLayout from "@/layouts/public-layout";

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
    <PublicLayout>
      {/* BREADCRUMB + HERO */}
      <section className="bg-gradient-to-br from-sky-50 to-white py-14 px-5">
        <div className="max-w-6xl mx-auto">
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

      {/* BLOG CARDS */}
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
          <button
            onClick={() => navigate("/customer/register")}
            className="h-12 bg-sky-500 hover:bg-sky-600 text-white rounded-2xl font-bold px-8 text-sm inline-flex items-center gap-2 transition-colors"
          >
            Book Your First Pickup <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </PublicLayout>
  );
}
