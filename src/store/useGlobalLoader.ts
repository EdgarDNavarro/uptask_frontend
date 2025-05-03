import { create } from "zustand";

export const useGlobalLoader = create<{
  loading: boolean;
  setLoading: (value: boolean) => void;
}>((set) => ({
  loading: false,
  setLoading: (value) => set({ loading: value }),
}));
