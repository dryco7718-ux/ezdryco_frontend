import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ChevronRight, Clock } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

export const SEO_BLOGS = [
  {
    id: "best-laundry-service-narnaul",
    title: "Best Laundry Service in Narnaul — EZDRY vs Local Dhobi",
    excerpt: "Is the local dhobi still the best option in Narnaul? We compare traditional laundry services with EZDRY's doorstep model on price, quality, and reliability.",
    date: "April 22, 2025",
    readTime: "5 min read",
    category: "Narnaul Guide",
    slug: "/blog/best-laundry-service-narnaul",
  },
  {
    id: "laundry-vs-dry-cleaning-narnaul",
    title: "Laundry vs Dry Cleaning in Narnaul — Which Does Your Clothes Need?",
    excerpt: "Kurtas, suits, woolen shawls — not everything should go in the wash. Here's how to decide for every garment in your Narnaul wardrobe.",
    date: "April 20, 2025",
    readTime: "6 min read",
    category: "Fabric Care",
    slug: "/blog/laundry-vs-dry-cleaning-narnaul",
  },
  {
    id: "affordable-laundry-narnaul",
    title: "Affordable Laundry Service in Narnaul — Prices, Plans & What to Expect",
    excerpt: "How much should laundry actually cost in Narnaul? We break down fair prices for wash & fold, dry cleaning, and ironing — and what red flags to watch for.",
    date: "April 18, 2025",
    readTime: "5 min read",
    category: "Pricing Guide",
    slug: "/blog/affordable-laundry-narnaul",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  "Narnaul Guide": "bg-green-100 text-green-700",
  "Fabric Care": "bg-blue-100 text-blue-700",
  "Pricing Guide": "bg-orange-100 text-orange-700",
};

export default function BlogIndex() {
  const [, navigate] = useLocation();

  useSEO({
    title: "Laundry Tips & Narnaul Service Guides — EZDRY Blog",
    description: "Laundry tips, fabric care guides, and Narnaul laundry service information from the EZDRY team. Learn how to care for your clothes and find the best service near you.",
    canonical: "https://ezdry.in/blog",
  });

  return (
    <div className="min-h-screen bg-white font-sans">
      <nav className="bg-white border-b border-sky-100 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="font-extrabold text-xl text-sky-600">EZDRY</button>
          <button onClick={() => navigate("/customer/register")}
            className="bg-sky-500 hover:bg-sky-600 text-white rounded-full px-5 py-2 text-sm font-semibold transition-colors">
            Book Pickup
          </button>
        </div>
      </nav>

      <section className="bg-gradient-to-br from-sky-50 to-white py-14 px-5">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
              EZDRY <span className="text-sky-500">Blog</span>
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl">
              Laundry tips, fabric care advice, and Narnaul service guides from the EZDRY team.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-14 px-5">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {SEO_BLOGS.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="bg-white rounded-2xl border border-sky-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate(post.slug)}
              >
                <div className="h-36 bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center">
                  <span className="text-5xl">
                    {post.category === "Narnaul Guide" ? "📍" : post.category === "Fabric Care" ? "🧥" : "💰"}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${CATEGORY_COLORS[post.category] ?? "bg-gray-100 text-gray-600"}`}>
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock className="w-3 h-3" /> {post.readTime}
                    </span>
                  </div>
                  <h2 className="font-bold text-gray-900 mb-2 line-clamp-2 leading-snug">{post.title}</h2>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">{post.date}</span>
                    <span className="text-sky-500 text-sm font-semibold flex items-center gap-1">
                      Read <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 px-5 bg-sky-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-3">Ready to Try EZDRY in Narnaul?</h2>
          <p className="text-gray-500 mb-6">Professional laundry pickup across Narnaul. Starting ₹199.</p>
          <button onClick={() => navigate("/customer/register")}
            className="h-12 bg-sky-500 hover:bg-sky-600 text-white rounded-2xl font-bold px-8 text-sm transition-colors inline-flex items-center gap-2">
            Book Your First Pickup <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400 py-8 px-5 text-center text-sm">
        <div className="flex flex-wrap justify-center gap-4 mb-3">
          <button onClick={() => navigate("/")} className="hover:text-white">Home</button>
          <button onClick={() => navigate("/laundry-service-narnaul")} className="hover:text-white">Narnaul Laundry</button>
          <button onClick={() => navigate("/dry-cleaning-narnaul")} className="hover:text-white">Dry Cleaning</button>
        </div>
        <p>© 2025 EZDRY. All rights reserved.</p>
      </footer>
    </div>
  );
}
