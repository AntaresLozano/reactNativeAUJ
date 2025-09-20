import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Note, NoteFormData } from '@/types/note';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface NoteFormProps {
  note?: Note;
  onSave: (noteData: NoteFormData) => void;
  onCancel: () => void;
}

export function NoteForm({ note, onSave, onCancel }: NoteFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert('Error', 'El título es obligatorio');
      return;
    }

    onSave({
      title: title.trim(),
      content: content.trim(),
    });
  };

  const isEditing = !!note;

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
      <ThemedView style={[styles.header, { borderBottomColor: colorScheme === 'dark' ? '#444444' : '#e1e5e9' }]}>
        <TouchableOpacity style={styles.headerButton} onPress={onCancel}>
          <MaterialIcons name="close" size={24} color={colors.text} />
        </TouchableOpacity>
        
        <ThemedText type="subtitle">
          {isEditing ? 'Editar Nota' : 'Nueva Nota'}
        </ThemedText>
        
        <TouchableOpacity style={styles.headerButton} onPress={handleSave}>
          <MaterialIcons name="check" size={24} color={colors.tint} />
        </TouchableOpacity>
      </ThemedView>

      <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
        <ThemedView style={[styles.inputContainer, { backgroundColor: 'transparent' }]}>
          <ThemedText style={[styles.label, { color: colors.text }]}>Título *</ThemedText>
          <TextInput
            style={[
              styles.titleInput,
              {
                color: colors.text,
                borderColor: colorScheme === 'dark' ? '#444444' : '#e1e5e9',
                backgroundColor: colorScheme === 'dark' ? '#2c2c2e' : '#ffffff',
              },
            ]}
            value={title}
            onChangeText={setTitle}
            placeholder="Título de la nota"
            placeholderTextColor={colorScheme === 'dark' ? '#999999' : '#666666'}
            maxLength={100}
            autoFocus={!isEditing}
          />
        </ThemedView>

        <ThemedView style={[styles.inputContainer, { backgroundColor: 'transparent' }]}>
          <ThemedText style={[styles.label, { color: colors.text }]}>Contenido</ThemedText>
          <TextInput
            style={[
              styles.contentInput,
              {
                color: colors.text,
                borderColor: colorScheme === 'dark' ? '#444444' : '#e1e5e9',
                backgroundColor: colorScheme === 'dark' ? '#2c2c2e' : '#ffffff',
              },
            ]}
            value={content}
            onChangeText={setContent}
            placeholder="Escribe el contenido de tu nota aquí..."
            placeholderTextColor={colorScheme === 'dark' ? '#999999' : '#666666'}
            multiline
            textAlignVertical="top"
            maxLength={1000}
          />
          <ThemedText style={[styles.characterCount, { color: colorScheme === 'dark' ? '#999999' : '#666666' }]}>
            {content.length}/1000
          </ThemedText>
        </ThemedView>
      </ScrollView>
      </KeyboardAvoidingView>
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
  headerButton: {
    padding: 8,
    width: 40,
    alignItems: 'center',
  },
  formContainer: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  titleInput: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 18,
    fontWeight: '500',
  },
  contentInput: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    minHeight: 200,
    lineHeight: 24,
  },
  characterCount: {
    textAlign: 'right',
    marginTop: 8,
    fontSize: 12,
  },
});
