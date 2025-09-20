import { useNotes } from '@/hooks/use-notes';
import { Note, NoteFormData } from '@/types/note';
import React, { createContext, ReactNode, useContext } from 'react';

interface NotesContextType {
  notes: Note[];
  loading: boolean;
  addNote: (noteData: NoteFormData) => Promise<void>;
  updateNote: (id: string, noteData: NoteFormData) => Promise<void>;
  toggleNoteCompletion: (id: string) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  getNoteById: (id: string) => Note | undefined;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

interface NotesProviderProps {
  children: ReactNode;
}

export function NotesProvider({ children }: NotesProviderProps) {
  const notesHook = useNotes();

  return (
    <NotesContext.Provider value={notesHook}>
      {children}
    </NotesContext.Provider>
  );
}

export function useNotesContext() {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error('useNotesContext must be used within a NotesProvider');
  }
  return context;
}
