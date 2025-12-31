import { useTutorial } from '../context/TutorialContext'

function LessonNav() {
  const { lessons, currentLessonIndex, goToLesson, progress } = useTutorial()

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto py-3">
          {lessons.map((lesson, index) => {
            const isCompleted = progress.completedLessons.includes(lesson.id)
            const isCurrent = index === currentLessonIndex
            const isLocked = index > 0 && !progress.completedLessons.includes(lessons[index - 1].id)

            return (
              <button
                key={lesson.id}
                onClick={() => !isLocked && goToLesson(index)}
                disabled={isLocked}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all duration-200
                  ${isCurrent
                    ? 'bg-blue-600 text-white shadow-md'
                    : isCompleted
                    ? 'bg-green-100 text-green-800 hover:bg-green-200'
                    : isLocked
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                `}
              >
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white bg-opacity-20">
                  {isCompleted ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : isLocked ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </span>
                <span>{lesson.title}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default LessonNav
