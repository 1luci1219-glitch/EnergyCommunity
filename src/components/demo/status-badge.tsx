import { Badge } from "@/components/ui/badge";

export function StatusBadge({ status }: { status: string }) {
  const variant =
    status === "Activ" ||
    status === "Activă" ||
    status === "Confirmat" ||
    status === "Gata"
      ? "success"
      : status === "În lucru" || status === "În curs" || status === "În verificare"
        ? "warning"
        : "muted";

  return <Badge variant={variant}>{status}</Badge>;
}
