import { create } from "zustand";

interface ISearchFilter {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  riskLevel: string;
  setRiskLevel: (value: string) => void;
  dateRange: string;
  setDateRange: (value: string) => void;
  clearFilters: () => void;
}

const initialStates = {
  searchTerm: "",
  riskLevel: "",
  dateRange: "",
};

export const useSearchFilter = create<ISearchFilter>((set) => ({
  ...initialStates,
  setSearchTerm: (value: string) => set({ searchTerm: value }),
  setRiskLevel: (value: string) => set({ riskLevel: value }),
  setDateRange: (value: string) => set({ dateRange: value }),
  clearFilters: () => set({ searchTerm: "", riskLevel: "" }),
}));
