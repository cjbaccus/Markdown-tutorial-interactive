import { useState } from 'react'
import { TutorialProvider } from './context/TutorialContext'
import { DarkModeProvider } from './context/DarkModeContext'
import LessonContainer from './components/LessonContainer'
import LessonNav from './components/LessonNav'
import PointsDisplay from './components/Gamification/PointsDisplay'
import ProgressBar from './components/Gamification/ProgressBar'
import AchievementToast from './components/Gamification/AchievementToast'
import DarkModeToggle from './components/DarkModeToggle'

function App() {
  return (
    <DarkModeProvider>
      <TutorialProvider>
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          {/* Header */}
          <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Interactive Markdown Tutorial
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    Learn markdown by doing
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <DarkModeToggle />
                  <PointsDisplay />
                </div>
              </div>
            </div>
          </header>

          {/* Progress Bar */}
          <ProgressBar />

          {/* Navigation */}
          <LessonNav />

          {/* Main Content */}
          <main className="flex-1">
            <LessonContainer />
          </main>

          {/* Achievement Toast */}
          <AchievementToast />
        </div>
      </TutorialProvider>
    </DarkModeProvider>
  )
}

export default App
