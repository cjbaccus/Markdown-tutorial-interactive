const ACHIEVEMENTS = [
  {
    id: 'first-lesson',
    title: 'Getting Started',
    description: 'Complete your first lesson',
    icon: '🎯',
    check: (progress) => progress.completedLessons.length >= 1,
  },
  {
    id: 'three-lessons',
    title: 'Making Progress',
    description: 'Complete 3 lessons',
    icon: '🚀',
    check: (progress) => progress.completedLessons.length >= 3,
  },
  {
    id: 'all-lessons',
    title: 'Markdown Master',
    description: 'Complete all lessons',
    icon: '🏆',
    check: (progress, lessons) => progress.completedLessons.length >= lessons.length,
  },
  {
    id: 'point-collector',
    title: 'Point Collector',
    description: 'Earn 50 points',
    icon: '⭐',
    check: (progress) => progress.totalPoints >= 50,
  },
  {
    id: 'dedicated-learner',
    title: 'Dedicated Learner',
    description: 'Complete lessons on consecutive days',
    icon: '🔥',
    check: (progress) => {
      // This is simplified - would need more complex date tracking for real streak detection
      return progress.streak >= 2
    },
  },
]

export function checkAchievements(progress, lessons) {
  const earnedAchievements = []

  for (const achievement of ACHIEVEMENTS) {
    const alreadyEarned = progress.achievements.includes(achievement.id)
    if (!alreadyEarned && achievement.check(progress, lessons)) {
      earnedAchievements.push(achievement)
    }
  }

  return earnedAchievements
}

export function getAllAchievements() {
  return ACHIEVEMENTS
}
