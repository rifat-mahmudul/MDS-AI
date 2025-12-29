import { create } from "zustand";

interface ISearchFilter {
  search: string;
  setSearch: (value: string) => void;
}

const initialStates = {
  search: "",
};

export const useSearchFilter = create<ISearchFilter>((set) => ({
  ...initialStates,
  setSearch: (value: string) => set({ search: value }),
}));
