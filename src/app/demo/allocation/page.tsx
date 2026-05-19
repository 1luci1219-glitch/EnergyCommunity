import { Network, Percent, PiggyBank } from "lucide-react";
import { PageHeader } from "@/components/demo/page-header";
import { AllocationTable } from "@/components/demo/tables";
import { KpiCard } from "@/components/demo/kpi-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { community } from "@/lib/data";

const allocationKpis = [
  {
    label: "Energie partajată",
    value: community.sharedEnergy,
    delta: "61.5% din consumul lunar",
    icon: Network,
    tone: "green" as const,
  },
  {
    label: "Economii estimate",
    value: community.estimatedSavings,
    delta: "Distribuite în comunitate",
    icon: PiggyBank,
    tone: "navy" as const,
  },
  {
    label: "Cotă medie",
    value: "8.7%",
    delta: "Pe membru activ",
    icon: Percent,
    tone: "mint" as const,
  },
];

export default function AllocationPage() {
  return (
    <>
      <PageHeader
        title="Alocare energie"
        description="Tabel demonstrativ cu beneficiari, surse, cote și economii estimate."
      />
      <div className="grid gap-4 lg:grid-cols-3">
        {allocationKpis.map((kpi) => (
          <KpiCard key={kpi.label} {...kpi} />
        ))}
      </div>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Alocări lunare</CardTitle>
        </CardHeader>
        <CardContent>
          <AllocationTable />
        </CardContent>
      </Card>
    </>
  );
}
