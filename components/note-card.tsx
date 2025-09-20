import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { getNoteCardStyle } from '@/constants/note-theme';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Note } from '@/types/note';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';

interface NoteCardProps {
  note: Note;
  onPress: () => void;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export function NoteCard({ note, onPress, onToggleComplete, onDelete }: NoteCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const cardStyle = getNoteCardStyle(colorScheme as 'light' | 'dark' | null);

  const handleDelete = () => {
    Alert.alert(
      'Eliminar Nota',
      '¿Estás seguro de que quieres eliminar esta nota?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: () => onDelete(note.id) },
      ]
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <ThemedView style={[styles.container, cardStyle, note.completed && styles.completedContainer]}>
      <TouchableOpacity style={styles.mainContent} onPress={onPress}>
        <ThemedView style={[styles.header, { backgroundColor: 'transparent' }]}>
          <ThemedText 
            type="subtitle" 
            style={[
              styles.title, 
              note.completed && styles.completedText
            ]}
            numberOfLines={1}
          >
            {note.title}
          </ThemedText>
          <ThemedText style={styles.date}>
            {formatDate(note.updatedAt)}
          </ThemedText>
        </ThemedView>
        
        {note.content && (
          <ThemedText 
            style={[
              styles.content, 
              note.completed && styles.completedText
            ]}
            numberOfLines={2}
          >
            {note.content}
          </ThemedText>
        )}
      </TouchableOpacity>

      <ThemedView style={[styles.actions, { backgroundColor: 'transparent' }]}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => onToggleComplete(note.id)}
        >
          <MaterialIcons
            name={note.completed ? "check-circle" : "radio-button-unchecked"}
            size={24}
            color={note.completed ? colors.tint : colors.text + '60'}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleDelete}
        >
          <MaterialIcons
            name="delete"
            size={20}
            color="#FF3B30"
          />
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  completedContainer: {
    opacity: 0.7,
  },
  mainContent: {
    flex: 1,
    marginRight: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    flex: 1,
    marginRight: 8,
    fontWeight: '600',
  },
  completedText: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  content: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
  },
  date: {
    fontSize: 12,
    opacity: 0.6,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionButton: {
    padding: 4,
  },
});
