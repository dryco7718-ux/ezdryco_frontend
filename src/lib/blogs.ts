export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  coverImageUrl?: string;
  createdAt: string;
  isPublished: boolean;
};

const BLOG_STORAGE_KEY = "ezdry_blog_posts";

const DEFAULT_BLOGS: BlogPost[] = [
  {
    id: "best-laundry-service-narnaul",
    title: "Best Laundry Service in Narnaul — EZDRY vs Local Dhobi",
    excerpt: "Is the local dhobi still the best option in Narnaul? We compare traditional laundry services with EZDRY's doorstep model on price, quality, and reliability.",
    content: "Full comparison of EZDRY and local dhobi services in Narnaul with pricing, quality, and reliability analysis.",
    author: "EZDRY Team",
    createdAt: new Date("2025-04-22").toISOString(),
    isPublished: true,
  },
  {
    id: "laundry-vs-dry-cleaning-narnaul",
    title: "Laundry vs Dry Cleaning in Narnaul — Which Does Your Clothes Need?",
    excerpt: "Kurtas, suits, woolen shawls — not everything should go in the wash. Here's how to decide for every garment in your Narnaul wardrobe.",
    content: "Expert guide on when to use regular laundry vs dry cleaning for different fabrics common in Narnaul.",
    author: "EZDRY Team",
    createdAt: new Date("2025-04-20").toISOString(),
    isPublished: true,
  },
  {
    id: "affordable-laundry-narnaul",
    title: "Affordable Laundry Service in Narnaul — Prices, Plans & What to Expect",
    excerpt: "How much should laundry actually cost in Narnaul? We break down fair prices for wash & fold, dry cleaning, and ironing.",
    content: "Complete pricing guide for laundry services in Narnaul including wash & fold, dry cleaning, and ironing rates.",
    author: "EZDRY Team",
    createdAt: new Date("2025-04-18").toISOString(),
    isPublished: true,
  },
];

function readRaw(): BlogPost[] {
  try {
    const raw = localStorage.getItem(BLOG_STORAGE_KEY);
    if (!raw) return DEFAULT_BLOGS;
    const parsed = JSON.parse(raw) as BlogPost[];
    if (!Array.isArray(parsed) || parsed.length === 0) return DEFAULT_BLOGS;
    return parsed;
  } catch {
    return DEFAULT_BLOGS;
  }
}

function persist(posts: BlogPost[]) {
  localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(posts));
}

export function listBlogs(includeDrafts = false): BlogPost[] {
  const posts = readRaw().sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
  if (includeDrafts) return posts;
  return posts.filter((post) => post.isPublished);
}

export function createBlogPost(input: Omit<BlogPost, "id" | "createdAt">): BlogPost {
  const posts = readRaw();
  const post: BlogPost = {
    ...input,
    id: `blog-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  persist([post, ...posts]);
  return post;
}

export function updateBlogPost(id: string, updates: Partial<BlogPost>): BlogPost[] {
  const posts = readRaw().map((post) => (post.id === id ? { ...post, ...updates } : post));
  persist(posts);
  return posts;
}

export function deleteBlogPost(id: string): BlogPost[] {
  const posts = readRaw().filter((post) => post.id !== id);
  persist(posts);
  return posts;
}
