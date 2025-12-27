import AppTopBar from "@/components/shared/app-topbar";
import React from "react";
import { DocumentForm } from "./_components/document-form";

const page = () => {
  return (
    <div className="space-y-8">
      <AppTopBar
        title="New Session"
        desc="Upload clinical notes for a single resident. Files are processed temporarily and not stored."
      />

      <div>
        <DocumentForm />
      </div>
    </div>
  );
};

export default page;
