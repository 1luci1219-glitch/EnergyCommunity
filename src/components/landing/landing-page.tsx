"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  FileText,
  Leaf,
  LineChart,
  Sparkles,
  Users,
  Zap,
  BarChart3,
  ShieldCheck,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { features } from "@/lib/data";
import { cn } from "@/lib/utils";

/* ─── Date statice ──────────────────────────────────────────────────── */

const navLinks = [
  { href: "#solutie",       label: "Soluție",         id: "solutie" },
  { href: "#functionalitati", label: "Funcționalități", id: "functionalitati" },
  { href: "#preturi",       label: "Prețuri",         id: "preturi" },
  { href: "#faq",           label: "FAQ",             id: "faq" },
];

const heroChips = [
  { icon: Zap,         label: "Dashboard complet" },
  { icon: BarChart3,   label: "Alocare transparentă" },
  { icon: FileText,    label: "Rapoarte instant" },
  { icon: Leaf,        label: "Impact CO₂" },
  { icon: ShieldCheck, label: "Multi-comunitate" },
];

const trustItems = [
  "Primării",
  "Cooperative",
  "Asociații",
  "Prosumatori",
  "IMM-uri",
];

const comparison = [
  {
    eyebrow: "Înainte",
    title: "Tabele, emailuri și validări manuale",
    icon: FileText,
    items: [
      "Date energetice fragmentate",
      "Alocări greu de explicat",
      "Rapoarte refăcute lunar",
    ],
  },
  {
    eyebrow: "Cu EnergiaLocală",
    title: "O singură vedere operațională",
    icon: Sparkles,
    items: [
      "Membri și statusuri clare",
      "Energie urmărită vizual",
      "Impact pregătit pentru prezentare",
    ],
  },
];

const steps = [
  {
    num: "01",
    title: "Definești comunitatea",
    text: "Configurezi membri, roluri și parametri de lucru într-un spațiu comun.",
    icon: Users,
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
    text: "Transformi economiile, alocările și CO₂ evitat în rapoarte ușor de citit.",
    icon: Leaf,
  },
];

const pricing = [
  {
    name: "Pilot",
    badge: "Validare",
    text: "Pentru workshop-uri, primii membri și discuții cu parteneri locali.",
    items: ["Dashboard demonstrativ", "Date mock realiste", "Rapoarte lunare preview"],
    featured: false,
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
    text: "Pentru consultanți, autorități și organizații cu mai multe proiecte.",
    items: ["Multi-comunitate", "Branding dedicat", "Suport prioritar"],
    featured: false,
  },
];

const faqs = [
  {
    question: "Este conectat la date reale?",
    answer:
      "Nu. Acest MVP folosește doar date mock pentru validarea experienței și a poveștii produsului.",
  },
  {
    question: "Poate fi folosit pentru prezentări către membri?",
    answer:
      "Da. Pagina și demo-ul sunt construite pentru conversații cu primării, prosumatori, asociații și IMM-uri.",
  },
  {
    question: "Include facturare sau plăți?",
    answer:
      "Nu. Nu există autentificare, plăți, billing, API-uri, baze de date sau integrări externe.",
  },
  {
    question: "Se poate extinde către integrări DSO?",
    answer:
      "Da, dar doar ca direcție viitoare. Acum accentul este pe demo vizual și claritate operațională.",
  },
];

/* ─── Componente helper ─────────────────────────────────────────────── */

const sectionVariants = {
  hidden: { opacity: 0, y: 28 },
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
      className={cn(id && "scroll-mt-20", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      variants={sectionVariants}
    >
      {children}
    </motion.section>
  );
}

function FeatureCard({
  title,
  description,
  icon: Icon,
  index,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5 }}
      className="group relative overflow-hidden rounded-2xl border bg-white p-7 shadow-sm transition-shadow hover:shadow-lg hover:shadow-slate-200/80"
    >
      {/* subtle hover gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 transition-all duration-500 group-hover:from-primary/3 group-hover:to-transparent" />
      <div className="relative">
        <div className="flex size-12 items-center justify-center rounded-xl bg-mint text-emerald-800 transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
          <Icon className="size-5" />
        </div>
        <h3 className="mt-5 text-base font-semibold tracking-normal">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
      </div>
    </motion.div>
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
        className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition-colors hover:bg-slate-50/80"
      >
        <span className="flex items-center gap-3 text-[0.95rem] font-semibold leading-snug">
          <CircleHelp className="size-4.5 shrink-0 text-emerald-600" />
          {question}
        </span>
        <ChevronDown
          className={cn(
            "size-4.5 shrink-0 text-muted-foreground transition-transform duration-200",
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

/* ─── Pagina principală ─────────────────────────────────────────────── */

export function LandingPage() {
  const [activeSection, setActiveSection] = useState("solutie");
  const [openFaq, setOpenFaq]  = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      const anchorY = window.scrollY + 120;
      const sections = navLinks
        .map((l) => {
          const el = document.getElementById(l.id);
          return el ? { id: l.id, top: el.offsetTop } : null;
        })
        .filter(Boolean) as { id: string; top: number }[];

      const current =
        sections
          .sort((a, b) => a.top - b.top)
          .findLast((s) => s.top <= anchorY) ?? sections[0];

      if (current) setActiveSection(current.id);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="bg-background text-foreground antialiased">

      {/* ══ NAV ══════════════════════════════════════════════════════════ */}
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b bg-white/90 shadow-sm shadow-slate-100 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo className={cn(scrolled ? "text-foreground" : "text-white")} />

          <div className="hidden items-center gap-0.5 rounded-xl border border-white/15 bg-white/8 p-1 text-sm font-medium backdrop-blur-sm md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setActiveSection(link.id)}
                className={cn(
                  "rounded-lg px-3.5 py-1.5 transition-all duration-150",
                  activeSection === link.id
                    ? "bg-white text-navy shadow-sm"
                    : "text-white/70 hover:bg-white/10 hover:text-white",
                )}
              >
                {link.label}
              </a>
            ))}
          </div>

          <Button
            asChild
            size="sm"
            className="gap-1.5 shadow-sm transition-transform hover:-translate-y-0.5"
          >
            <Link href="/demo">
              Demo live <ArrowRight className="size-3.5" />
            </Link>
          </Button>
        </nav>
      </header>

      {/* ══ HERO + VIDEO ═══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-navy text-white">

        {/* — Fundal — */}
        <div className="absolute inset-0">
          {/* Grid */}
          <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:48px_48px]" />
          {/* Glow-uri */}
          <div className="absolute -top-32 right-[-10%] h-[700px] w-[700px] rounded-full bg-primary/20 blur-[120px]" />
          <div className="absolute bottom-0 left-[-5%] h-[400px] w-[500px] rounded-full bg-primary/10 blur-[100px]" />
        </div>

        {/* — Hero text — */}
        <div className="relative mx-auto max-w-5xl px-4 pb-12 pt-28 text-center sm:px-6 lg:px-8">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-xs font-medium text-white/80 backdrop-blur-sm">
              <span className="size-1.5 rounded-full bg-primary" />
              Platformă SaaS pentru energie locală
            </span>
          </motion.div>

          <motion.h1
            className="mx-auto mt-6 max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-[4.5rem]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            Administrează comunități energetice{" "}
            <span className="bg-gradient-to-r from-primary to-emerald-300 bg-clip-text text-transparent">
              fără complexitate.
            </span>
          </motion.h1>

          <motion.p
            className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/65"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          >
            O platformă completă pentru membrii, alocările și rapoartele comunității —
            clară, vizuală și gata de prezentat oricărui stakeholder.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            <Button
              asChild
              size="lg"
              className="gap-2 px-7 shadow-lg shadow-primary/25 transition-transform hover:-translate-y-0.5"
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

          {/* Chips functionalitati */}
          <motion.div
            className="mt-10 flex flex-wrap items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.38 }}
          >
            {heroChips.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="flex items-center gap-1.5 rounded-full border border-white/12 bg-white/6 px-3.5 py-1.5 text-xs font-medium text-white/60"
              >
                <Icon className="size-3.5 text-primary" />
                {label}
              </span>
            ))}
          </motion.div>
        </div>

        {/* — Video — */}
        <div className="relative px-4 pb-28 sm:px-6 lg:px-8">
          <motion.div
            className="relative mx-auto max-w-5xl"
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Glow video */}
            <div className="absolute -inset-8 rounded-[3rem] bg-primary/18 blur-3xl" />

            {/* Frame browser */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/60 ring-1 ring-white/5">
              {/* Chrome bar */}
              <div className="flex h-10 shrink-0 items-center gap-2 border-b border-white/8 bg-[#1a2235] px-4">
                <div className="flex gap-1.5">
                  <span className="size-3 rounded-full bg-[#ff5f57]" />
                  <span className="size-3 rounded-full bg-[#febc2e]" />
                  <span className="size-3 rounded-full bg-[#28c840]" />
                </div>
                <div className="mx-auto flex items-center gap-2 rounded-md bg-white/6 px-5 py-1 text-[11px] font-medium text-white/40">
                  <span className="size-1.5 rounded-full bg-primary/80" />
                  energialocala.ro
                </div>
              </div>

              {/* Video – crop watermark bottom */}
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

      {/* ══ TRUST STRIP ═══════════════════════════════════════════════ */}
      <div className="border-b bg-white py-8">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-between">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Construit pentru
            </p>
            <div className="flex flex-wrap justify-center gap-3 sm:justify-end">
              {trustItems.map((item) => (
                <span
                  key={item}
                  className="rounded-full border bg-slate-50 px-4 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:border-primary/40 hover:bg-mint hover:text-emerald-800"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══ SOLUȚIE ══════════════════════════════════════════════════ */}
      <AnimatedSection id="solutie" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <Badge variant="navy">Problema reală</Badge>
            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Claritate înainte de complexitate.
            </h2>
            <p className="mt-5 text-base leading-7 text-muted-foreground">
              Datele energetice, membrii și alocările sunt adesea împrăștiate în
              tabele și procese manuale. EnergiaLocală le centralizează.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {comparison.map((card, index) => (
              <motion.div
                key={card.eyebrow}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 280, damping: 20 }}
                className={cn(
                  "rounded-2xl border p-8 shadow-sm",
                  index === 1
                    ? "bg-navy text-white shadow-xl shadow-navy/20"
                    : "bg-white",
                )}
              >
                <div className="flex items-center justify-between">
                  <Badge variant={index === 1 ? "default" : "secondary"}>
                    {card.eyebrow}
                  </Badge>
                  <span
                    className={cn(
                      "flex size-10 items-center justify-center rounded-xl",
                      index === 1 ? "bg-white/10 text-primary" : "bg-mint text-emerald-800",
                    )}
                  >
                    <card.icon className="size-5" />
                  </span>
                </div>
                <h3 className="mt-7 text-xl font-semibold leading-snug tracking-normal">
                  {card.title}
                </h3>
                <ul className="mt-6 space-y-3.5">
                  {card.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm">
                      <CheckCircle2
                        className={cn(
                          "size-4 shrink-0",
                          index === 1 ? "text-primary" : "text-emerald-600",
                        )}
                      />
                      <span className={index === 1 ? "text-white/72" : "text-muted-foreground"}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ══ FUNCȚIONALITĂȚI ══════════════════════════════════════════ */}
      <AnimatedSection id="functionalitati" className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <Badge variant="navy">Ce oferă platforma</Badge>
              <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                Tot ce ai nevoie, nimic în plus.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-muted-foreground lg:text-right">
              Fiecare modul este construit pentru validare rapidă cu stakeholderi
              locali — fără setup tehnic.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <FeatureCard key={feature.title} {...feature} index={i} />
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ══ CUM FUNCȚIONEAZĂ ═════════════════════════════════════════ */}
      <AnimatedSection className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <Badge variant="secondary">Proces</Badge>
            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
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
                transition={{ delay: index * 0.12, duration: 0.55 }}
                className="relative overflow-hidden rounded-2xl border bg-white p-8 shadow-sm"
              >
                {/* Big background number */}
                <span className="absolute right-5 top-3 select-none text-7xl font-black leading-none text-slate-100">
                  {step.num}
                </span>
                <div className="relative">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-navy text-white shadow-md shadow-navy/20">
                    <step.icon className="size-5" />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold tracking-normal">{step.title}</h3>
                  <p className="mt-2.5 text-sm leading-6 text-muted-foreground">{step.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ══ PREȚURI ══════════════════════════════════════════════════ */}
      <AnimatedSection id="preturi" className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <Badge variant="secondary">Prețuri</Badge>
            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Pachete pentru fiecare etapă.
            </h2>
            <p className="mt-5 text-base leading-7 text-muted-foreground">
              De la primele conversații cu primăria, până la operarea completă.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {pricing.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
              >
                <Card
                  className={cn(
                    "relative h-full overflow-hidden shadow-sm",
                    plan.featured
                      ? "border-primary/60 bg-gradient-to-b from-white via-white to-mint/30 shadow-xl shadow-emerald-100/60"
                      : "bg-white",
                  )}
                >
                  {plan.featured && (
                    <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
                  )}
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{plan.name}</CardTitle>
                      <Badge variant={plan.featured ? "default" : "secondary"}>
                        {plan.badge}
                      </Badge>
                    </div>
                    <p className="pt-3 text-sm leading-6 text-muted-foreground">
                      {plan.text}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <Button
                      asChild
                      variant={plan.featured ? "default" : "outline"}
                      className={cn(
                        "mb-7 w-full",
                        plan.featured && "shadow-sm shadow-primary/20",
                      )}
                    >
                      <Link href="/demo">Vezi demo</Link>
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
      </AnimatedSection>

      {/* ══ FAQ ══════════════════════════════════════════════════════ */}
      <AnimatedSection id="faq" className="py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <Badge variant="navy">FAQ</Badge>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight">
              Întrebări frecvente
            </h2>
          </div>
          <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
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

      {/* ══ CTA BANNER ═══════════════════════════════════════════════ */}
      <section className="bg-background px-4 pb-24 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-navy px-8 py-16 text-white shadow-2xl shadow-navy/25 sm:px-12 lg:px-16">
          {/* Glow dreapta */}
          <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_80%_40%,rgba(18,214,107,0.15),transparent_60%)]" />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h2 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                Gata să explorezi platforma?
              </h2>
              <p className="mt-4 text-base leading-7 text-white/62">
                Demo-ul este disponibil instant, fără cont și fără date reale.
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="shrink-0 gap-2 px-8 shadow-lg shadow-primary/30 transition-transform hover:-translate-y-0.5"
            >
              <Link href="/demo">
                Încearcă demo-ul <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ═══════════════════════════════════════════════════ */}
      <footer className="border-t bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="max-w-xs">
              <Logo />
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Demo MVP pentru comunități energetice din România.
                Doar frontend, doar date mock.
              </p>
            </div>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Navigare</span>
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="transition-colors hover:text-foreground"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-3 border-t pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <span>© 2026 EnergiaLocală · MVP demonstrativ</span>
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
