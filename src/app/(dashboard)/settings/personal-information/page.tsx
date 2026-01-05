import React from "react";
import SettingSidebar from "../_components/settings-sidebar";
import PersonalInformationForm from "./_components/personal-information-form";
import AppTopBar from "@/components/shared/app-topbar";

const PersonalInfoPage = () => {
  return (
    <div className="">
      <AppTopBar title="Profile Settings" desc="" />

      <div className="grid grid-cols-1 md:grid-cols-7 gap-6 mt-5">
        <div className="md:col-span-2">
          <SettingSidebar />
        </div>
        <div className="h-auto md:col-span-5">
          <PersonalInformationForm />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoPage;
