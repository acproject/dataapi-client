"use client"

import { useEffect } from "react";
import { useStore } from "@/store/useStore";
import Sidebar from '@/app/(components)/Sidebar';
import Navbar from "@/app/(components)/Navbar";
import '@/i18n';
export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const { isDarkMode, isSidebarCollapsed } = useStore();
    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }

    }, [isDarkMode]);

    return (
        <div className={`${isDarkMode ? 'dark' : ''} flex bg-gray-50 text-gray-900 w-full min-h-screen`}>
            <Sidebar />
            <main className={`flex flex-col w-full h-full py-7 px-9 bg-gray-50 ${isSidebarCollapsed ? 'md:pl-24' : 'md:pl-72'}`}
            >
                <Navbar />
                {children}

            </main>
        </div>
    )
       
}

