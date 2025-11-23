import React from 'react'
import { useSymptomStore } from '../store/useStore'
import { motion, AnimatePresence } from 'framer-motion'

function barColor(p){
  if(p >= 85) return 'from-red-600 to-red-400'
  if(p >= 65) return 'from-orange-500 to-orange-300'
  if(p >= 40) return 'from-yellow-400 to-yellow-200'
  return 'from-emerald-500 to-emerald-300'
}

export default function ResultsPanel(){
  const symptoms = useSymptomStore(s => s.symptoms)
  const results = useSymptomStore(s => s.results)
  const removeSymptom = useSymptomStore(s => s.removeSymptom)
  const clearAll = useSymptomStore(s => s.clearAll)

  return (
    <div className='mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6'>
      <section>
        <div className='flex items-center justify-between mb-3'>
          <h2 className='text-lg font-semibold'>Your symptoms</h2>
          <span className='text-xs text-slate-400'>{symptoms.length} selected</span>
        </div>

        <div className='space-y-3'>
          <AnimatePresence>
            {symptoms.length === 0 && (
              <motion.div
                initial={{opacity:0}}
                animate={{opacity:1}}
                className='text-slate-500 text-sm bg-slate-900/70 border border-dashed border-slate-700 rounded-xl p-4'
              >
                Start by adding at least one symptom to see risk %, precautions and kit suggestions.
              </motion.div>
            )}
          </AnimatePresence>

          {symptoms.map((s, idx) => (
            <motion.div
              key={s.name + idx}
              initial={{opacity:0,x:-8}}
              animate={{opacity:1,x:0}}
              className='bg-slate-900/80 border border-slate-700 rounded-xl p-3 flex items-center justify-between'
            >
              <div>
                <div className='font-medium'>{s.name}</div>
                <div className='text-xs text-slate-400'>Severity: {s.severity}/5</div>
              </div>
              <button
                onClick={()=>removeSymptom(idx)}
                className='text-xs px-2 py-1 rounded bg-red-600 hover:bg-red-500'
              >
                Remove
              </button>
            </motion.div>
          ))}
        </div>

        {symptoms.length > 0 && (
          <button
            onClick={clearAll}
            className='mt-4 text-xs px-3 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200'
          >
            Clear all
          </button>
        )}
      </section>

      <section>
        <h2 className='text-lg font-semibold mb-3'>AI-style analysis</h2>

        <div className='space-y-4'>
          <AnimatePresence>
            {results.length === 0 && (
              <motion.div
                initial={{opacity:0}}
                animate={{opacity:1}}
                className='text-slate-500 text-sm bg-slate-900/70 border border-dashed border-slate-700 rounded-xl p-4'
              >
                Once you add symptoms, you&apos;ll see possible conditions here with danger %, precautions and home‑care kit ideas.
              </motion.div>
            )}
          </AnimatePresence>

          {results.map((r, idx) => (
            <motion.div
              key={r.condition + idx}
              initial={{opacity:0,y:8}}
              animate={{opacity:1,y:0}}
              className='bg-slate-900/80 border border-slate-700 rounded-xl p-4 shadow-md'
            >
              <div className='flex items-start justify-between gap-3'>
                <div>
                  <div className='font-bold text-base'>{r.condition}</div>
                  <div className='text-xs mt-1 text-slate-300'>{r.message}</div>
                </div>
                <div className='text-right'>
                  <div className='text-[10px] uppercase tracking-wide text-slate-400'>Danger %</div>
                  <div className='text-2xl font-extrabold'>{r.percentDanger}%</div>
                  <div className='text-xs text-slate-300'>{r.risk}</div>
                </div>
              </div>

              <div className='mt-3'>
                <div className='w-full h-2 bg-slate-800 rounded-full overflow-hidden'>
                  <div
                    className={`h-2 bg-gradient-to-r ${barColor(r.percentDanger)}`}
                    style={{ width: `${r.percentDanger}%` }}
                  />
                </div>
              </div>

              <div className='mt-4 grid grid-cols-1 md:grid-cols-2 gap-3'>
                <div>
                  <div className='text-xs font-semibold text-slate-200 mb-1'>Precautions</div>
                  <ul className='text-xs text-slate-300 list-disc ml-4 space-y-1'>
                    {r.precautions.map((p, i) => <li key={i}>{p}</li>)}
                  </ul>
                </div>
                <div>
                  <div className='text-xs font-semibold text-slate-200 mb-1'>Suggested home kit</div>
                  <ul className='text-xs text-slate-300 list-disc ml-4 space-y-1'>
                    {r.kit.map((k, i) => <li key={i}>{k}</li>)}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
