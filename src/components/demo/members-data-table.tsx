"use client";

import { useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Building2,
  ChevronRight,
  Filter,
  Search,
  SlidersHorizontal,
  Users,
  X,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

type MemberStatus = "Activ" | "În verificare" | "Invitat" | "Suspendat";
type MemberRole = "Prosumer" | "Consumator" | "Consumator public" | "Administrator";
type SortKey =
  | "name"
  | "building"
  | "role"
  | "allocation"
  | "consumption"
  | "allocatedEnergy"
  | "savings"
  | "status";

type Member = {
  id: string;
  name: string;
  building: string;
  role: MemberRole;
  allocation: number;
  consumption: number;
  allocatedEnergy: number;
  savings: number;
  status: MemberStatus;
  meterCode: string;
  joined: string;
  contact: string;
  notes: string;
};

const members: Member[] = [
  {
    id: "EL-001",
    name: "Asociația Green Aviației",
    building: "Str. Căpitan Alexandru Șerbănescu 21",
    role: "Administrator",
    allocation: 18.5,
    consumption: 1820,
    allocatedEnergy: 1798,
    savings: 1186,
    status: "Activ",
    meterCode: "RO-ENEL-AV-001",
    joined: "12 feb 2026",
    contact: "contact@greenaviatiei.ro",
    notes: "Coordonează comunicarea cu membrii și verificarea cotelor lunare.",
  },
  {
    id: "EL-002",
    name: "Bloc A7, Scara 2",
    building: "Bd. Aerogării 7A",
    role: "Consumator",
    allocation: 8.2,
    consumption: 1240,
    allocatedEnergy: 798,
    savings: 521,
    status: "Activ",
    meterCode: "RO-ENEL-AV-014",
    joined: "18 feb 2026",
    contact: "admin.a7@asociatie.ro",
    notes: "Consum predictibil, cu vârfuri seara și în weekend.",
  },
  {
    id: "EL-003",
    name: "Școala Gimnazială 19",
    building: "Aleea Băneasa 4",
    role: "Consumator public",
    allocation: 12.4,
    consumption: 2410,
    allocatedEnergy: 1206,
    savings: 802,
    status: "În verificare",
    meterCode: "RO-ENEL-AV-027",
    joined: "24 mar 2026",
    contact: "secretariat@scoala19.ro",
    notes: "Prioritate pentru consum diurn și raportare lunară către administrație.",
  },
  {
    id: "EL-004",
    name: "Hub Creativ Nord",
    building: "Str. Elena Caragiani 12",
    role: "Prosumer",
    allocation: 10.7,
    consumption: 1060,
    allocatedEnergy: 1041,
    savings: 689,
    status: "Activ",
    meterCode: "RO-ENEL-AV-031",
    joined: "4 mar 2026",
    contact: "office@hubnord.ro",
    notes: "Produce excedent în intervalul 11:00-15:00 în zilele însorite.",
  },
  {
    id: "EL-005",
    name: "Clinica Urbană Aviației",
    building: "Str. Nicolae Caramfil 32",
    role: "Consumator",
    allocation: 9.8,
    consumption: 1730,
    allocatedEnergy: 954,
    savings: 648,
    status: "Activ",
    meterCode: "RO-ENEL-AV-044",
    joined: "8 apr 2026",
    contact: "admin@clinicaurbana.ro",
    notes: "Consum stabil în timpul programului de lucru.",
  },
  {
    id: "EL-006",
    name: "Familia Ionescu",
    building: "Bloc B12, Ap. 24",
    role: "Consumator",
    allocation: 2.1,
    consumption: 420,
    allocatedEnergy: 204,
    savings: 136,
    status: "Invitat",
    meterCode: "RO-ENEL-AV-052",
    joined: "Invitație trimisă",
    contact: "ionescu.maria@email.ro",
    notes: "Așteaptă confirmarea participării în comunitate.",
  },
  {
    id: "EL-007",
    name: "Bloc B12",
    building: "Aleea Privighetorilor 12",
    role: "Consumator",
    allocation: 14,
    consumption: 2210,
    allocatedEnergy: 1361,
    savings: 915,
    status: "Activ",
    meterCode: "RO-ENEL-AV-063",
    joined: "19 apr 2026",
    contact: "presedinte@blocb12.ro",
    notes: "Cea mai mare alocare pentru consumatori rezidențiali.",
  },
  {
    id: "EL-008",
    name: "Punct Termic Aviației",
    building: "Str. Smaranda Brăescu 18",
    role: "Consumator public",
    allocation: 6.6,
    consumption: 980,
    allocatedEnergy: 642,
    savings: 431,
    status: "În verificare",
    meterCode: "RO-ENEL-AV-071",
    joined: "2 mai 2026",
    contact: "energie@sector1.ro",
    notes: "Necesită validare administrativă înainte de activare completă.",
  },
  {
    id: "EL-009",
    name: "Studio Foto Lumina",
    building: "Bd. Ficusului 9",
    role: "Prosumer",
    allocation: 5.3,
    consumption: 760,
    allocatedEnergy: 516,
    savings: 349,
    status: "Activ",
    meterCode: "RO-ENEL-AV-088",
    joined: "7 mai 2026",
    contact: "studio@lumina.ro",
    notes: "Prosumer mic, potrivit pentru echilibrarea cotelor de după-amiază.",
  },
  {
    id: "EL-010",
    name: "Apartamentele Nordului",
    building: "Str. Grațioasă 5",
    role: "Consumator",
    allocation: 7.4,
    consumption: 1320,
    allocatedEnergy: 720,
    savings: 489,
    status: "Activ",
    meterCode: "RO-ENEL-AV-092",
    joined: "10 mai 2026",
    contact: "admin@nordului.ro",
    notes: "Consum comunitar moderat, cu potențial bun pentru autoconsum.",
  },
  {
    id: "EL-011",
    name: "Cafeneaua Solară",
    building: "Piața Aviației 3",
    role: "Consumator",
    allocation: 3.9,
    consumption: 650,
    allocatedEnergy: 379,
    savings: 255,
    status: "Suspendat",
    meterCode: "RO-ENEL-AV-101",
    joined: "Suspendat temporar",
    contact: "office@cafeneasolară.ro",
    notes: "Documente comerciale incomplete pentru perioada curentă.",
  },
  {
    id: "EL-012",
    name: "Residence Aviației Vest",
    building: "Str. Apicultorilor 6",
    role: "Prosumer",
    allocation: 11.1,
    consumption: 1510,
    allocatedEnergy: 1080,
    savings: 728,
    status: "Activ",
    meterCode: "RO-ENEL-AV-115",
    joined: "14 mai 2026",
    contact: "energy@aviatieivest.ro",
    notes: "Prosumer rezidențial cu producție constantă în zilele lucrătoare.",
  },
];

const roles: Array<MemberRole | "Toate rolurile"> = [
  "Toate rolurile",
  "Administrator",
  "Prosumer",
  "Consumator",
  "Consumator public",
];

const statuses: Array<MemberStatus | "Toate statusurile"> = [
  "Toate statusurile",
  "Activ",
  "În verificare",
  "Invitat",
  "Suspendat",
];

const formatter = new Intl.NumberFormat("ro-RO");

function statusVariant(status: MemberStatus) {
  if (status === "Activ") return "success";
  if (status === "În verificare") return "warning";
  if (status === "Invitat") return "secondary";
  return "muted";
}

function roleBadgeClass(role: MemberRole) {
  if (role === "Prosumer") return "border-emerald-200 bg-emerald-50 text-emerald-700";
  if (role === "Administrator") return "border-navy/20 bg-navy text-white";
  if (role === "Consumator public") return "border-sky-200 bg-sky-50 text-sky-700";
  return "border-slate-200 bg-slate-50 text-slate-700";
}

function getSortValue(member: Member, key: SortKey) {
  if (key === "building") return member.building;
  if (key === "allocation") return member.allocation;
  if (key === "consumption") return member.consumption;
  if (key === "allocatedEnergy") return member.allocatedEnergy;
  if (key === "savings") return member.savings;
  return member[key];
}

export function MembersDataTable() {
  const [query, setQuery] = useState("");
  const [role, setRole] = useState<(typeof roles)[number]>("Toate rolurile");
  const [status, setStatus] = useState<(typeof statuses)[number]>("Toate statusurile");
  const [sortKey, setSortKey] = useState<SortKey>("allocation");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const filteredMembers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return members
      .filter((member) => {
        const matchesSearch =
          !normalizedQuery ||
          [member.name, member.building, member.role, member.status, member.meterCode]
            .join(" ")
            .toLowerCase()
            .includes(normalizedQuery);
        const matchesRole = role === "Toate rolurile" || member.role === role;
        const matchesStatus = status === "Toate statusurile" || member.status === status;
        return matchesSearch && matchesRole && matchesStatus;
      })
      .sort((a, b) => {
        const aValue = getSortValue(a, sortKey);
        const bValue = getSortValue(b, sortKey);

        if (typeof aValue === "number" && typeof bValue === "number") {
          return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
        }

        return sortDirection === "asc"
          ? String(aValue).localeCompare(String(bValue), "ro")
          : String(bValue).localeCompare(String(aValue), "ro");
      });
  }, [query, role, sortDirection, sortKey, status]);

  const totals = useMemo(
    () => ({
      active: members.filter((member) => member.status === "Activ").length,
      allocatedEnergy: members.reduce((total, member) => total + member.allocatedEnergy, 0),
      savings: members.reduce((total, member) => total + member.savings, 0),
    }),
    [],
  );

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
      return;
    }

    setSortKey(key);
    setSortDirection(key === "name" || key === "building" || key === "role" ? "asc" : "desc");
  };

  const sortIcon = (key: SortKey) => {
    if (sortKey !== key) return null;
    return sortDirection === "asc" ? <ArrowUp className="size-3" /> : <ArrowDown className="size-3" />;
  };

  const headerButton = (label: string, key: SortKey, align = "left") => (
    <button
      type="button"
      onClick={() => handleSort(key)}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm text-xs font-semibold uppercase text-muted-foreground transition-colors hover:text-foreground",
        align === "right" && "ml-auto",
      )}
    >
      {label}
      {sortIcon(key)}
    </button>
  );

  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-slate-200 bg-white shadow-sm">
          <CardContent className="flex items-center gap-4 p-5">
            <span className="flex size-11 items-center justify-center rounded-md bg-navy text-white">
              <Users className="size-5" />
            </span>
            <div>
              <p className="text-2xl font-semibold">{members.length}</p>
              <p className="text-sm text-muted-foreground">{totals.active} membri activi</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-200 bg-white shadow-sm">
          <CardContent className="flex items-center gap-4 p-5">
            <span className="flex size-11 items-center justify-center rounded-md bg-mint text-emerald-800">
              <Zap className="size-5" />
            </span>
            <div>
              <p className="text-2xl font-semibold">{formatter.format(totals.allocatedEnergy)} kWh</p>
              <p className="text-sm text-muted-foreground">energie alocată</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-200 bg-white shadow-sm">
          <CardContent className="flex items-center gap-4 p-5">
            <span className="flex size-11 items-center justify-center rounded-md bg-emerald-50 text-emerald-700">
              <Building2 className="size-5" />
            </span>
            <div>
              <p className="text-2xl font-semibold">{formatter.format(totals.savings)} RON</p>
              <p className="text-sm text-muted-foreground">economii estimate</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="overflow-hidden border-slate-200 shadow-sm">
        <CardHeader className="border-b bg-white">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <CardTitle>Registru membri</CardTitle>
              <p className="mt-2 text-sm text-muted-foreground">
                {filteredMembers.length} membri afișați din {members.length}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative min-w-0 sm:w-80">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Caută membru, clădire, cod POD..."
                  className="pl-9"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
                <select
                  value={role}
                  onChange={(event) => setRole(event.target.value as (typeof roles)[number])}
                  className="h-10 rounded-md border bg-white px-3 text-sm font-medium outline-none transition-colors focus:ring-2 focus:ring-ring"
                  aria-label="Filtru rol"
                >
                  {roles.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
                <select
                  value={status}
                  onChange={(event) => setStatus(event.target.value as (typeof statuses)[number])}
                  className="h-10 rounded-md border bg-white px-3 text-sm font-medium outline-none transition-colors focus:ring-2 focus:ring-ring"
                  aria-label="Filtru status"
                >
                  {statuses.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setRole("Toate rolurile");
                    setStatus("Toate statusurile");
                  }}
                >
                  <Filter /> Reset
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="hidden xl:block">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/80 hover:bg-slate-50/80">
                  <TableHead>{headerButton("Membru", "name")}</TableHead>
                  <TableHead>{headerButton("Clădire", "building")}</TableHead>
                  <TableHead>{headerButton("Rol", "role")}</TableHead>
                  <TableHead className="text-right">{headerButton("Alocare", "allocation", "right")}</TableHead>
                  <TableHead className="text-right">{headerButton("Consum", "consumption", "right")}</TableHead>
                  <TableHead className="text-right">{headerButton("Energie alocată", "allocatedEnergy", "right")}</TableHead>
                  <TableHead className="text-right">{headerButton("Economii", "savings", "right")}</TableHead>
                  <TableHead>{headerButton("Status", "status")}</TableHead>
                  <TableHead className="w-12" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.map((member) => (
                  <TableRow
                    key={member.id}
                    className="cursor-pointer bg-white hover:bg-slate-50"
                    onClick={() => setSelectedMember(member)}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-navy text-xs font-semibold text-white">
                          {member.name.slice(0, 2)}
                        </span>
                        <div>
                          <p className="font-semibold">{member.name}</p>
                          <p className="text-xs text-muted-foreground">{member.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-56 truncate text-muted-foreground">{member.building}</TableCell>
                    <TableCell>
                      <span className={cn("inline-flex rounded-md border px-2.5 py-1 text-xs font-semibold", roleBadgeClass(member.role))}>
                        {member.role}
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-semibold">{member.allocation.toFixed(1)}%</TableCell>
                    <TableCell className="text-right">{formatter.format(member.consumption)} kWh</TableCell>
                    <TableCell className="text-right font-medium">{formatter.format(member.allocatedEnergy)} kWh</TableCell>
                    <TableCell className="text-right font-semibold text-emerald-700">
                      {formatter.format(member.savings)} RON
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusVariant(member.status)}>{member.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <ChevronRight className="size-4 text-muted-foreground" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="grid gap-3 p-4 xl:hidden">
            {filteredMembers.map((member) => (
              <button
                key={member.id}
                type="button"
                onClick={() => setSelectedMember(member)}
                className="rounded-xl border bg-white p-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold">{member.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{member.building}</p>
                  </div>
                  <Badge variant={statusVariant(member.status)}>{member.status}</Badge>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">Rol</p>
                    <p className="font-medium">{member.role}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Alocare</p>
                    <p className="font-medium">{member.allocation.toFixed(1)}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Consum</p>
                    <p className="font-medium">{formatter.format(member.consumption)} kWh</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Economii</p>
                    <p className="font-medium text-emerald-700">{formatter.format(member.savings)} RON</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {filteredMembers.length === 0 && (
            <div className="flex min-h-56 flex-col items-center justify-center border-t px-6 text-center">
              <SlidersHorizontal className="size-9 text-muted-foreground" />
              <p className="mt-4 font-semibold">Nu există membri pentru filtrele selectate.</p>
              <p className="mt-2 text-sm text-muted-foreground">Schimbă căutarea sau resetează filtrele.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {selectedMember && (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            aria-label="Închide detalii membru"
            className="absolute inset-0 bg-navy/35 backdrop-blur-sm"
            onClick={() => setSelectedMember(null)}
          />
          <aside className="absolute bottom-0 right-0 top-0 flex w-full max-w-xl flex-col overflow-hidden bg-white shadow-2xl sm:rounded-l-xl">
            <div className="border-b px-6 py-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Badge variant={statusVariant(selectedMember.status)}>{selectedMember.status}</Badge>
                  <h2 className="mt-4 text-2xl font-semibold tracking-normal">{selectedMember.name}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{selectedMember.building}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setSelectedMember(null)} aria-label="Închide">
                  <X />
                </Button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  ["Alocare", `${selectedMember.allocation.toFixed(1)}%`],
                  ["Consum lunar", `${formatter.format(selectedMember.consumption)} kWh`],
                  ["Energie alocată", `${formatter.format(selectedMember.allocatedEnergy)} kWh`],
                  ["Economii estimate", `${formatter.format(selectedMember.savings)} RON`],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-lg border bg-slate-50 p-4">
                    <p className="text-xs font-medium uppercase text-muted-foreground">{label}</p>
                    <p className="mt-2 text-lg font-semibold">{value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-lg border">
                <div className="border-b px-4 py-3">
                  <h3 className="font-semibold">Profil membru</h3>
                </div>
                <div className="divide-y">
                  {[
                    ["Rol", selectedMember.role],
                    ["Cod contor", selectedMember.meterCode],
                    ["Contact", selectedMember.contact],
                    ["Înrolare", selectedMember.joined],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between gap-4 px-4 py-3 text-sm">
                      <span className="text-muted-foreground">{label}</span>
                      <span className="text-right font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-lg border bg-mint/50 p-4">
                <p className="text-sm font-semibold text-emerald-900">Note operaționale</p>
                <p className="mt-2 text-sm leading-6 text-emerald-900/75">{selectedMember.notes}</p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 border-t bg-slate-50 px-6 py-4">
              <Button variant="outline" onClick={() => setSelectedMember(null)}>
                Închide
              </Button>
              <Button variant="navy">Editează mock</Button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
