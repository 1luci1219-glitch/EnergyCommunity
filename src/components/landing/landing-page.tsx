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
} from "lucide-react";
import { Logo } from "@/components/logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { features } from "@/lib/data";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#solutie", label: "Soluție", id: "solutie" },
  { href: "#functionalitati", label: "Funcționalități", id: "functionalitati" },
  { href: "#video", label: "Video", id: "video" },
  { href: "#preturi", label: "Prețuri", id: "preturi" },
  { href: "#faq", label: "FAQ", id: "faq" },
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

const pricing = [
  {
    name: "Pilot comunitate",
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
    text: "Pentru consultanți, autorități și organizații care coordonează mai multe proiecte.",
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
      "Da, dar doar ca direcție viitoare. În acest moment, accentul este pe demo vizual și claritate operațională.",
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
        <ChevronDown
          className={cn(
            "size-5 shrink-0 text-muted-foreground transition-transform",
            open && "rotate-180",
          )}
        />
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

      if (current) setActiveSection(current.id);
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

      {/* ── NAV ── */}
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
                  activeSection === link.id &&
                    "bg-navy text-white hover:bg-navy hover:text-white",
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

      {/* ── HERO + VIDEO — o singură secțiune dark ── */}
      <section className="relative overflow-hidden bg-navy text-white">
        {/* Decorații fundal */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_-15%,rgba(18,214,107,0.16),transparent_42%),radial-gradient(circle_at_5%_85%,rgba(18,214,107,0.07),transparent_38%)]" />
        <div className="absolute inset-0 opacity-[0.10] [background-image:linear-gradient(#ffffff_1px,transparent_1px),linear-gradient(90deg,#ffffff_1px,transparent_1px)] [background-size:52px_52px]" />

        {/* Hero text — centrat */}
        <motion.div
          className="relative mx-auto max-w-4xl px-4 pb-14 pt-24 text-center sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Badge variant="default">SaaS românesc pentru energie locală</Badge>
          <h1 className="mt-6 text-5xl font-semibold leading-[1.06] tracking-normal sm:text-6xl lg:text-7xl">
            Administrează comunități energetice într-un singur dashboard.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/70">
            O platformă completă pentru gestionarea membrilor, alocărilor și rapoartelor —
            clară, vizuală și ușor de prezentat oricărui stakeholder.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="transition-transform hover:-translate-y-0.5"
            >
              <Link href="/demo">
                Încearcă demo-ul <ArrowRight />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/20 bg-white/8 text-white transition-transform hover:-translate-y-0.5 hover:bg-white/14 hover:text-white"
            >
              <a href="#solutie">Descoperă platforma</a>
            </Button>
          </div>
        </motion.div>

        {/* Video — seamless sub hero, același bg dark */}
        <div
          id="video"
          className="relative scroll-mt-24 px-4 pb-28 sm:px-6 lg:px-8"
        >
          <motion.div
            className="relative mx-auto max-w-5xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Glow ambiental */}
            <div className="absolute -inset-8 rounded-[3rem] bg-primary/14 blur-3xl" />

            {/* Browser chrome frame */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl shadow-black/50 ring-1 ring-white/5">
              {/* Top bar */}
              <div className="flex h-10 shrink-0 items-center gap-2 border-b border-white/8 bg-slate-800/90 px-4">
                <span className="size-3 rounded-full bg-red-400/55" />
                <span className="size-3 rounded-full bg-amber-400/55" />
                <span className="size-3 rounded-full bg-emerald-400/55" />
                <div className="mx-auto flex items-center gap-1.5 rounded-md bg-slate-700/50 px-5 py-1 text-xs text-slate-400">
                  <span className="size-1.5 rounded-full bg-emerald-400" />
                  energialocala.ro
                </div>
              </div>

              {/* Video cu crop watermark la -8% */}
              <div className="overflow-hidden bg-slate-900">
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

      {/* ── SOLUȚIE ── */}
      <AnimatedSection id="solutie" className="py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="navy">Claritate operațională</Badge>
            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-normal sm:text-5xl">
              Comunitățile de energie au nevoie de claritate înainte de complexitate.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Datele energetice, membrii și alocările sunt adesea împrăștiate în tabele,
              documente și procese manuale. EnergiaLocală le aduce într-un singur loc.
            </p>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {comparison.map((card, index) => (
              <motion.div
                key={card.eyebrow}
                whileHover={{ y: -5 }}
                className={cn(
                  "rounded-2xl border p-7 shadow-sm",
                  index === 1
                    ? "bg-navy text-white shadow-xl shadow-navy/15"
                    : "bg-white",
                )}
              >
                <div className="flex items-center justify-between gap-4">
                  <Badge variant={index === 1 ? "default" : "secondary"}>
                    {card.eyebrow}
                  </Badge>
                  <span
                    className={cn(
                      "flex size-11 items-center justify-center rounded-lg",
                      index === 1
                        ? "bg-white/10 text-primary"
                        : "bg-mint text-emerald-800",
                    )}
                  >
                    <card.icon className="size-5" />
                  </span>
                </div>
                <h3 className="mt-6 text-2xl font-semibold tracking-normal">
                  {card.title}
                </h3>
                <div className="mt-6 grid gap-3">
                  {card.items.map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm">
                      <CheckCircle2
                        className={cn(
                          "size-4",
                          index === 1 ? "text-primary" : "text-emerald-700",
                        )}
                      />
                      <span
                        className={
                          index === 1 ? "text-white/76" : "text-muted-foreground"
                        }
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ── FUNCȚIONALITĂȚI ── */}
      <AnimatedSection id="functionalitati" className="bg-white py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <Badge variant="navy">Funcționalități</Badge>
              <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-normal sm:text-5xl">
                O platformă care arată ca un produs real.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-muted-foreground">
              Fiecare modul este construit pentru prezentări, decizii și validare rapidă
              cu stakeholderi locali.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ── CUM FUNCȚIONEAZĂ ── */}
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
                <h3 className="mt-4 text-xl font-semibold tracking-normal">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {step.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ── PREȚURI ── */}
      <AnimatedSection id="preturi" className="bg-white py-24 sm:py-28">
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
                <Card
                  className={cn(
                    "h-full overflow-hidden shadow-sm",
                    plan.featured &&
                      "border-primary bg-gradient-to-b from-white to-mint/45 shadow-xl shadow-emerald-100",
                  )}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{plan.name}</CardTitle>
                      <Badge variant={plan.featured ? "default" : "secondary"}>
                        {plan.badge}
                      </Badge>
                    </div>
                    <p className="pt-4 text-sm leading-6 text-muted-foreground">
                      {plan.text}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <Button
                      asChild
                      variant={plan.featured ? "default" : "outline"}
                      className="mb-7 w-full"
                    >
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

      {/* ── FAQ ── */}
      <AnimatedSection id="faq" className="py-24 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="navy">FAQ</Badge>
            <h2 className="mt-5 text-4xl font-semibold tracking-normal">
              Întrebări frecvente
            </h2>
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

      {/* ── CTA BANNER ── */}
      <section className="bg-background px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-navy px-6 py-14 text-white shadow-2xl shadow-navy/20 sm:px-10 lg:px-14">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-semibold tracking-normal sm:text-5xl">
                Pregătiți pentru o demonstrație?
              </h2>
              <p className="mt-4 text-lg leading-8 text-white/68">
                Intră în demo și explorează platforma în detaliu.
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="shrink-0 transition-transform hover:-translate-y-0.5"
            >
              <Link href="/demo">
                Încearcă demo-ul <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t bg-white py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <Logo />
              <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
                Demo MVP pentru comunități energetice din România. Doar frontend, doar
                date mock.
              </p>
            </div>
            <div className="flex gap-3">
              {["in", "x", "yt"].map((item) => (
                <span
                  key={item}
                  className="flex size-9 items-center justify-center rounded-md border text-xs font-semibold text-muted-foreground"
                >
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
