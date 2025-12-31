---
id: 3
title: "Lists"
description: "Create ordered and unordered lists"
difficulty: "beginner"
points: 15
task: "Create an unordered list with three items: Apple, Banana, and Cherry"
starterCode: ""
expectedPattern: "^[-*+]\\s+Apple\\s*\\n[-*+]\\s+Banana\\s*\\n[-*+]\\s+Cherry"
validationMode: "source"
hints:
  - "Unordered lists use -, *, or + at the start of each line"
  - "Add a space after the - symbol"
  - "Put each item on a new line"
  - "All three items should use the same symbol (-, *, or +)"
successMessage: "Great work! You've created your first list!"
---

Markdown supports two types of lists:

**Unordered Lists:**
```
- Item 1
- Item 2
- Item 3
```

You can also use `*` or `+` instead of `-`:
```
* Item A
* Item B
```

**Ordered Lists:**
```
1. First item
2. Second item
3. Third item
```

**Nested Lists:**
You can indent items with 2 spaces to create sub-lists:
```
- Main item
  - Sub item
  - Another sub item
- Another main item
```

**Important:** Always include a space after the `-`, `*`, `+`, or number.
