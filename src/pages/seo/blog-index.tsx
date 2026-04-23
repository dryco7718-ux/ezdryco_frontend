import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ChevronRight, Clock } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

export const SEO_BLOGS = [
  {
    id: "dry-cleaning-vs-laundry",
    title: "Dry Cleaning vs Laundry — Which Does Your Clothes Actually Need?",
    excerpt: "Not sure whether to dry clean or wash? This guide explains the real difference, which fabrics need each, and how to decide every time.",
    date: "April 20, 2025",
    readTime: "5 min read",
    category: "Fabric Care",
    slug: "/blog/dry-cleaning-vs-laundry",
  },
  {
    id: "best-laundry-service-delhi",
    title: "Best Laundry Service in Delhi 2025 — Honest Comparison",
    excerpt: "We compared the top laundry options in Delhi on price, quality, delivery time, and reliability. Here's what we found.",
    date: "April 18, 2025",
    readTime: "6 min read",
    category: "Delhi Guide",
    slug: "/blog/best-laundry-service-delhi",
  },
  {
    id: "remove-stains-at-home",
    title: "How to Remove Common Stains at Home — Practical Guide",
    excerpt: "Curry, oil, coffee, ink — learn how to remove the most common clothing stains with items already in your kitchen.",
    date: "April 15, 2025",
    readTime: "7 min read",
    category: "Tips & Tricks",
    slug: "/blog/remove-stains-at-home",
  },
  {
    id: "wash-woolen-clothes",
    title: "How to Wash Woolen Clothes Without Shrinking Them",
    excerpt: "Every Delhi winter, good woolen coats get ruined by one wrong washing machine cycle. Here's exactly how to handle wool safely.",
    date: "April 12, 2025",
    readTime: "5 min read",
    category: "Fabric Care",
    slug: "/blog/wash-woolen-clothes",
  },
  {
    id: "wedding-dry-cleaning-checklist",
    title: "Dry Cleaning Before a Wedding — The Complete Checklist",
    excerpt: "Wedding in the family? Use this checklist to get all outfits dry cleaned on time. Sherwanis, lehengas, suits, sarees — what to send and when.",
    date: "April 10, 2025",
    readTime: "6 min read",
    category: "Special Occasions",
    slug: "/blog/wedding-dry-cleaning-checklist",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  "Fabric Care": "bg-blue-100 text-blue-700",
  "Delhi Guide": "bg-green-100 text-green-700",
  "Tips & Tricks": "bg-orange-100 text-orange-700",
  "Special Occasions": "bg-purple-100 text-purple-700",
};

export default function BlogIndex() {
  const [, navigate] = useLocation();

  useSEO({
    title: "Laundry Tips, Fabric Care & Delhi Guides — Washify Blog",
    description: "Expert laundry tips, dry cleaning guides, stain removal advice, and local Delhi laundry service information from the Washify team.",
    canonical: "https://washify.in/blog",
  });

  return (
    <div className="min-h-screen bg-white font-sans">
      <nav className="bg-white border-b border-sky-100 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="font-extrabold text-xl text-sky-600">Washify</button>
          <button onClick={() => navigate("/customer/register")}
            className="bg-sky-500 hover:bg-sky-600 text-white rounded-full px-5 py-2 text-sm font-semibold transition-colors">
            Book Pickup
          </button>
        </div>
      </nav>

      {/* HEADER */}
      <section className="bg-gradient-to-br from-sky-50 to-white py-14 px-5">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
              Washify <span className="text-sky-500">Blog</span>
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl">
              Laundry tips, fabric care guides, stain removal advice, and local Delhi laundry service information — all from our team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* BLOG GRID */}
      <section className="py-14 px-5">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    {post.category === "Fabric Care" ? "🧥" :
                     post.category === "Delhi Guide" ? "📍" :
                     post.category === "Tips & Tricks" ? "💡" : "💍"}
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

      {/* CTA */}
      <section className="py-14 px-5 bg-sky-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-3">Ready to Try Washify?</h2>
          <p className="text-gray-500 mb-6">Professional laundry pickup across Delhi. Starting ₹199.</p>
          <button onClick={() => navigate("/customer/register")}
            className="h-12 bg-sky-500 hover:bg-sky-600 text-white rounded-2xl font-bold px-8 text-sm transition-colors inline-flex items-center gap-2">
            Book Your First Pickup <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400 py-8 px-5 text-center text-sm">
        <div className="flex flex-wrap justify-center gap-4 mb-3">
          <button onClick={() => navigate("/")} className="hover:text-white">Home</button>
          <button onClick={() => navigate("/laundry-service-delhi")} className="hover:text-white">Delhi Laundry</button>
          <button onClick={() => navigate("/laundry-service-saket")} className="hover:text-white">Saket</button>
          <button onClick={() => navigate("/laundry-service-lajpat-nagar")} className="hover:text-white">Lajpat Nagar</button>
        </div>
        <p>© 2025 Washify. All rights reserved.</p>
      </footer>
    </div>
  );
}
