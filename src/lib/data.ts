import {
  BarChart3,
  BatteryCharging,
  Bell,
  FileText,
  Gauge,
  Leaf,
  LineChart,
  PiggyBank,
  PlugZap,
  Settings,
  ShieldCheck,
  Sparkles,
  SunMedium,
  Users,
  Zap,
} from "lucide-react";

export const community = {
  name: "Comunitatea Solară Aviației",
  members: 48,
  monthlyProduction: "12,450 kWh",
  monthlyConsumption: "15,820 kWh",
  sharedEnergy: "9,730 kWh",
  estimatedSavings: "6,420 RON",
  co2Avoided: "3.1 tone",
  status: "Activă",
};

export const userRoles = [
  "Platform Admin",
  "Community Admin",
  "Operator",
  "Member",
] as const;

export const mockUser = {
  name: "Elena Popescu",
  email: "elena@energialocala.ro",
  role: "Community Admin" as const,
  communityId: "aviatiei",
};

export const testProfiles = [
  {
    id: "platform-admin",
    name: "Paici Lucian",
    email: "lucian@energialocala.ro",
    role: "Platform Admin" as const,
    communityId: null,
    label: "Profilul meu",
    description: "Nu este asociat unei comunități. Poate verifica toate comunitățile.",
  },
  {
    id: "community-admin",
    name: "Elena Popescu",
    email: "elena@solaraviatiei.ro",
    role: "Community Admin" as const,
    communityId: "aviatiei",
    label: "Community admin",
    description: "Vede și administrează doar comunitatea asociată.",
  },
  {
    id: "member",
    name: "Mihai Ionescu",
    email: "mihai.ionescu@email.ro",
    role: "Member" as const,
    communityId: "aviatiei",
    label: "Membru",
    description: "Vede doar propriile date și informațiile publice ale comunității.",
  },
];

export const energyCommunities = [
  {
    id: "aviatiei",
    name: "Comunitatea Solară Aviației",
    location: "București, Sector 1",
    role: "Platform Admin" as const,
    status: "Activă",
    members: 48,
    monthlyProduction: "12,450 kWh",
    monthlyConsumption: "15,820 kWh",
    sharedEnergy: "9,730 kWh",
    estimatedSavings: "6,420 RON",
    co2Avoided: "3.1 tone",
    reports: 12,
    openTasks: 4,
    lastSync: "acum 12 min",
    settings: {
      allocationRule: "Proporțional cu consumul",
      reportingCycle: "Lunar",
      priority: "Instituții publice și membri activi",
    },
    energyData: [
      { month: "Ian", productie: 8200, consum: 12200, partajata: 6100 },
      { month: "Feb", productie: 9100, consum: 12800, partajata: 6800 },
      { month: "Mar", productie: 10400, consum: 13700, partajata: 7900 },
      { month: "Apr", productie: 10900, consum: 14650, partajata: 8500 },
      { month: "Mai", productie: 12450, consum: 15820, partajata: 9730 },
      { month: "Iun", productie: 13200, consum: 16100, partajata: 10150 },
    ],
    allocationSummary: [
      { label: "Rezidențial", value: "52%" },
      { label: "Public", value: "21%" },
      { label: "IMM", value: "27%" },
    ],
  },
  {
    id: "cluj-somes",
    name: "Cooperativa Energie Someș",
    location: "Cluj-Napoca, Someșeni",
    role: "Community Admin" as const,
    status: "Pilot",
    members: 86,
    monthlyProduction: "21,880 kWh",
    monthlyConsumption: "24,430 kWh",
    sharedEnergy: "17,260 kWh",
    estimatedSavings: "11,940 RON",
    co2Avoided: "5.4 tone",
    reports: 8,
    openTasks: 7,
    lastSync: "acum 28 min",
    settings: {
      allocationRule: "Prioritate prosumeri locali",
      reportingCycle: "Lunar",
      priority: "Gospodării vulnerabile și școli",
    },
    energyData: [
      { month: "Ian", productie: 12100, consum: 17600, partajata: 9200 },
      { month: "Feb", productie: 13800, consum: 18400, partajata: 10800 },
      { month: "Mar", productie: 16600, consum: 20100, partajata: 12900 },
      { month: "Apr", productie: 19400, consum: 22100, partajata: 15300 },
      { month: "Mai", productie: 21880, consum: 24430, partajata: 17260 },
      { month: "Iun", productie: 23200, consum: 25100, partajata: 18100 },
    ],
    allocationSummary: [
      { label: "Rezidențial", value: "61%" },
      { label: "Public", value: "19%" },
      { label: "IMM", value: "20%" },
    ],
  },
  {
    id: "brasov-centru",
    name: "Comunitatea Verde Brașov Centru",
    location: "Brașov, Centrul Civic",
    role: "Operator" as const,
    status: "În configurare",
    members: 34,
    monthlyProduction: "8,920 kWh",
    monthlyConsumption: "10,760 kWh",
    sharedEnergy: "6,480 kWh",
    estimatedSavings: "4,180 RON",
    co2Avoided: "2.2 tone",
    reports: 5,
    openTasks: 9,
    lastSync: "ieri, 18:40",
    settings: {
      allocationRule: "Cotă fixă + ajustare lunară",
      reportingCycle: "Trimestrial",
      priority: "Clădiri publice și asociații",
    },
    energyData: [
      { month: "Ian", productie: 5100, consum: 8100, partajata: 3800 },
      { month: "Feb", productie: 5900, consum: 8500, partajata: 4300 },
      { month: "Mar", productie: 7100, consum: 9200, partajata: 5200 },
      { month: "Apr", productie: 8300, consum: 10100, partajata: 6100 },
      { month: "Mai", productie: 8920, consum: 10760, partajata: 6480 },
      { month: "Iun", productie: 9700, consum: 11200, partajata: 7000 },
    ],
    allocationSummary: [
      { label: "Rezidențial", value: "43%" },
      { label: "Public", value: "35%" },
      { label: "IMM", value: "22%" },
    ],
  },
];

export const platformOverview = {
  communities: energyCommunities.length,
  members: energyCommunities.reduce((total, item) => total + item.members, 0),
  reports: energyCommunities.reduce((total, item) => total + item.reports, 0),
  openTasks: energyCommunities.reduce((total, item) => total + item.openTasks, 0),
};

export const kpis = [
  {
    label: "Producție lunară",
    value: community.monthlyProduction,
    delta: "+14% față de aprilie",
    icon: SunMedium,
    tone: "green" as const,
  },
  {
    label: "Consum lunar",
    value: community.monthlyConsumption,
    delta: "82% acoperire locală",
    icon: PlugZap,
    tone: "navy" as const,
  },
  {
    label: "Energie partajată",
    value: community.sharedEnergy,
    delta: "31 gospodării beneficiază",
    icon: BatteryCharging,
    tone: "mint" as const,
  },
  {
    label: "Economii estimate",
    value: community.estimatedSavings,
    delta: "+920 RON luna aceasta",
    icon: PiggyBank,
    tone: "green" as const,
  },
];

export const productionData = [
  { month: "Ian", productie: 8200, consum: 12200, partajata: 6100 },
  { month: "Feb", productie: 9100, consum: 12800, partajata: 6800 },
  { month: "Mar", productie: 10400, consum: 13700, partajata: 7900 },
  { month: "Apr", productie: 10900, consum: 14650, partajata: 8500 },
  { month: "Mai", productie: 12450, consum: 15820, partajata: 9730 },
  { month: "Iun", productie: 13200, consum: 16100, partajata: 10150 },
];

export const dailyEnergy = [
  { day: "L", productie: 410, consum: 520 },
  { day: "Ma", productie: 468, consum: 548 },
  { day: "Mi", productie: 492, consum: 535 },
  { day: "J", productie: 510, consum: 570 },
  { day: "V", productie: 546, consum: 602 },
  { day: "S", productie: 598, consum: 638 },
  { day: "D", productie: 562, consum: 611 },
];

export const members = [
  {
    name: "Asociația Green Aviației",
    type: "Prosumer",
    consumption: "1,820 kWh",
    production: "2,940 kWh",
    status: "Activ",
    allocation: "18.5%",
  },
  {
    name: "Bloc A7, Scara 2",
    type: "Consumator",
    consumption: "1,240 kWh",
    production: "0 kWh",
    status: "Activ",
    allocation: "8.2%",
  },
  {
    name: "Școala Gimnazială 19",
    type: "Consumator public",
    consumption: "2,410 kWh",
    production: "0 kWh",
    status: "În verificare",
    allocation: "12.4%",
  },
  {
    name: "Hub Creativ Nord",
    type: "Prosumer",
    consumption: "1,060 kWh",
    production: "1,480 kWh",
    status: "Activ",
    allocation: "10.7%",
  },
  {
    name: "Familia Ionescu",
    type: "Consumator",
    consumption: "420 kWh",
    production: "0 kWh",
    status: "Invitat",
    allocation: "2.1%",
  },
  {
    name: "Clinica Urbană",
    type: "Consumator",
    consumption: "1,730 kWh",
    production: "0 kWh",
    status: "Activ",
    allocation: "9.8%",
  },
];

export const allocationRows = [
  {
    recipient: "Școala Gimnazială 19",
    source: "Asociația Green Aviației",
    energy: "1,206 kWh",
    share: "12.4%",
    savings: "802 RON",
    status: "Confirmat",
  },
  {
    recipient: "Bloc A7, Scara 2",
    source: "Hub Creativ Nord",
    energy: "798 kWh",
    share: "8.2%",
    savings: "521 RON",
    status: "Confirmat",
  },
  {
    recipient: "Clinica Urbană",
    source: "Asociația Green Aviației",
    energy: "954 kWh",
    share: "9.8%",
    savings: "648 RON",
    status: "În curs",
  },
  {
    recipient: "Familia Ionescu",
    source: "Hub Creativ Nord",
    energy: "204 kWh",
    share: "2.1%",
    savings: "136 RON",
    status: "În curs",
  },
  {
    recipient: "Bloc B12",
    source: "Asociația Green Aviației",
    energy: "1,361 kWh",
    share: "14.0%",
    savings: "915 RON",
    status: "Confirmat",
  },
];

export const reports = [
  {
    title: "Raport lunar energie - Mai 2026",
    meta: "Producție, consum, alocare și economii",
    status: "Gata",
    date: "31 mai 2026",
  },
  {
    title: "Situație membri și cote - Mai 2026",
    meta: "48 membri, 5 invitații în așteptare",
    status: "Gata",
    date: "29 mai 2026",
  },
  {
    title: "Estimare beneficii CO2 - T2 2026",
    meta: "3.1 tone CO2 evitate în luna curentă",
    status: "În lucru",
    date: "15 iun 2026",
  },
  {
    title: "Pachet audit comunitate",
    meta: "Fișe sintetice pentru administrație",
    status: "Programat",
    date: "30 iun 2026",
  },
];

export const notifications = [
  {
    title: "Vârf de producție detectat",
    body: "Sistemul estimează excedent local după ora 13:00.",
    icon: Bell,
  },
  {
    title: "3 membri noi invitați",
    body: "Invitațiile sunt pregătite pentru trimitere.",
    icon: Users,
  },
  {
    title: "Raportul lunar este gata",
    body: "Mai 2026 poate fi revizuit în secțiunea Rapoarte.",
    icon: FileText,
  },
];

export const navItems = [
  { href: "/demo", label: "Dashboard", icon: Gauge },
  { href: "/demo/members", label: "Membri", icon: Users },
  { href: "/demo/energy", label: "Energie", icon: LineChart },
  { href: "/demo/allocation", label: "Alocare", icon: BarChart3 },
  { href: "/demo/reports", label: "Rapoarte", icon: FileText },
  { href: "/demo/settings", label: "Setări", icon: Settings },
];

export const features = [
  {
    title: "Vizibilitate energetică",
    description: "Indicatori clari pentru producție, consum și energie partajată.",
    icon: Zap,
  },
  {
    title: "Alocare transparentă",
    description: "Cote, surse și beneficii urmărite într-o interfață ușor de citit.",
    icon: ShieldCheck,
  },
  {
    title: "Rapoarte pregătite",
    description: "Sinteze lunare pentru administrație, membri și parteneri.",
    icon: FileText,
  },
  {
    title: "Impact măsurabil",
    description: "Economii și emisii CO2 evitate prezentate pe înțelesul tuturor.",
    icon: Leaf,
  },
  {
    title: "Comunitate activă",
    description: "Membri, roluri și statusuri într-un spațiu unic de lucru.",
    icon: Users,
  },
  {
    title: "Demo rapid",
    description: "Un prototip vizual pentru validare cu primării, asociații și prosumeri.",
    icon: Sparkles,
  },
];
