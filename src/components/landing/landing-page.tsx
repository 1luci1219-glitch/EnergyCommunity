"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  FileText,
  Leaf,
  LineChart,
  Settings2,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { features } from "@/lib/data";
import { cn } from "@/lib/utils";

/* ─── Constante ─────────────────────────────────────────────────────── */

const navLinks = [
  { href: "#solutie",         label: "Soluție",         id: "solutie" },
  { href: "#functionalitati", label: "Funcționalități", id: "functionalitati" },
  { href: "#preturi",         label: "Prețuri",         id: "preturi" },
  { href: "#faq",             label: "FAQ",             id: "faq" },
];

const capabilities = [
  {
    icon: Users,
    title: "Gestionare membri",
    text: "Roluri, statusuri și invitații centralizate.",
  },
  {
    icon: BarChart3,
    title: "Alocare energie",
    text: "Cote configurabile, surse și distribuție vizuală.",
  },
  {
    icon: FileText,
    title: "Rapoarte instant",
    text: "Sinteze lunare pregătite pentru administrație.",
  },
  {
    icon: Leaf,
    title: "Impact CO₂",
    text: "Economii și emisii evitate măsurabile.",
  },
];

const comparison = [
  {
    eyebrow: "Înainte",
    title: "Tabele, emailuri și validări manuale",
    icon: FileText,
    items: [
      "Date energetice fragmentate",
      "Alocări greu de explicat membrilor",
      "Rapoarte refăcute lunar de la zero",
    ],
  },
  {
    eyebrow: "Cu CER Bridge",
    title: "O singură vedere operațională",
    icon: Sparkles,
    items: [
      "Toți membrii și statusurile într-un loc",
      "Alocări transparente, vizuale",
      "Rapoarte generate automat",
    ],
  },
];

const steps = [
  {
    num: "01",
    title: "Definești comunitatea",
    text: "Configurezi membri, roluri și parametri de lucru într-un spațiu comun.",
    icon: Settings2,
  },
  {
    num: "02",
    title: "Urmărești energia",
    text: "Monitorizezi producția, consumul și energia partajată cu grafice clare.",
    icon: LineChart,
  },
  {
    num: "03",
    title: "Prezinți impactul",
    text: "Transformi economiile și CO₂ evitat în rapoarte ușor de citit.",
    icon: Leaf,
  },
];

const pricing = [
  {
    name: "Pilot",
    badge: "Validare",
    text: "Primele conversații cu primăria, membrii fondatori și workshop-uri.",
    items: ["Dashboard demonstrativ", "Date mock realiste", "Rapoarte preview"],
    featured: false,
  },
  {
    name: "Comunitate activă",
    badge: "Recomandat",
    text: "Pentru administrarea unei comunități care trece din pilot în operare.",
    items: ["Alocări configurabile", "Fluxuri de membri", "Export raportare"],
    featured: true,
  },
  {
    name: "Partner",
    badge: "Portofolii",
    text: "Consultanți, autorități și organizații cu mai multe proiecte active.",
    items: ["Multi-comunitate", "Branding dedicat", "Suport prioritar"],
    featured: false,
  },
];

const faqs = [
  {
    question: "Este conectat la date reale?",
    answer:
      "Nu. Platforma folosește date mock pentru validarea experienței și a poveștii produsului în față stakeholderilor.",
  },
  {
    question: "Poate fi folosit pentru prezentări?",
    answer:
      "Da — pagina și demo-ul sunt construite pentru conversații cu primării, prosumatori, asociații și IMM-uri.",
  },
  {
    question: "Include facturare sau autentificare?",
    answer:
      "Nu. Nu există autentificare, plăți, API-uri externe sau baze de date. Este 100% frontend.",
  },
  {
    question: "Se poate extinde spre integrări reale?",
    answer:
      "Da, ca direcție viitoare. Momentan accentul este pe demo vizual și claritate operațională.",
  },
];

/* ─── Helpers ────────────────────────────────────────────────────────── */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

function Section({
  children, className, id,
}: {
  children: React.ReactNode; className?: string; id?: string;
}) {
  return (
    <motion.section
      id={id}
      className={cn(id && "scroll-mt-20", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
    >
      {children}
    </motion.section>
  );
}

function FeatureCard({
  title, description, icon: Icon, index,
}: {
  title: string; description: string; icon: LucideIcon; index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white p-7 shadow-sm hover:shadow-md hover:shadow-slate-200/60 transition-shadow duration-300"
    >
      <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-[3rem] bg-surface-tint opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative">
        <div className="flex size-11 items-center justify-center rounded-xl bg-mint transition-colors duration-300 group-hover:bg-primary">
          <Icon className="size-5 text-emerald-800 transition-colors duration-300 group-hover:text-primary-foreground" />
        </div>
        <h3 className="mt-5 font-heading text-base font-semibold tracking-tight">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  );
}

function FAQItem({
  question, answer, open, onToggle,
}: {
  question: string; answer: string; open: boolean; onToggle: () => void;
}) {
  return (
    <div className="border-b border-slate-100 last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition-colors hover:bg-slate-50/60"
      >
        <span className="flex items-center gap-3 font-heading text-[0.95rem] font-semibold leading-snug">
          <CircleHelp className="size-4 shrink-0 text-primary" />
          {question}
        </span>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-muted-foreground transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.22, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <p className="px-16 pb-5 text-sm leading-7 text-muted-foreground">{answer}</p>
      </motion.div>
    </div>
  );
}

/* ─── Pagina ─────────────────────────────────────────────────────────── */

export function LandingPage() {
  const [activeSection, setActiveSection] = useState("solutie");
  const [openFaq, setOpenFaq]   = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 32);

      const anchorY   = window.scrollY + 120;
      const sections  = navLinks
        .map((l) => {
          const el = document.getElementById(l.id);
          return el ? { id: l.id, top: el.offsetTop } : null;
        })
        .filter(Boolean) as { id: string; top: number }[];

      const current =
        [...sections].sort((a, b) => a.top - b.top)
          .findLast((s) => s.top <= anchorY) ?? sections[0];

      if (current) setActiveSection(current.id);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="bg-background text-foreground antialiased">

      {/* ══ NAV — floating pill ══════════════════════════════════════════ */}
      <header className="sticky top-0 z-50 px-4 pt-3 pb-0 sm:px-6">
        <motion.nav
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "mx-auto flex h-14 max-w-6xl items-center justify-between rounded-2xl border px-4 transition-all duration-300 sm:px-5",
            scrolled
              ? "border-slate-200/90 bg-white/95 shadow-xl shadow-slate-200/50 backdrop-blur-2xl"
              : "border-white/20 bg-navy/55 shadow-xl shadow-black/25 backdrop-blur-xl",
          )}
        >
          {/* Logo */}
          <Logo size="md" />

          {/* Links */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setActiveSection(link.id)}
                className={cn(
                  "relative rounded-lg px-3.5 py-1.5 text-sm font-medium transition-all duration-200",
                  activeSection === link.id
                    ? scrolled
                      ? "bg-navy/5 text-navy font-semibold"
                      : "bg-white/12 text-white font-semibold"
                    : scrolled
                      ? "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                      : "text-white/60 hover:bg-white/10 hover:text-white",
                )}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.div
                    layoutId="nav-indicator"
                    className={cn(
                      "absolute -bottom-0.5 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full",
                      scrolled ? "bg-primary" : "bg-white",
                    )}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          {/* CTA */}
          <Button
            asChild
            size="sm"
            className={cn(
              "gap-1.5 rounded-xl px-4 font-semibold shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg",
              !scrolled && "shadow-primary/20",
            )}
          >
            <Link href="/demo">
              Demo live <ArrowRight className="size-3.5" />
            </Link>
          </Button>
        </motion.nav>
      </header>

      {/* ══ HERO + VIDEO — secțiune dark unificată ═══════════════════════ */}
      <section className="relative overflow-hidden bg-navy text-white">

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:56px_56px]" />

        {/* Glow blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-40 -top-40 h-[700px] w-[700px] rounded-full bg-primary/18 blur-[120px]" />
          <div className="absolute -bottom-20 -left-20 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[100px]" />
          <div className="absolute left-1/2 top-1/2 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[80px]" />
        </div>

        {/* ── Hero copy ── */}
        <div className="relative mx-auto max-w-5xl px-5 pb-14 pt-24 text-center sm:px-8">

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/7 px-4 py-1.5 text-xs font-medium tracking-wide text-white/75 backdrop-blur-sm">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              Platformă SaaS pentru energie locală
            </span>
          </motion.div>

          <motion.h1
            className="font-heading mx-auto mt-7 max-w-4xl text-5xl font-extrabold leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Gestionează comunități energetice{" "}
            <span className="bg-gradient-to-r from-primary via-emerald-300 to-primary bg-clip-text text-transparent">
              cu claritate.
            </span>
          </motion.h1>

          <motion.p
            className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/62"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            O platformă completă pentru membrii, alocări și rapoarte — vizuală,
            structurată și gata de prezentat oricărui stakeholder local.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
          >
            <Button
              asChild
              size="lg"
              className="gap-2 px-7 shadow-lg shadow-primary/30 transition-transform hover:-translate-y-0.5"
            >
              <Link href="/demo">
                Încearcă demo-ul <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/18 bg-white/7 text-white transition-transform hover:-translate-y-0.5 hover:bg-white/12 hover:text-white"
            >
              <a href="#solutie">Descoperă platforma</a>
            </Button>
          </motion.div>

          {/* Capability chips */}
          <motion.div
            className="mt-10 flex flex-wrap items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {[
              { icon: Users,    label: "Gestionare membri" },
              { icon: BarChart3,label: "Alocare energie" },
              { icon: FileText, label: "Rapoarte instant" },
              { icon: Leaf,     label: "Impact CO₂" },
              { icon: Zap,      label: "Dashboard complet" },
            ].map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-[11px] font-medium tracking-wide text-white/55"
              >
                <Icon className="size-3 text-primary" />
                {label}
              </span>
            ))}
          </motion.div>
        </div>

        {/* ── Video ── */}
        <div className="relative px-5 pb-28 sm:px-8">
          <motion.div
            className="relative mx-auto max-w-5xl"
            initial={{ opacity: 0, y: 52 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Glow video */}
            <div className="absolute -inset-8 rounded-[3rem] bg-primary/16 blur-3xl" />

            {/* Browser chrome */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.55)] ring-1 ring-white/5">
              {/* Title bar */}
              <div className="flex h-10 shrink-0 items-center gap-3 border-b border-white/7 bg-[#0e1929] px-4">
                <div className="flex gap-1.5">
                  <span className="size-3 rounded-full bg-[#ff5f57]" />
                  <span className="size-3 rounded-full bg-[#febc2e]" />
                  <span className="size-3 rounded-full bg-[#28c840]" />
                </div>
                <div className="mx-auto flex items-center gap-2 rounded-md bg-white/5 px-5 py-1 text-[11px] font-medium text-white/38">
                  <span className="size-1.5 rounded-full bg-primary/90" />
                  cerbridge.ro
                </div>
                <div className="size-4" />
              </div>

              {/* Video – crop watermark */}
              <div className="overflow-hidden bg-navy">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="block w-full"
                  style={{ marginBottom: "-8%" }}
                >
                  <source src="/prezentare.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ CAPABILITIES STRIP ═══════════════════════════════════════════ */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map(({ icon: Icon, title, text }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="flex items-start gap-4"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-mint">
                  <Icon className="size-5 text-emerald-800" />
                </div>
                <div>
                  <p className="font-heading text-sm font-semibold">{title}</p>
                  <p className="mt-0.5 text-xs leading-5 text-muted-foreground">{text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ SOLUȚIE ══════════════════════════════════════════════════════ */}
      <Section id="solutie" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <Badge variant="navy">Problema reală</Badge>
            <h2 className="font-heading mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Claritate înainte de complexitate.
            </h2>
            <p className="mt-5 text-base leading-7 text-muted-foreground">
              Datele energetice, membrii și alocările sunt adesea fragmentate.
              CER Bridge le centralizează într-un singur spațiu de lucru.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {comparison.map((card, index) => (
              <motion.div
                key={card.eyebrow}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12, duration: 0.55 }}
                whileHover={{ y: -4 }}
                className={cn(
                  "rounded-2xl border p-8 shadow-sm transition-shadow hover:shadow-lg",
                  index === 1
                    ? "bg-navy text-white shadow-xl shadow-navy/20"
                    : "bg-white",
                )}
              >
                <div className="flex items-center justify-between gap-4">
                  <Badge variant={index === 1 ? "default" : "secondary"}>{card.eyebrow}</Badge>
                  <span className={cn(
                    "flex size-10 items-center justify-center rounded-xl",
                    index === 1 ? "bg-white/10 text-primary" : "bg-mint text-emerald-800",
                  )}>
                    <card.icon className="size-5" />
                  </span>
                </div>
                <h3 className="font-heading mt-7 text-xl font-bold leading-snug tracking-tight">
                  {card.title}
                </h3>
                <ul className="mt-6 space-y-3.5">
                  {card.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className={cn("size-4 shrink-0", index === 1 ? "text-primary" : "text-emerald-600")} />
                      <span className={index === 1 ? "text-white/70" : "text-muted-foreground"}>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ══ FUNCȚIONALITĂȚI ══════════════════════════════════════════════ */}
      <Section id="functionalitati" className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-14 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <Badge variant="navy">Ce oferă platforma</Badge>
              <h2 className="font-heading mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                Tot ce ai nevoie, nimic în plus.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-muted-foreground lg:text-right">
              Fiecare modul este construit pentru validare rapidă cu
              stakeholderi locali — fără setup tehnic.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <FeatureCard key={f.title} {...f} index={i} />
            ))}
          </div>
        </div>
      </Section>

      {/* ══ CUM FUNCȚIONEAZĂ ═════════════════════════════════════════════ */}
      <Section className="bg-surface-tint py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <Badge variant="secondary">Proces</Badge>
            <h2 className="font-heading mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              De la configurare la impact în 3 pași.
            </h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white p-8 shadow-sm"
              >
                {/* Număr mare decorativ */}
                <span className="absolute right-5 top-3 select-none font-heading text-8xl font-black leading-none text-slate-100">
                  {step.num}
                </span>
                <div className="relative">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-navy text-white shadow-md shadow-navy/25">
                    <step.icon className="size-5" />
                  </div>
                  <h3 className="font-heading mt-6 text-lg font-bold tracking-tight">{step.title}</h3>
                  <p className="mt-2.5 text-sm leading-6 text-muted-foreground">{step.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ══ PREȚURI ══════════════════════════════════════════════════════ */}
      <Section id="preturi" className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <Badge variant="secondary">Prețuri</Badge>
            <h2 className="font-heading mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Un pachet pentru fiecare etapă.
            </h2>
            <p className="mt-5 text-base leading-7 text-muted-foreground">
              De la primele conversații cu autoritatea locală, până la operarea completă.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {pricing.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.55 }}
                whileHover={{ y: -5 }}
              >
                <Card className={cn(
                  "relative h-full overflow-hidden transition-shadow hover:shadow-lg",
                  plan.featured
                    ? "border-primary/40 shadow-xl shadow-emerald-100/70"
                    : "shadow-sm",
                )}>
                  {/* Gradient line top */}
                  {plan.featured && (
                    <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-emerald-300 via-primary to-emerald-300" />
                  )}
                  {/* Most popular badge */}
                  {plan.featured && (
                    <div className="absolute right-5 top-5">
                      <span className="rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
                        Popular
                      </span>
                    </div>
                  )}
                  <CardHeader className="pb-4 pt-7">
                    <div className="flex items-center justify-between">
                      <CardTitle className="font-heading text-lg font-bold">{plan.name}</CardTitle>
                      {!plan.featured && (
                        <Badge variant="secondary">{plan.badge}</Badge>
                      )}
                    </div>
                    <p className="pt-3 text-sm leading-6 text-muted-foreground">{plan.text}</p>
                  </CardHeader>
                  <CardContent>
                    <Button
                      asChild
                      variant={plan.featured ? "default" : "outline"}
                      className={cn("mb-7 w-full", plan.featured && "shadow-sm shadow-primary/20")}
                    >
                      <Link href="/demo">
                        {plan.featured ? "Încearcă gratuit" : "Vezi demo"}
                      </Link>
                    </Button>
                    <ul className="space-y-3">
                      {plan.items.map((item) => (
                        <li key={item} className="flex items-center gap-2.5 text-sm">
                          <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ══ FAQ ══════════════════════════════════════════════════════════ */}
      <Section id="faq" className="bg-surface-tint py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <div className="mb-12 text-center">
            <Badge variant="navy">FAQ</Badge>
            <h2 className="font-heading mt-5 text-4xl font-bold tracking-tight">
              Întrebări frecvente
            </h2>
          </div>
          <div className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm">
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
      </Section>

      {/* ══ CTA BANNER ═══════════════════════════════════════════════════ */}
      <section className="bg-white px-5 pb-24 sm:px-8">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-navy px-8 py-16 text-white sm:px-12 lg:px-16">
          {/* Glowuri */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(18,214,107,0.18),transparent_55%)]" />
          <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:36px_36px]" />

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h2 className="font-heading text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                Gata să explorezi platforma?
              </h2>
              <p className="mt-4 text-base leading-7 text-white/58">
                Demo-ul este disponibil instant — fără cont, fără date reale.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="gap-2 px-8 shadow-lg shadow-primary/30 transition-transform hover:-translate-y-0.5"
              >
                <Link href="/demo">
                  Încearcă demo-ul <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/20 bg-white/7 text-white hover:bg-white/14 hover:text-white"
              >
                <a href="#solutie">Află mai multe</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ═══════════════════════════════════════════════════════ */}
      <footer className="border-t bg-white py-12">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div className="max-w-xs">
              <Logo />
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Demo MVP pentru comunități energetice din România.
                Fără date reale, fără integrări externe.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 sm:gap-16">
              <div className="flex flex-col gap-3">
                <span className="font-heading text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Platformă
                </span>
                {navLinks.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
              <div className="flex flex-col gap-3">
                <span className="font-heading text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Demo
                </span>
                <Link
                  href="/demo"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Dashboard
                </Link>
                <Link
                  href="/demo/members"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Membri
                </Link>
                <Link
                  href="/demo/reports"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Rapoarte
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-slate-100 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <span>© 2026 CER Bridge · MVP demonstrativ</span>
            <div className="flex gap-5">
              <span>Fără autentificare</span>
              <span>Fără API-uri externe</span>
              <span>Fără date reale</span>
            </div>
          </div>
        </div>
      </footer>

    </main>
  );
}
