import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { Layout } from "@/components/layout";

export default function TermsPage() {
  return (
    <Layout>
      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="terminal-box rounded-xl p-6 sm:p-8">
          <h1 className="mb-4 flex items-center gap-3 text-2xl font-bold text-text-primary">
            <FileText className="h-6 w-6 text-terminal" />
            Terms of Service
          </h1>
          <p className="mb-3 text-text-secondary">
            Dev-Meet is a professional space for software developers and engineers.
            Use the platform respectfully, keep content accurate, and avoid harmful
            behavior.
          </p>
          <p className="text-text-secondary">
            Additional legal terms will be finalized as backend policy modules are
            completed.
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
