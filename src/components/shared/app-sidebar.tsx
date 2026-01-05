"use client";
import {
  ClipboardClock,
  LayoutDashboard,
  LogOut,
  MessageCircleQuestionMark,
  Receipt,
  Settings,
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
import { Skeleton } from "@/components/ui/skeleton"; // Skeleton import করুন
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

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
  {
    title: "Profile Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const pathName = usePathname();
  const session = useSession();
  const token = session?.data?.user?.accessToken;
  const status = session?.status;

  const { data, isLoading } = useQuery({
    queryKey: ["user-data"],
    queryFn: async () =>
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(async (res) => await res.json()),
    enabled: !!token,
  });

  return (
    <Sidebar>
      <SidebarContent className="bg-[#1c3345] text-white py-8">
        <SidebarGroup>
          <SidebarGroupLabel className="mb-10 gap-2">
            <Link href={`/settings`}>
              <div className="h-16 w-16 rounded-full">
                {isLoading ? (
                  <Skeleton className="h-16 w-16 rounded-full bg-gray-700" />
                ) : data?.data?.profileImage ? (
                  <Image
                    src={data.data.profileImage}
                    alt="Profile"
                    width={64}
                    height={64}
                    className="h-full w-full object-cover rounded-full"
                    priority
                  />
                ) : (
                  <div className="h-full w-full bg-gray-600 rounded-full flex items-center justify-center">
                    <span className="text-white">
                      {data?.data?.firstName?.[0] || "J"}
                      {data?.data?.lastName?.[0] || "S"}
                    </span>
                  </div>
                )}
              </div>
            </Link>

            <div className="text-white">
              {isLoading || status === "loading" ? (
                <div className="space-y-2">
                  <Skeleton className="h-6 w-32 bg-gray-700" />
                  <Skeleton className="h-4 w-24 bg-gray-700" />
                </div>
              ) : (
                <>
                  <h1 className="text-xl">
                    {data?.data?.firstName} {data?.data?.lastName}
                    {!data?.data?.firstName &&
                      !data?.data?.lastName &&
                      "Jane Smith, RN"}
                  </h1>
                  <p>
                    {data?.data?.professionTitle || (
                      <Link href={"/settings"} className="hover:underline">
                        Add Professional Title
                      </Link>
                    )}
                  </p>
                </>
              )}
            </div>
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col justify-between min-h-[calc(100vh-180px)]">
              <div className="space-y-3">
                {items.map((item) => {
                  const isActive =
                    pathName === item?.url ||
                    pathName.startsWith(item?.url + "/");

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
                <button
                  onClick={() => signOut({ callbackUrl: "/auth/sign-in" })}
                  className="flex items-center gap-2 font-bold text-red-500 bg-[#ffffff10] h-[50px] w-full px-4 rounded-lg hover:bg-red-500 hover:text-white"
                >
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
