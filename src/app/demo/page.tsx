import { Activity, ArrowRight, Leaf, Users } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/demo/page-header";
import { PlatformAdminOverview } from "@/components/demo/platform-admin-overview";
import { KpiCard } from "@/components/demo/kpi-card";
import { ProductionConsumptionChart } from "@/components/demo/energy-chart";
import { MembersTable, AllocationTable } from "@/components/demo/tables";
import { NotificationList } from "@/components/demo/notifications";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { community, kpis } from "@/lib/data";

export default function DemoDashboardPage() {
  return (
    <>
      <PageHeader
        title="Dashboard comunitate"
        description="Privire de ansamblu asupra energiei produse, consumate și partajate în comunitatea asociată contului curent."
        action={
          <Button asChild variant="navy">
            <Link href="/demo/reports">
              Vezi rapoarte <ArrowRight />
            </Link>
          </Button>
        }
      />

      <PlatformAdminOverview />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.label} {...kpi} />
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.45fr_0.55fr]">
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle>Producție vs consum</CardTitle>
              <p className="mt-2 text-sm text-muted-foreground">Evoluție lunară, kWh</p>
            </div>
            <Badge variant="secondary">Mai 2026</Badge>
          </CardHeader>
          <CardContent>
            <ProductionConsumptionChart />
          </CardContent>
        </Card>
        <div className="grid gap-6">
          <Card className="bg-navy text-white">
            <CardHeader>
              <CardTitle>Impact comunitate</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-white/70">
                  <Users className="size-4" /> Membri
                </span>
                <strong>{community.members}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-white/70">
                  <Leaf className="size-4" /> CO2 evitat
                </span>
                <strong>{community.co2Avoided}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-white/70">
                  <Activity className="size-4" /> Status
                </span>
                <Badge variant="default">{community.status}</Badge>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Notificări</CardTitle>
            </CardHeader>
            <CardContent>
              <NotificationList />
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Membri activi</CardTitle>
            <Button asChild variant="ghost">
              <Link href="/demo/members">Toți membrii</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <MembersTable limit={4} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Alocări recente</CardTitle>
            <Button asChild variant="ghost">
              <Link href="/demo/allocation">Detalii</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <AllocationTable />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
