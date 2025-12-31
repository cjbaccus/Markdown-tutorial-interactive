---
id: 5
title: "Images"
description: "Embed images in your markdown"
difficulty: "beginner"
points: 20
task: "Add an image with alt text 'Logo' and URL https://example.com/logo.png"
starterCode: ""
expectedPattern: "^\\s*!\\[Logo\\]\\(https?://example\\.com/logo\\.png\\)\\s*$"
validationMode: "source"
hints:
  - "Image syntax is similar to links, but starts with !"
  - "Format: ![alt text](image-url)"
  - "The exact format needed: ![Logo](https://example.com/logo.png)"
  - "Make sure there are no extra spaces inside the brackets or parentheses"
successMessage: "Amazing! You've completed all the basic markdown lessons!"
---

Images in markdown are very similar to links, but with an exclamation mark at the start:

**Basic Image:**
```
![Alt Text](image-url.jpg)
```

**Example:**
```
![Cat Photo](https://example.com/cat.jpg)
```

**Image with Title:**
```
![Alt Text](image.jpg "Image Title")
```

**What is Alt Text?**
- Describes the image for screen readers
- Shows if the image fails to load
- Helps with SEO and accessibility
- Always use descriptive alt text!

**Reference-Style Images:**
```
![Alt text][image-ref]

[image-ref]: https://example.com/image.jpg
```

**Image as a Link:**
Wrap the image in a link:
```
[![Alt text](image.jpg)](https://link-url.com)
```

**Tips:**
- Always include alt text for accessibility
- Use descriptive file names
- Make sure image URLs are accessible
- The `!` at the start is what makes it an image, not a link
