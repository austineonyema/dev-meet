import type { ProfileUser } from "@/lib/profile";
import { ProfileContributionCard } from "./ProfileContributionCard";
import { ProfileHero } from "./ProfileHero";
import { ProfileIdentityCard } from "./ProfileIdentityCard";
import { ProfileNetworkStatsCard } from "./ProfileNetworkStatsCard";
import { ProfileTechStackCard } from "./ProfileTechStackCard";

type ProfilePageShellProps = {
  user: ProfileUser;
  contributionData: number[][];
};

export function ProfilePageShell({
  user,
  contributionData,
}: ProfilePageShellProps) {
  return (
    <div className="mx-auto max-w-5xl space-y-10 px-4 pb-16 pt-10 sm:px-6 lg:px-8">
      <ProfileHero user={user} />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="space-y-8">
          <ProfileIdentityCard user={user} />
          <ProfileNetworkStatsCard user={user} />
        </div>

        <div className="space-y-8 lg:col-span-2">
          <ProfileTechStackCard user={user} />
          <ProfileContributionCard contributionData={contributionData} />
        </div>
      </div>
    </div>
  );
}
