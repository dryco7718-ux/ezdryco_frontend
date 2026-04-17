import { useMemo, useState } from "react";
import { Plus, Trash2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  createBlogPost,
  deleteBlogPost,
  listBlogs,
  updateBlogPost,
  type BlogPost,
} from "@/lib/blogs";

export default function AdminBlogs() {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("EzDry Admin");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const posts = useMemo(() => listBlogs(true), [refreshKey]);

  const handleCreate = () => {
    if (!title.trim() || !excerpt.trim() || !content.trim()) return;
    createBlogPost({
      title: title.trim(),
      excerpt: excerpt.trim(),
      content: content.trim(),
      author: author.trim() || "EzDry Admin",
      coverImageUrl: coverImageUrl.trim() || undefined,
      isPublished: true,
    });
    setTitle("");
    setExcerpt("");
    setContent("");
    setCoverImageUrl("");
    setRefreshKey((v) => v + 1);
  };

  const togglePublished = (post: BlogPost) => {
    updateBlogPost(post.id, { isPublished: !post.isPublished });
    setRefreshKey((v) => v + 1);
  };

  const removePost = (id: string) => {
    deleteBlogPost(id);
    setRefreshKey((v) => v + 1);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Blog Management</h2>
        <p className="text-sm text-gray-500">Publish website blogs directly from admin panel.</p>
      </div>

      <div className="bg-white rounded-2xl border border-sky-100 p-4 space-y-3 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-800">Create New Blog</h3>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Blog title" />
        <Input value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Short excerpt" />
        <Input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author name" />
        <Input value={coverImageUrl} onChange={(e) => setCoverImageUrl(e.target.value)} placeholder="Cover image URL (optional)" />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write blog content"
          rows={6}
          className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
        />
        <Button onClick={handleCreate} className="bg-sky-500 hover:bg-sky-600 text-white rounded-xl">
          <Plus className="w-4 h-4 mr-2" /> Publish Blog
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-sky-100 p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">Published / Draft Blogs</h3>
        <div className="space-y-3">
          {posts.length === 0 && <p className="text-sm text-gray-400">No blog posts yet.</p>}
          {posts.map((post) => (
            <div key={post.id} className="border border-gray-100 rounded-xl p-3 flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-gray-900 text-sm">{post.title}</p>
                <p className="text-xs text-gray-500 mt-1">{post.excerpt}</p>
                <p className="text-[11px] text-gray-400 mt-2">
                  By {post.author} • {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => togglePublished(post)}
                  className="p-2 rounded-lg bg-sky-50 text-sky-600 hover:bg-sky-100"
                  title={post.isPublished ? "Mark as draft" : "Publish"}
                >
                  {post.isPublished ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => removePost(post.id)}
                  className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
