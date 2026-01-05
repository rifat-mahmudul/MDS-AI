
"use client"
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react'
import React from 'react'
import { UserProfileApiResponse } from './user-data-type';
import ProfilePicture from './profile-picture';
import Link from 'next/link';
import { User, Shield } from "lucide-react"
import { usePathname } from "next/navigation";
import { SettingSidebarSkeleton } from './setting-sidebar-skeleton';

const SettingSidebar = () => {
  const session = useSession();
  const status = session?.status;
  const token = (session?.data?.user as { accessToken: string })?.accessToken;
  const pathname = usePathname();

  const { data, isLoading } = useQuery<UserProfileApiResponse>({
    queryKey: ["user-data"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
      return await res.json();
    },
    enabled: !!token
  })


  if (status === "loading" || isLoading) {
    return <SettingSidebarSkeleton />;
  }


  return (
    <div>
      <div className="h-auto pb-5 bg-white rounded-lg shadow-[0_4px_8px_rgba(0,0,0,0.12)]">
        <div className="w-full h-[187px] rounded-t-lg bg-gradient-to-tr from-primary/60 via-primary/90 to-primary" />
        {/* profile picture  */}
        <div>
          <ProfilePicture />
        </div>
        {/* user info  */}
        <div className='pt-6 pb-10'>
          <h4 className="text-xl md:text-2xl font-semibold leading-[120%] text-primary text-center">{data?.data?.firstName} {data?.data?.lastName}</h4>
          <p className='text-sm font-normal leading-[120%] text-[#68706A] text-center pt-1'>{data?.data?.professionTitle || ""}</p>
        </div>
        <div className='px-6'>
          <ul>
            <li className="text-base font-normal text-[#5B6574] leading-[120%] "><strong className="text-base font-semibold leading-[120%] text-[#5B6574]">Name :</strong> {data?.data?.firstName || ""}{data?.data?.lastName || ""}</li>
            <li className="text-base font-normal text-[#5B6574] leading-[120%] py-3"><strong className="text-base font-semibold leading-[120%] text-[#5B6574]">Email :</strong> {data?.data?.email || ""}</li>
            <li className="text-base font-normal text-[#5B6574] leading-[120%] "><strong className="text-base font-semibold leading-[120%] text-[#5B6574]">Phone :</strong> {data?.data?.phone || "N/A"}</li>
            <li className="text-base font-normal text-[#5B6574] leading-[120%] py-3"><strong className="text-base font-semibold leading-[120%] text-[#5B6574]">Location :</strong> {data?.data?.location || "N/A"}</li>
            <li className="text-base font-normal text-[#5B6574] leading-[120%] "><strong className="text-base font-semibold leading-[120%] text-[#5B6574]">Member Since :</strong> 14 August, 2025</li>
          </ul>
        </div>

        {/* Menus  */}
        <div className="px-6 pt-8">
          <h4 className="text-lg font-semibold text-[#343A40] leading-[120%] pb-3">Menus</h4>

          <div>
            <ul className="flex flex-col gap-4">
              <Link href="/settings/personal-information">
                <li className={`flex items-center gap-2 text-base font-medium leading-[150%] text-[#343A40] py-2 px-3  rounded-[6px] ${pathname === "/settings/personal-information" ? "bg-[#EEE]" : ""}`}> <User />
                  Personal Information
                </li>  </Link>
              <Link href="/settings/change-password">
                <li className={`flex itesm-center gap-2 text-base font-medium leading-[150%] text-[#343A40] py-2 px-3  rounded-[6px] ${pathname === "/settings/change-password" ? "bg-[#EEE]" : ""}`}> <Shield />
                  Security
                </li> </Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingSidebar