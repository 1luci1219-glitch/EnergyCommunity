import { MoreHorizontal } from "lucide-react";
import { allocationRows, members, reports } from "@/lib/data";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/demo/status-badge";

export function MembersTable({ limit }: { limit?: number }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Membru</TableHead>
          <TableHead>Tip</TableHead>
          <TableHead>Consum</TableHead>
          <TableHead>Producție</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Cotă</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {members.slice(0, limit).map((member) => (
          <TableRow key={member.name}>
            <TableCell className="font-medium">{member.name}</TableCell>
            <TableCell>{member.type}</TableCell>
            <TableCell>{member.consumption}</TableCell>
            <TableCell>{member.production}</TableCell>
            <TableCell>
              <StatusBadge status={member.status} />
            </TableCell>
            <TableCell className="text-right font-medium">{member.allocation}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function AllocationTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Beneficiar</TableHead>
          <TableHead>Sursă</TableHead>
          <TableHead>Energie</TableHead>
          <TableHead>Cotă</TableHead>
          <TableHead>Economii</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {allocationRows.map((row) => (
          <TableRow key={`${row.recipient}-${row.source}`}>
            <TableCell className="font-medium">{row.recipient}</TableCell>
            <TableCell>{row.source}</TableCell>
            <TableCell>{row.energy}</TableCell>
            <TableCell>{row.share}</TableCell>
            <TableCell className="font-medium text-emerald-700">{row.savings}</TableCell>
            <TableCell>
              <StatusBadge status={row.status} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function ReportsList() {
  return (
    <div className="divide-y">
      {reports.map((report) => (
        <div key={report.title} className="flex flex-col gap-4 py-5 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-semibold tracking-normal">{report.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{report.meta}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">{report.date}</span>
            <StatusBadge status={report.status} />
            <Button variant="ghost" size="icon" aria-label="Opțiuni raport">
              <MoreHorizontal />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
