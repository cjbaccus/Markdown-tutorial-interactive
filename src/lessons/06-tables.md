---
id: 6
title: "Tables"
description: "Create tables in markdown"
difficulty: "intermediate"
points: 25
task: "Create a table with headers 'Name' and 'Age', and one row with data: 'Alice' and '25'"
starterCode: ""
expectedPattern: "\\|\\s*Name\\s*\\|\\s*Age\\s*\\|[\\s\\S]*\\|\\s*[-:]+\\s*\\|\\s*[-:]+\\s*\\|[\\s\\S]*\\|\\s*Alice\\s*\\|\\s*25\\s*\\|"
validationMode: "source"
hints:
  - "Tables use the pipe character | to separate columns"
  - "The header row is followed by a separator row with dashes ---"
  - "Each row should have | at the start and end, with | between each column"
  - "Example format: | Header1 | Header2 |"
successMessage: "Excellent! You've mastered markdown tables!"
---

Tables in markdown use pipes (`|`) and dashes (`-`) to create structured data:

**Basic Table Structure:**
```
| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |
```

**The Separator Row:**
- The second row must contain dashes (`---`)
- Separates headers from data
- At least 3 dashes per column

**Example:**
```
| Name    | Age | City      |
| ------- | --- | --------- |
| Alice   | 25  | New York  |
| Bob     | 30  | London    |
| Charlie | 35  | Tokyo     |
```

**Column Alignment:**
You can align columns using colons:
```
| Left aligned | Center aligned | Right aligned |
| :----------- | :------------: | ------------: |
| Left         | Center         | Right         |
```
- `:---` = left aligned (default)
- `:---:` = center aligned
- `---:` = right aligned

**Tips:**
- You don't need to line up the pipes perfectly (but it's easier to read)
- Each row must have the same number of columns
- You can include other markdown formatting inside cells (like **bold** or *italic*)
- Leave spaces around content for better readability

**Common Mistakes:**
- Forgetting the separator row with dashes
- Mismatched number of columns
- Missing pipes at the start or end of rows
