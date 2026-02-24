"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MapPin, Terminal, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { ReactNode } from "react";
import { Button } from "@/components/ui";
import type { SettingsUser } from "@/lib/settings";

const profileSchema = z.object({
  displayName: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email address"),
  location: z.string().optional(),
  bio: z.string().max(160, "Bio must be under 160 characters"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

type ProfileSettingsFormProps = {
  user: SettingsUser;
};

export function ProfileSettingsForm({ user }: ProfileSettingsFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: user.displayName,
      email: user.email,
      location: user.location,
      bio: user.bio,
    },
  });

  function onSubmit(data: ProfileFormData) {
    console.log("Updating profile settings", data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <InputField
            label="Display_Name"
            icon={<User className="h-3 w-3" />}
            error={errors.displayName?.message}
          >
            <input
              {...register("displayName")}
              className={`w-full rounded-lg border bg-surface-900 px-4 py-2 font-mono text-sm transition-all focus:outline-none ${
                errors.displayName
                  ? "border-error/50"
                  : "border-terminal/10 focus:border-terminal/40"
              }`}
            />
          </InputField>

          <InputField
            label="Email_Address"
            icon={<Mail className="h-3 w-3" />}
            error={errors.email?.message}
          >
            <input
              {...register("email")}
              className={`w-full rounded-lg border bg-surface-900 px-4 py-2 font-mono text-sm transition-all focus:outline-none ${
                errors.email
                  ? "border-error/50"
                  : "border-terminal/10 focus:border-terminal/40"
              }`}
            />
          </InputField>

          <InputField label="Location_Node" icon={<MapPin className="h-3 w-3" />}>
            <input
              {...register("location")}
              className="w-full rounded-lg border border-terminal/10 bg-surface-900 px-4 py-2 font-mono text-sm transition-all focus:border-terminal/40 focus:outline-none"
            />
          </InputField>
        </div>

        <InputField
          label="Biography_Buffer"
          icon={<Terminal className="h-3 w-3" />}
          error={errors.bio?.message}
        >
          <textarea
            {...register("bio")}
            className={`h-[155px] w-full resize-none rounded-lg border bg-surface-900 px-4 py-2 font-mono text-sm transition-all focus:outline-none ${
              errors.bio
                ? "border-error/50"
                : "border-terminal/10 focus:border-terminal/40"
            }`}
            placeholder="Tell us about your stack..."
          />
        </InputField>
      </div>

      <div className="flex justify-end border-t border-terminal/5 pt-4">
        <Button
          type="submit"
          disabled={!isDirty}
          className="bg-terminal px-8 font-mono font-bold text-surface-950 transition-all hover:bg-terminal-dim disabled:grayscale disabled:opacity-30"
        >
          $ sync --profile
        </Button>
      </div>
    </form>
  );
}

function InputField({
  label,
  icon,
  children,
  error,
}: {
  label: string;
  icon: ReactNode;
  children: ReactNode;
  error?: string;
}) {
  return (
    <div>
      <label className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-terminal/60">
        {icon}
        {label}
      </label>
      {children}
      {error ? (
        <p className="mt-1 font-mono text-[10px] text-error">{`> ERR: ${error}`}</p>
      ) : null}
    </div>
  );
}
