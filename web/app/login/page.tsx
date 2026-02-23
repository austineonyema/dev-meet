"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { getApiErrorMessage, login } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      await login({ email, password });
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, "Unable to login."));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main style={{ maxWidth: 480, margin: "40px auto", padding: "0 16px" }}>
      <h1 style={{ marginBottom: 8 }}>Login</h1>
      <p style={{ marginTop: 0, marginBottom: 20, color: "#666" }}>
        Auth is now wired to the Next BFF (`/api/auth/login`).
      </p>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          style={{ padding: 10 }}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          style={{ padding: 10 }}
        />
        <button type="submit" disabled={isSubmitting} style={{ padding: 10 }}>
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
      {errorMessage ? (
        <p style={{ color: "#b42318", marginTop: 12 }}>{errorMessage}</p>
      ) : null}
      <p style={{ marginTop: 16 }}>
        New user? <Link href="/register">Create account</Link>
      </p>
    </main>
  );
}
