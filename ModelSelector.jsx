import React from 'react'
import { CreditCard, Banknote, Wallet, Bitcoin } from 'lucide-react'

const models = [
  { key: 'credit_card', label: 'Credit Card', icon: CreditCard, color: 'from-blue-500/30 to-cyan-400/30' },
  { key: 'bank_transfer', label: 'Bank Transfer', icon: Banknote, color: 'from-emerald-500/30 to-teal-400/30' },
  { key: 'wallet', label: 'Mobile Wallet', icon: Wallet, color: 'from-violet-500/30 to-fuchsia-400/30' },
  { key: 'crypto', label: 'Crypto', icon: Bitcoin, color: 'from-amber-500/30 to-orange-400/30' },
]

const ModelSelector = ({ value, onChange }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {models.map(({ key, label, icon: Icon, color }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`group relative overflow-hidden rounded-2xl border transition duration-300 backdrop-blur-md 
            ${value === key ? 'border-white/40 bg-white/10' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-40 group-hover:opacity-60 transition-opacity`} />
          <div className="relative p-4 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-white/10 border border-white/10 
              ${value === key ? 'shadow-[0_0_20px_rgba(255,255,255,0.25)]' : ''}`}
            >
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-white">{label}</p>
              <p className="text-xs text-white/70">Route to {label} model</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  )
}

export default ModelSelector
