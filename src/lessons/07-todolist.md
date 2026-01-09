---
id: 7
title: "Todo Lists"
description: "Create interactive task checklists"
difficulty: "intermediate"
points: 25
task: "Create a todo list with 'Update homework' and 'Dishes' as unchecked items"
starterCode: ""
expectedPattern: "^- \\[ \\] Update homework\\s*\\n- \\[ \\] Dishes"
validationMode: "source"
hints:
  - "Task lists use - [ ] for unchecked items"
  - "There's a space after the dash, then brackets with a space inside [ ]"
  - "Add another space after the closing bracket before the item text"
  - "Put each todo item on its own line"
  - "Format: - [ ] Your task here"
successMessage: "Excellent! You've mastered todo lists!"
---

Markdown supports interactive task lists (also called checklists) that can be used for tracking todos, tasks, and progress.

**Task List Syntax:**
```
- [ ] Unchecked item
- [x] Checked item
```

**How it renders:**
- ☐ Unchecked item
- ☑ Checked item

**Key points:**
- Start with a dash `-` followed by a space
- Add square brackets with a space inside `[ ]` for unchecked items
- Use `[x]` or `[X]` for checked/completed items
- Add a space after the closing bracket
- Each item goes on a new line

**Example todo list:**
```
- [ ] Update homework
- [ ] Dishes
- [ ] Call dentist
- [x] Morning exercise
```

**Nested task lists:**
You can combine task lists with nested lists:
```
- [ ] Complete project
  - [x] Research phase
  - [ ] Development phase
  - [ ] Testing phase
```

Task lists are perfect for project management, daily todos, and tracking progress in documentation!
