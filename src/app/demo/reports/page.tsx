import { CalendarDays, Download, FileCheck2 } from "lucide-react";
import { PageHeader } from "@/components/demo/page-header";
import { ReportsList } from "@/components/demo/tables";
import { KpiCard } from "@/components/demo/kpi-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const reportKpis = [
  {
    label: "Rapoarte gata",
    value: "12",
    delta: "Inclusiv mai 2026",
    icon: FileCheck2,
    tone: "green" as const,
  },
  {
    label: "Următorul raport",
    value: "30 iun",
    delta: "Generare programată",
    icon: CalendarDays,
    tone: "navy" as const,
  },
];

export default function ReportsPage() {
  return (
    <>
      <PageHeader
        title="Rapoarte"
        description="Listă mock pentru rapoarte lunare, situații de membri și estimări de impact."
        action={
          <Button variant="navy">
            <Download /> Export demo
          </Button>
        }
      />
      <div className="grid gap-4 md:grid-cols-2">
        {reportKpis.map((kpi) => (
          <KpiCard key={kpi.label} {...kpi} />
        ))}
      </div>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Bibliotecă rapoarte</CardTitle>
        </CardHeader>
        <CardContent>
          <ReportsList />
        </CardContent>
      </Card>
    </>
  );
}
