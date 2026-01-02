import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useTutorial } from '../context/TutorialContext'
import Editor from './Editor'
import Preview from './Preview'
import HintPanel from './HintPanel'
import ValidationFeedback from './ValidationFeedback'

function LessonContainer() {
  const { currentLesson, userCode, setUserCode, validateAnswer, nextLesson } = useTutorial()
  const [isValidating, setIsValidating] = useState(false)
  const [validationResult, setValidationResult] = useState(null)

  useEffect(() => {
    // Reset validation when lesson changes
    setValidationResult(null)
    setIsValidating(false)
  }, [currentLesson])

  const handleSubmit = async () => {
    setIsValidating(true)
    const result = await validateAnswer(userCode)
    setValidationResult(result)
    setIsValidating(false)

    if (result.isCorrect) {
      // Auto-advance after 2 seconds on success
      setTimeout(() => {
        nextLesson()
      }, 2000)
    }
  }

  const handleKeyPress = (e) => {
    // Ctrl/Cmd + Enter to submit
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault()
      handleSubmit()
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [userCode])

  if (!currentLesson) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Loading lesson...</h2>
          <p className="text-gray-600 dark:text-gray-300">Please wait</p>
        </div>
      </div>
    )
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentLesson.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="h-full flex flex-col"
      >
        {/* Lesson Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 transition-colors duration-300">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{currentLesson.title}</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-1">{currentLesson.description}</p>
          </div>
        </div>

        {/* Lesson Content */}
        <div className="flex-1 overflow-hidden">
          <div className="max-w-7xl mx-auto h-full p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
              {/* Left Column - Instructions & Hints */}
              <div className="flex flex-col gap-4 overflow-auto">
                {/* Instructions */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Instructions</h3>
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {currentLesson.content}
                    </ReactMarkdown>
                  </div>

                  <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h4 className="font-semibold text-blue-900 dark:text-blue-300 text-sm mb-2">Task</h4>
                    <p className="text-blue-800 dark:text-blue-200 text-sm">{currentLesson.task}</p>
                  </div>
                </div>

                {/* Hints */}
                <HintPanel hints={currentLesson.hints || []} />

                {/* Submit and Skip Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={handleSubmit}
                    disabled={isValidating || !userCode.trim()}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-sm"
                  >
                    {isValidating ? 'Checking...' : 'Submit Answer'}
                  </button>

                  <button
                    onClick={nextLesson}
                    className="bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-sm"
                  >
                    Skip
                  </button>
                </div>

                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  Press Ctrl+Enter (Cmd+Enter on Mac) to submit
                </p>

                {/* Validation Feedback */}
                <AnimatePresence>
                  {validationResult && (
                    <ValidationFeedback result={validationResult} />
                  )}
                </AnimatePresence>
              </div>

              {/* Right Column - Editor & Preview */}
              <div className="flex flex-col gap-4 h-full min-h-[600px]">
                <div className="flex-1 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm transition-colors duration-300">
                  <Editor
                    value={userCode}
                    onChange={setUserCode}
                    placeholder={currentLesson.starterCode || "Type your markdown here..."}
                  />
                </div>

                <div className="flex-1 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm transition-colors duration-300">
                  <Preview markdown={userCode} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default LessonContainer
