
// pages/Home.jsx
import React, { useRef, useState } from 'react';
import { Menu, Plus, Link2, Image as ImageIcon, X, ZoomIn, ZoomOut } from 'lucide-react';

export default function Home({ selectedNote, updateNote, setIsSidebarOpen }) {
  const fileInputRef = useRef(null);
  const [currentText, setCurrentText] = useState('');

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

  React.useEffect(() => {
    if (selectedNote) {
      const textItems = selectedNote.content.filter(item => item.type === 'text');
      setCurrentText(textItems.map(item => item.value).join('\n\n'));
    }
  }, [selectedNote?.id]);

  const handleTextChange = (value) => {
    setCurrentText(value);
    const newContent = [
      { type: 'text', value },
      ...selectedNote.content.filter(item => item.type !== 'text')
    ];
    updateNote('content', newContent);
  };

  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      const linkText = prompt('Enter link text (optional):') || url;
      const newContent = [
        ...selectedNote.content,
        { type: 'link', url, text: linkText, id: Date.now() }
      ];
      updateNote('content', newContent);
    }
  };

  const insertImage = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newContent = [
          ...selectedNote.content,
          { 
            type: 'image', 
            src: event.target.result, 
            alt: file.name,
            width: 400,
            id: Date.now()
          }
        ];
        updateNote('content', newContent);
      };
      reader.readAsDataURL(file);
    }
    e.target.value = '';
  };

  const removeContent = (id) => {
    const newContent = selectedNote.content.filter(item => item.id !== id);
    updateNote('content', newContent);
  };

  const resizeImage = (id, delta) => {
    const newContent = selectedNote.content.map(item => {
      if (item.id === id && item.type === 'image') {
        return { ...item, width: Math.max(100, Math.min(800, item.width + delta)) };
      }
      return item;
    });
    updateNote('content', newContent);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-gray-400 p-4 flex items-center gap-3">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 hover:bg-gray-100 rounded"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h2 className="font-semibold text-gray-800 truncate">
          {selectedNote?.title || 'No Note Selected'}
        </h2>
      </div>

      {selectedNote ? (
        <div className="flex-1 flex flex-col bg-white overflow-hidden">
          {/* Note Title */}
          <input
            type="text"
            value={selectedNote.title}
            onChange={(e) => updateNote('title', e.target.value)}
            placeholder="Note title..."
            className="text-3xl font-bold p-6 pb-4 border-b border-gray-400 focus:outline-none"
          />

          {/* Toolbar */}
          <div className="flex gap-2 px-6 py-3 border-b border-gray-400 bg-gray-50">
            <button
              onClick={insertLink}
              className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-indigo-50 text-indigo-600 rounded-lg transition-colors border border-gray-400"
              title="Insert Link"
            >
              <Link2 className="w-4 h-4" />
              <span className="hidden sm:inline">Add Link</span>
            </button>
            <button
              onClick={insertImage}
              className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-indigo-50 text-indigo-600 rounded-lg transition-colors border border-gray-400"
              title="Insert Image"
            >
              <ImageIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Add Image</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* Note Content Area */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Text Editor */}
            <textarea
              value={currentText}
              onChange={(e) => handleTextChange(e.target.value)}
              placeholder="Start typing your note..."
              className="w-full min-h-[200px] p-4 focus:outline-none resize-none text-gray-700 leading-relaxed border border-gray-400 rounded-lg mb-6"
            />

            {/* Links */}
            {selectedNote.content
              .filter(item => item.type === 'link')
              .map(link => (
                <div
                  key={link.id}
                  className="mb-4 p-4 bg-indigo-50 border border-indigo-200 rounded-lg flex items-center justify-between"
                >
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-800 underline flex-1 break-all"
                  >
                    {link.text}
                  </a>
                  <button
                    onClick={() => removeContent(link.id)}
                    className="ml-3 p-1 hover:bg-red-100 rounded text-gray-400 hover:text-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}

            {/* Images */}
            {selectedNote.content
              .filter(item => item.type === 'image')
              .map(image => (
                <div key={image.id} className="mb-6 border border-gray-400 rounded-lg overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    style={{ width: `${image.width}px` }}
                    className="max-w-full h-auto"
                  />
                  <div className="p-2 bg-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => resizeImage(image.id, -50)}
                        className="p-1.5 hover:bg-gray-200 rounded text-gray-600"
                        title="Decrease size"
                      >
                        <ZoomOut className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => resizeImage(image.id, 50)}
                        className="p-1.5 hover:bg-gray-200 rounded text-gray-600"
                        title="Increase size"
                      >
                        <ZoomIn className="w-4 h-4" />
                      </button>
                      <span className="text-xs text-gray-500 ml-2">{image.width}px</span>
                    </div>
                    <button
                      onClick={() => removeContent(image.id)}
                      className="p-1.5 hover:bg-red-100 rounded text-gray-400 hover:text-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
          </div>

          {/* Last Modified */}
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-400 text-sm text-gray-500">
            Last modified {formatDate(selectedNote.lastModified)}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-400 bg-white">
          <div className="text-center">
            <Plus className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg">No note selected</p>
            <p className="text-sm">Create or select a note to get started</p>
          </div>
        </div>
      )}
    </div>
  );
}