"use client";

import { Badge } from "@/components/ui/badge";
import { useDemoProfile } from "@/components/demo/demo-profile-context";

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  const { activeProfile, selectedCommunity } = useDemoProfile();

  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge variant="navy">{selectedCommunity.name}</Badge>
          <Badge variant="secondary">{activeProfile.role}</Badge>
          <Badge variant="secondary">Mock data</Badge>
        </div>
        <h1 className="text-2xl font-semibold tracking-normal sm:text-3xl">{title}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </div>
      {action}
    </div>
  );
}
