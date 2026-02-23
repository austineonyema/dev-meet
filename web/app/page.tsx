import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Dev-Meet Web</h1>
      <p>Next.js foundation is ready for BFF/auth migration.</p>
      <ul>
        <li>
          <Link href="/login">Login</Link>
        </li>
        <li>
          <Link href="/register">Register</Link>
        </li>
        <li>
          <Link href="/dashboard">Dashboard Session Check</Link>
        </li>
      </ul>
    </main>
  );
}
