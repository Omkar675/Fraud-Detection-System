import React from 'react'
import Spline from '@splinetool/react-spline'

const Hero = () => {
  return (
    <section className="relative min-h-[70vh] md:min-h-[80vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" />
      </div>

      {/* Glass overlay content */}
      <div className="relative z-10 flex items-center justify-center h-full p-6">
        <div className="max-w-5xl w-full">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                  Universal Transaction Detection
                </h1>
                <p className="mt-3 md:mt-4 text-slate-200/80 text-sm md:text-base max-w-xl">
                  A unified, multi-model pipeline that routes inputs to the right detector
                  across credit cards, bank transfers, wallets and crypto — with real-time
                  3D fintech vibes.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-200 text-xs border border-emerald-400/30">
                  Live Preview
                </span>
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 text-xs border border-blue-400/30">
                  Glassmorphic 3D
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient edge */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none" />
    </section>
  )
}

export default Hero
