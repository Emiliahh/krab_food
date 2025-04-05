import { create } from "zustand";

interface SearchState {
    search:string;
    from:string;
    to:string;
    categoryId:string;
    desc:boolean;
    setSearch: (search: string) => void;
    setFrom: (from: string) => void;
    setTo: (to: string) => void;
    setCategoryId: (categoryId: string) => void;
    clearSearch: () => void;
    setDesc:()=>void;
}

const useSearchStore = create<SearchState>((set)=>({
    search:"",
    from:"",
    to:"",
    categoryId:"",
    desc:false,
    setSearch:(search:string)=>set({search}),
    setFrom:(from:string)=>set({from}),
    setTo:(to:string)=>set({to}),
    setCategoryId:(categoryId:string)=>set({categoryId}),
    clearSearch: () => set({ search: "", from: "", to: "", categoryId:"", desc:false }),
    setDesc:()=>set((state)=>({desc:!state.desc})),
}))
export default useSearchStore;