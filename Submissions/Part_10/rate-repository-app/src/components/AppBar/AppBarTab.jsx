import { Pressable, StyleSheet, Text, View } from 'react-native';
import theme from '../../theme';
import { Link } from 'react-router-native';

const style = StyleSheet.create({
  pressable: {
    marginHorizontal: 10,
    marginVertical: 25,
  },
  text: {
    color: theme.colors.textTertiary,
    fontWeight: theme.fontWeights.bold,
  },
  mainTab: {
    fontSize: theme.fontSizes.heading,
  },
  secondaryTab: {
    fontSize: theme.fontSizes.subheading,
  },
});

const AppBarTab = ({ text, link }) => {
  const textStyles = [
    style.text,
    text === 'Repositories' ? style.mainTab : style.secondaryTab,
  ];

  return (
    <View>
      <Pressable style={style.pressable}>
        <Link to={link}>
          <Text style={textStyles}>{text}</Text>
        </Link>
      </Pressable>
    </View>
  );
};

export default AppBarTab;
