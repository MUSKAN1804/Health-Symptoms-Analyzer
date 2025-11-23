import React, { useState } from 'react'
import { useSymptomStore } from '../store/useStore'
import { analyzeSymptoms } from '../lib/mockEngine'
import { motion } from 'framer-motion'

const COMMON_SYMPTOMS = [
  'fever',
  'cough',
  'headache',
  'cramps',
  'leg pain',
  'chest pain',
  'shortness of breath',
  'abdominal pain',
  'vomiting',
  'dizziness',
  'rash',
  'bleeding'
]

export default function SearchBar(){
  const [input, setInput] = useState('')
  const [severity, setSeverity] = useState(3)
  const symptoms = useSymptomStore(s => s.symptoms)
  const addSymptom = useSymptomStore(s => s.addSymptom)
  const setResults = useSymptomStore(s => s.setResults)

  const handleAdd = () => {
    if(!input.trim()) return
    const sym = { name: input.trim(), severity }
    const next = [...symptoms, sym]
    addSymptom(sym)
    const res = analyzeSymptoms(next)
    setResults(res)
    setInput('')
  }

  const handleKey = (e) => {
    if(e.key === 'Enter'){
      e.preventDefault()
      handleAdd()
    }
  }

  const quickAdd = (sym) => {
    const symObj = { name: sym, severity }
    const next = [...symptoms, symObj]
    addSymptom(symObj)
    const res = analyzeSymptoms(next)
    setResults(res)
  }

  return (
    <motion.div
      initial={{opacity:0,y:8}}
      animate={{opacity:1,y:0}}
      className='bg-slate-900/80 border border-slate-700 rounded-2xl p-4 shadow-lg'
    >
      <div className='flex flex-col gap-3 md:flex-row md:items-center'>
        <div className='flex-1'>
          <label className='text-xs uppercase tracking-wide text-slate-400'>
            Symptom search
          </label>
          <input
            value={input}
            onChange={e=>setInput(e.target.value)}
            onKeyDown={handleKey}
            list='symptom-list'
            placeholder='Type any symptom (e.g. fever, leg pain, chest pain, cramps...)'
            className='w-full bg-transparent border-b border-slate-600 focus:border-amber-400 outline-none py-2 text-base'
          />
          <datalist id='symptom-list'>
            {COMMON_SYMPTOMS.map(s => <option key={s} value={s} />)}
          </datalist>
        </div>

        <div className='flex items-center gap-3'>
          <div>
            <div className='text-xs text-slate-400 mb-1 flex items-center gap-1'>
              Severity <span className='text-amber-400 text-sm'>({severity}/5)</span>
            </div>
            <input
              type='range'
              min='1'
              max='5'
              value={severity}
              onChange={e=>setSeverity(Number(e.target.value))}
            />
          </div>

          <button
            type='button'
            onClick={handleAdd}
            className='mt-2 md:mt-5 inline-flex items-center gap-2 bg-amber-400 text-slate-900 font-semibold px-4 py-2 rounded-xl shadow hover:bg-amber-300 transition text-sm'
          >
            Analyze
            <span>⚡</span>
          </button>
        </div>
      </div>

      <div className='mt-3 flex flex-wrap gap-2 text-xs text-slate-300'>
        <span className='text-slate-500'>Quick add:</span>
        {COMMON_SYMPTOMS.map(sym => (
          <button
            key={sym}
            type='button'
            onClick={()=>quickAdd(sym)}
            className='px-3 py-1 bg-slate-800 rounded-full hover:bg-slate-700 transition'
          >
            {sym}
          </button>
        ))}
      </div>
    </motion.div>
  )
}
