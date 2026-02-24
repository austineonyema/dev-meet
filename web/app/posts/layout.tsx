import type { ReactNode } from "react";
import { Layout } from "@/components/layout";

type PostsLayoutProps = {
  children: ReactNode;
};

export default function PostsLayout({ children }: PostsLayoutProps) {
  return <Layout>{children}</Layout>;
}
