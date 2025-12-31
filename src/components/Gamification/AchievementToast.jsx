import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTutorial } from '../../context/TutorialContext'

function AchievementToast() {
  const { recentAchievement, clearAchievement } = useTutorial()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (recentAchievement) {
      setIsVisible(true)
      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(() => {
          clearAchievement()
        }, 300)
      }, 4000)

      return () => clearTimeout(timer)
    }
  }, [recentAchievement, clearAchievement])

  return (
    <AnimatePresence>
      {isVisible && recentAchievement && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 50, x: '-50%' }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-8 left-1/2 z-50 max-w-md"
        >
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg shadow-2xl p-6 border-4 border-yellow-400">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-4xl"
                >
                  {recentAchievement.icon || '🏆'}
                </motion.div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-1">Achievement Unlocked!</h3>
                <p className="text-lg font-semibold">{recentAchievement.title}</p>
                <p className="text-sm opacity-90 mt-1">{recentAchievement.description}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default AchievementToast
