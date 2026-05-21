"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BarChart3,
  Bell,
  Building2,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  FileText,
  Gauge,
  Leaf,
  LineChart,
  Network,
  ShieldCheck,
  Sparkles,
  SunMedium,
  Users,
  Zap,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { allocationRows, energyCommunities, features, members, productionData } from "@/lib/data";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#solutie", label: "Soluție", id: "solutie" },
  { href: "#functionalitati", label: "Funcționalități", id: "functionalitati" },
  { href: "#video", label: "Video", id: "video" },
  { href: "#showcase", label: "Platformă", id: "showcase" },
  { href: "#preturi", label: "Prețuri", id: "preturi" },
  { href: "#faq", label: "FAQ", id: "faq" },
];

const socialProof = [
  { label: "Primării", icon: Building2 },
  { label: "Cooperative", icon: Network },
  { label: "Asociații", icon: ShieldCheck },
  { label: "Prosumatori", icon: SunMedium },
  { label: "IMM-uri", icon: Gauge },
];

const heroBadges = [
  { label: "membri activi", value: 48, suffix: "" },
  { label: "MWh distribuiți", value: 12.4, suffix: "" },
  { label: "RON economii", value: 6420, suffix: "" },
];

const comparison = [
  {
    eyebrow: "Înainte",
    title: "Tabele, emailuri și validări manuale",
    icon: FileText,
    items: ["Date energetice fragmentate", "Alocări greu de explicat", "Rapoarte refăcute lunar"],
  },
  {
    eyebrow: "Cu EnergiaLocală",
    title: "O singură vedere operațională",
    icon: Sparkles,
    items: ["Membri și statusuri clare", "Energie urmărită vizual", "Impact pregătit pentru prezentare"],
  },
];

const steps = [
  {
    title: "Definești comunitatea",
    text: "Configurezi membri, roluri și parametri de lucru într-un spațiu comun.",
    icon: Users,
  },
  {
    title: "Urmărești energia",
    text: "Monitorizezi producția, consumul și energia partajată cu grafice clare.",
    icon: LineChart,
  },
  {
    title: "Prezinți impactul",
    text: "Transformi economiile, alocările și CO2 evitat în rapoarte ușor de citit.",
    icon: Leaf,
  },
];

const dashboardTabs = ["Overview", "Membri", "Alocări", "Consum", "Rapoarte"];

const pricing = [
  {
    name: "Pilot comunitate",
    badge: "Validare",
    text: "Pentru workshop-uri, primii membri și discuții cu parteneri locali.",
    items: ["Dashboard demonstrativ", "Date mock realiste", "Rapoarte lunare preview"],
  },
  {
    name: "Comunitate activă",
    badge: "Recomandat",
    text: "Pentru administrarea unei comunități care trece din pilot în operare.",
    items: ["Alocări configurabile", "Fluxuri de membri", "Exporturi pentru raportare"],
    featured: true,
  },
  {
    name: "Partner",
    badge: "Portofolii",
    text: "Pentru consultanți, autorități și organizații care coordonează mai multe proiecte.",
    items: ["Multi-comunitate", "Branding dedicat", "Suport prioritar"],
  },
];

const faqs = [
  {
    question: "Este conectat la date reale?",
    answer: "Nu. Acest MVP folosește doar date mock pentru validarea experienței și a poveștii produsului.",
  },
  {
    question: "Poate fi folosit pentru prezentări către membri?",
    answer: "Da. Pagina și demo-ul sunt construite pentru conversații cu primării, prosumatori, asociații și IMM-uri.",
  },
  {
    question: "Include facturare sau plăți?",
    answer: "Nu. Nu există autentificare, plăți, billing, API-uri, baze de date sau integrări externe.",
  },
  {
    question: "Se poate extinde către integrări DSO?",
    answer: "Da, dar doar ca direcție viitoare. În acest moment, accentul este pe demo vizual și claritate operațională.",
  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function AnimatedSection({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <motion.section
      id={id}
      className={cn(id && "scroll-mt-24", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      variants={sectionVariants}
    >
      {children}
    </motion.section>
  );
}

function CountUp({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}) {
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 70, damping: 18 });
  const display = useTransform(spring, (latest) =>
    `${prefix}${latest.toLocaleString("ro-RO", {
      maximumFractionDigits: decimals,
      minimumFractionDigits: decimals,
    })}${suffix}`,
  );
  const [text, setText] = useState(prefix + "0" + suffix);

  useEffect(() => {
    motionValue.set(value);
    const unsubscribe = display.on("change", setText);
    return unsubscribe;
  }, [display, motionValue, value]);

  return <span>{text}</span>;
}

function MiniBars({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex h-28 items-end gap-2">
      {productionData.map((item, index) => (
        <div key={item.month} className="flex flex-1 items-end gap-1">
          <motion.div
            className={cn("w-full rounded-t-sm", dark ? "bg-primary" : "bg-emerald-400")}
            initial={{ height: 8 }}
            whileInView={{ height: `${item.productie / 150}%` }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.7 }}
          />
          <motion.div
            className={cn("w-full rounded-t-sm", dark ? "bg-white/65" : "bg-navy")}
            initial={{ height: 8 }}
            whileInView={{ height: `${item.consum / 190}%` }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 + 0.08, duration: 0.7 }}
          />
        </div>
      ))}
    </div>
  );
}

function StatBadge({
  value,
  label,
  suffix,
}: {
  value: number;
  label: string;
  suffix: string;
}) {
  const decimals = value % 1 === 0 ? 0 : 1;
  return (
    <motion.div
      className="rounded-lg border border-white/10 bg-white/8 px-4 py-3 backdrop-blur"
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
    >
      <p className="text-base font-semibold text-white">
        <CountUp value={value} decimals={decimals} suffix={suffix} />
      </p>
      <p className="mt-1 text-xs text-white/62">{label}</p>
    </motion.div>
  );
}

function HeroDashboardMockup() {
  return (
    <motion.div
      className="relative mx-auto mt-12 w-full max-w-[680px] lg:mt-0"
      initial={{ opacity: 0, x: 36 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute -inset-6 rounded-[2rem] bg-primary/15 blur-3xl" />
      <div className="relative overflow-hidden rounded-xl border border-white/14 bg-white text-navy shadow-2xl">
        <div className="flex h-12 items-center justify-between border-b bg-slate-50 px-4">
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-red-300" />
            <span className="size-3 rounded-full bg-amber-300" />
            <span className="size-3 rounded-full bg-primary" />
          </div>
          <div className="hidden rounded-md border bg-white px-3 py-1 text-xs text-slate-500 sm:block">
            Comunitatea Solară Aviației
          </div>
        </div>
        <div className="grid min-h-[430px] grid-cols-1 md:grid-cols-[156px_1fr]">
          <aside className="hidden border-r bg-navy p-4 text-white md:block">
            <Logo compact className="text-white" />
            <div className="mt-7 space-y-2">
              {["Dashboard", "Membri", "Alocare", "Rapoarte"].map((item, index) => (
                <div
                  key={item}
                  className={cn(
                    "rounded-md px-3 py-2 text-xs",
                    index === 0 ? "bg-white/12 text-white" : "text-white/54",
                  )}
                >
                  {item}
                </div>
              ))}
            </div>
          </aside>
          <div className="p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-medium text-slate-500">Overview</p>
                <h3 className="mt-1 text-lg font-semibold">Energie comunitate</h3>
              </div>
              <Badge variant="success">Activă</Badge>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                { value: "12.4 MWh", label: "Producție", icon: SunMedium },
                { value: "9.7 MWh", label: "Partajată", icon: Network },
                { value: "6.420 RON", label: "Economii", icon: Leaf },
              ].map(({ value, label, icon: Icon }) => (
                <div key={label} className="rounded-lg border bg-slate-50 p-3">
                  <Icon className="size-4 text-emerald-600" />
                  <p className="mt-3 text-lg font-semibold">{value}</p>
                  <p className="text-xs text-slate-500">{label}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
              <div className="rounded-lg border p-4">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-semibold">Producție vs consum</p>
                  <span className="text-xs text-slate-500">kWh</span>
                </div>
                <MiniBars />
                <div className="mt-3 flex justify-between text-[10px] text-slate-400">
                  {productionData.map((item) => (
                    <span key={item.month}>{item.month}</span>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <div className="rounded-lg border p-4">
                  <p className="text-sm font-semibold">Alocări</p>
                  <div className="mt-3 space-y-3">
                    {allocationRows.slice(0, 3).map((row) => (
                      <div key={row.recipient} className="space-y-1.5">
                        <div className="flex justify-between text-xs">
                          <span className="max-w-28 truncate">{row.recipient}</span>
                          <span className="font-semibold">{row.share}</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-slate-100">
                          <div className="h-full rounded-full bg-primary" style={{ width: row.share }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-lg border bg-mint/60 p-4">
                  <div className="flex items-start gap-3">
                    <Bell className="mt-0.5 size-4 text-emerald-700" />
                    <div>
                      <p className="text-sm font-semibold">Vârf solar estimat</p>
                      <p className="mt-1 text-xs leading-5 text-slate-600">Excedent local după ora 13:00.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function FeatureCard({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 250, damping: 18 }}
      className="group rounded-xl border bg-white p-6 shadow-sm transition-shadow hover:shadow-xl hover:shadow-slate-200/70"
    >
      <span className="flex size-11 items-center justify-center rounded-lg bg-mint text-emerald-800 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon className="size-5" />
      </span>
      <h3 className="mt-6 text-lg font-semibold tracking-normal">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
    </motion.div>
  );
}

function DashboardShowcase() {
  const [activeTab, setActiveTab] = useState("Overview");
  const tabCopy = useMemo(
    () => ({
      Overview: "Indicatori principali, notificări și status operațional.",
      Membri: "Membri activi, prosumeri, consumatori și invitații.",
      Alocări: "Cote lunare, surse și economii estimate.",
      Consum: "Evoluții pe lună și semnale de autoconsum.",
      Rapoarte: "Fișiere pregătite pentru administrație și comunitate.",
    }),
    [],
  );

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl shadow-navy/20">
      <div className="grid min-h-[660px] lg:grid-cols-[220px_1fr]">
        <aside className="hidden bg-navy p-5 text-white lg:block">
          <Logo className="text-white" />
          <div className="mt-8 space-y-1">
            {[
              { icon: Gauge, label: "Dashboard" },
              { icon: Users, label: "Membri" },
              { icon: BarChart3, label: "Alocare" },
              { icon: FileText, label: "Rapoarte" },
            ].map(({ icon: Icon, label }, index) => (
              <div
                key={label}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm",
                  index === 0 ? "bg-white/12 text-white" : "text-white/55",
                )}
              >
                <Icon className="size-4" />
                {label}
              </div>
            ))}
          </div>
          <div className="mt-10 rounded-xl border border-white/10 bg-white/8 p-4">
            <p className="text-xs text-white/52">Status comunitate</p>
            <p className="mt-2 text-sm font-semibold">Activă, 48 membri</p>
            <div className="mt-4 h-1.5 rounded-full bg-white/10">
              <div className="h-full w-[82%] rounded-full bg-primary" />
            </div>
          </div>
        </aside>
        <div className="bg-slate-50">
          <div className="flex flex-col gap-4 border-b bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase text-slate-500">EnergiaLocală OS</p>
              <h3 className="mt-1 text-xl font-semibold tracking-normal">Comunitatea Solară Aviației</h3>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">Mai 2026</Badge>
              <Badge variant="success">Live mock</Badge>
            </div>
          </div>
          <div className="border-b bg-white px-4 py-3">
            <div className="flex gap-2 overflow-x-auto">
              {dashboardTabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-semibold transition-colors",
                    activeTab === tab
                      ? "bg-navy text-white"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <div className="p-5 sm:p-6">
            <motion.p
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 text-sm text-muted-foreground"
            >
              {tabCopy[activeTab as keyof typeof tabCopy]}
            </motion.p>
            <div className="grid gap-4 md:grid-cols-4">
              {[
                { value: "12,450 kWh", label: "Producție lunară", icon: SunMedium },
                { value: "15,820 kWh", label: "Consum lunar", icon: Zap },
                { value: "9,730 kWh", label: "Energie partajată", icon: Network },
                { value: "6,420 RON", label: "Economii", icon: Leaf },
              ].map(({ value, label, icon: Icon }) => (
                <Card key={label} className="border-slate-200 shadow-none">
                  <CardContent className="p-4">
                    <Icon className="size-4 text-emerald-700" />
                    <p className="mt-4 text-xl font-semibold">{value}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-5 grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
              <Card className="shadow-none">
                <CardHeader className="flex-row items-center justify-between pb-2">
                  <CardTitle>Producție vs consum</CardTitle>
                  <Badge variant="outline">MWh</Badge>
                </CardHeader>
                <CardContent>
                  <div className="rounded-xl bg-slate-50 p-4">
                    <MiniBars />
                    <div className="mt-4 flex justify-between text-xs text-muted-foreground">
                      {productionData.map((item) => (
                        <span key={item.month}>{item.month}</span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-none">
                <CardHeader>
                  <CardTitle>Activitate recentă</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { title: "Alocare recalculată", text: "5 beneficiari actualizați" },
                    { title: "Raport lunar pregătit", text: "Mai 2026 poate fi revizuit" },
                    { title: "Invitații membri", text: "3 invitații în așteptare" },
                  ].map(({ title, text }) => (
                    <div key={title} className="flex gap-3">
                      <span className="mt-1 size-2 rounded-full bg-primary" />
                      <div>
                        <p className="text-sm font-semibold">{title}</p>
                        <p className="text-sm text-muted-foreground">{text}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
            <div className="mt-5 grid gap-5 xl:grid-cols-2">
              <Card className="shadow-none">
                <CardHeader>
                  <CardTitle>Alocări membri</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {allocationRows.slice(0, 4).map((row) => (
                    <div key={row.recipient} className="flex items-center justify-between gap-4 rounded-lg border bg-white px-3 py-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">{row.recipient}</p>
                        <p className="text-xs text-muted-foreground">{row.energy} distribuiți</p>
                      </div>
                      <Badge variant={row.status === "Confirmat" ? "success" : "warning"}>{row.status}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
              <Card className="shadow-none">
                <CardHeader>
                  <CardTitle>Status membri</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {members.slice(0, 4).map((member) => (
                    <div key={member.name} className="flex items-center justify-between gap-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-mint text-xs font-semibold text-emerald-800">
                          {member.name.slice(0, 2)}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold">{member.name}</p>
                          <p className="text-xs text-muted-foreground">{member.type}</p>
                        </div>
                      </div>
                      <span className="text-sm font-semibold">{member.allocation}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FAQItem({
  question,
  answer,
  open,
  onToggle,
}: {
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left transition-colors hover:bg-slate-50"
      >
        <span className="flex items-center gap-3 text-base font-semibold">
          <CircleHelp className="size-5 text-emerald-700" />
          {question}
        </span>
        <ChevronDown className={cn("size-5 shrink-0 text-muted-foreground transition-transform", open && "rotate-180")} />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.24 }}
        className="overflow-hidden"
      >
        <p className="px-14 pb-5 text-sm leading-6 text-muted-foreground">{answer}</p>
      </motion.div>
    </div>
  );
}

export function LandingPage() {
  const [activeSection, setActiveSection] = useState("solutie");
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    const updateActiveSection = () => {
      const anchorY = window.scrollY + 112;
      const sections = navLinks
        .map((link) => {
          const element = document.getElementById(link.id);
          return element ? { id: link.id, top: element.offsetTop } : null;
        })
        .filter((section): section is { id: string; top: number } => Boolean(section))
        .sort((a, b) => a.top - b.top);

      const current =
        sections.findLast((section) => section.top <= anchorY) ?? sections[0];

      if (current) {
        setActiveSection(current.id);
      }
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  return (
    <main className="bg-background text-foreground">
      <nav className="sticky top-0 z-50 border-b border-white/60 bg-white/82 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo />
          <div className="hidden items-center gap-1 rounded-lg border bg-white/70 p-1 text-sm font-medium text-muted-foreground shadow-sm md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setActiveSection(link.id)}
                className={cn(
                  "rounded-md px-3 py-1.5 transition-colors hover:bg-muted hover:text-foreground",
                  activeSection === link.id && "bg-navy text-white hover:bg-navy hover:text-white",
                )}
              >
                {link.label}
              </a>
            ))}
          </div>
          <Button asChild className="shadow-sm transition-transform hover:-translate-y-0.5">
            <Link href="/demo">
              Vezi demo <ArrowRight />
            </Link>
          </Button>
        </div>
      </nav>

      <section className="relative overflow-hidden bg-navy text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(18,214,107,0.18),transparent_30%),linear-gradient(90deg,rgba(7,20,38,1)_0%,rgba(7,20,38,0.94)_48%,rgba(7,20,38,0.82)_100%)]" />
        <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(#ffffff_1px,transparent_1px),linear-gradient(90deg,#ffffff_1px,transparent_1px)] [background-size:52px_52px]" />
        <div className="relative mx-auto grid min-h-[760px] max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            <Badge variant="default">SaaS românesc pentru energie locală</Badge>
            <h1 className="mt-6 text-5xl font-semibold leading-[1.02] tracking-normal sm:text-6xl lg:text-7xl">
              Administrează comunități energetice într-un singur dashboard.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/74">
              Platforma găzduiește mai multe comunități separate. Fiecare cont este
              asociat unei comunități, cu propriile date, membri, alocări și rapoarte.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="transition-transform hover:-translate-y-0.5">
                <Link href="/demo">
                  Vezi demo <ArrowRight />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/20 bg-white/8 text-white transition-transform hover:-translate-y-0.5 hover:bg-white/14 hover:text-white"
              >
                <a href="#showcase">Explorează platforma</a>
              </Button>
            </div>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {heroBadges.map((item) => (
                <StatBadge key={item.label} {...item} />
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {energyCommunities.map((item) => (
                <span
                  key={item.id}
                  className="rounded-md border border-white/10 bg-white/8 px-3 py-1.5 text-xs font-semibold text-white/72"
                >
                  {item.name}
                </span>
              ))}
            </div>
          </motion.div>
          <HeroDashboardMockup />
        </div>
      </section>

      <AnimatedSection className="border-b bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-emerald-700">Creat pentru comunități de energie locale</p>
              <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                O platformă comună pentru comunități separate, fiecare operată cu propriul set de membri și rapoarte.
              </p>
            </div>
            <div className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-5 lg:max-w-3xl">
              {socialProof.map((item) => (
                <div key={item.label} className="group rounded-xl border bg-white px-4 py-4 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-slate-300 hover:shadow-md">
                  <item.icon className="mx-auto size-5 text-slate-400 transition-colors group-hover:text-emerald-700" />
                  <p className="mt-3 text-sm font-semibold text-slate-600 grayscale">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection id="solutie" className="py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="navy">Claritate operațională</Badge>
            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-normal sm:text-5xl">
              Comunitățile de energie au nevoie de claritate înainte de complexitate.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Datele energetice, membrii și alocările sunt adesea împrăștiate în
              tabele, documente și procese manuale. EnergiaLocală le aduce într-un
              singur loc.
            </p>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {comparison.map((card, index) => (
              <motion.div
                key={card.eyebrow}
                whileHover={{ y: -5 }}
                className={cn(
                  "rounded-2xl border p-7 shadow-sm",
                  index === 1 ? "bg-navy text-white shadow-xl shadow-navy/15" : "bg-white",
                )}
              >
                <div className="flex items-center justify-between gap-4">
                  <Badge variant={index === 1 ? "default" : "secondary"}>{card.eyebrow}</Badge>
                  <span className={cn("flex size-11 items-center justify-center rounded-lg", index === 1 ? "bg-white/10 text-primary" : "bg-mint text-emerald-800")}>
                    <card.icon className="size-5" />
                  </span>
                </div>
                <h3 className="mt-6 text-2xl font-semibold tracking-normal">{card.title}</h3>
                <div className="mt-6 grid gap-3">
                  {card.items.map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className={cn("size-4", index === 1 ? "text-primary" : "text-emerald-700")} />
                      <span className={index === 1 ? "text-white/76" : "text-muted-foreground"}>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection id="functionalitati" className="bg-white py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <Badge variant="navy">Funcționalități</Badge>
              <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-normal sm:text-5xl">
                O platformă demo care arată ca un produs real.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-muted-foreground">
              Fiecare modul este construit pentru prezentări, decizii și validare rapidă cu stakeholderi locali.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary">Cum funcționează</Badge>
            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-normal sm:text-5xl">
              De la comunitate la impact, fără zgomot operațional.
            </h2>
          </div>
          <div className="relative mt-14 grid gap-5 lg:grid-cols-3">
            <div className="absolute left-1/2 top-12 hidden h-px w-[66%] -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/60 to-transparent lg:block" />
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative rounded-2xl border bg-white p-7 shadow-sm"
              >
                <span className="flex size-14 items-center justify-center rounded-xl bg-navy text-white shadow-lg shadow-navy/15">
                  <step.icon className="size-6" />
                </span>
                <span className="mt-6 inline-flex rounded-md bg-mint px-2.5 py-1 text-xs font-semibold text-emerald-800">
                  Pasul {index + 1}
                </span>
                <h3 className="mt-4 text-xl font-semibold tracking-normal">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection id="video" className="bg-white py-24 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="navy">Video prezentare</Badge>
            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-normal sm:text-5xl">
              Vezi platforma în acțiune.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Un scurt walkthrough al platformei EnergiaLocală — de la dashboard la alocări și rapoarte.
            </p>
          </div>
          <motion.div
            className="relative mt-12 overflow-hidden rounded-2xl border border-slate-200 shadow-2xl shadow-slate-200/60"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute inset-0 -z-10 rounded-2xl bg-primary/8 blur-3xl" />
            <video
              className="w-full rounded-2xl"
              controls
              preload="metadata"
              poster=""
            >
              <source src="/prezentare.mp4" type="video/mp4" />
              Browser-ul tău nu suportă redarea video.
            </video>
          </motion.div>
        </div>
      </AnimatedSection>

      <AnimatedSection id="showcase" className="overflow-hidden bg-navy py-24 text-white sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <Badge variant="default">Dashboard showcase</Badge>
              <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-normal sm:text-5xl">
                Un spațiu operațional care inspiră încredere de la prima privire.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-white/64">
              Sidebar, topbar, KPI-uri, grafice, alocări, statusuri și notificări într-un mockup SaaS complet.
            </p>
          </div>
          <DashboardShowcase />
        </div>
      </AnimatedSection>

      <AnimatedSection id="preturi" className="py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary">Prețuri</Badge>
            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-normal sm:text-5xl">
              Pachete pentru pilot, operare și parteneriate.
            </h2>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {pricing.map((plan) => (
              <motion.div
                key={plan.name}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
              >
                <Card className={cn("h-full overflow-hidden shadow-sm", plan.featured && "border-primary bg-gradient-to-b from-white to-mint/45 shadow-xl shadow-emerald-100")}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{plan.name}</CardTitle>
                      <Badge variant={plan.featured ? "default" : "secondary"}>{plan.badge}</Badge>
                    </div>
                    <p className="pt-4 text-sm leading-6 text-muted-foreground">{plan.text}</p>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant={plan.featured ? "default" : "outline"} className="mb-7 w-full">
                      <Link href="/demo">Vezi demo</Link>
                    </Button>
                    <ul className="space-y-3">
                      {plan.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="size-4 text-emerald-700" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection id="faq" className="bg-white py-24 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="navy">FAQ</Badge>
            <h2 className="mt-5 text-4xl font-semibold tracking-normal">Întrebări frecvente</h2>
          </div>
          <div className="mt-10 overflow-hidden rounded-2xl border bg-white shadow-sm">
            {faqs.map((faq, index) => (
              <FAQItem
                key={faq.question}
                {...faq}
                open={openFaq === index}
                onToggle={() => setOpenFaq(openFaq === index ? -1 : index)}
              />
            ))}
          </div>
        </div>
      </AnimatedSection>

      <section className="bg-white px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-navy px-6 py-14 text-white shadow-2xl shadow-navy/20 sm:px-10 lg:px-14">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-semibold tracking-normal sm:text-5xl">
                Pregătiți pentru o demonstrație?
              </h2>
              <p className="mt-4 text-lg leading-8 text-white/68">
                Intră în demo și explorează comunitatea mock din Aviației.
              </p>
            </div>
            <Button asChild size="lg" className="shrink-0 transition-transform hover:-translate-y-0.5">
              <Link href="/demo">
                Vezi demo <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t bg-white py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <Logo />
              <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
                Demo MVP pentru comunități energetice din România. Doar frontend, doar date mock.
              </p>
            </div>
            <div className="flex gap-3">
              {["in", "x", "yt"].map((item) => (
                <span key={item} className="flex size-9 items-center justify-center rounded-md border text-xs font-semibold text-muted-foreground">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3 border-t pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <span>EnergiaLocală · MVP demonstrativ</span>
            <div className="flex flex-wrap gap-4">
              <span>Fără autentificare</span>
              <span>Fără API-uri</span>
              <span>Fără date reale</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
