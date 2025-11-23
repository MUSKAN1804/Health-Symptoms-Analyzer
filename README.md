# Health Symptom Analyzer (Frontend Demo)

Dark‑mode, recruiter‑ready UI to quickly try symptom analysis flows.

## Tech stack
- React + Vite
- Tailwind CSS (dark UI)
- Zustand (state)
- Framer Motion (smooth animations)
- Mock “AI” engine returning:
  - danger / risk %
  - risk label (Low / Medium / High / Critical)
  - precautions
  - home‑care kit suggestions

## How to run

1. Install **Node.js 18+** from the official site.
2. Unzip this folder and open it in a terminal:

   ```bash
   cd health_symptom_analyzer
   npm install
   npm run dev
   ```

3. Open the URL printed in your terminal (usually `http://localhost:5173`).

## Usage

- Type a symptom (like **fever**, **cramps**, **leg pain**, **chest pain**, **headache**, etc.).  
- Choose **severity** on the slider (1–5).  
- Click **Analyze ⚡** or use the quick‑add chips.  
- Right panel shows:
  - possible conditions
  - danger % + label
  - precautions
  - suggested home‑care kit.

> ⚠️ This is **not** real medical advice. It’s a portfolio/demo project only.
