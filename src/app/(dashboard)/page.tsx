import React from "react";
import States from "./_components/states";
import AppTopBar from "@/components/shared/app-topbar";

const page = () => {
  return (
    <div className="space-y-8">
      <AppTopBar
        title="Welcome back to MDS-AI"
        desc="Review your recent sessions and start a new one anytime."
      />
      <States />
    </div>
  );
};

export default page;
