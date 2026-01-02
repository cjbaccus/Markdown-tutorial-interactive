import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function HintPanel({ hints = [] }) {
  const [revealedHints, setRevealedHints] = useState([])
  const [isExpanded, setIsExpanded] = useState(false)

  if (hints.length === 0) return null

  const revealNextHint = () => {
    if (revealedHints.length < hints.length) {
      setRevealedHints([...revealedHints, hints[revealedHints.length]])
      setIsExpanded(true)
    }
  }

  const hasMoreHints = revealedHints.length < hints.length

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-300">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Hints {revealedHints.length > 0 && `(${revealedHints.length}/${hints.length})`}
          </h3>
        </div>
        <svg
          className={`w-5 h-5 text-gray-400 dark:text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-gray-200 dark:border-gray-700"
          >
            <div className="px-6 py-4 space-y-3">
              {revealedHints.map((hint, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg border border-yellow-200 dark:border-yellow-800"
                >
                  <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 bg-yellow-500 text-white rounded-full text-xs font-bold">
                    {index + 1}
                  </span>
                  <p className="text-sm text-yellow-900 dark:text-yellow-200">{hint}</p>
                </motion.div>
              ))}

              {hasMoreHints && (
                <button
                  onClick={revealNextHint}
                  className="w-full mt-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-lg transition-colors text-sm"
                >
                  Reveal Next Hint ({revealedHints.length + 1}/{hints.length})
                </button>
              )}

              {!hasMoreHints && revealedHints.length > 0 && (
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
                  All hints revealed
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default HintPanel
