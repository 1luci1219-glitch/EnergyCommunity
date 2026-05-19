import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const toneClasses = {
  green: "bg-primary/15 text-emerald-700",
  navy: "bg-navy text-white",
  mint: "bg-mint text-emerald-800",
};

export function KpiCard({
  label,
  value,
  delta,
  icon: Icon,
  tone = "green",
}: {
  label: string;
  value: string;
  delta: string;
  icon: LucideIcon;
  tone?: keyof typeof toneClasses;
}) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="mt-2 text-2xl font-semibold tracking-normal text-foreground">
              {value}
            </p>
          </div>
          <span
            className={cn(
              "flex size-11 shrink-0 items-center justify-center rounded-md",
              toneClasses[tone],
            )}
          >
            <Icon className="size-5" />
          </span>
        </div>
        <p className="mt-4 text-sm font-medium text-emerald-700">{delta}</p>
      </CardContent>
    </Card>
  );
}
