'use client';
import {
    Layout, Menu,
    SlidersHorizontal, DatabaseZap,
    Users, BookAudio, Workflow,
    BookOpenText,Unplug, ArrowLeftRight,
    type LucideIcon
} from "lucide-react";
import type { UrlObject } from "node:url";
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { useStore } from '@/store/useStore';
import { useTranslation } from 'react-i18next';
import Logo from "@/app/(components)/Logo/logo";


interface SidebarLinkProps {
    href: string | UrlObject;
    icon: LucideIcon;
    label: string;
    isCollapsed?: boolean;
}

const SidebarLink = ({
    href,
    icon: Icon,
    label,
    isCollapsed
}: SidebarLinkProps) => {
    const pathname = usePathname();
    const isActive = pathname === href || (pathname === '/' && href === '/dashboard');

    return (
        <Link href={href}>
            <div className={`cursor-pointer flex items-center ${isCollapsed
                ? "justify-center py-4" : "justify-start px-8 py-4"}
                hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors 
                ${isActive ? "bg-blue-200 text-white" : ""}
             `}>
                <Icon className='w-6 h-6 !text-gray-700' />

                <span className={`${isCollapsed ? "hidden" : "block"} font-medium text-gray-700`}>
                    {label}
                </span>
            </div>
        </Link>
    )
}

const Sidebar = () => {
    const { isSidebarCollapsed, setSidebarCollapsed } = useStore();

    const toggleSidebar = () => {
        setSidebarCollapsed(!isSidebarCollapsed);
    };

    const sidebarClassName = `fixed flex flex-col ${isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"
        } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;
    const { t } = useTranslation();

    return (
        <div className={sidebarClassName}>
            {/* TOP Logo */}
            <div className={`flex gap-3 justify-between md:justify-normal items-center pt-8 
                ${isSidebarCollapsed ? "px-2" : "px-8"}`}>
                <Logo className="w-11 h-11" />
                <h1 className={`${isSidebarCollapsed ? "hidden" : "block"} font-extrabold text-2xl`}>{t("app.title")}</h1>
                {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
                <button className='md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100'
                    onClick={toggleSidebar}>
                    <Menu className='w-4 h4' />
                </button>
            </div>
            {/* Links */}
            <div className='flex-grow mt-8'>

                <SidebarLink
                    href="/project"
                    icon={Layout}
                    label={t('sidebar.label.project')}
                    isCollapsed={isSidebarCollapsed}
                />
                <SidebarLink
                    href='/database'
                    icon={DatabaseZap}
                    label={t('sidebar.label.database')}
                    isCollapsed={isSidebarCollapsed}
                />
                <SidebarLink
                    href='/users'
                    icon={Users}
                    label={t('sidebar.label.users')}
                    isCollapsed={isSidebarCollapsed}
                />

                <SidebarLink
                    href='/store'
                    icon={BookAudio}
                    label={t('sidebar.label.store')}
                    isCollapsed={isSidebarCollapsed}
                />
                <SidebarLink
                    href='/flows'
                    icon={Workflow}
                    label={t('sidebar.label.flows')}
                    isCollapsed={isSidebarCollapsed}
                />
                <SidebarLink
                    href='/knowledge'
                    icon={BookOpenText}
                    label={t('sidebar.label.knowledge')}
                    isCollapsed={isSidebarCollapsed}
                />
                <SidebarLink
                    href='/plugins'
                    icon={Unplug}
                    label={t('sidebar.label.plugins')}
                    isCollapsed={isSidebarCollapsed}
                />
                <SidebarLink
                    href='/gateways'
                    icon={ArrowLeftRight}
                    label={t('sidebar.label.gateways')}
                    isCollapsed={isSidebarCollapsed}
                />

                <SidebarLink
                    href='/settings'
                    icon={SlidersHorizontal}
                    label={t('sidebar.label.settings')}
                    isCollapsed={isSidebarCollapsed}
                />
                

            </div>

            {/* Footer */}
            <div className={`${isSidebarCollapsed ? "hidden" : "block"} mb-10`}>
                <p className='text-center text-xs text-gray-500' >&copy; 2025 owiseman.com</p>
            </div>
        </div>
    );
}

export default Sidebar;