# Notes Application

A modern, responsive note-taking application built with React, featuring rich text editing, image uploads, and link management.

## Features

- **Create and Manage Notes**: Easily create, edit, and delete notes with a clean interface
- **Rich Content Support**: Add images directly to your notes with resize controls
- **Search Functionality**: Quickly find notes by searching through titles and content
- **Persistent Storage**: All notes are automatically saved to localStorage
- **Responsive Design**: Fully functional on desktop, tablet, and mobile devices

## Technology Stack

- **React**: Component-based UI library
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Modern icon library
- **localStorage**: Client-side data persistence

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd notes-app
```

2. Install dependencies:
```bash
npm install
```

3. Install required packages:
```bash
npm install react-router-dom lucide-react
```

4. Start the development server:
```bash
npm run dev
```

## Project Structure
```
src/
├── components/
│   └── SideBar.jsx       # Navigation and notes list
├── pages/
│   └── Home.jsx          # Main editor interface
├── App.jsx               # Root component with routing
└── main.jsx              # Application entry point
```

## Usage

### Creating a Note
Click the "New Note" button in the sidebar to create a new note.

### Adding Content
- **Text**: Type directly in the text editor
- **Images**: Click "Add Image" to upload and embed images with adjustable sizing

### Managing Notes
- **Edit**: Click on any note in the sidebar to edit it
- **Delete**: Click the trash icon next to a note to remove it
- **Search**: Use the search bar to filter notes by title or content

### Image Controls
- Use the zoom in/out buttons to resize images (100px - 800px)
- Click the X button to remove an image from the note
- Images are stored as base64 data in localStorage

## Key Components

### App.jsx
Main application component that manages:
- Note state and localStorage synchronization
- CRUD operations for notes
- Routing configuration

### SideBar.jsx
Left navigation panel featuring:
- Notes list with timestamps
- Search functionality
- New note creation button
- Delete functionality for individual notes

### Home.jsx
Main editor interface with:
- Title and text editing
- Image upload and management
- Responsive toolbar

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Development

The application uses Vite as the build tool for fast development and optimized production builds.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Data Storage

All notes are stored in the browser's localStorage, which means:
- Notes persist across browser sessions
- Data is stored locally on your device
- No server or internet connection required
- Storage is limited to approximately 5-10MB depending on the browser

## Future Enhancements

- Export notes to PDF or Markdown
- Rich text formatting (bold, italic, lists)
- Note categorization with tags
- Dark mode support
- Note sharing capabilities
- Cloud synchronization
- Markdown support for better formatting

## License

MIT License

## Contributing

Contributions are welcome. Please open an issue first to discuss proposed changes.
- Aastha Dhangar# ClarityPad
