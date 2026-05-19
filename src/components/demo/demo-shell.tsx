"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  CheckCircle2,
  ChevronDown,
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
import { energyCommunities, navItems, testProfiles } from "@/lib/data";
import { cn } from "@/lib/utils";

export function DemoShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [accountOpen, setAccountOpen] = useState(false);
  const [profileId, setProfileId] = useState("community-admin");
  const activeProfile =
    testProfiles.find((profile) => profile.id === profileId) ?? testProfiles[1];
  const selectedCommunity =
    energyCommunities.find((item) => item.id === activeProfile.communityId) ?? energyCommunities[0];

  return (
    <DemoProfileContext.Provider value={{ activeProfile, selectedCommunity, setProfileId }}>
      <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r bg-white lg:block">
        <div className="flex h-full flex-col">
          <div className="border-b px-6 py-5">
            <Logo />
            <p className="mt-3 text-sm leading-5 text-muted-foreground">
              Contul curent este asociat unei singure comunități energetice.
            </p>

            <div className="mt-5 rounded-lg border bg-slate-50 p-3">
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="text-xs font-semibold uppercase text-muted-foreground">
                  Comunitatea contului
                </span>
                <CheckCircle2 className="size-4 text-emerald-700" />
              </div>
              <div className="rounded-md border bg-white px-3 py-2.5">
                <p className="truncate text-sm font-semibold">{selectedCommunity.name}</p>
                <p className="mt-1 truncate text-xs text-muted-foreground">
                  {selectedCommunity.location}
                </p>
              </div>
              <div className="mt-3 flex items-center justify-between gap-3">
                <span className="text-xs text-muted-foreground">Rol în comunitate</span>
                <Badge variant={roleVariant(activeProfile.role)}>
                  {activeProfile.role}
                </Badge>
              </div>
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

          <div className="m-4 rounded-lg bg-navy p-4 text-white">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold">{selectedCommunity.name}</p>
                <p className="mt-1 text-xs text-white/58">{selectedCommunity.lastSync}</p>
              </div>
              <Badge variant="default">{selectedCommunity.status}</Badge>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-white/72">
              <div>
                <p className="text-white">{selectedCommunity.members}</p>
                <p className="text-xs">membri</p>
              </div>
              <div>
                <p className="text-white">{selectedCommunity.reports}</p>
                <p className="text-xs">rapoarte</p>
              </div>
            </div>
          </div>
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
              <div className="h-10 max-w-[360px] rounded-md border bg-background px-3 py-2">
                <p className="truncate text-sm font-semibold leading-5">{selectedCommunity.name}</p>
              </div>
              <Badge variant={roleVariant(activeProfile.role)}>
                <ShieldCheck className="mr-1 size-3" />
                {activeProfile.role}
              </Badge>
            </div>

            <div className="ml-auto flex items-center gap-3">
              <div className="hidden h-10 min-w-72 items-center gap-2 rounded-md border bg-background px-3 text-sm text-muted-foreground md:flex">
                <Search className="size-4" />
                Caută membri, rapoarte, alocări
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
                    EL
                  </span>
                  <span className="hidden sm:inline">{activeProfile.name}</span>
                  <ChevronDown className="size-4 text-muted-foreground" />
                </button>

                {accountOpen && (
                  <div className="absolute right-0 mt-2 w-72 overflow-hidden rounded-lg border bg-white shadow-xl">
                    <div className="border-b p-4">
                      <div className="flex items-center gap-3">
                        <span className="flex size-10 items-center justify-center rounded-md bg-navy text-sm font-semibold text-white">
                          EL
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
                        { label: "Comunitatea mea", icon: CheckCircle2 },
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
