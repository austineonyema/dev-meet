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
        message: getApiErrorMessage(error, "Registration failed"),
      });
    }
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary mb-2">
            Initialize User
          </h1>
          <p className="text-text-secondary text-sm">
            Create your developer profile to join the network
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative group">
                <div className="absolute left-3 top-3 text-text-muted group-focus-within:text-terminal transition-colors">
                  <User className="w-4 h-4" />
                </div>
                <Input
                  {...register("name")}
                  placeholder="Name"
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
                  placeholder="Username"
                  className="pl-10 font-mono text-sm bg-surface-950/50"
                  required
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

          <div className="text-xs text-text-muted">
            <p>
              By executing this init script, you agree to our{" "}
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
            className="w-full bg-terminal hover:bg-terminal-dim text-surface-950 font-mono font-semibold h-11"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-surface-950 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-surface-950 animate-bounce [animation-delay:-0.15s]" />
                <span className="w-2 h-2 rounded-full bg-surface-950 animate-bounce [animation-delay:-0.3s]" />
              </span>
            ) : (
              <>
                $ npm install user
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-terminal/10" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-surface-900 px-2 text-text-muted">
              Already initialized?
            </span>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/login"
            className="text-sm font-mono text-terminal hover:text-terminal-dim hover:underline transition-all"
          >
            ./login_session.sh
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
