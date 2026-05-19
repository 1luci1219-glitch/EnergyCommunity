"use client";

import { Activity, Building2, FileText, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDemoProfile } from "@/components/demo/demo-profile-context";
import { energyCommunities, platformOverview } from "@/lib/data";

export function PlatformAdminOverview() {
  const { activeProfile } = useDemoProfile();

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
            Vizibil doar pentru profilul Platform Admin. Community Admin și Member nu văd aceste date.
          </p>
        </CardHeader>
        <CardContent className="grid gap-4 p-5 xl:grid-cols-3">
          {energyCommunities.map((item) => (
            <div key={item.id} className="rounded-lg border bg-slate-50 p-4">
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
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
}
