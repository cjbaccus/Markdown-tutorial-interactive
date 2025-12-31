import { motion } from 'framer-motion'
import { useTutorial } from '../../context/TutorialContext'

function ProgressBar() {
  const { lessons, progress } = useTutorial()
  const completedCount = progress.completedLessons.length
  const totalCount = lessons.length
  const percentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center gap-4">
          <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full"
            />
          </div>
          <div className="text-sm font-semibold text-gray-700 whitespace-nowrap">
            {completedCount} / {totalCount}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgressBar
