"use client";

import { Activity, Building2, FileText, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDemoProfile } from "@/components/demo/demo-profile-context";
import { energyCommunities, platformOverview } from "@/lib/data";
import { cn } from "@/lib/utils";

export function PlatformAdminOverview() {
  const { activeProfile, selectedCommunity, setInspectedCommunityId } = useDemoProfile();

  if (activeProfile.role !== "Platform Admin") {
    return null;
  }

  return (
    <>
      <div className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card className="bg-navy text-white">
          <CardContent className="flex items-center gap-4 p-5">
            <span className="flex size-11 items-center justify-center rounded-md bg-white/10">
              <Building2 className="size-5 text-primary" />
            </span>
            <div>
              <p className="text-2xl font-semibold">{platformOverview.communities}</p>
              <p className="text-sm text-white/62">comunități în platformă</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <span className="flex size-11 items-center justify-center rounded-md bg-mint text-emerald-800">
              <Users className="size-5" />
            </span>
            <div>
              <p className="text-2xl font-semibold">{platformOverview.members}</p>
              <p className="text-sm text-muted-foreground">membri în toate comunitățile</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <span className="flex size-11 items-center justify-center rounded-md bg-slate-100 text-navy">
              <FileText className="size-5" />
            </span>
            <div>
              <p className="text-2xl font-semibold">{platformOverview.reports}</p>
              <p className="text-sm text-muted-foreground">rapoarte disponibile</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <span className="flex size-11 items-center justify-center rounded-md bg-amber-50 text-amber-700">
              <Activity className="size-5" />
            </span>
            <div>
              <p className="text-2xl font-semibold">{platformOverview.openTasks}</p>
              <p className="text-sm text-muted-foreground">acțiuni operaționale</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6 overflow-hidden">
        <CardHeader className="border-b bg-white">
          <CardTitle>Comunități găzduite de platformă</CardTitle>
          <p className="text-sm text-muted-foreground">
            Alege comunitatea pe care vrei să o inspectezi în dashboard.
          </p>
        </CardHeader>
        <CardContent className="grid gap-4 p-5 xl:grid-cols-3">
          {energyCommunities.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setInspectedCommunityId(item.id)}
              className={cn(
                "rounded-lg border bg-slate-50 p-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-md",
                selectedCommunity.id === item.id && "border-primary bg-mint/45 shadow-sm",
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.location}</p>
                </div>
                <Badge variant={item.status === "Activă" ? "success" : item.status === "Pilot" ? "secondary" : "warning"}>
                  {item.status}
                </Badge>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
                <div>
                  <p className="font-semibold">{item.members}</p>
                  <p className="text-xs text-muted-foreground">membri</p>
                </div>
                <div>
                  <p className="font-semibold">{item.sharedEnergy}</p>
                  <p className="text-xs text-muted-foreground">partajat</p>
                </div>
                <div>
                  <p className="font-semibold">{item.reports}</p>
                  <p className="text-xs text-muted-foreground">rapoarte</p>
                </div>
              </div>
              <div className="mt-4 border-t pt-3 text-xs font-semibold text-emerald-700">
                {selectedCommunity.id === item.id ? "Inspectată acum" : "Inspectează comunitatea"}
              </div>
            </button>
          ))}
        </CardContent>
      </Card>
    </>
  );
}
