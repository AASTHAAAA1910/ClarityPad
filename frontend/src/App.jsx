// App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SideBar from './components/SideBar';

export default function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      return JSON.parse(savedNotes);
    }
    return [
      {
        id: 1,
        title: 'Welcome to Notes',
        content: [
          { type: 'text', value: 'Start typing to create your first note. All your notes are saved automatically.' }
        ],
        lastModified: new Date().toISOString()
      }
    ];
  });

  const [selectedNote, setSelectedNote] = useState(() => {
    const savedSelectedId = localStorage.getItem('selectedNoteId');
    if (savedSelectedId) {
      const savedNotes = localStorage.getItem('notes');
      if (savedNotes) {
        const parsedNotes = JSON.parse(savedNotes);
        return parsedNotes.find(n => n.id === parseInt(savedSelectedId)) || parsedNotes[0];
      }
    }
    return notes[0];
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  // Save selected note ID to localStorage
  useEffect(() => {
    if (selectedNote) {
      localStorage.setItem('selectedNoteId', selectedNote.id.toString());
    }
  }, [selectedNote]);

  const createNewNote = () => {
    const newNote = {
      id: Date.now(),
      title: 'Untitled Note',
      content: [{ type: 'text', value: '' }],
      lastModified: new Date().toISOString()
    };
    setNotes([newNote, ...notes]);
    setSelectedNote(newNote);
    setIsSidebarOpen(false);
  };

  const updateNote = (field, value) => {
    const updatedNote = {
      ...selectedNote,
      [field]: value,
      lastModified: new Date().toISOString()
    };
    setSelectedNote(updatedNote);
    setNotes(notes.map(n => n.id === updatedNote.id ? updatedNote : n));
  };

  const deleteNote = (id) => {
    const filtered = notes.filter(n => n.id !== id);
    setNotes(filtered);
    if (selectedNote?.id === id) {
      setSelectedNote(filtered[0] || null);
    }
    // Clear selected note from localStorage if it was deleted
    if (selectedNote?.id === id) {
      localStorage.removeItem('selectedNoteId');
    }
  };

  return (
    <BrowserRouter>
      <div className="flex h-screen bg-gray-50 overflow-hidden">
        <SideBar
          notes={notes}
          selectedNote={selectedNote}
          setSelectedNote={setSelectedNote}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          createNewNote={createNewNote}
          deleteNote={deleteNote}
        />
        
        <Routes>
          <Route
            path="/"
            element={
              <Home
                selectedNote={selectedNote}
                updateNote={updateNote}
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
              />
            }
          />
        </Routes>

        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-10"
          />
        )}
      </div>
    </BrowserRouter>
  );
}