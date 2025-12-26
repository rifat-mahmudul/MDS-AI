"use client";
import {
  ClipboardClock,
  LayoutDashboard,
  LogOut,
  MessageCircleQuestionMark,
  Receipt,
  SquarePlus,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "New Session",
    url: "/new-session",
    icon: SquarePlus,
  },
  {
    title: "Report History",
    url: "/report-history",
    icon: ClipboardClock,
  },
  {
    title: "Billing",
    url: "/billing",
    icon: Receipt,
  },
  {
    title: "Support",
    url: "/support",
    icon: MessageCircleQuestionMark,
  },
];

export function AppSidebar() {
  const pathName = usePathname();

  return (
    <Sidebar>
      <SidebarContent className="bg-[#1c3345] text-white py-8">
        <SidebarGroup>
          <SidebarGroupLabel className="mb-10 gap-2">
            <div className="h-16 w-16 rounded-full">
              <Image
                src={`/user_placeholder.png`}
                alt="img.png"
                width={1000}
                height={1000}
                className="h-full w-full object-cover rounded-full"
              />
            </div>

            <div className="text-white">
              <h1 className="text-xl">Jane Smith, RN</h1>
              <p>MDS Coordinator</p>
            </div>
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col justify-between min-h-[calc(100vh-180px)]" >
              <div className="space-y-3">
                {items.map((item) => {
                  const isActive = pathName === item?.url;

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className={`h-[50px] hover:text-primary hover:font-semibold ${
                          isActive
                            ? "bg-white text-primary hover:text-primary font-semibold"
                            : "bg-[#ffffff10]"
                        }`}
                      >
                        <Link href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </div>

              <div>
                <button className="flex items-center gap-2 font-bold text-red-500 bg-[#ffffff10] h-[50px] w-full px-4 rounded-lg hover:bg-red-500 hover:text-white">
                  <span>
                    <LogOut className="h-5 w-5" />
                  </span>{" "}
                  <span>Log Out</span>
                </button>
              </div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
