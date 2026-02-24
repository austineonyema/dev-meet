"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Check, Lock, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Button, Input } from "@/components/ui";
import { loginSchema, type LoginFormData } from "@/schema/login.schema";
import { getApiErrorMessage, login } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
      const redirectTarget = searchParams.get("next");
      const safeTarget =
        redirectTarget && redirectTarget.startsWith("/")
          ? redirectTarget
          : "/dashboard";
      router.push(safeTarget);
      router.refresh();
    } catch (error) {
      setError("password", {
        type: "server",
        message: getApiErrorMessage(error, "Unable to sign in. Check your credentials."),
      });
    }
  };

  return (
    <AuthLayout>
      <div className="space-y-4">
        <div className="text-center">
          <h1 className="text-xl font-bold text-text-primary mb-1.5">
            Sign In to Dev-Meet
          </h1>
          <p className="text-text-secondary text-sm">
            Continue building with a focused network of developers and engineers.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="space-y-3">
            <div className="relative group">
              <div className="absolute left-3 top-3 text-text-muted group-focus-within:text-terminal transition-colors">
                <Mail className="w-4 h-4" />
              </div>
              <Input
                type="email"
                {...register("email")}
                placeholder="user@dev-meet.com"
                className="pl-10 font-mono text-sm bg-surface-950/50"
                required
              />
              {errors.email && (
                <p className="text-error text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            <div className="relative group">
              <div className="absolute left-3 top-3 text-text-muted group-focus-within:text-terminal transition-colors">
                <Lock className="w-4 h-4" />
              </div>
              <Input
                type="password"
                {...register("password")}
                placeholder="••••••••••••"
                className="pl-10 font-mono text-sm bg-surface-950/50"
                required
              />
              {errors.password && (
                <p className="text-error text-xs mt-1">{errors.password.message}</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-text-secondary hover:text-text-primary transition-colors">
              <span className="relative inline-flex h-4 w-4 items-center justify-center">
                <input
                  type="checkbox"
                  className="peer sr-only"
                />
                <span className="h-4 w-4 rounded border border-terminal/30 bg-surface-950 transition-colors peer-checked:border-terminal peer-checked:bg-terminal peer-focus-visible:ring-2 peer-focus-visible:ring-terminal/50" />
                <Check className="pointer-events-none absolute h-3 w-3 text-white opacity-0 transition-opacity peer-checked:opacity-100" />
              </span>
              <span>Remember me</span>
            </label>
            <Link
              href="/forgot-password"
              className="text-terminal/80 hover:text-terminal hover:underline transition-colors"
            >
              Reset password
            </Link>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-terminal hover:bg-terminal-dim text-surface-950 font-mono font-semibold h-10.5"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-surface-950 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-surface-950 animate-bounce [animation-delay:-0.15s]" />
                <span className="w-2 h-2 rounded-full bg-surface-950 animate-bounce [animation-delay:-0.3s]" />
              </span>
            ) : (
              <>
                Enter Dev-Meet
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </form>

        <div className="relative mt-1">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-terminal/10" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-surface-900 px-2 text-text-muted">
              New to Dev-Meet?
            </span>
          </div>
        </div>

        <div className="text-center pt-0.5">
          <Link
            href="/register"
            className="text-sm font-mono text-terminal hover:text-terminal-dim hover:underline transition-all"
          >
            Create your profile
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
