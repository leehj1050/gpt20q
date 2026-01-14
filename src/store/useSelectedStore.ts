import { create } from "zustand";

interface SelectedType {
    selectedType: string | null
    setSelectedType: (type: string) => void
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