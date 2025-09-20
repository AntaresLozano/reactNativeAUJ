
export const getNoteCardStyle = (colorScheme: 'light' | 'dark' | null) => {
  const isDark = colorScheme === 'dark';
  
  return {
    backgroundColor: isDark ? '#2c2c2e' : '#f8f9fa',
    borderColor: isDark ? '#3a3a3c' : '#e1e5e9',
  };
};

export const getFormInputStyle = (colorScheme: 'light' | 'dark' | null) => {
  const isDark = colorScheme === 'dark';
  
  return {
    backgroundColor: isDark ? '#1c1c1e' : '#ffffff',
    borderColor: isDark ? '#3a3a3c' : '#e1e5e9',
  };
};

export const NoteColors = {
  primary: '#007AFF',
  success: '#34C759',
  warning: '#FF9500',
  purple: '#AF52DE',
  danger: '#FF3B30',
};
