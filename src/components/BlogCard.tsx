import { useLocation } from "wouter";
import { BookOpenText, ChevronRight } from "lucide-react";

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  createdAt: string;
  coverImageUrl?: string;
}

export function BlogCard({ id, title, excerpt, author, createdAt, coverImageUrl }: BlogCardProps) {
  const [, navigate] = useLocation();

  // Map lib/blogs IDs to SEO slug routes, fallback to /blog
  const SEO_SLUGS: Record<string, string> = {
    "best-laundry-service-narnaul": "/blog/best-laundry-service-narnaul",
    "laundry-vs-dry-cleaning-narnaul": "/blog/laundry-vs-dry-cleaning-narnaul",
    "affordable-laundry-narnaul": "/blog/affordable-laundry-narnaul",
  };
  const href = SEO_SLUGS[id] ?? "/blog";

  return (
    <article
      onClick={() => navigate(href)}
      className="bg-white rounded-3xl border border-sky-100 overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer group"
    >
      <div className="h-40 bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center overflow-hidden">
        {coverImageUrl ? (
          <img src={coverImageUrl} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
        ) : (
          <BookOpenText className="w-12 h-12 text-white opacity-80" />
        )}
      </div>
      <div className="p-5">
        <p className="text-xs text-sky-600 font-semibold mb-2">
          {new Date(createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })} · {author}
        </p>
        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 leading-snug">{title}</h3>
        <p className="text-sm text-gray-500 line-clamp-3 mb-4">{excerpt}</p>
        <span className="text-sky-500 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
          Read Article <ChevronRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </article>
  );
}
