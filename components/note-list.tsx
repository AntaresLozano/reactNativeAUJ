import { NoteCard } from '@/components/note-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Note } from '@/types/note';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

interface NoteListProps {
  notes: Note[];
  onNotePress: (note: Note) => void;
  onToggleComplete: (id: string) => void;
  onDeleteNote: (id: string) => void;
  loading?: boolean;
}

export function NoteList({
  notes,
  onNotePress,
  onToggleComplete,
  onDeleteNote,
  loading = false,
}: NoteListProps) {
  if (loading) {
    return (
      <ThemedView style={styles.centerContainer}>
        <ThemedText>Cargando notas...</ThemedText>
      </ThemedView>
    );
  }

  if (notes.length === 0) {
    return (
      <ThemedView style={styles.centerContainer}>
        <ThemedText type="subtitle" style={styles.emptyTitle}>
          No tienes notas aún
        </ThemedText>
        <ThemedText style={styles.emptySubtitle}>
          Toca el botón + para crear tu primera nota
        </ThemedText>
      </ThemedView>
    );
  }

  const renderNote = ({ item }: { item: Note }) => (
    <NoteCard
      note={item}
      onPress={() => onNotePress(item)}
      onToggleComplete={onToggleComplete}
      onDelete={onDeleteNote}
    />
  );

  return (
    <FlatList
      data={notes}
      keyExtractor={(item) => item.id}
      renderItem={renderNote}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    textAlign: 'center',
    opacity: 0.7,
  },
  listContainer: {
    paddingVertical: 8,
  },
});
