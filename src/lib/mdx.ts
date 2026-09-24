import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  keywords?: string;
  readTime?: string;
  author?: string;
}

export interface BlogPostData {
  meta: BlogPostMeta;
  content: string;
}

const BLOG_DIRECTORY = path.join(process.cwd(), "src/content/blog");

export function getBlogPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIRECTORY)) {
    return [];
  }
  const files = fs.readdirSync(BLOG_DIRECTORY);
  return files
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file) => file.replace(/\.mdx?$/, ""));
}

export function getBlogPostBySlug(slug: string): BlogPostData | null {
  try {
    const fullPathMdx = path.join(BLOG_DIRECTORY, `${slug}.mdx`);
    const fullPathMd = path.join(BLOG_DIRECTORY, `${slug}.md`);

    let filePath = "";
    if (fs.existsSync(fullPathMdx)) {
      filePath = fullPathMdx;
    } else if (fs.existsSync(fullPathMd)) {
      filePath = fullPathMd;
    } else {
      return null;
    }

    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    const meta: BlogPostMeta = {
      slug: data.slug || slug,
      title: data.title || "Titre de l'article",
      description: data.description || "",
      date: data.date || new Date().toISOString().split("T")[0],
      keywords: data.keywords || "",
      readTime: data.readTime || "5 min",
      author: data.author || "Équipe IPTV For Europe",
    };

    return { meta, content };
  } catch (_err) {
    return null;
  }
}

export function getAllBlogPosts(): BlogPostMeta[] {
  const slugs = getBlogPostSlugs();
  const posts: BlogPostMeta[] = [];

  for (const slug of slugs) {
    const post = getBlogPostBySlug(slug);
    if (post) {
      posts.push(post.meta);
    }
  }

  // Sort descending by date
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
