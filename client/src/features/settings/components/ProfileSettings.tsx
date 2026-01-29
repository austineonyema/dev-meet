import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User, Mail, MapPin, Terminal } from "lucide-react";
import { Button } from "../../../components/ui";
import { mockUser } from "../../../data/user";

const profileSchema = z.object({
  displayName: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email address"),
  location: z.string().optional(),
  bio: z.string().max(160, "Bio must be under 160 characters"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export function ProfileSettings() {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: mockUser.name,
      email: mockUser.email,
      location: mockUser.location,
      bio: mockUser.bio,
    },
  });

  const onSubmit = (data: ProfileFormData) => {
    console.log("Updating profile:", data);
    // TODO: implement optimistic update
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="text-[10px] font-mono text-terminal/60 uppercase tracking-widest mb-2 flex items-center gap-2">
              <User className="w-3 h-3" /> Display_Name
            </label>
            <input
              {...register("displayName")}
              className={`w-full bg-surface-900 border ${errors.displayName ? "border-error/50" : "border-terminal/10"} rounded-lg px-4 py-2 text-sm font-mono focus:outline-none focus:border-terminal/40 transition-all`}
            />
            {errors.displayName && (
              <p className="text-[10px] text-error font-mono mt-1">
                {`> ERR: ${errors.displayName.message}`}
              </p>
            )}
          </div>

          <div>
            <label className="text-[10px] font-mono text-terminal/60 uppercase tracking-widest mb-2 flex items-center gap-2">
              <Mail className="w-3 h-3" /> Email_Address
            </label>
            <input
              {...register("email")}
              className={`w-full bg-surface-900 border ${errors.email ? "border-error/50" : "border-terminal/10"} rounded-lg px-4 py-2 text-sm font-mono focus:outline-none focus:border-terminal/40 transition-all`}
            />
            {errors.email && (
              <p className="text-[10px] text-error font-mono mt-1">
                {`> ERR: ${errors.email.message}`}
              </p>
            )}
          </div>

          <div>
            <label className="text-[10px] font-mono text-terminal/60 uppercase tracking-widest mb-2 flex items-center gap-2">
              <MapPin className="w-3 h-3" /> Location_Node
            </label>
            <input
              {...register("location")}
              className="w-full bg-surface-900 border border-terminal/10 rounded-lg px-4 py-2 text-sm font-mono focus:outline-none focus:border-terminal/40 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] font-mono text-terminal/60 uppercase tracking-widest mb-2 flex items-center gap-2">
            <Terminal className="w-3 h-3" /> Biography_Buffer
          </label>
          <textarea
            {...register("bio")}
            className={`w-full bg-surface-900 border ${errors.bio ? "border-error/50" : "border-terminal/10"} rounded-lg px-4 py-2 text-sm font-mono focus:outline-none focus:border-terminal/40 transition-all h-[155px] resize-none`}
            placeholder="Tell us about your stack..."
          />
          {errors.bio && (
            <p className="text-[10px] text-error font-mono mt-1">
              {`> ERR: ${errors.bio.message}`}
            </p>
          )}
        </div>
      </div>

      <div className="pt-4 border-t border-terminal/5 flex justify-end">
        <Button
          type="submit"
          disabled={!isDirty}
          className="bg-terminal hover:bg-terminal-dim text-surface-950 font-bold font-mono px-8 disabled:opacity-30 disabled:grayscale transition-all"
        >
          $ sync --profile
        </Button>
      </div>
    </form>
  );
}
