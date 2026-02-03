import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Lock, Mail, User, Code2 } from "lucide-react";
import { Button, Input } from "../../../components/ui";
import { useForm } from "react-hook-form";
import {
  registerSchema,
  type RegisterFormData,
} from "../../../schema/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "../../../hooks/useRegister";
import { setAuthToken } from "../../../lib/api";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { mutate, isPending } = useRegister();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    mutate(data, {
      onSuccess: (res) => {
        // store token
        localStorage.setItem("token", res.access_token);
        //set auth token for
        setAuthToken(res.access_token);
        //store user in react query cache
        queryClient.setQueryData(["me"], res.user);
        //redirect to dashboard
        navigate("/dashboard");
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          const message =
            error.response?.data?.message ?? "Registration failed";
          setError("email", { type: "server", message });
          return;
        }

        setError("email", { type: "server", message: "Registration failed" });
      },
    });
  };

  return (
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
                <p className="text-error text-xs">{errors.name.message}</p>
              )}
            </div>
            <div className="relative group">
              <div className="absolute left-3 top-3 text-text-muted group-focus-within:text-terminal transition-colors">
                <Code2 className="w-4 h-4" />
              </div>
              <Input
                // {...register("username")}
                placeholder="Username"
                className="pl-10 font-mono text-sm bg-surface-950/50"
                required
              />
              {/* {errors.username && (
                <p className="text-error text-xs">{errors.username.message}</p>
              )} */}
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
              <p className="text-error text-xs">{errors.email.message}</p>
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
              <p className="text-error text-xs">{errors.password.message}</p>
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
          disabled={isPending}
          className="w-full bg-terminal hover:bg-terminal-dim text-surface-950 font-mono font-semibold h-11"
        >
          {isPending ? (
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
          to="/login"
          className="text-sm font-mono text-terminal hover:text-terminal-dim hover:underline transition-all"
        >
          ./login_session.sh
        </Link>
      </div>
    </div>
  );
}
