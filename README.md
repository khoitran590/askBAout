# Yes or No - React App

A simple React application with two buttons ("Yes" and "No") where the "No" button moves away when you hover over it, preventing you from clicking it.

## Features

- React-based component structure for easy customization
- The "No" button moves to a random position when hovered
- Modern build setup with Vite
- Responsive design with gradient background

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

Build for production:

```bash
npm run build
```

### Preview Production Build

Preview the production build:

```bash
npm run preview
```

## Customization

Since this is a React app, you can easily customize:

- **Button colors and styles**: Edit `src/App.css`
- **Button behavior**: Modify the event handlers in `src/App.jsx`
- **Layout and content**: Update the JSX in `src/App.jsx`
- **Add more components**: Create new component files in the `src` directory
- **Add state management**: Use React hooks or add Redux/Zustand if needed
- **Add animations**: Use CSS transitions, Framer Motion, or other animation libraries

## Project Structure

```
├── index.html          # Entry HTML file
├── vite.config.js      # Vite configuration
├── package.json        # Dependencies and scripts
├── src/
│   ├── main.jsx        # React entry point
│   ├── App.jsx         # Main App component
│   ├── App.css         # App styles
│   └── index.css       # Global styles
└── README.md           # This file

```

