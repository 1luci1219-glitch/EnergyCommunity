import { BatteryCharging, CloudSun, Leaf, SunMedium } from "lucide-react";
import { PageHeader } from "@/components/demo/page-header";
import { DailyEnergyChart, ProductionConsumptionChart } from "@/components/demo/energy-chart";
import { KpiCard } from "@/components/demo/kpi-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { community } from "@/lib/data";

const energyKpis = [
  {
    label: "Producție",
    value: community.monthlyProduction,
    delta: "Prognoză bună pentru iunie",
    icon: SunMedium,
    tone: "green" as const,
  },
  {
    label: "Consum",
    value: community.monthlyConsumption,
    delta: "Vârf estimat seara",
    icon: BatteryCharging,
    tone: "navy" as const,
  },
  {
    label: "CO2 evitat",
    value: community.co2Avoided,
    delta: "Echivalent lunar estimat",
    icon: Leaf,
    tone: "mint" as const,
  },
];

export default function EnergyPage() {
  return (
    <>
      <PageHeader
        title="Energie"
        description="Grafice pentru producție, consum și performanță energetică pe baza datelor mock."
      />
      <div className="grid gap-4 lg:grid-cols-3">
        {energyKpis.map((kpi) => (
          <KpiCard key={kpi.label} {...kpi} />
        ))}
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>Evoluție lunară</CardTitle>
          </CardHeader>
          <CardContent>
            <ProductionConsumptionChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Săptămâna curentă</CardTitle>
          </CardHeader>
          <CardContent>
            <DailyEnergyChart />
          </CardContent>
        </Card>
      </div>
      <Card className="mt-6">
        <CardContent className="grid gap-4 p-5 md:grid-cols-3">
          {["Autoconsum ridicat între 11:00 și 15:00", "Excedent estimat în zilele însorite", "Consum comunitar stabil în weekend"].map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-md bg-background p-4">
              <CloudSun className="size-5 text-emerald-700" />
              <span className="text-sm font-medium">{item}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
}
