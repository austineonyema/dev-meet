import Link from "next/link";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui";
import type { ProfileUser } from "@/lib/profile";

type ProfileHeroProps = {
  user: ProfileUser;
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part.trim().charAt(0))
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function ProfileHero({ user }: ProfileHeroProps) {
  return (
    <section className="relative">
      <div className="relative h-48 w-full overflow-hidden rounded-2xl border border-terminal/10 bg-surface-800">
        <div className="absolute inset-0 bg-linear-to-br from-terminal/5 to-primary-500/5 opacity-50" />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,rgba(0,255,65,0.35),transparent_70%)]" />

        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <div className="h-64 w-64 animate-[spin_20s_linear_infinite] rounded-full border-2 border-terminal/20" />
          <div className="absolute h-48 w-48 animate-[spin_15s_linear_infinite_reverse] rounded-full border-2 border-primary-500/20" />
        </div>
      </div>

      <div className="relative z-10 -mt-16 flex flex-col gap-6 px-6 sm:px-10 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-6 md:flex-row md:items-end">
          <div className="group relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-2xl border-4 border-surface-950 bg-surface-900 font-mono text-4xl font-bold text-terminal shadow-2xl">
            <div className="absolute inset-0 bg-terminal opacity-10 transition-opacity group-hover:opacity-20" />
            {user.avatar ? (
              // Intentionally using img to keep parity with existing mock asset paths.
              <img src={user.avatar} alt={user.name} className="relative z-10 h-full w-full object-cover" />
            ) : (
              <span className="relative z-10">{getInitials(user.name)}</span>
            )}
          </div>
          <div className="mb-2">
            <h1 className="text-3xl font-bold tracking-tight">{user.name}</h1>
            <p className="font-mono text-sm text-terminal">@{user.username}</p>
          </div>
        </div>

        <div className="mb-2 flex gap-3">
          <Link href="/settings">
            <Button
              size="sm"
              className="border border-terminal/10 bg-surface-800 font-mono text-text-primary hover:bg-surface-700"
            >
              <Edit className="mr-2 h-4 w-4" /> $ profile --edit
            </Button>
          </Link>
          <Link href="/connections">
            <Button
              size="sm"
              className="bg-terminal font-mono font-bold text-surface-950 shadow-[0_0_15px_rgba(0,255,65,0.2)] hover:bg-terminal-dim"
            >
              Connect
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
