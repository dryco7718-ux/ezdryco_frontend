import { useLocation, useRoute } from "wouter";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock, Calendar } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { SEO_BLOGS } from "./blog-index";

// ─── Blog content map ────────────────────────────────────────────────────────

const BLOG_CONTENT: Record<string, {
  seoTitle: string;
  seoDesc: string;
  sections: Array<{ heading?: string; body: string }>;
  relatedLinks: Array<{ label: string; href: string }>;
}> = {
  "dry-cleaning-vs-laundry": {
    seoTitle: "Dry Cleaning vs Laundry: Which Is Better for Your Clothes? — Washify",
    seoDesc: "Not sure whether to dry clean or wash? This guide explains the real difference, when each is needed, and which fabrics need professional care.",
    sections: [
      {
        body: "You look at a pile of clothes and wonder — does this need dry cleaning, or can it go in the wash? Most people guess. And a shrunken sweater or a stained silk kurta is an expensive lesson. This guide gives you a clear answer."
      },
      {
        heading: "What Is the Actual Difference?",
        body: "Regular laundry uses water and detergent to lift dirt from fabric. Dry cleaning uses chemical solvents instead of water — dissolving oils and stains without soaking the fabric. This matters because water causes wool fibres to mat and shrink (felting), leaves permanent marks on silk, breaks down the internal structure of tailored suits, and damages embroidery thread."
      },
      {
        heading: "When to Use Regular Laundry",
        body: "Regular machine washing is ideal for everyday cotton clothing (T-shirts, jeans, kurtas), bed linen and towels, synthetic fabrics (polyester, nylon, most blends), and kids' clothing. Rule of thumb: if you'd wear it on a regular Tuesday, it goes in the wash."
      },
      {
        heading: "When to Choose Dry Cleaning",
        body: "Choose dry cleaning for anything labelled 'Dry Clean Only', suits and structured blazers (water collapses the internal canvas), silk sarees and garments (water leaves tide marks), woolen coats and sweaters (water causes irreversible shrinkage), and embroidered or embellished clothing like lehengas and sherwanis."
      },
      {
        heading: "The Quick Decision Rule",
        body: "If it's an everyday garment made of cotton, linen, or polyester — wash it. If it's structured, silk, woolen, embellished, or says 'dry clean only' — dry clean it. When in doubt, check the label. If there's no label, ask us on WhatsApp and we'll tell you."
      },
    ],
    relatedLinks: [
      { label: "Book Dry Cleaning in Delhi →", href: "/customer/register" },
      { label: "Laundry Service in Saket →", href: "/laundry-service-saket" },
      { label: "Pricing Guide →", href: "/customer/register" },
    ],
  },
  "best-laundry-service-delhi": {
    seoTitle: "Best Laundry Service in Delhi 2025 — Honest Comparison | Washify",
    seoDesc: "We compared the top laundry services in Delhi on price, quality, delivery time, and reliability. Here's what we found — and which is actually worth using.",
    sections: [
      { body: "Delhi has no shortage of laundry options. The problem is knowing which one to actually trust with your work shirts, your suits, and your expensive woolen coats. We broke down the options honestly." },
      { heading: "Option 1 — The Local Dhobi", body: "Price: ₹15–25/shirt. Quality: Variable — entirely depends on the individual. Reliability: Inconsistent. On leave during festivals and sometimes randomly. Tracking: None. Verdict: Good if you have a reliable one, unreliable for valuable garments." },
      { heading: "Option 2 — TumbleDry", body: "Price: ₹45–65/shirt, ₹399–500 for suit dry cleaning. Quality: Good and consistent. Delivery: Available in select Delhi areas. Verdict: Premium pricing for premium quality. Worth it for occasional dry cleaning of expensive garments if you're near a branch." },
      { heading: "Option 3 — DhobiLite", body: "Price: ₹35–55/item. Quality: Decent but inconsistent. Coverage: Gaps in several South Delhi localities. Verdict: Okay for regular laundry. Coverage is the biggest limitation." },
      { heading: "Option 4 — Washify", body: "Price: ₹25/shirt wash, ₹12/iron, ₹280 suit dry cleaning. Quality: Professional-grade via verified partners. Coverage: 12 Delhi areas with doorstep pickup. Tracking: WhatsApp updates every step. Verdict: Best combination of price, coverage, and reliability for regular Delhi laundry." },
      { heading: "The Verdict", body: "For most Delhi residents wanting consistent quality at a fair price without leaving home, Washify is the most practical choice in 2025. Premium chains like TumbleDry work for occasional luxury dry cleaning. The local dhobi works if you have one you trust." },
    ],
    relatedLinks: [
      { label: "Book a Pickup in Delhi →", href: "/customer/register" },
      { label: "Laundry Service in South Delhi →", href: "/laundry-service-south-delhi" },
      { label: "See Our Pricing →", href: "/customer/register" },
    ],
  },
  "remove-stains-at-home": {
    seoTitle: "How to Remove Common Stains at Home — Practical Guide | Washify",
    seoDesc: "Curry, oil, coffee, ink — learn how to remove the most common clothing stains at home with items already in your kitchen. Plus when to call professionals.",
    sections: [
      { body: "Stains happen. A curry splash at lunch. Coffee on a Monday morning shirt. A pen leak in your pocket. The good news: most common stains can be treated at home if you act fast. The bad news: treating them wrong makes them permanent." },
      { heading: "The Golden Rule: Act Immediately, Never Rub", body: "The longer a stain sits, the deeper it bonds with fabric fibres. A curry stain on a fresh shirt is a five-minute fix; the same stain after a 12-hour workday may require professional dry cleaning. Always blot from the outside in — rubbing pushes the stain deeper and spreads it." },
      { heading: "Curry & Turmeric Stains", body: "1. Scrape off solid residue gently. 2. Rinse from the back with cold water. 3. Apply liquid dish soap, let sit 5 minutes. 4. Blot and wash in cold water. Hot water sets turmeric stains permanently. Sunlight naturally bleaches remaining yellow from turmeric on white fabric." },
      { heading: "Oil and Grease Stains", body: "1. Sprinkle baking soda or cornstarch immediately — this absorbs oil. 2. Let sit 15–20 minutes, then brush off. 3. Apply dish soap and rub gently. 4. Wash in the warmest water the fabric allows. Never rinse with water first — water and oil don't mix." },
      { heading: "Coffee and Tea Stains", body: "Fresh: Blot immediately, then apply a mix of 1 tbsp white vinegar + 1 tbsp liquid soap in cold water. Blot repeatedly, rinse. Dried: Soak in water + white vinegar (1:1) for 30 minutes before treating." },
      { heading: "When to Call the Professionals", body: "Some stains and fabrics are beyond home treatment: dried turmeric on silk, oil stains on suits, ink on wool, or any stain on 'dry clean only' garments. Attempting home treatment on delicate fabrics often causes more damage than the original stain. Book a dry cleaning pickup instead." },
    ],
    relatedLinks: [
      { label: "Book Dry Cleaning for Tough Stains →", href: "/customer/register" },
      { label: "Laundry Service in Delhi →", href: "/laundry-service-delhi" },
    ],
  },
  "wash-woolen-clothes": {
    seoTitle: "How to Wash Woolen Clothes Without Shrinking Them — Washify Guide",
    seoDesc: "Wool shrinks when washed wrong. Learn how to safely wash sweaters, coats, and woolen clothes at home — and when professional dry cleaning is the better call.",
    sections: [
      { body: "Every Delhi winter, thousands of perfectly good woolen coats, sweaters, and shawls get ruined by one well-intentioned washing machine cycle. Wool is a natural protein fibre — and it behaves nothing like cotton or polyester when it gets wet." },
      { heading: "Why Wool Shrinks", body: "Wool fibres have microscopic scales on their surface. In cold water, these lie flat. In hot water combined with agitation, the scales open, interlock, and permanently lock together — that's felting. The result is a smaller, denser garment that will never return to its original size. You cannot un-felt wool." },
      { heading: "Rules for Washing Wool at Home", body: "Cold water only — even 'warm' can trigger felting. No regular machine cycle — use the wool/delicate setting or hand wash. Use wool-specific detergent or baby shampoo (enzyme-free, pH-neutral). Never wring — press gently and roll in a towel to absorb moisture. Dry flat, never hang — hanging stretches the shoulders under gravity." },
      { heading: "Items That Should Never Be Home-Washed", body: "Wool coats and overcoats — too heavy and complex for home washing. Suits and blazers — the internal structure cannot survive water. Cashmere — more delicate than regular wool; one wrong wash ruins it permanently. Embellished woolen items — water risks both the embellishments and base fabric." },
      { heading: "The Professional Option", body: "If you're not confident, or if it's a valuable garment, just dry clean it. The cost of dry cleaning a coat (₹200 at Washify) is a fraction of replacing it. Book a woolen dry cleaning pickup in Delhi with free doorstep service." },
    ],
    relatedLinks: [
      { label: "Book Woolen Dry Cleaning in Delhi →", href: "/customer/register" },
      { label: "Dry Cleaning vs Laundry →", href: "/blog/dry-cleaning-vs-laundry" },
    ],
  },
  "wedding-dry-cleaning-checklist": {
    seoTitle: "Dry Cleaning Before a Wedding — Complete Checklist | Washify Delhi",
    seoDesc: "Wedding in the family? Use this complete checklist to get all outfits dry cleaned on time. Sherwanis, lehengas, suits, sarees — what to send and when.",
    sections: [
      { body: "A wedding in the family means 3–7 days of events and clothes that have been in storage for months. Nothing ruins a wedding photo like a musty sherwani or a crumpled silk saree. Here's exactly what to send and when." },
      { heading: "Book at Least 7–10 Days Before the Wedding", body: "This is non-negotiable. Dry cleaning takes 48–72 hours per item. For heavy items like lehengas with extensive embroidery or layered sherwanis, allow 7 days. Booking the day before is how people end up wearing a damp sherwani to the baraat." },
      { heading: "Groom's Checklist", body: "• Sherwani (allow 5–7 days)\n• Bandhgala suit for mehendi/tilak\n• Formal suit for reception\n• Waistcoat / Nehru jacket\n• Formal dress shirt\n• Woolen stole or dupatta" },
      { heading: "Bride's Checklist", body: "• Bridal lehenga — book first, allow 7 days\n• Sarees for each ceremony (silk especially)\n• Salwar kameez sets for day events\n• Silk / heavy dupattas\n• Embroidered blouses" },
      { heading: "Recommended Timeline", body: "14–10 days before: Book all dry cleaning, send bridal lehenga and silk sarees first. 10–7 days: Send sherwanis, suits, heavy embellished items. 7–5 days: Regular formal wear, lighter sarees. 3–2 days: Everything should be back; do a final check. 1 day before: Iron anything needing a final touch-up." },
      { heading: "After the Wedding", body: "Don't store worn outfits without cleaning first. Sweat, perfume, and food residue left in fabric causes permanent staining. Book a post-wedding dry cleaning within 1–2 weeks of the event." },
    ],
    relatedLinks: [
      { label: "Book Wedding Dry Cleaning in Delhi →", href: "/customer/register" },
      { label: "Dry Cleaning Prices →", href: "/customer/register" },
      { label: "Express Same-Day Service →", href: "/customer/register" },
    ],
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function BlogPost() {
  const [, navigate] = useLocation();
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug ?? "";
  const meta = BLOG_CONTENT[slug];
  const post = SEO_BLOGS.find((b) => b.id === slug);

  // 404 graceful fallback
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

  useSEO({ title: meta.seoTitle, description: meta.seoDesc, canonical: `https://washify.in/blog/${slug}` });

  return (
    <div className="min-h-screen bg-white font-sans">
      <nav className="bg-white border-b border-sky-100 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-5 py-4 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="font-extrabold text-xl text-sky-600">Washify</button>
          <button onClick={() => navigate("/customer/register")}
            className="bg-sky-500 hover:bg-sky-600 text-white rounded-full px-5 py-2 text-sm font-semibold transition-colors">
            Book Pickup
          </button>
        </div>
      </nav>

      <article className="max-w-3xl mx-auto px-5 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <button onClick={() => navigate("/")} className="hover:text-sky-500">Home</button>
          <ChevronRight className="w-3.5 h-3.5" />
          <button onClick={() => navigate("/blog")} className="hover:text-sky-500">Blog</button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-600 truncate">{post.title}</span>
        </div>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 ${
            post.category === "Fabric Care" ? "bg-blue-100 text-blue-700" :
            post.category === "Delhi Guide" ? "bg-green-100 text-green-700" :
            post.category === "Tips & Tricks" ? "bg-orange-100 text-orange-700" :
            "bg-purple-100 text-purple-700"
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
            <p className="font-bold text-gray-900">Need laundry or dry cleaning in Delhi?</p>
            <p className="text-sm text-gray-500">Free pickup. Starting ₹199. 24–48 hr return.</p>
          </div>
          <button onClick={() => navigate("/customer/register")}
            className="bg-sky-500 hover:bg-sky-600 text-white rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors whitespace-nowrap flex items-center gap-1">
            Book Now <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Content Sections */}
        <div className="prose prose-gray max-w-none">
          {meta.sections.map((section, i) => (
            <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.05 }} className="mb-8">
              {section.heading && (
                <h2 className="text-xl font-bold text-gray-900 mb-3">{section.heading}</h2>
              )}
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">{section.body}</p>
            </motion.div>
          ))}
        </div>

        {/* Related Links */}
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

        {/* More from blog */}
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

      {/* Bottom CTA */}
      <section className="py-14 px-5 bg-sky-500">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-2xl font-extrabold mb-3">Ready to Book Laundry in Delhi?</h2>
          <p className="text-sky-100 mb-6">Professional pickup across Saket, Lajpat Nagar, Hauz Khas & more. Starting ₹199.</p>
          <button onClick={() => navigate("/customer/register")}
            className="h-12 bg-white text-sky-600 hover:bg-sky-50 rounded-2xl font-bold px-8 text-sm transition-colors inline-flex items-center gap-2">
            Book Pickup Now <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400 py-8 px-5 text-center text-sm">
        <div className="flex flex-wrap justify-center gap-4 mb-3">
          <button onClick={() => navigate("/blog")} className="hover:text-white">All Articles</button>
          <button onClick={() => navigate("/laundry-service-delhi")} className="hover:text-white">Delhi Laundry</button>
          <button onClick={() => navigate("/")} className="hover:text-white">Home</button>
        </div>
        <p>© 2025 Washify. All rights reserved.</p>
      </footer>
    </div>
  );
}
