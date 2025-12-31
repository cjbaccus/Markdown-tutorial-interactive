export function validateMarkdown(userInput, expectedPattern, mode = 'source') {
  if (!userInput || !expectedPattern) return false

  try {
    const pattern = new RegExp(expectedPattern, 'i')

    if (mode === 'source') {
      // Validate the raw markdown source
      return pattern.test(userInput.trim())
    } else if (mode === 'rendered') {
      // For rendered validation, we would need to convert markdown to HTML
      // and validate the HTML output
      // For simplicity, we'll use source validation for now
      return pattern.test(userInput.trim())
    }

    return false
  } catch (error) {
    console.error('Validation error:', error)
    return false
  }
}

export function fuzzyMatch(userInput, expected) {
  // Simple fuzzy matching - remove extra whitespace and compare
  const normalize = (str) => str.trim().replace(/\s+/g, ' ').toLowerCase()
  return normalize(userInput) === normalize(expected)
}
