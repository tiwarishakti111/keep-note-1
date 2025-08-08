import React from 'react';
import { Plus, FileText } from 'lucide-react';
import { Note } from '../types';
import { NoteCard } from './NoteCard';

interface NotesGridProps {
  notes: Note[];
  onCreateNote: () => void;
  onEditNote: (note: Note) => void;
  onDeleteNote: (id: string) => void;
}

export const NotesGrid: React.FC<NotesGridProps> = ({
  notes,
  onCreateNote,
  onEditNote,
  onDeleteNote
}) => {
  if (notes.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <FileText className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No notes yet</h3>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Start organizing your thoughts by creating your first note. Click the button below to get started.
        </p>
        <button
          onClick={onCreateNote}
          className="inline-flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg transition-colors font-medium"
        >
          <Plus className="w-5 h-5" />
          <span>Create Your First Note</span>
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Your Notes</h2>
          <p className="text-gray-600 mt-1">{notes.length} note{notes.length !== 1 ? 's' : ''} total</p>
        </div>
        <button
          onClick={onCreateNote}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg transition-colors font-medium"
        >
          <Plus className="w-5 h-5" />
          <span>New Note</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onEdit={onEditNote}
            onDelete={onDeleteNote}
          />
        ))}
      </div>
    </div>
  );
};