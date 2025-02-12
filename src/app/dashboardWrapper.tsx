"use client"

import StoreProvider, { useAppSelector } from "@/store/redux"
import { useEffect } from "react";
import Sidebar from "./(components)/Sidebar";
import Navbar from "./(components)/Navbar";

const DashboardLayout = ({children}:{children: React.ReactNode}) => {
  const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed);
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  });
  return (
   <div className={`${isDarkMode ? "dark" : ""}  flex bg-gray-50 text-gray-900 w-full min-h-screen` }>
    <Sidebar/>
    <main className={`flex flex-col w-full h-full py-7 px-9 bg-gray-50 ${isSidebarCollapsed ? "md:pl-24": "md:pl-72"}`}>
      <Navbar/>
      {children}
    </main>
   </div>
  )
}

const DashboardWrapper = ({
    children,
}: {
    children: React.ReactNode
}) => {
  return (
    <StoreProvider>
      <DashboardLayout> {children}</DashboardLayout>
    </StoreProvider>
  )
}

export default DashboardWrapper;