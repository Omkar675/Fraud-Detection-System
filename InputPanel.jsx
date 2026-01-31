import React, { useState } from 'react'

const InputPanel = ({ selectedModel, onSubmit, isLoading }) => {
  const [text, setText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!text.trim()) return
    onSubmit({ payload: text, model_hint: selectedModel })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={
          selectedModel === 'bank_transfer'
            ? 'Paste bank transfer details (amount, sender, receiver, timestamps, reference, channel, etc.)'
            : 'Paste transaction details (amount, merchant/account, timestamp, channel, geo, device, etc.)'
        }
        className="w-full min-h-[120px] resize-y rounded-2xl bg-white/5 border border-white/10 outline-none p-4 text-white placeholder-white/50 focus:border-white/30"
      />
      <div className="flex items-center justify-between">
        <p className="text-xs text-white/60">
          Tip: Provide as much metadata as possible for better detection.
        </p>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_10px_30px_rgba(56,189,248,0.35)]"
        >
          {isLoading ? 'Analyzing…' : 'Analyze Transaction'}
        </button>
      </div>
    </form>
  )
}

export default InputPanel
