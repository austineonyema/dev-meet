import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../api";
import type { Post } from "../../../data/posts";

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    // Optimistic Update logic
    onMutate: async (newPostData) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["posts"] });

      // Snapshot the previous value
      const previousPosts = queryClient.getQueryData<Post[]>(["posts"]);

      // Optimistically update to the new value
      if (previousPosts) {
        queryClient.setQueryData<Post[]>(
          ["posts"],
          [
            {
              id: "temp-id",
              title: newPostData.title,
              content: newPostData.content,
              excerpt: newPostData.content.substring(0, 150) + "...",
              author: {
                name: "Loading...",
                username: "anon",
                avatar: "",
              },
              tags: ["staged"],
              readingTime: "Calculating...",
              createdAt: new Date().toISOString(),
              likes: 0,
              comments: 0,
              category: "Kernel",
            },
            ...previousPosts,
          ],
        );
      }

      // Return a context object with the snapshotted value
      return { previousPosts };
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (_err, _newPost, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(["posts"], context.previousPosts);
      }
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}
