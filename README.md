# DeHTML Studio

A modern, fast, and secure toolkit for HTML manipulation built with React and Vite. Experience a clean, professional interface with powerful built-in tools.

## Features

- **Strip HTML Tags**: Instantly extract plain text from complex HTML content.
- **Encode / Decode Entities**: Easily convert special characters to HTML entities and back.
- **Diff Viewer**: Compare two blocks of text or code line-by-line.
- **Formatter**: Clean up and beautify messy HTML code.

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the local development server:

```bash
npm run dev
```

### Production Build

To structure the application for production, run:

```bash
npm run build
```

The output will be generated in the `dist` directory, fully optimized and ready to deploy to GitHub Pages.

## Deployment to GitHub Pages

The application is pre-configured for GitHub pages deployment (`base: '/DeHTML/'` in `vite.config.js`).

1. Ensure the `dist` folder is correctly generated.
2. Push your code to your repository.
3. Configure your GitHub Pages settings to use **GitHub Actions** as the source.

## Testing

This project uses Vitest and React Testing Library for standard unit tests. To run tests:

```bash
npm test
```

## Legacy Support

The previous vanilla JavaScript implementation is preserved in the `/legacy` folder and remains accessible via the `/legacy/index.html` path in production.

---
