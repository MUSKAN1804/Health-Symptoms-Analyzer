/**
 * Mock 'AI' engine:
 * - takes [{name,severity}]
 * - returns probable conditions with:
 *   condition, confidence, risk, percentDanger, message, precautions[], kit[]
 *
 * This is for demo / portfolio only.
 */

const DB = {
  fever: [
    {
      condition: 'Viral Fever',
      base: 50,
      precautions: ['Rest properly', 'Drink plenty of fluids', 'Monitor temperature every 4–6 hours'],
      kit: ['Thermometer', 'Paracetamol (as advised)', 'ORS']
    },
    {
      condition: 'Dengue (possible)',
      base: 65,
      precautions: ['Watch for severe body pain', 'Check platelet count if advised', 'Avoid self‑medication with NSAIDs'],
      kit: ['Thermometer', 'ORS', 'Mosquito repellent']
    }
  ],
  cough: [
    {
      condition: 'Common Cold / Viral URI',
      base: 35,
      precautions: ['Steam inhalation', 'Warm fluids', 'Avoid cold drinks'],
      kit: ['Cough lozenges', 'Saline nasal spray']
    },
    {
      condition: 'Bronchitis (possible)',
      base: 55,
      precautions: ['Avoid smoke & dust', 'Consult doctor if cough > 2 weeks'],
      kit: ['Mask', 'Prescribed inhaler (if any)']
    }
  ],
  headache: [
    {
      condition: 'Tension Headache',
      base: 30,
      precautions: ['Reduce screen time', 'Practice relaxation / stretching'],
      kit: ['Pain reliever as prescribed', 'Eye drops (if strain)']
    },
    {
      condition: 'Migraine',
      base: 45,
      precautions: ['Avoid bright light', 'Maintain sleep schedule'],
      kit: ['Cold pack', 'Anti‑migraine meds (if prescribed)']
    }
  ],
  cramps: [
    {
      condition: 'Muscle Cramps',
      base: 30,
      precautions: ['Gentle stretching', 'Hydration', 'Light massage'],
      kit: ['Electrolyte drink', 'Magnesium rich food']
    },
    {
      condition: 'Electrolyte Imbalance (possible)',
      base: 50,
      precautions: ['Oral rehydration solution', 'Avoid over‑exertion in heat'],
      kit: ['ORS', 'Salt / lemon drink']
    }
  ],
  'leg pain': [
    {
      condition: 'Muscle Strain / Overuse',
      base: 35,
      precautions: ['Rest leg', 'Ice pack', 'Avoid heavy exercise'],
      kit: ['Crepe bandage', 'Pain relief gel']
    },
    {
      condition: 'DVT / Nerve Issue (possible)',
      base: 60,
      precautions: ['Check for swelling / redness', 'Seek doctor if pain sudden or severe'],
      kit: ['Compression stockings (if advised)']
    }
  ],
  'chest pain': [
    {
      condition: 'Cardiac Cause (possible emergency)',
      base: 80,
      precautions: ['Call emergency if pain is crushing / radiating', 'Do not exert', 'Sit upright'],
      kit: ['Emergency numbers handy']
    },
    {
      condition: 'Musculoskeletal Pain',
      base: 40,
      precautions: ['Local rest', 'Gentle stretching'],
      kit: ['Topical pain relief']
    }
  ],
  'shortness of breath': [
    {
      condition: 'Asthma / Respiratory issue',
      base: 70,
      precautions: ['Use prescribed inhaler', 'Avoid triggers like dust, smoke'],
      kit: ['Inhaler (if prescribed)', 'Mask']
    }
  ],
  'abdominal pain': [
    {
      condition: 'Gastritis / Indigestion',
      base: 40,
      precautions: ['Avoid spicy / oily food', 'Eat small frequent meals'],
      kit: ['Antacid (as prescribed)']
    },
    {
      condition: 'Appendicitis / Surgical cause (possible)',
      base: 65,
      precautions: ['Seek urgent evaluation if severe, localised right‑side pain', 'Do not self‑medicate heavily'],
      kit: ['Basic medical file ready']
    }
  ],
  vomiting: [
    {
      condition: 'Gastroenteritis / Food poisoning',
      base: 55,
      precautions: ['Take small sips of water / ORS', 'Avoid solid food until better'],
      kit: ['ORS', 'Antiemetic (if prescribed)']
    }
  ],
  dizziness: [
    {
      condition: 'Low BP / Dehydration',
      base: 45,
      precautions: ['Sit or lie down immediately', 'Hydrate slowly'],
      kit: ['ORS', 'BP monitor (if available)']
    }
  ],
  rash: [
    {
      condition: 'Allergic Skin Reaction',
      base: 35,
      precautions: ['Avoid suspected allergen', 'Do not scratch', 'Use mild soap'],
      kit: ['Mild antihistamine (as advised)', 'Calamine lotion']
    }
  ],
  bleeding: [
    {
      condition: 'Active Bleeding',
      base: 85,
      precautions: ['Apply direct pressure', 'Seek emergency help', 'Do not remove deeply embedded objects'],
      kit: ['Sterile gauze', 'Bandage', 'Gloves']
    }
  ]
}

function labelFromPct(p){
  if(p >= 85) return 'Critical'
  if(p >= 65) return 'High'
  if(p >= 40) return 'Medium'
  return 'Low'
}

export function analyzeSymptoms(symptoms){
  const normalized = symptoms.map(s => ({
    name: s.name.toLowerCase(),
    severity: s.severity || 3
  }))

  const aggregate = {}

  normalized.forEach(sym => {
    Object.keys(DB).forEach(key => {
      if(sym.name.includes(key) || key.includes(sym.name)){
        DB[key].forEach(item => {
          const id = item.condition
          const severityBoost = (sym.severity / 5) * 20 // 0–20
          const raw = item.base + severityBoost
          const pct = Math.max(10, Math.min(98, Math.round(raw)))

          if(!aggregate[id]){
            aggregate[id] = {
              condition: item.condition,
              confidence: pct,
              precautions: item.precautions,
              kit: item.kit
            }
          } else {
            aggregate[id].confidence = Math.min(98, Math.round((aggregate[id].confidence + pct)/2))
          }
        })
      }
    })
  })

  if(Object.keys(aggregate).length === 0){
    return [{
      condition: 'General Consultation Recommended',
      confidence: 30,
      risk: labelFromPct(30),
      percentDanger: 30,
      message: 'Symptoms are non‑specific. Please consult a registered medical professional.',
      precautions: ['Monitor your symptoms', 'Avoid self medication', 'Visit a doctor if it persists'],
      kit: ['Thermometer', 'Basic first‑aid kit']
    }]
  }

  const list = Object.values(aggregate).map(entry => {
    const risk = labelFromPct(entry.confidence)
    let message = 'Monitor at home and follow precautions.'
    if(entry.confidence >= 85) message = 'Possible emergency — seek immediate medical attention.'
    else if(entry.confidence >= 65) message = 'High risk — consult a doctor as soon as possible.'

    return {
      ...entry,
      risk,
      percentDanger: entry.confidence,
      message
    }
  })

  list.sort((a,b) => b.confidence - a.confidence)
  return list
}
