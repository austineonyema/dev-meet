"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { getApiErrorMessage, register } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatusMessage(null);
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const result = await register({ name, email, password });
      if (result.requiresLogin) {
        setStatusMessage(result.message || "Registration successful. Login next.");
        router.push("/login");
      } else {
        router.push("/dashboard");
      }
      router.refresh();
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, "Unable to register."));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main style={{ maxWidth: 480, margin: "40px auto", padding: "0 16px" }}>
      <h1 style={{ marginBottom: 8 }}>Register</h1>
      <p style={{ marginTop: 0, marginBottom: 20, color: "#666" }}>
        Registration is now routed through `/api/auth/register`.
      </p>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          style={{ padding: 10 }}
        />
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
          {isSubmitting ? "Creating account..." : "Register"}
        </button>
      </form>
      {statusMessage ? (
        <p style={{ color: "#027a48", marginTop: 12 }}>{statusMessage}</p>
      ) : null}
      {errorMessage ? (
        <p style={{ color: "#b42318", marginTop: 12 }}>{errorMessage}</p>
      ) : null}
      <p style={{ marginTop: 16 }}>
        Already registered? <Link href="/login">Login</Link>
      </p>
    </main>
  );
}
