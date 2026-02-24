import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Layout } from "@/components/layout";

export default function PrivacyPage() {
  return (
    <Layout>
      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="terminal-box rounded-xl p-6 sm:p-8">
          <h1 className="mb-4 flex items-center gap-3 text-2xl font-bold text-text-primary">
            <ShieldCheck className="h-6 w-6 text-terminal" />
            Privacy Policy
          </h1>
          <p className="mb-3 text-text-secondary">
            Dev-Meet stores only the data required to run your account, secure
            sessions, and support collaboration workflows.
          </p>
          <p className="text-text-secondary">
            Cookie-backed auth and token rotation are handled through the Next BFF
            layer, with backend contract extensions being completed incrementally.
          </p>
          <Link
            href="/register"
            className="mt-6 inline-flex items-center gap-2 font-mono text-sm text-text-muted transition-colors hover:text-terminal"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to register
          </Link>
        </div>
      </main>
    </Layout>
  );
}
