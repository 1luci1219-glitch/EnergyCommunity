import { Save, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/demo/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { community } from "@/lib/data";

export default function SettingsPage() {
  return (
    <>
      <PageHeader
        title="Setări"
        description="Formular mock pentru profilul comunității, reguli de alocare și preferințe de raportare."
        action={
          <Button variant="navy">
            <Save /> Salvează mock
          </Button>
        }
      />
      <div className="grid gap-6 xl:grid-cols-[1fr_0.7fr]">
        <Card>
          <CardHeader>
            <CardTitle>Profil comunitate</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-5">
            <div className="grid gap-2">
              <Label htmlFor="name">Nume comunitate</Label>
              <Input id="name" defaultValue={community.name} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="admin">Administrator</Label>
              <Input id="admin" defaultValue="Asociația CER Bridge București" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="area">Zonă</Label>
              <Input id="area" defaultValue="Aviației, București" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="notes">Note interne</Label>
              <Textarea
                id="notes"
                defaultValue="Pilot demonstrativ pentru validarea experienței de administrare a unei comunități de energie."
              />
            </div>
          </CardContent>
        </Card>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Reguli alocare</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                ["Metodă", "Proporțional cu consumul"],
                ["Prioritate", "Instituții publice și membri activi"],
                ["Prag notificare", "85% consum acoperit"],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between gap-4 rounded-md bg-background p-4">
                  <span className="text-sm text-muted-foreground">{label}</span>
                  <span className="text-right text-sm font-semibold">{value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="bg-navy text-white">
            <CardContent className="p-5">
              <ShieldCheck className="size-6 text-primary" />
              <h3 className="mt-4 font-semibold">Demo fără date reale</h3>
              <p className="mt-2 text-sm leading-6 text-white/70">
                Setările sunt doar pentru experiența clickable. Nu există autentificare,
                API-uri, baze de date, plăți sau integrări externe.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
