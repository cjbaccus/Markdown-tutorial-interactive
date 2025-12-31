---
id: 4
title: "Links"
description: "Add hyperlinks to your markdown"
difficulty: "beginner"
points: 15
task: "Create a link with the text 'Google' that points to https://google.com"
starterCode: ""
expectedPattern: "\\[Google\\]\\(https?://google\\.com\\)"
validationMode: "source"
hints:
  - "Link syntax: [text](url)"
  - "Put the link text in square brackets []"
  - "Put the URL in parentheses () right after"
  - "Don't forget the https:// in the URL"
successMessage: "Perfect! You can now create links in markdown!"
---

Links in markdown use a simple syntax:

**Basic Link:**
```
[Link Text](https://example.com)
```

**Example:**
```
[Visit GitHub](https://github.com)
```
Becomes: [Visit GitHub](https://github.com)

**Link with Title:**
You can add a title that appears on hover:
```
[Google](https://google.com "Go to Google")
```

**Reference-Style Links:**
For cleaner text, you can use references:
```
[Link text][reference]

[reference]: https://example.com
```

**Auto-linking:**
Wrap URLs in angle brackets for automatic links:
```
<https://example.com>
```

**Tips:**
- No spaces between `]` and `(`
- Make sure your URL is complete (include https://)
- Link text should be descriptive
