import React, { useState } from 'react'
import Hero from './components/Hero'
import ModelSelector from './components/ModelSelector'
import InputPanel from './components/InputPanel'
import ResultsPanel from './components/ResultsPanel'

function App() {
  const [selectedModel, setSelectedModel] = useState('bank_transfer')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)

  const handleSubmit = async (payload) => {
    setIsLoading(true)
    setResult(null)

    const base = import.meta.env.VITE_BACKEND_URL
    try {
      if (base) {
        const res = await fetch(`${base}/analyze`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        const data = await res.json()
        setResult(data)
      } else {
        // Graceful fallback demo result when backend route isn't wired yet
        await new Promise((r) => setTimeout(r, 800))
        setResult({
          verdict: Math.random() > 0.5 ? 'fraud' : 'legit',
          score: 0.6 + Math.random() * 0.35,
          signals: [
            { name: 'Velocity Check', detail: 'Transfer frequency above user baseline' },
            { name: 'Geo Mismatch', detail: 'IP location differs from usual region' },
          ],
          meta: { geo: 'IN → US', device: 'iOS · Safari' },
        })
      }
    } catch (e) {
      console.error(e)
      setResult({ verdict: 'unknown', score: 0.0, signals: [{ name: 'Error', detail: 'Failed to reach backend' }] })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Hero 3D */}
      <Hero />

      {/* Control surface */}
      <section className="relative z-10 -mt-8 md:-mt-16 pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column: model + input */}
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-3xl bg-white/5 border border-white/10 p-6 backdrop-blur-xl">
                <h2 className="text-white text-lg font-semibold mb-4">Choose Detector</h2>
                <ModelSelector value={selectedModel} onChange={setSelectedModel} />
              </div>

              <div className="rounded-3xl bg-white/5 border border-white/10 p-6 backdrop-blur-xl">
                <h2 className="text-white text-lg font-semibold mb-4">Input</h2>
                <InputPanel selectedModel={selectedModel} onSubmit={handleSubmit} isLoading={isLoading} />
              </div>
            </div>

            {/* Right column: results */}
            <div className="space-y-6">
              <div className="rounded-3xl bg-white/5 border border-white/10 p-6 backdrop-blur-xl">
                <h2 className="text-white text-lg font-semibold mb-4">Analysis</h2>
                <ResultsPanel result={result} />
              </div>

              <div className="rounded-3xl bg-white/5 border border-white/10 p-6 backdrop-blur-xl">
                <h3 className="text-white text-base font-semibold">Pipeline Overview</h3>
                <p className="text-white/70 text-sm mt-2">
                  Inputs are routed to the best-suited model based on content heuristics and metadata. Each model returns
                  a verdict and confidence, which is then normalized and presented here. Configure your backend URL to
                  enable real responses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 pb-10">
        <div className="mx-auto max-w-6xl">
          <div className="text-center text-white/60 text-xs">
            Built for multi-model fintech detection • Glassmorphic 3D interface
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
