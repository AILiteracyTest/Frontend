import { create } from "zustand";

type FontSize = "normal" | "large";

interface FontStore {
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
}

export const useFontStore = create<FontStore>((set) => ({
  fontSize: "normal",
  setFontSize: (size) => set({ fontSize: size }),
}));
