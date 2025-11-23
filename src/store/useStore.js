import { create } from 'zustand'

export const useSymptomStore = create((set) => ({
  symptoms: [], // {name,severity}
  results: [],  // analysis results
  addSymptom: (s) => set(state => ({ symptoms: [...state.symptoms, s] })),
  removeSymptom: (idx) => set(state => ({
    symptoms: state.symptoms.filter((_,i)=>i!==idx)
  })),
  clearAll: () => set({ symptoms: [], results: [] }),
  setResults: (results) => set({ results })
}))
