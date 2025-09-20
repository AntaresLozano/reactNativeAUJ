import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useNotesContext } from '@/contexts/notes-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const getStatIcon = (iconName: string) => {
  switch (iconName) {
    case 'note': return 'note';
    case 'check-circle': return 'check-circle';
    case 'schedule': return 'schedule';
    case 'bar-chart': return 'bar-chart';
    default: return 'description';
  }
};

export default function StatsScreen() {
  const { notes } = useNotesContext();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const totalNotes = notes.length;
  const completedNotes = notes.filter(note => note.completed).length;
  const pendingNotes = totalNotes - completedNotes;
  const completionRate = totalNotes > 0 ? Math.round((completedNotes / totalNotes) * 100) : 0;

  const recentNotes = notes
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 3);

  const StatCard = ({ 
    title, 
    value, 
    icon, 
    color 
  }: { 
    title: string; 
    value: string | number; 
    icon: any; 
    color: string;
  }) => (
    <ThemedView style={[styles.statCard, { borderLeftColor: color }]}>
      <ThemedView style={[styles.statHeader, { backgroundColor: 'transparent' }]}>
        <MaterialIcons name={getStatIcon(icon) as any} size={24} color={color} />
        <ThemedText type="subtitle" style={styles.statValue}>
          {value}
        </ThemedText>
      </ThemedView>
      <ThemedText style={styles.statTitle}>{title}</ThemedText>
    </ThemedView>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Estadísticas</ThemedText>
        <ThemedText style={styles.subtitle}>
          Resumen de tus notas
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.statsContainer}>
        <StatCard
          title="Total de Notas"
          value={totalNotes}
          icon="note"
          color="#007AFF"
        />
        
        <StatCard
          title="Completadas"
          value={completedNotes}
          icon="check-circle"
          color="#34C759"
        />
        
        <StatCard
          title="Pendientes"
          value={pendingNotes}
          icon="schedule"
          color="#FF9500"
        />
        
        <StatCard
          title="Progreso"
          value={`${completionRate}%`}
          icon="bar-chart"
          color="#AF52DE"
        />
      </ThemedView>

      {recentNotes.length > 0 && (
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Notas Recientes
          </ThemedText>
          
          {recentNotes.map((note) => (
            <ThemedView key={note.id} style={styles.recentNoteCard}>
              <ThemedView style={[styles.recentNoteHeader, { backgroundColor: 'transparent' }]}>
                <ThemedText 
                  type="defaultSemiBold" 
                  style={[
                    styles.recentNoteTitle,
                    note.completed && styles.completedText
                  ]}
                  numberOfLines={1}
                >
                  {note.title}
                </ThemedText>
                <MaterialIcons
                  name={note.completed ? "check-circle" : "radio-button-unchecked"}
                  size={16}
                  color={note.completed ? "#34C759" : colors.text + '60'}
                />
              </ThemedView>
              
              {note.content && (
                <ThemedText 
                  style={[
                    styles.recentNoteContent,
                    note.completed && styles.completedText
                  ]}
                  numberOfLines={2}
                >
                  {note.content}
                </ThemedText>
              )}
              
              <ThemedText style={styles.recentNoteDate}>
                {new Date(note.updatedAt).toLocaleDateString('es-ES', {
                  day: '2-digit',
                  month: 'short',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </ThemedText>
            </ThemedView>
          ))}
        </ThemedView>
      )}

      {totalNotes === 0 && (
        <ThemedView style={styles.emptyState}>
          <MaterialIcons name="note" size={64} color={colors.text + '40'} />
          <ThemedText type="subtitle" style={styles.emptyTitle}>
            Sin notas aún
          </ThemedText>
          <ThemedText style={styles.emptySubtitle}>
            Crea tu primera nota para ver las estadísticas
          </ThemedText>
        </ThemedView>
      )}
      </ScrollView>
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
    padding: 20,
    paddingBottom: 16,
  },
  subtitle: {
    opacity: 0.7,
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  statTitle: {
    fontSize: 14,
    opacity: 0.7,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  recentNoteCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  recentNoteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  recentNoteTitle: {
    flex: 1,
    marginRight: 8,
  },
  recentNoteContent: {
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 8,
    lineHeight: 20,
  },
  recentNoteDate: {
    fontSize: 12,
    opacity: 0.6,
  },
  completedText: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    marginTop: 60,
  },
  emptyTitle: {
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    textAlign: 'center',
    opacity: 0.7,
  },
});
