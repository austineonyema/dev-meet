"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, KeyRound, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Button, Input } from "@/components/ui";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "@/schema/forgot-password.schema";

export default function ForgotPasswordPage() {
  const [sentTo, setSentTo] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    // Placeholder until recovery endpoint is available.
    await new Promise((resolve) => setTimeout(resolve, 650));
    setSentTo(data.email);
    reset();
  };

  return (
    <AuthLayout>
      <div className="space-y-4">
        <div className="space-y-1.5 text-center">
          <h1 className="flex items-center justify-center gap-2 text-xl font-bold text-text-primary">
            <KeyRound className="h-5 w-5 text-terminal" />
            Reset Password
          </h1>
          <p className="text-sm text-text-secondary">
            Enter your account email and we will send a password recovery link.
          </p>
        </div>

        {sentTo ? (
          <div className="space-y-4">
            <div className="rounded-xl border border-terminal/30 bg-terminal/5 p-4">
              <div className="mb-2 inline-flex items-center gap-2 text-sm font-semibold text-terminal">
                <CheckCircle2 className="h-4 w-4" />
                Recovery request queued
              </div>
              <p className="text-sm leading-relaxed text-text-secondary">
                We prepared a reset request for{" "}
                <span className="font-mono text-text-primary">{sentTo}</span>.
                Hook this up to your backend recovery endpoint to send the email.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <Button
                type="button"
                variant="secondary"
                className="font-mono"
                onClick={() => setSentTo(null)}
              >
                Send another
              </Button>
              <Link
                href="/login"
                className="inline-flex h-10 items-center justify-center rounded-lg border border-terminal/30 bg-terminal text-sm font-semibold text-surface-950 transition-colors hover:bg-terminal-dim"
              >
                Return to sign in
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div className="rounded-lg border border-terminal/15 bg-surface-950/50 px-3 py-2 text-xs text-text-muted">
              Recovery API integration is pending. UI flow is active for design/testing.
            </div>

            <div className="relative group">
              <div className="absolute left-3 top-3 text-text-muted transition-colors group-focus-within:text-terminal">
                <Mail className="h-4 w-4" />
              </div>
              <Input
                type="email"
                {...register("email")}
                placeholder="you@dev-meet.com"
                className="bg-surface-950/50 pl-10 font-mono text-sm"
                required
              />
              {errors.email ? (
                <p className="mt-1 text-xs text-error">{errors.email.message}</p>
              ) : null}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-10.5 w-full bg-terminal font-mono font-semibold text-surface-950 hover:bg-terminal-dim"
            >
              {isSubmitting ? "Requesting..." : "Send reset link"}
              {!isSubmitting ? <ArrowRight className="ml-2 h-4 w-4" /> : null}
            </Button>
          </form>
        )}

        <div className="pt-0.5 text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 font-mono text-sm text-text-muted transition-colors hover:text-terminal"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to login
          </Link>
        </div>

        <div className="text-center text-xs text-text-muted">
          New here?{" "}
          <Link href="/register" className="text-terminal hover:text-terminal-dim hover:underline">
            Create profile
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
