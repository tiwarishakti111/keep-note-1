import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { NotesState, Note } from '../types';

export const useNotesStore = create<NotesState>()(
  persist(
    (set, get) => ({
      notes: [],
      
      addNote: (title: string, content: string) => {
        const { notes } = get();
        const user = JSON.parse(localStorage.getItem('auth-storage') || '{}')?.state?.user;
        
        if (!user) return;
        
        const newNote: Note = {
          id: uuidv4(),
          title,
          content,
          userId: user.id,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        
        set({ notes: [...notes, newNote] });
      },
      
      updateNote: (id: string, title: string, content: string) => {
        const { notes } = get();
        const updatedNotes = notes.map(note =>
          note.id === id
            ? { ...note, title, content, updatedAt: new Date() }
            : note
        );
        set({ notes: updatedNotes });
      },
      
      deleteNote: (id: string) => {
        const { notes } = get();
        const filteredNotes = notes.filter(note => note.id !== id);
        set({ notes: filteredNotes });
      },
      
      getNotesByUser: (userId: string) => {
        const { notes } = get();
        return notes.filter(note => note.userId === userId);
      }
    }),
    {
      name: 'notes-storage'
    }
  )
);