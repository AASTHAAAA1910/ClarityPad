// components/SideBar.jsx
import React from 'react';
import { Search, Plus, Trash2, X } from 'lucide-react';

export default function SideBar({
  notes,
  selectedNote,
  setSelectedNote,
  searchQuery,
  setSearchQuery,
  isSidebarOpen,
  setIsSidebarOpen,
  createNewNote,
  deleteNote
}) {
  const getTextContent = (content) => {
    if (Array.isArray(content)) {
      return content
        .filter(item => item.type === 'text')
        .map(item => item.value)
        .join(' ');
    }
    return '';
  };

  const filteredNotes = notes.filter(note => {
    const textContent = getTextContent(note.content);
    return note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           textContent.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:relative z-20 w-80 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 ease-in-out h-full`}>
      {/* Sidebar Header */}
      <div className="p-5 border-b border-gray-200 bg-indigo-600">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold text-white">Notes</h1>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden p-1 hover:bg-indigo-700 rounded text-white"
          >
            <X className="w-6 h-5" />
          </button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Notes List */}
      <div className="flex-1 overflow-y-auto">
        {filteredNotes.map(note => (
          <div
            key={note.id}
            onClick={() => {
              setSelectedNote(note);
              setIsSidebarOpen(false);
            }}
            className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
              selectedNote?.id === note.id ? 'bg-indigo-50 border-l-4 border-l-indigo-600' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-1">
              <h3 className="font-semibold text-gray-800 truncate flex-1">
                {note.title || 'Untitled Note'}
              </h3>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteNote(note.id);
                }}
                className="p-1 hover:bg-red-100 rounded text-gray-400 hover:text-red-600 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-gray-600 truncate mb-1">
              {getTextContent(note.content) || 'No content'}
            </p>
            <p className="text-xs text-indigo-600">
              {formatDate(note.lastModified)}
            </p>
          </div>
        ))}
        {filteredNotes.length === 0 && (
          <div className="p-8 text-center text-gray-400">
            No notes found
          </div>
        )}
      </div>

      {/* New Note Button */}
      <button
        onClick={createNewNote}
        className="m-5 flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
      >
        <Plus className="w-5 h-5" />
        New Note
      </button>
    </div>
  );
}
