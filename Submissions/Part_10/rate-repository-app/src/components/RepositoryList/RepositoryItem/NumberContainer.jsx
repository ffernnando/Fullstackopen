import { StyleSheet, Text, View } from 'react-native';

const NumberContainer = ({ parentStyle, data, label }) => {
  const style = StyleSheet.create({
    numberContainer: {
      flexDirection: 'column',
      justifyContent: 'space-evenly',
    },
  });

  return (
    <View style={style}>
      <Text style={parentStyle.boldText}>{data}</Text>
      <Text style={parentStyle.grayText}>{label}</Text>
    </View>
  );
};

export default NumberContainer;
