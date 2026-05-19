import { Plus } from "lucide-react";
import { MembersDataTable } from "@/components/demo/members-data-table";
import { PageHeader } from "@/components/demo/page-header";
import { Button } from "@/components/ui/button";

export default function MembersPage() {
  return (
    <>
      <PageHeader
        title="Membri"
        description="Registru operațional pentru prosumeri, consumatori, instituții și statusuri de participare."
        action={
          <Button variant="navy">
            <Plus /> Adaugă membru
          </Button>
        }
      />
      <MembersDataTable />
    </>
  );
}
