import { create } from "zustand";

interface SidebarStore {
  showInMobile: boolean;
  toggle: () => void;
  hide: () => void;
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  showInMobile: false,
  toggle: () => set((state) => ({ showInMobile: !state.showInMobile })),
  hide: () => set({ showInMobile: false }),
}));
