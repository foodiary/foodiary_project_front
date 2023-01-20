import create from 'zustand';

interface LoadingType{
  loading: boolean;
  setLoading: (state: LoadingType['loading'])=>void;
}
export const useLoadingStore = create<LoadingType>(set=>({
  loading: false,
  setLoading: (state:boolean)=>set({loading:state}),
}))