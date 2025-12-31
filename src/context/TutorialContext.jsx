import { createContext, useContext, useState, useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { parseLesson } from '../utils/lessonParser'
import { validateMarkdown } from '../utils/markdownValidator'
import { checkAchievements } from '../utils/achievements'

// Import lesson files as raw strings
import lesson01 from '../lessons/01-headings.md?raw'
import lesson02 from '../lessons/02-emphasis.md?raw'
import lesson03 from '../lessons/03-lists.md?raw'
import lesson04 from '../lessons/04-links.md?raw'
import lesson05 from '../lessons/05-images.md?raw'
import lesson06 from '../lessons/06-tables.md?raw'

const TutorialContext = createContext()

export function useTutorial() {
  const context = useContext(TutorialContext)
  if (!context) {
    throw new Error('useTutorial must be used within TutorialProvider')
  }
  return context
}

export function TutorialProvider({ children }) {
  const [lessons, setLessons] = useState([])
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0)
  const [userCode, setUserCode] = useState('')
  const [recentAchievement, setRecentAchievement] = useState(null)

  const [progress, setProgress] = useLocalStorage('markdown-tutorial-progress', {
    completedLessons: [],
    totalPoints: 0,
    achievements: [],
    streak: 0,
    lastCompletedDate: null,
  })

  useEffect(() => {
    try {
      // Parse all lesson files
      const rawLessons = [lesson01, lesson02, lesson03, lesson04, lesson05, lesson06]
      const parsedLessons = rawLessons.map(raw => parseLesson(raw))

      // Sort by ID
      parsedLessons.sort((a, b) => a.id - b.id)

      setLessons(parsedLessons)
    } catch (error) {
      console.error('Error loading lessons:', error)
    }
  }, [])

  useEffect(() => {
    // Reset user code when lesson changes
    if (lessons[currentLessonIndex]) {
      setUserCode(lessons[currentLessonIndex].starterCode || '')
    }
  }, [currentLessonIndex, lessons])

  const validateAnswer = async (code) => {
    const lesson = lessons[currentLessonIndex]
    if (!lesson) return { isCorrect: false, message: 'No lesson found' }

    const isCorrect = validateMarkdown(code, lesson.expectedPattern, lesson.validationMode)

    if (isCorrect) {
      const pointsEarned = lesson.points

      // Update progress
      const newProgress = {
        ...progress,
        completedLessons: [...new Set([...progress.completedLessons, lesson.id])],
        totalPoints: progress.totalPoints + pointsEarned,
        lastCompletedDate: new Date().toISOString(),
      }

      setProgress(newProgress)

      // Check for achievements
      const newAchievements = checkAchievements(newProgress, lessons)
      if (newAchievements.length > 0) {
        const latestAchievement = newAchievements[newAchievements.length - 1]
        setRecentAchievement(latestAchievement)
        newProgress.achievements = [...new Set([...progress.achievements, latestAchievement.id])]
        setProgress(newProgress)
      }

      return {
        isCorrect: true,
        message: lesson.successMessage,
        pointsEarned,
      }
    }

    return {
      isCorrect: false,
      message: 'Not quite right. Check the hints and try again!',
      pointsEarned: 0,
    }
  }

  const nextLesson = () => {
    if (currentLessonIndex < lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1)
    }
  }

  const previousLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1)
    }
  }

  const goToLesson = (index) => {
    if (index >= 0 && index < lessons.length) {
      setCurrentLessonIndex(index)
    }
  }

  const clearAchievement = () => {
    setRecentAchievement(null)
  }

  const value = {
    lessons,
    currentLesson: lessons[currentLessonIndex],
    currentLessonIndex,
    userCode,
    setUserCode,
    progress,
    recentAchievement,
    validateAnswer,
    nextLesson,
    previousLesson,
    goToLesson,
    clearAchievement,
  }

  return (
    <TutorialContext.Provider value={value}>
      {children}
    </TutorialContext.Provider>
  )
}
