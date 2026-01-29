import type { Post } from "../../data/posts";
import { mockPosts } from "../../data/posts";
import type { PostFormData } from "./schemas/post";
import { mockUser } from "../../data/user";

const POSTS_KEY = "dev_meet_posts";

// Helper to get posts from localStorage or fallback to mocks
const getStoredPosts = (): Post[] => {
  const stored = localStorage.getItem(POSTS_KEY);
  if (stored) return JSON.parse(stored);
  return mockPosts;
};

const savePosts = (posts: Post[]) => {
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
};

export const fetchPosts = async (): Promise<Post[]> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));
  return getStoredPosts();
};

export const createPost = async (formData: PostFormData): Promise<Post> => {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const newPost: Post = {
    id: `post-${Date.now()}`,
    title: formData.title,
    content: formData.content,
    excerpt: formData.content.substring(0, 150) + "...",
    author: {
      name: mockUser.name,
      username: mockUser.username,
      avatar: mockUser.avatar || "",
    },
    tags: ["general", "new"],
    readingTime: "1 min",
    createdAt: new Date().toISOString(),
    likes: 0,
    comments: 0,
    category: "Kernel", // Default for demo
  };

  const currentPosts = getStoredPosts();
  savePosts([newPost, ...currentPosts]);

  return newPost;
};
