"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PostDetailShell } from "@/components/posts";
import { getPostById } from "@/lib/api/posts";

export default function PostDetailPage() {
  const params = useParams<{ id: string }>();
  const postId = Array.isArray(params.id) ? params.id[0] : params.id;

  if (!postId) {
    return <PostMissingState />;
  }

  const post = getPostById(postId);

  if (!post) {
    return <PostMissingState />;
  }

  return <PostDetailShell post={post} />;
}

function PostMissingState() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="terminal-box rounded-xl p-6 sm:p-8">
        <h1 className="mb-2 text-2xl font-bold text-text-primary">
          Post not found
        </h1>
        <p className="text-text-secondary">
          The selected post could not be resolved in this environment.
        </p>
        <Link
          href="/posts"
          className="mt-5 inline-flex items-center gap-2 font-mono text-sm text-text-muted transition-colors hover:text-terminal"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to knowledge feed
        </Link>
      </div>
    </main>
  );
}
