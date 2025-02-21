import { create } from 'zustand';

interface GlobalStore {
    isDarkMode: boolean;
    isSidebarCollapsed: boolean;
    isChinese: boolean;
    setDarkMode: (isDarkMode: boolean) => void;
    setSidebarCollapsed: (isSidebarCollapsed: boolean) => void;
    setChinese: (isChinese: boolean) => void;
}

export const useStore = create<GlobalStore>((set) => ({
    isDarkMode: false,
    isSidebarCollapsed: false,
    isChinese:true,
    setDarkMode: (isDarkMode) => set(() => ({ isDarkMode })),
    setSidebarCollapsed: (isSidebarCollapsed) => set(() => ({ isSidebarCollapsed })),
    setChinese: (isChinese) => set(() => ({ isChinese })),
}));