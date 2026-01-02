import { motion } from 'framer-motion'

function ValidationFeedback({ result }) {
  if (!result) return null

  const { isCorrect, message, pointsEarned } = result

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -10 }}
      transition={{ duration: 0.3 }}
      className={`rounded-lg p-4 ${
        isCorrect
          ? 'bg-green-50 dark:bg-green-900/30 border-2 border-green-500 dark:border-green-700'
          : 'bg-red-50 dark:bg-red-900/30 border-2 border-red-500 dark:border-red-700'
      }`}
    >
      <div className="flex items-start gap-3">
        {isCorrect ? (
          <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        )}
        <div className="flex-1">
          <h4 className={`font-semibold ${isCorrect ? 'text-green-900 dark:text-green-300' : 'text-red-900 dark:text-red-300'}`}>
            {isCorrect ? 'Correct!' : 'Not quite right'}
          </h4>
          <p className={`text-sm mt-1 ${isCorrect ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'}`}>
            {message}
          </p>
          {isCorrect && pointsEarned > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-2 inline-flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded-full text-sm font-semibold"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              +{pointsEarned} points
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default ValidationFeedback
