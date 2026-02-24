import { Calendar, Github, Globe, Mail, MapPin, Terminal, Twitter } from "lucide-react";
import { ScrollReveal } from "@/components/ui";
import type { ProfileUser } from "@/lib/profile";

type ProfileIdentityCardProps = {
  user: ProfileUser;
};

export function ProfileIdentityCard({ user }: ProfileIdentityCardProps) {
  return (
    <ScrollReveal>
      <div className="terminal-box space-y-6 rounded-xl border-terminal/10 p-6">
        <div className="space-y-4">
          <h3 className="mb-4 flex items-center justify-between border-b border-terminal/10 pb-2 font-mono text-xs font-bold tracking-widest text-terminal uppercase">
            <span>identity_log</span>
            <Terminal className="h-3.5 w-3.5" />
          </h3>
          <p className="font-mono text-sm leading-relaxed text-text-secondary">{user.bio}</p>
        </div>

        <div className="space-y-3 border-t border-terminal/5 pt-4">
          <IdentityRow icon={<MapPin className="h-4 w-4 text-terminal/60" />} text={user.location} />
          <IdentityRow icon={<Mail className="h-4 w-4 text-terminal/60" />} text={user.email} />
          <IdentityRow icon={<Calendar className="h-4 w-4 text-terminal/60" />} text={`Initialized: ${user.joined}`} />
        </div>

        <div className="flex gap-4 pt-4">
          {[Github, Twitter, Globe].map((Icon, index) => (
            <a
              key={index}
              href="#"
              className="rounded-lg border border-terminal/5 bg-surface-800 p-2 transition-all hover:border-terminal/20 hover:bg-terminal/10 hover:text-terminal"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}

function IdentityRow({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3 text-sm text-text-muted">
      {icon}
      <span className="font-mono text-xs">{text}</span>
    </div>
  );
}
