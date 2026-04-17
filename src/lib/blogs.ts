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
    id: "welcome-ezdry",
    title: "Welcome to EzDry",
    excerpt: "Fast pickup, careful cleaning, and reliable delivery for every home.",
    content:
      "EzDry is built for busy families and professionals. Book in minutes, track in real-time, and get freshly cleaned clothes delivered to your doorstep.",
    author: "EzDry Team",
    createdAt: new Date().toISOString(),
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
