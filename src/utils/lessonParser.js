import matter from 'gray-matter'

export function parseLesson(rawContent) {
  const { data, content } = matter(rawContent)

  return {
    id: data.id,
    title: data.title,
    description: data.description,
    difficulty: data.difficulty || 'beginner',
    points: data.points || 10,
    task: data.task,
    starterCode: data.starterCode || '',
    expectedPattern: data.expectedPattern,
    validationMode: data.validationMode || 'source', // 'source' or 'rendered'
    hints: data.hints || [],
    successMessage: data.successMessage || 'Great job!',
    content: content.trim(),
  }
}

export async function loadLessons(lessonModules) {
  const lessons = []

  for (const module of lessonModules) {
    try {
      const rawContent = await module.content()
      const lesson = parseLesson(rawContent)
      lessons.push(lesson)
    } catch (error) {
      console.error('Error loading lesson:', error)
    }
  }

  // Sort by ID
  return lessons.sort((a, b) => a.id - b.id)
}
