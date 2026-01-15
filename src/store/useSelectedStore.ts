import { SajuType } from "@/app/types";
import { create } from "zustand";

interface SelectedType {
    selectedType: SajuType | null
    setSelectedType: (type: SajuType) => void
    resetSelectedType: () => void;
}


export const useSelectedStore = create<SelectedType>((set) => ({
    selectedType: null,
    setSelectedType: (type) => set({
        selectedType: type
    }),

    resetSelectedType: () => set({
        selectedType: null
    })
}));