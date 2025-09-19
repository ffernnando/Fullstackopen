import { Pressable, StyleSheet, Text, View } from 'react-native';
import theme from '../../theme';

const style = StyleSheet.create({
  title: {
    color: theme.colors.textBar,
  },
});

const AppBarTab = ({ text }) => {
  return (
    <View>
      <Pressable>
        <Text style={style.title}>{text}</Text>
      </Pressable>
    </View>
  );
};

export default AppBarTab;
