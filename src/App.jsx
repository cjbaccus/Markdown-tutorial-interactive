import { useState } from 'react'
import { TutorialProvider } from './context/TutorialContext'
import LessonContainer from './components/LessonContainer'
import LessonNav from './components/LessonNav'
import PointsDisplay from './components/Gamification/PointsDisplay'
import ProgressBar from './components/Gamification/ProgressBar'
import AchievementToast from './components/Gamification/AchievementToast'

function App() {
  return (
    <TutorialProvider>
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Interactive Markdown Tutorial
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Learn markdown by doing
                </p>
              </div>
              <PointsDisplay />
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
  )
}

export default App
