import AppTopBar from "@/components/shared/app-topbar";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import React from "react";
import SearchFilter from "./_components/search-filter";
import SessionTable from "../_components/session-table";

const page = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <AppTopBar
          title="Report History"
          desc="View and manage processed MDS documentation reports."
        />

        <Button className="h-[50px] w-[170px]">
          Export CSV <Download />
        </Button>
      </div>

      <div>
        <SearchFilter />
      </div>

      <div>
        <SessionTable />
      </div>
    </div>
  );
};

export default page;
