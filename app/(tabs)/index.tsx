import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { NoteForm } from '@/components/note-form';
import { NoteList } from '@/components/note-list';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useNotesContext } from '@/contexts/notes-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Note } from '@/types/note';

export default function HomeScreen() {
  const {
    notes,
    loading,
    addNote,
    updateNote,
    toggleNoteCompletion,
    deleteNote,
  } = useNotesContext();
  
  const [showForm, setShowForm] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | undefined>(undefined);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handleAddNote = () => {
    setEditingNote(undefined);
    setShowForm(true);
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setShowForm(true);
  };

  const handleSaveNote = async (noteData: { title: string; content: string }) => {
    if (editingNote) {
      await updateNote(editingNote.id, noteData);
    } else {
      await addNote(noteData);
    }
    setShowForm(false);
    setEditingNote(undefined);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingNote(undefined);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
      <ThemedView style={[styles.header, { 
        backgroundColor: 'transparent',
        borderBottomColor: colorScheme === 'dark' ? '#444444' : '#e1e5e9'
      }]}>
        <ThemedText type="title">Mis Notas</ThemedText>
        <TouchableOpacity style={styles.addButton} onPress={handleAddNote}>
          <MaterialIcons name="add" size={24} color="white" />
        </TouchableOpacity>
      </ThemedView>

      <NoteList
        notes={notes}
        loading={loading}
        onNotePress={handleEditNote}
        onToggleComplete={toggleNoteCompletion}
        onDeleteNote={deleteNote}
      />

      <Modal
        visible={showForm}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <NoteForm
          note={editingNote}
          onSave={handleSaveNote}
          onCancel={handleCancelForm}
        />
      </Modal>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  addButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
