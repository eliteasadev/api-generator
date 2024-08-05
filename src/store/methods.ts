import { create } from "zustand";

type Store = {
  methods: Array<String>;
  setMethods: (methods: Array<String>) => void;
};

export const useStore = create<Store>()((set) => ({
  methods: [],
  setMethods: (methods) => set({ methods }),
}));
