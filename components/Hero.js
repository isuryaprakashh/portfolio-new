'use client'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="flex flex-col items-center pt-20 pb-20 px-10 text-center">
      {/* Badge */}
      <motion.div
        className="inline-flex items-center gap-2 px-4 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-[13px] font-medium text-gray-900 mb-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="bg-black text-white text-[10px] px-2 py-0.5 rounded-full font-bold">SP</span>
        <span>Engineer · Explorer · Builder</span>
        <span className="text-gray-400 font-normal">Based in India &gt;</span>
      </motion.div>

      {/* Heading */}
      <motion.h1
        className="text-display mb-8 max-w-[900px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {/* Building Systems <br />  */}
        <span className="inline-flex items-center justify-center w-16 h-16 bg-[var(--color-brand-accent)] rounded-lg mx-3 -rotate-12 translate-y-2">
          <span className="rotate-12 font-bold text-3xl">SP</span>
        </span>
        Surya Prakash.
      </motion.h1>

      {/* Features list */}
      <motion.div
        className="flex flex-wrap justify-center gap-8 mb-12 text-[15px] font-medium text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {[
          { label: 'AI & Systems Exploration' },
          { label: 'Minimal Digital Interfaces' },
          { label: 'Intelligent Applications' }
        ].map((feat) => (
          <div key={feat.label} className="flex items-center gap-2">
            <span className="text-gray-300">↳</span>
            {feat.label}
          </div>
        ))}
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
      >
        <button className="px-10 py-5 bg-black text-white text-[16px] font-bold rounded-xl shadow-xl hover:bg-gray-900 transition-all mb-4">
          Let's Build Something
        </button>
        <p className="text-[13px] text-gray-400">Exploring AI, scalable systems, and immersive web experiences.</p>
      </motion.div>

      {/* Placeholder for the phone images shown in screenshot */}
      <motion.div
        className="mt-20 w-full max-w-[1000px] h-[500px] bg-gray-50 rounded-[40px] border border-gray-100 flex items-center justify-center text-gray-200 text-3xl font-bold italic"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        [ App Interface Preview ]
      </motion.div>
    </section>
  )
}
