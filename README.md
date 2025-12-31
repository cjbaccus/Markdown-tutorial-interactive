# Interactive Markdown Tutorial

An engaging, web-based tutorial for learning Markdown syntax through hands-on practice with real-time preview, validation, and gamification.

## Features

- **Interactive Learning**: Practice markdown in a live editor with instant preview
- **6 Comprehensive Lessons**: From headings to tables
- **Progressive Hints**: Get help when you're stuck
- **Smart Validation**: Automatic checking of your markdown syntax
- **Gamification**: Earn points, unlock achievements, and track progress
- **Beautiful UI**: Modern interface with smooth animations
- **Progress Tracking**: Your progress is saved locally

## Quick Start

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open your browser to **http://localhost:5173/**

### Building for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## Deploying to a Hosted System

The tutorial can be deployed as a static website to any hosting platform. After running `npm run build`, the production-ready files will be in the `dist/` directory.

### Option 1: Vercel (Recommended)

Vercel provides seamless deployment for Vite projects with zero configuration:

1. Install Vercel CLI (optional):
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

**Or deploy via GitHub:**
1. Push your code to a GitHub repository
2. Visit [vercel.com](https://vercel.com) and sign in
3. Click "New Project" and import your repository
4. Vercel auto-detects Vite - just click "Deploy"

### Option 2: Netlify

Deploy with drag-and-drop or continuous deployment:

**Drag-and-Drop:**
1. Run `npm run build`
2. Visit [app.netlify.com/drop](https://app.netlify.com/drop)
3. Drag the `dist/` folder to the upload area

**Git-based Deployment:**
1. Push code to GitHub/GitLab/Bitbucket
2. Visit [netlify.com](https://netlify.com) and sign in
3. Click "New site from Git"
4. Connect your repository
5. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

### Option 3: GitHub Pages

Deploy directly from your GitHub repository:

1. Update `vite.config.js` with your repository name:
   ```javascript
   export default defineConfig({
     base: '/your-repo-name/', // Replace with your repo name
     // ... rest of config
   })
   ```

2. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

3. Add deploy script to `package.json`:
   ```json
   {
     "scripts": {
       "deploy": "npm run build && gh-pages -d dist"
     }
   }
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

5. Enable GitHub Pages in repository settings (Settings → Pages → Source: gh-pages branch)

### Option 4: Custom Server (Apache/Nginx)

Deploy to your own server:

1. Build the project:
   ```bash
   npm run build
   ```

2. Upload the `dist/` directory to your web server

3. **Apache**: Create/update `.htaccess` in the `dist/` directory:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

4. **Nginx**: Configure your server block:
   ```nginx
   server {
     listen 80;
     server_name your-domain.com;
     root /path/to/dist;
     index index.html;

     location / {
       try_files $uri $uri/ /index.html;
     }
   }
   ```

### Option 5: Other Platforms

The built application works with any static hosting service:
- **Cloudflare Pages**: Connect GitHub repo, build command: `npm run build`, output: `dist`
- **AWS S3 + CloudFront**: Upload `dist/` contents to S3 bucket configured for static hosting
- **Firebase Hosting**: Use Firebase CLI to deploy the `dist/` directory
- **Render**: Create a Static Site, build command: `npm run build`, publish directory: `dist`

### Post-Deployment Notes

- The app uses localStorage for progress tracking - no backend required
- All content is client-side; no server-side rendering needed
- The app is a Single Page Application (SPA) - ensure your hosting supports client-side routing
- Update `base` in `vite.config.js` if deploying to a subdirectory

## How to Use

1. **Start the Tutorial**: The app loads with Lesson 1 (Headings)
2. **Read the Instructions**: Each lesson explains a markdown concept
3. **Complete the Task**: Write markdown in the editor to complete the challenge
4. **Use Hints**: Click "Hints" if you need help
5. **Submit Your Answer**: Press `Ctrl+Enter` (or `Cmd+Enter` on Mac) or click "Submit Answer"
6. **Skip if Stuck**: Use the "Skip" button to move to the next lesson without completing the current one
7. **Earn Points**: Get points for correct answers and unlock achievements
8. **Progress**: Complete lessons sequentially or skip ahead as needed

## Lessons Included

1. **Headings** - Learn to create headings with `#` symbols
2. **Text Emphasis** - Master bold and italic formatting
3. **Lists** - Create ordered and unordered lists
4. **Links** - Add hyperlinks to your markdown
5. **Images** - Embed images in markdown
6. **Tables** - Build tables with pipes and dashes

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **react-markdown** - Markdown rendering
- **gray-matter** - Lesson file parsing
- **buffer** - Browser polyfill for Node.js Buffer API

## Project Structure

```
markdown-tutorial/
├── src/
│   ├── components/          # React components
│   ├── lessons/             # Lesson content (markdown files)
│   ├── context/             # React Context for state
│   ├── hooks/               # Custom React hooks
│   ├── utils/               # Utility functions
│   └── App.jsx              # Main app component
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Adding New Lessons

1. Create a new markdown file in `src/lessons/` (e.g., `07-code-blocks.md`)
2. Add YAML frontmatter with lesson metadata:

```yaml
---
id: 7
title: "Your Lesson Title"
description: "Brief description"
difficulty: "beginner"
points: 10
task: "What the user needs to do"
expectedPattern: "regex pattern for validation"
hints:
  - "First hint"
  - "Second hint"
successMessage: "Success message"
---

Lesson content in markdown here...
```

3. Import the lesson in `src/context/TutorialContext.jsx`
4. Add it to the `rawLessons` array

## Keyboard Shortcuts

- `Ctrl+Enter` / `Cmd+Enter` - Submit your answer

## Browser Support

Works in all modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari

## Troubleshooting

### "Buffer is not defined" Error

If you encounter a "Buffer is not defined" error, ensure the `buffer` package is installed:

```bash
npm install buffer
```

The app includes a browser polyfill for Node.js's Buffer API (required by gray-matter) in `src/main.jsx`.

## License

MIT

## Contributing

Contributions are welcome! Feel free to:
- Add new lessons
- Improve existing content
- Fix bugs
- Enhance the UI

## Support

For issues or questions, please open an issue on the repository.

---

Happy learning! 🚀
