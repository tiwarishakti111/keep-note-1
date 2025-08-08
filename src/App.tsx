import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { AuthForm } from './components/AuthForm';
import { NotesGrid } from './components/NotesGrid';
import { NoteModal } from './components/NoteModal';
import { useAuthStore } from './store/authStore';
import { useNotesStore } from './store/notesStore';
import { Note } from './types';
import { AssignmentInfo } from './components/AssignmentInfo';

function App() {
  const { user, isAuthenticated, login, register } = useAuthStore();
  const { notes, addNote, updateNote, deleteNote, getNotesByUser } = useNotesStore();
  
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [noteModalMode, setNoteModalMode] = useState<'create' | 'edit'>('create');
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const handleAuth = async (data: any) => {
    setAuthLoading(true);
    setAuthError('');
    
    try {
      let success = false;
      
      if (authMode === 'signin') {
        success = await login(data.email, data.password);
        if (!success) {
          setAuthError('Invalid email or password');
        }
      } else {
        success = await register(data.username, data.email, data.password);
        if (!success) {
          setAuthError('User with this email already exists');
        }
      }
    } catch (error) {
      setAuthError('An error occurred. Please try again.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleCreateNote = () => {
    setNoteModalMode('create');
    setEditingNote(null);
    setIsNoteModalOpen(true);
  };

  const handleEditNote = (note: Note) => {
    setNoteModalMode('edit');
    setEditingNote(note);
    setIsNoteModalOpen(true);
  };

  const handleSaveNote = (title: string, content: string) => {
    if (noteModalMode === 'create') {
      addNote(title, content);
    } else if (editingNote) {
      updateNote(editingNote.id, title, content);
    }
  };

  const handleDeleteNote = (id: string) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      deleteNote(id);
    }
  };

  const userNotes = user ? getNotesByUser(user.id) : [];

  if (!isAuthenticated) {
    return (
      <Layout>
        <AuthForm
          mode={authMode}
          onSubmit={handleAuth}
          onModeChange={() => {
            setAuthMode(authMode === 'signin' ? 'signup' : 'signin');
            setAuthError('');
          }}
          loading={authLoading}
          error={authError}
        />
      </Layout>
    );
  }

  return (
    <Layout>
      <AssignmentInfo />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <NotesGrid
          notes={userNotes}
          onCreateNote={handleCreateNote}
          onEditNote={handleEditNote}
          onDeleteNote={handleDeleteNote}
        />
      </div>

      <NoteModal
        isOpen={isNoteModalOpen}
        onClose={() => setIsNoteModalOpen(false)}
        onSave={handleSaveNote}
        note={editingNote}
        mode={noteModalMode}
      />
    </Layout>
  );
}

export default App;