import { AppSidebar } from "@/components/shared/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <div className="p-5 bg-[#f7f9fa] w-full">{children}</div>
      </SidebarProvider>
    </div>
  );
};

export default layout;
