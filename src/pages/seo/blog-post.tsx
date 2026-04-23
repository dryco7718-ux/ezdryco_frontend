import { useLocation, useRoute } from "wouter";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock, Calendar } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { SEO_BLOGS } from "./blog-index";
import PublicLayout from "@/layouts/public-layout";

const BLOG_CONTENT: Record<string, {
  seoTitle: string;
  seoDesc: string;
  sections: Array<{ heading?: string; body: string }>;
  relatedLinks: Array<{ label: string; href: string }>;
}> = {
  "best-laundry-service-narnaul": {
    seoTitle: "Best Laundry Service in Narnaul 2025 — EZDRY vs Local Dhobi",
    seoDesc: "Is the local dhobi still the best option in Narnaul? We compare traditional laundry with EZDRY's doorstep model on price, quality, and reliability.",
    sections: [
      { body: "Narnaul has always had a dependable network of local dhobis. For generations, families handed over a bundle of clothes and picked them up a few days later. It worked. But as schedules get busier and garment care standards rise, the question is: is the local dhobi still the best option — or is there something better?" },
      { heading: "The Local Dhobi — Honest Assessment", body: "Price: ₹15–25/shirt (wash + press). Quality: Depends entirely on the individual. Some are excellent, some use irons that burn collars. Reliability: Closed during festivals, randomly unavailable. Dry cleaning: Almost never available. Tracking: Call and wait. Verdict: Works for basic everyday laundry if you have a trusted one. Unreliable for valuable garments or busy schedules." },
      { heading: "EZDRY — Narnaul's Modern Laundry Alternative", body: "Price: ₹25/shirt wash, ₹12/press, ₹280 for a suit dry cleaning. Quality: Professional-grade via verified local partners who undergo quality checks. Availability: 7 days a week, 8 AM to 8 PM. Dry cleaning: Yes — full service. Tracking: WhatsApp updates at every step. Accountability: All orders are insured. Verdict: More consistent, more accountable, and covers dry cleaning — at comparable pricing for everyday items." },
      { heading: "Price Comparison for Narnaul", body: "For 10 shirts + press: Local dhobi ₹200–250 · EZDRY ₹370 (₹25 wash + ₹12 press per shirt). The small premium at EZDRY buys: free pickup from your door, professional cleaning standards, WhatsApp tracking, and accountability if something goes wrong. For many Narnaul families, that trade-off is worth it." },
      { heading: "When to Use Which", body: "Use the local dhobi if: you have a trusted one with consistent quality, your clothes are basic everyday cotton, you're price-sensitive and happy to drop/collect yourself. Use EZDRY if: you need dry cleaning (local dhobis rarely offer this), you want doorstep convenience, you're sending valuable or delicate garments, or you've had clothes damaged by a dhobi before." },
      { heading: "The Bottom Line for Narnaul", body: "EZDRY isn't trying to replace every local dhobi. It's filling the gap they leave — dry cleaning, weekend availability, delicate garment care, and the convenience of not leaving your home. For basic shirts and everyday wear, both options work. For anything more than that, EZDRY is the safer choice in Narnaul." },
    ],
    relatedLinks: [
      { label: "Book EZDRY Pickup in Narnaul →", href: "/customer/register" },
      { label: "Laundry Service Narnaul →", href: "/laundry-service-narnaul" },
      { label: "Affordable Laundry in Narnaul →", href: "/blog/affordable-laundry-narnaul" },
    ],
  },
  "laundry-vs-dry-cleaning-narnaul": {
    seoTitle: "Laundry vs Dry Cleaning in Narnaul — Which Does Your Clothes Need? | EZDRY",
    seoDesc: "Not sure whether to wash or dry clean in Narnaul? This guide explains the difference and which fabrics need each — especially for Haryana weather and traditional garments.",
    sections: [
      { body: "Whether it's a sherwani for a local wedding, a woolen shawl for Narnaul's cold winters, or just your weekly pile of office shirts — understanding which clothes need dry cleaning and which can simply be washed will save you money and protect your wardrobe." },
      { heading: "What Is the Difference?", body: "Regular laundry uses water and detergent in a washing machine or by hand. Dry cleaning uses chemical solvents instead of water — cleaning fabric without soaking it. This difference matters enormously for certain fabrics: wool shrinks when wet, silk gets permanent water marks, and tailored suits lose their shape." },
      { heading: "Use Regular Laundry For...", body: "Cotton kurtas, daily-wear shirts and trousers, casual jeans and T-shirts, bed linen and towels, kids' clothes, polyester and synthetic blends. Rule of thumb: if you wear it on a regular workday, it goes in the wash." },
      { heading: "Use Dry Cleaning For...", body: "Suits and blazers — water destroys the internal canvas. Silk sarees and dupattas — water leaves permanent marks. Woolen shawls and coats — critical in Narnaul winters (even mild felting makes them unwearable). Sherwanis and heavy embroidered outfits — essential for wedding season. Anything with a 'Dry Clean Only' label." },
      { heading: "Narnaul-Specific Advice", body: "Narnaul's climate means woolen and heavy garments are essential from October to February. These are exactly the items most damaged by water washing. Shawls, woolen coats, and heavy blankets should always be dry cleaned, not machine washed. Similarly, for local wedding season — sherwanis, lehengas, and banarasi sarees should be dry cleaned before and after every use." },
      { heading: "The Quick Rule", body: "If it's everyday cotton or synthetic — wash it. If it's structured, silk, woolen, embellished, or says 'dry clean only' — dry clean it. When in doubt, ask on WhatsApp and we'll tell you which service it needs." },
    ],
    relatedLinks: [
      { label: "Dry Cleaning in Narnaul →", href: "/dry-cleaning-narnaul" },
      { label: "Book Laundry Pickup Narnaul →", href: "/customer/register" },
      { label: "Best Laundry in Narnaul →", href: "/blog/best-laundry-service-narnaul" },
    ],
  },
  "affordable-laundry-narnaul": {
    seoTitle: "Affordable Laundry Service in Narnaul — Prices & What to Expect | EZDRY",
    seoDesc: "How much should laundry cost in Narnaul? We break down fair prices for wash & fold, dry cleaning, and ironing — and what red flags to watch for when booking.",
    sections: [
      { body: "Narnaul doesn't have a published price guide for laundry. Dhobis quote what they want. Dry cleaners in nearby towns charge different rates. As a customer, it's hard to know if you're getting a fair deal. This guide breaks down what's reasonable — and what's not." },
      { heading: "Wash & Fold — Fair Prices in Narnaul", body: "Local dhobi range: ₹10–20/shirt. Fair market rate (wash only): ₹20–30/shirt. With ironing: ₹30–45/shirt. EZDRY rates: ₹25 wash + ₹12 iron = ₹37 total per shirt, with free pickup above ₹299. The small premium for EZDRY includes doorstep service and accountability." },
      { heading: "Dry Cleaning — What's Fair", body: "Narnaul has limited dry cleaning options. Residents often travel to Rewari or Mahendragarh for proper dry cleaning — adding travel cost and time. EZDRY brings dry cleaning to Narnaul doorstep: Suit (2-piece): ₹280 · Silk saree: ₹200 · Woolen coat: ₹200 · Blazer: ₹180 · Sherwani: ₹350. These are honest, published rates." },
      { heading: "Ironing Only — What to Expect", body: "Pressing-only typically runs ₹8–15/item from local presswalas. EZDRY charges ₹12/shirt with pickup — comparable once you factor in not having to travel." },
      { heading: "Red Flags to Watch For", body: "Per-kg pricing: Sounds cheap but light garments add up fast. Always compare per-item. Vague charges: 'Handling fee' or 'sorting fee' are hidden costs — EZDRY has none. No price list: If a service won't quote prices upfront, they're not fixed. Walk-in only: Factor in your time and transport cost before calling it cheap." },
      { heading: "Monthly Cost Estimate for Narnaul Family", body: "Typical Narnaul household (4 people): 30 shirts/month × ₹25 = ₹750 · 20 trousers × ₹35 = ₹700 · 8 bedsheets × ₹70 = ₹560 · Monthly total: ~₹2,010. That's under ₹70/day for complete household laundry with doorstep service. Most families find this reasonable once they calculate the time and effort saved." },
    ],
    relatedLinks: [
      { label: "Book EZDRY in Narnaul →", href: "/customer/register" },
      { label: "Laundry Service Narnaul →", href: "/laundry-service-narnaul" },
      { label: "Dry Cleaning Narnaul →", href: "/dry-cleaning-narnaul" },
    ],
  },
};

export default function BlogPost() {
  const [, navigate] = useLocation();
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug ?? "";
  const meta = BLOG_CONTENT[slug];
  const post = SEO_BLOGS.find((b) => b.id === slug);

  if (!meta || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-6xl mb-4">📄</p>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Article not found</h1>
          <button onClick={() => navigate("/blog")} className="text-sky-500 underline">Back to Blog</button>
        </div>
      </div>
    );
  }

  useSEO({ title: meta.seoTitle, description: meta.seoDesc, canonical: `https://ezdry.in/blog/${slug}` });

  return (
    <PublicLayout>
      <article className="max-w-3xl mx-auto px-5 pt-10 pb-12">
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <button onClick={() => navigate("/")} className="hover:text-sky-500">Home</button>
          <ChevronRight className="w-3.5 h-3.5" />
          <button onClick={() => navigate("/blog")} className="hover:text-sky-500">Blog</button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-600 truncate">{post.title}</span>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 ${
            post.category === "Narnaul Guide" ? "bg-green-100 text-green-700" :
            post.category === "Fabric Care" ? "bg-blue-100 text-blue-700" :
            "bg-orange-100 text-orange-700"
          }`}>{post.category}</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-400 mb-8">
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {post.date}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {post.readTime}</span>
          </div>
          <p className="text-lg text-gray-600 leading-relaxed border-l-4 border-sky-300 pl-5 mb-10">{post.excerpt}</p>
        </motion.div>

        {/* Mid-article CTA */}
        <div className="bg-sky-50 border border-sky-200 rounded-2xl p-5 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-bold text-gray-900">Need laundry or dry cleaning in Narnaul?</p>
            <p className="text-sm text-gray-500">Free pickup. Starting ₹199. 24–48 hr return.</p>
          </div>
          <button onClick={() => navigate("/customer/register")}
            className="bg-sky-500 hover:bg-sky-600 text-white rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors whitespace-nowrap flex items-center gap-1">
            Book Now <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-8">
          {meta.sections.map((section, i) => (
            <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.05 }}>
              {section.heading && <h2 className="text-xl font-bold text-gray-900 mb-3">{section.heading}</h2>}
              <p className="text-gray-600 leading-relaxed">{section.body}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4">Related</h3>
          <div className="flex flex-col gap-2">
            {meta.relatedLinks.map((link) => (
              <button key={link.href} onClick={() => navigate(link.href)}
                className="text-left text-sky-600 hover:text-sky-700 font-medium flex items-center gap-1.5 text-sm">
                <ChevronRight className="w-3.5 h-3.5" /> {link.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <h3 className="font-bold text-gray-900 mb-5">More Articles</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {SEO_BLOGS.filter((b) => b.id !== slug).slice(0, 2).map((b) => (
              <button key={b.id} onClick={() => navigate(b.slug)}
                className="text-left bg-sky-50 rounded-2xl p-4 border border-sky-100 hover:shadow-md transition-shadow">
                <p className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">{b.title}</p>
                <p className="text-xs text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" />{b.readTime}</p>
              </button>
            ))}
          </div>
        </div>
      </article>
    </PublicLayout>
  );
}
