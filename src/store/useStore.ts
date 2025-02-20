import { create } from 'zustand';

interface GlobalStore {
    isDarkMode: boolean;
    isSidebarCollapsed: boolean;
    setDarkMode: (isDarkMode: boolean) => void;
    setSidebarCollapsed: (isSidebarCollapsed: boolean) => void;
}

export const useStore = create<GlobalStore>((set) => ({
    isDarkMode: false,
    isSidebarCollapsed: false,
    setDarkMode: (isDarkMode) => set(() => ({ isDarkMode })),
    setSidebarCollapsed: (isSidebarCollapsed) => set(() => ({ isSidebarCollapsed })),
}));