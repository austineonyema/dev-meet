import Link from "next/link";
import { ArrowLeft, KeyRound } from "lucide-react";
import { AuthLayout } from "@/components/layout";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <div className="space-y-4">
        <h1 className="flex items-center gap-2 text-xl font-bold text-text-primary">
          <KeyRound className="h-5 w-5 text-terminal" />
          Password Reset
        </h1>
        <p className="text-sm text-text-secondary">
          Password reset flow will be connected when backend recovery endpoints are
          ready.
        </p>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 font-mono text-sm text-text-muted transition-colors hover:text-terminal"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to login
        </Link>
      </div>
    </AuthLayout>
  );
}
