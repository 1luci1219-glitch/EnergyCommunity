"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  CheckCircle2,
  ChevronDown,
  FileText,
  Menu,
  Search,
  Settings,
  ShieldCheck,
  UserCircle2,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { DemoProfileContext, roleVariant } from "@/components/demo/demo-profile-context";
import {
  allocationRows,
  energyCommunities,
  members,
  navItems,
  reports,
  testProfiles,
} from "@/lib/data";
import { cn } from "@/lib/utils";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

type SearchResult = {
  title: string;
  meta: string;
  type: string;
  href: string;
  communityId?: string;
};

export function DemoShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [accountOpen, setAccountOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [profileId, setProfileId] = useState("community-admin");
  const [inspectedCommunityId, setInspectedCommunityId] = useState(energyCommunities[0].id);
  const activeProfile =
    testProfiles.find((profile) => profile.id === profileId) ?? testProfiles[1];
  const communityId =
    activeProfile.role === "Platform Admin"
      ? inspectedCommunityId
      : activeProfile.communityId;
  const selectedCommunity =
    energyCommunities.find((item) => item.id === communityId) ?? energyCommunities[0];
  const isPlatformAdmin = activeProfile.role === "Platform Admin";
  const initials = getInitials(activeProfile.name);
  const normalizedSearch = searchQuery.trim().toLowerCase();
  const searchResults: SearchResult[] = normalizedSearch
    ? [
        ...(isPlatformAdmin
          ? energyCommunities.map((item) => ({
              title: item.name,
              meta: `${item.location} · ${item.members} membri`,
              type: "Comunitate",
              href: "/demo",
              communityId: item.id,
            }))
          : []),
        ...members.map((item) => ({
          title: item.name,
          meta: `${selectedCommunity.name} · ${item.type}`,
          type: "Membru",
          href: "/demo/members",
        })),
        ...allocationRows.map((item) => ({
          title: item.recipient,
          meta: `${selectedCommunity.name} · ${item.energy} · ${item.status}`,
          type: "Alocare",
          href: "/demo/allocation",
        })),
        ...reports.map((item) => ({
          title: item.title,
          meta: `${selectedCommunity.name} · ${item.date}`,
          type: "Raport",
          href: "/demo/reports",
        })),
      ]
        .filter((item) =>
          [item.title, item.meta, item.type].join(" ").toLowerCase().includes(normalizedSearch),
        )
        .slice(0, 7)
    : [];

  return (
    <DemoProfileContext.Provider
      value={{ activeProfile, selectedCommunity, setProfileId, setInspectedCommunityId }}
    >
      <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r bg-white lg:block">
        <div className="flex h-full flex-col">
          <div className="border-b px-6 py-5">
            <Logo />
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Badge variant={roleVariant(activeProfile.role)}>{activeProfile.role}</Badge>
              {!isPlatformAdmin && <Badge variant="outline">1 comunitate</Badge>}
            </div>
          </div>

          <nav className="flex-1 space-y-1 p-4">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-navy text-white"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <item.icon className="size-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b bg-white/90 backdrop-blur">
          <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
            <Button variant="outline" size="icon" className="lg:hidden" aria-label="Meniu">
              <Menu />
            </Button>
            <div className="lg:hidden">
              <Logo compact />
            </div>

            <div className="hidden min-w-0 items-center gap-3 lg:flex">
              {isPlatformAdmin ? (
                <select
                  value={selectedCommunity.id}
                  onChange={(event) => setInspectedCommunityId(event.target.value)}
                  className="h-10 max-w-[360px] rounded-md border bg-background px-3 text-sm font-semibold outline-none transition-colors focus:ring-2 focus:ring-ring"
                  aria-label="Schimbă comunitatea inspectată"
                >
                  {energyCommunities.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="h-10 max-w-[360px] rounded-md border bg-background px-3 py-2">
                  <p className="truncate text-sm font-semibold leading-5">{selectedCommunity.name}</p>
                </div>
              )}
              <Badge variant={roleVariant(activeProfile.role)}>
                <ShieldCheck className="mr-1 size-3" />
                {activeProfile.role}
              </Badge>
            </div>

            <div className="ml-auto flex items-center gap-3">
              <div className="relative hidden md:block">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder={
                    isPlatformAdmin
                      ? "Caută în toate comunitățile"
                      : "Caută în comunitatea ta"
                  }
                  className="h-10 w-96 rounded-md border bg-background pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
                />
                {searchQuery && (
                  <div className="absolute right-0 top-12 z-50 w-[440px] overflow-hidden rounded-lg border bg-white shadow-xl">
                    <div className="border-b px-4 py-3">
                      <p className="text-xs font-semibold uppercase text-muted-foreground">
                        {isPlatformAdmin ? "Rezultate platformă" : selectedCommunity.name}
                      </p>
                    </div>
                    <div className="max-h-96 overflow-y-auto p-2">
                      {searchResults.length > 0 ? (
                        searchResults.map((item) => (
                          <Link
                            key={`${item.type}-${item.title}`}
                            href={item.href}
                            onClick={() => {
                              if (item.communityId) {
                                setInspectedCommunityId(item.communityId);
                              }
                              setSearchQuery("");
                            }}
                            className="flex items-start gap-3 rounded-md px-3 py-2.5 transition-colors hover:bg-muted"
                          >
                            <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-mint text-emerald-800">
                              {item.type === "Raport" ? (
                                <FileText className="size-4" />
                              ) : (
                                <Search className="size-4" />
                              )}
                            </span>
                            <span className="min-w-0">
                              <span className="block truncate text-sm font-semibold">
                                {item.title}
                              </span>
                              <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                                {item.type} · {item.meta}
                              </span>
                            </span>
                          </Link>
                        ))
                      ) : (
                        <div className="px-3 py-8 text-center">
                          <p className="text-sm font-semibold">Niciun rezultat</p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            Încearcă nume membru, raport, alocare sau comunitate.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <Button variant="outline" size="icon" aria-label="Notificări">
                <Bell />
              </Button>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setAccountOpen((value) => !value)}
                  className="flex h-10 items-center gap-2 rounded-md border bg-white px-2.5 text-sm font-semibold transition-colors hover:bg-muted"
                  aria-label="Meniu cont"
                >
                  <span className="flex size-7 items-center justify-center rounded-md bg-navy text-xs text-white">
                    {initials}
                  </span>
                  <span className="hidden sm:inline">{activeProfile.name}</span>
                  <ChevronDown className="size-4 text-muted-foreground" />
                </button>

                {accountOpen && (
                  <div className="absolute right-0 mt-2 w-72 overflow-hidden rounded-lg border bg-white shadow-xl">
                    <div className="border-b p-4">
                      <div className="flex items-center gap-3">
                        <span className="flex size-10 items-center justify-center rounded-md bg-navy text-sm font-semibold text-white">
                          {initials}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold">{activeProfile.name}</p>
                          <p className="truncate text-xs text-muted-foreground">{activeProfile.email}</p>
                        </div>
                      </div>
                      <Badge className="mt-3" variant={roleVariant(activeProfile.role)}>
                        {activeProfile.role}
                      </Badge>
                    </div>
                    <div className="border-b p-2">
                      <p className="px-3 py-2 text-xs font-semibold uppercase text-muted-foreground">
                        Profiluri de test
                      </p>
                      {testProfiles.map((profile) => (
                        <button
                          key={profile.id}
                          type="button"
                          onClick={() => setProfileId(profile.id)}
                          className={cn(
                            "flex w-full items-start gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors",
                            activeProfile.id === profile.id
                              ? "bg-navy text-white"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground",
                          )}
                        >
                          <span
                            className={cn(
                              "mt-1 size-2 rounded-full",
                              activeProfile.id === profile.id ? "bg-primary" : "bg-slate-300",
                            )}
                          />
                          <span>
                            <span className="block font-semibold">{profile.label}</span>
                            <span
                              className={cn(
                                "mt-0.5 block text-xs leading-5",
                                activeProfile.id === profile.id ? "text-white/65" : "text-muted-foreground",
                              )}
                            >
                              {profile.role}
                            </span>
                          </span>
                        </button>
                      ))}
                    </div>
                    <div className="p-2">
                      {[
                        {
                          label: isPlatformAdmin ? "Comunități platformă" : "Comunitatea mea",
                          icon: CheckCircle2,
                        },
                        { label: "Setări cont", icon: Settings },
                        { label: "Profil utilizator", icon: UserCircle2 },
                      ].map((item) => (
                        <button
                          key={item.label}
                          type="button"
                          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        >
                          <item.icon className="size-4" />
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
        <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
    </DemoProfileContext.Provider>
  );
}
