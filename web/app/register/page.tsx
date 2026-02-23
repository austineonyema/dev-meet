"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock, Mail, User, Code2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Button, Input } from "@/components/ui";
import { registerSchema, type RegisterFormData } from "@/schema/register.schema";
import { getApiErrorMessage, register as registerUser } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const result = await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (result.requiresLogin) {
        // Keep flow predictable when backend returns registration-only response.
        router.push("/login");
      } else {
        router.push("/dashboard");
      }
      router.refresh();
    } catch (error) {
      setError("email", {
        type: "server",
        message: getApiErrorMessage(error, "Unable to create your profile."),
      });
    }
  };

  return (
    <AuthLayout>
      <div className="space-y-4">
        <div className="text-center">
          <h1 className="text-xl font-bold text-text-primary mb-1.5">
            Create Your Dev-Meet Profile
          </h1>
          <p className="text-text-secondary text-xs sm:text-sm leading-relaxed">
            Join a focused space built for software developers and engineers.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="relative group">
                <div className="absolute left-3 top-3 text-text-muted group-focus-within:text-terminal transition-colors">
                  <User className="w-4 h-4" />
                </div>
                <Input
                  {...register("name")}
                  placeholder="Full name"
                  className="pl-10 font-mono text-sm bg-surface-950/50"
                  required
                />
                {errors.name && (
                  <p className="text-error text-xs mt-1">{errors.name.message}</p>
                )}
              </div>
              <div className="relative group">
                <div className="absolute left-3 top-3 text-text-muted group-focus-within:text-terminal transition-colors">
                  <Code2 className="w-4 h-4" />
                </div>
                <Input
                  {...register("username")}
                  placeholder="Preferred handle (optional)"
                  className="pl-10 font-mono text-sm bg-surface-950/50"
                />
              </div>
            </div>

            <div className="relative group">
              <div className="absolute left-3 top-3 text-text-muted group-focus-within:text-terminal transition-colors">
                <Mail className="w-4 h-4" />
              </div>
              <Input
                type="email"
                {...register("email")}
                placeholder="user@example.com"
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
                placeholder="Create password"
                className="pl-10 font-mono text-sm bg-surface-950/50"
                required
              />
              {errors.password && (
                <p className="text-error text-xs mt-1">{errors.password.message}</p>
              )}
            </div>
          </div>

          <div className="text-[11px] text-text-muted leading-relaxed">
            <p>
              By creating an account, you agree to our{" "}
              <a href="#" className="text-terminal hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-terminal hover:underline">
                Privacy Policy
              </a>
              .
            </p>
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
                Create Profile
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
              Already have an account?
            </span>
          </div>
        </div>

        <div className="text-center pt-0.5">
          <Link
            href="/login"
            className="text-sm font-mono text-terminal hover:text-terminal-dim hover:underline transition-all"
          >
            Sign in to Dev-Meet
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
