import { StyleSheet, View } from 'react-native';
import theme from '../../theme';

const styles = StyleSheet.create({
  separator: {
    height: 12,
    backgroundColor: theme.colors.tertiary,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export default ItemSeparator;
