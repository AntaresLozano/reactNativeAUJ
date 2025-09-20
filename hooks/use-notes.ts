import { Note, NoteFormData } from '@/types/note';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const NOTES_STORAGE_KEY = 'notes_app_notes';

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  // Cargar notas del localStorage al inicializar
  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem(NOTES_STORAGE_KEY);
      if (storedNotes) {
        const parsedNotes = JSON.parse(storedNotes);
        setNotes(parsedNotes);
      }
    } catch (error) {
      console.error('Error loading notes:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveNotesToStorage = async (updatedNotes: Note[]) => {
    try {
      await AsyncStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(updatedNotes));
    } catch (error) {
      console.error('Error saving notes:', error);
    }
  };

  const addNote = async (noteData: NoteFormData) => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: noteData.title,
      content: noteData.content,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedNotes = [newNote, ...notes];
    setNotes(updatedNotes);
    await saveNotesToStorage(updatedNotes);
  };

  const updateNote = async (id: string, noteData: NoteFormData) => {
    const updatedNotes = notes.map(note =>
      note.id === id
        ? {
            ...note,
            title: noteData.title,
            content: noteData.content,
            updatedAt: new Date().toISOString(),
          }
        : note
    );

    setNotes(updatedNotes);
    await saveNotesToStorage(updatedNotes);
  };

  const toggleNoteCompletion = async (id: string) => {
    const updatedNotes = notes.map(note =>
      note.id === id
        ? {
            ...note,
            completed: !note.completed,
            updatedAt: new Date().toISOString(),
          }
        : note
    );

    setNotes(updatedNotes);
    await saveNotesToStorage(updatedNotes);
  };

  const deleteNote = async (id: string) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    await saveNotesToStorage(updatedNotes);
  };

  const getNoteById = (id: string): Note | undefined => {
    return notes.find(note => note.id === id);
  };

  return {
    notes,
    loading,
    addNote,
    updateNote,
    toggleNoteCompletion,
    deleteNote,
    getNoteById,
  };
}
