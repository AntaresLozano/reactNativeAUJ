import { View, type ViewProps } from 'react-native';

export type TransparentViewProps = ViewProps;

export function TransparentView({ style, ...otherProps }: TransparentViewProps) {
  return <View style={[{ backgroundColor: 'transparent' }, style]} {...otherProps} />;
}
