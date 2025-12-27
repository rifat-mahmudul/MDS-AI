import React from "react";
import States from "./_components/states";
import AppTopBar from "@/components/shared/app-topbar";
import SessionTable from "./_components/session-table";

const page = () => {
  return (
    <div className="space-y-8">
      <AppTopBar
        title="Welcome back to MDS-AI"
        desc="Review your recent sessions and start a new one anytime."
      />
      <States />

      <div>
        <h1 className="text-xl">Recent Session Table</h1>
        <div className="mt-2">
          <SessionTable />
        </div>
      </div>
    </div>
  );
};

export default page;
