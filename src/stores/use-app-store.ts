import { create } from "zustand";

interface IAppStore {}

export const useAppStore = create<IAppStore>((set, get) => ({}));
