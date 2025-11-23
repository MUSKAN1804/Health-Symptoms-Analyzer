import React from 'react'
import SearchBar from './components/SearchBar'
import ResultsPanel from './components/ResultsPanel'

export default function App(){
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50 p-4 md:p-8'>
      <div className='max-w-6xl mx-auto bg-slate-900/70 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl'>
        <header className='mb-6 md:mb-8'>
          <div className='flex items-center justify-between gap-3 flex-wrap'>
            <div>
              <h1 className='text-3xl md:text-4xl font-extrabold tracking-tight flex items-center gap-2'>
                Health Symptom Analyzer <span>🩺</span>
              </h1>
              <p className='text-slate-300 mt-1 text-sm md:text-base'>
                Check any health symptom instantly — get risk %, danger level, precautions & home‑care kit suggestions in one place.
              </p>
            </div>
            
          </div>
        </header>

        <SearchBar />
        <ResultsPanel />

        <footer className='mt-8 text-[10px] text-slate-500'>
          This is a demo interface only and does not provide real medical advice. Always consult a qualified doctor for diagnosis & treatment.
        </footer>
      </div>
    </div>
  )
}
