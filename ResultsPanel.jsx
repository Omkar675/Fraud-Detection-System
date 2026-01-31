import React from 'react'
import { CheckCircle2, AlertTriangle, Gauge, Globe, Fingerprint } from 'lucide-react'

const ResultsPanel = ({ result }) => {
  if (!result) {
    return (
      <div className="rounded-2xl bg-white/5 border border-white/10 p-6 text-white/70">
        Results will appear here after analysis.
      </div>
    )
  }

  const { verdict = 'unknown', score = 0.0, signals = [], meta = {} } = result
  const isFraud = verdict?.toLowerCase() === 'fraud'

  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center gap-3">
          {isFraud ? (
            <AlertTriangle className="w-6 h-6 text-amber-400" />
          ) : (
            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
          )}
          <div>
            <p className="text-white font-semibold">{isFraud ? 'Potential Fraud' : 'Likely Legitimate'}</p>
            <p className="text-white/70 text-sm">Model verdict: {verdict} · Confidence: {(score * 100).toFixed(1)}%</p>
          </div>
        </div>

        {/* Signals */}
        {signals?.length > 0 && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
            {signals.map((s, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-sm text-white/90">{s.name}</p>
                <p className="text-xs text-white/60">{s.detail}</p>
              </div>
            ))}
          </div>
        )}

        {/* Meta */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
          {meta?.geo && (
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
              <Globe className="w-5 h-5 text-sky-400" />
              <div>
                <p className="text-xs text-white/60">Geo</p>
                <p className="text-sm text-white/90">{meta.geo}</p>
              </div>
            </div>
          )}
          {meta?.device && (
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
              <Fingerprint className="w-5 h-5 text-fuchsia-400" />
              <div>
                <p className="text-xs text-white/60">Device</p>
                <p className="text-sm text-white/90">{meta.device}</p>
              </div>
            </div>
          )}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
            <Gauge className="w-5 h-5 text-emerald-400" />
            <div>
              <p className="text-xs text-white/60">Confidence</p>
              <p className="text-sm text-white/90">{(score * 100).toFixed(1)}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultsPanel
