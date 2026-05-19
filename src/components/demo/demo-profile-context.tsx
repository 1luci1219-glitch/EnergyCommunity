"use client";

import { createContext, useContext } from "react";
import { energyCommunities, testProfiles } from "@/lib/data";

type TestProfile = (typeof testProfiles)[number];
type EnergyCommunity = (typeof energyCommunities)[number];

type DemoProfileContextValue = {
  activeProfile: TestProfile;
  selectedCommunity: EnergyCommunity;
  setProfileId: (profileId: string) => void;
  setInspectedCommunityId: (communityId: string) => void;
};

export function roleVariant(role: string) {
  if (role === "Platform Admin") return "default";
  if (role === "Community Admin") return "navy";
  if (role === "Operator") return "secondary";
  return "muted";
}

export const DemoProfileContext = createContext<DemoProfileContextValue | null>(null);

export function useDemoProfile() {
  const context = useContext(DemoProfileContext);

  if (!context) {
    throw new Error("useDemoProfile must be used inside DemoProfileContext.Provider");
  }

  return context;
}
