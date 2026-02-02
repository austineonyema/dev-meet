import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Lock, Mail } from "lucide-react";
import { Button, Input } from "../../../components/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "../../../schema/login.schema";
import { useLogin } from "../../../hooks/useLogin";
import { setAuthToken } from "../../../lib/api";

export default function LoginPage() {
  const navigate = useNavigate();

  const { mutate, isPending } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const onSubmit = (data: LoginFormData) => {
    mutate(data, {
      onSuccess: (res) => {
        localStorage.setItem("token", res.accessToken);
        const token = localStorage.getItem("token");
        if (token) setAuthToken(token);

        navigate("/dashboard");
      },
      onError: () => {
        //TODO will redefine this to make it more user friendly
        alert("Invalid credentials");
        console.log(errors);
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-text-primary mb-2">
          Access Terminal
        </h1>
        <p className="text-text-secondary text-sm">
          Enter credentials to establish connection
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-4">
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
              placeholder="••••••••••••"
              className="pl-10 font-mono text-sm bg-surface-950/50"
              required
            />
            {errors.password && (
              <p className="text-error text-xs">{errors.password.message}</p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center gap-2 cursor-pointer text-text-secondary hover:text-text-primary transition-colors">
            <input
              type="checkbox"
              className="rounded border-terminal/20 bg-surface-950 text-terminal focus:ring-terminal/50"
            />
            <span>Remember me</span>
          </label>
          <button
            type="button"
            className="text-terminal/80 hover:text-terminal hover:underline transition-colors"
          >
            Forgot password?
          </button>
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
              $ connect --secure
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
            New Connection?
          </span>
        </div>
      </div>

      <div className="text-center">
        <Link
          to="/register"
          className="text-sm font-mono text-terminal hover:text-terminal-dim hover:underline transition-all"
        >
          ./initialize_new_user.sh
        </Link>
      </div>
    </div>
  );
}
