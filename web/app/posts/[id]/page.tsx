import { notFound } from "next/navigation";
import { PostDetailShell } from "@/components/posts";
import { mockPosts } from "@/lib/posts";

type PostDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { id } = await params;
  const post = mockPosts.find((item) => item.id === id);

  if (!post) {
    notFound();
  }

  return <PostDetailShell post={post} />;
}
