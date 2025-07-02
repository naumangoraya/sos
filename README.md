# SOS

A modern web application built with [Vite](https://vitejs.dev/), [React](https://react.dev/), and [Tailwind CSS](https://tailwindcss.com/). This project provides a customer and item management interface with a sidebar for navigation and search/filter features.

## Features
- Customer information management
- Item information management
- Sidebar navigation for quick access to different modules
- Search and filter functionality for customers and items
- Built with React 19, Vite, and Tailwind CSS 3

## Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/naumangoraya/sos.git
cd sos
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```
The app will be available at the URL shown in your terminal (usually [http://localhost:5173](http://localhost:5173)).

### 4. Build for production
```bash
npm run build
```
The production-ready files will be generated in the `dist` directory.

### 5. Preview the production build
```bash
npm run preview
```

### 6. Lint the code
```bash
npm run lint
```

## Project Structure
```
sos/
  ├── src/           # Source code (React components, styles)
  ├── public/        # Static assets (if any)
  ├── index.html     # Main HTML file
  ├── package.json   # Project metadata and scripts
  ├── tailwind.config.js  # Tailwind CSS configuration
  └── ...
```

## Customization
- Tailwind CSS is configured via `tailwind.config.js` and used in `src/index.css`.
- ESLint is set up for code linting (`eslint.config.js`).

## License
This project is for educational and demonstration purposes.
