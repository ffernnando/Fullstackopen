import { Pressable, StyleSheet, Text, View } from 'react-native';
import theme from '../../theme';

const style = StyleSheet.create({
  pressable: {
    marginHorizontal: 10,
    marginVertical: 25,
  },
  text: {
    color: theme.colors.textTertiary,
    fontSize: theme.fontSizes.heading,
    fontWeight: theme.fontWeights.bold,
  },
});

const AppBarTab = ({ text }) => {
  return (
    <View>
      <Pressable style={style.pressable}>
        <Text style={style.text}>{text}</Text>
      </Pressable>
    </View>
  );
};

export default AppBarTab;
