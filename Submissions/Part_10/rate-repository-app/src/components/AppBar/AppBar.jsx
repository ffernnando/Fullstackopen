import { View, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import Theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: Theme.colors.primary,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab text='Repositories' />
    </View>
  );
};

export default AppBar;
