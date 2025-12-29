import { create } from "zustand";

interface ISearchFilter {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const initialStates = {
  searchTerm: "",
};

export const useSearchFilter = create<ISearchFilter>((set) => ({
  ...initialStates,
  setSearchTerm: (value: string) => set({ searchTerm: value }),
}));
