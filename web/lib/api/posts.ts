import { mockPosts, type Post } from "@/lib/posts";
import { ApiError, apiRequest } from "./http";

const POSTS_STORAGE_KEY = "dev_meet_posts";
const POSTS_UPDATED_EVENT = "devmeet:posts-updated";

export type CreatePostRequest = {
  title: string;
  content: string;
};

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function parseStoredPosts(raw: string | null): Post[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed as Post[];
  } catch {
    return [];
  }
}

function getStoredPosts(): Post[] {
  if (!isBrowser()) return [];
  return parseStoredPosts(window.localStorage.getItem(POSTS_STORAGE_KEY));
}

function notifyPostsUpdated() {
  if (!isBrowser()) return;
  window.dispatchEvent(new Event(POSTS_UPDATED_EVENT));
}

function saveStoredPosts(posts: Post[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(posts));
  notifyPostsUpdated();
}

function upsertPost(post: Post) {
  if (!isBrowser()) return;
  const existing = getStoredPosts();
  const filtered = existing.filter((entry) => entry.id !== post.id);
  saveStoredPosts([post, ...filtered]);
}

function buildFallbackPost(payload: CreatePostRequest): Post {
  const words = payload.content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 220));
  const excerpt =
    payload.content.length > 150
      ? `${payload.content.substring(0, 150)}...`
      : payload.content;

  return {
    id: `post-${Date.now()}`,
    title: payload.title,
    content: payload.content,
    excerpt,
    author: {
      name: "Alex Rivera",
      username: "arivera_dev",
      avatar: "/assets/avatars/user-1.png",
    },
    tags: ["general", "new"],
    readingTime: `${minutes} min`,
    createdAt: new Date().toISOString(),
    likes: 0,
    comments: 0,
    category: "Frontend",
  };
}

function shouldFallbackToLocal(error: unknown): boolean {
  if (!(error instanceof ApiError)) return true;
  if (error.status === 401 || error.status === 403) return false;
  return true;
}

export function getPostsUpdateEventName() {
  return POSTS_UPDATED_EVENT;
}

export function getCombinedPosts(): Post[] {
  const localPosts = getStoredPosts();
  const localIds = new Set(localPosts.map((post) => post.id));
  const mergedMocks = mockPosts.filter((post) => !localIds.has(post.id));
  return [...localPosts, ...mergedMocks];
}

export function getPostById(postId: string): Post | null {
  return getCombinedPosts().find((post) => post.id === postId) ?? null;
}

export async function createPost(payload: CreatePostRequest): Promise<Post> {
  try {
    const created = await apiRequest<Post>("/posts", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    upsertPost(created);
    return created;
  } catch (error) {
    if (!isBrowser() || !shouldFallbackToLocal(error)) {
      throw error;
    }

    const fallbackPost = buildFallbackPost(payload);
    upsertPost(fallbackPost);
    return fallbackPost;
  }
}
