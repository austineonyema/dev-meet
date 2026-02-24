"use client";

import type { AuthUser } from "@/lib/api";
import { useDashboardSession } from "@/components/layout";
import { ProfilePageShell } from "@/components/profile";
import { contributionData, mockProfileUser, type ProfileUser } from "@/lib/profile";

function mapAuthUserToProfileUser(user: AuthUser): ProfileUser {
  const fallbackName = mockProfileUser.name;
  const normalizedName = user.name?.trim() || fallbackName;
  const username = (user.email.split("@")[0] || mockProfileUser.username).replace(/\s+/g, "_");

  return {
    ...mockProfileUser,
    id: user.id,
    email: user.email,
    name: normalizedName,
    username,
  };
}

export default function ProfilePage() {
  const { user } = useDashboardSession();

  const profileUser = mapAuthUserToProfileUser(user);

  return (
    <div className="text-text-primary">
      <ProfilePageShell user={profileUser} contributionData={contributionData} />
    </div>
  );
}
