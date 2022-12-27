import React from 'react';
import create from 'zustand';

// test용 state
interface State{
  bears: number;
  increasePopulation: ()=>void;
  decreasePopulation: ()=>void;
  removeAllBears: ()=>void;
}

export const useStore = create<State>(set => ({
  bears: 0,
  increasePopulation: ()=>set((state)=>({bears: state.bears+1})),
  decreasePopulation: ()=>set((state)=>({bears: state.bears-1})),
  removeAllBears: ()=>set({bears:0}),
}));

