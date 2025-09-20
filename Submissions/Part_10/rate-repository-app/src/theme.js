import { Platform } from "react-native";

const theme = {
  colors: {
    textPrimary: 'black',
    textSecondary: 'gray',
    textTertiary: 'white',

    primary: '#24292e',
    secondary: '#24A0ED',
    tertiary: '#e9e9e9ff',

    backgroundPrimary: 'white',
    backgroundSecondary: '#f4f4f4'
  },
  fontSizes: {
    body: 14,
    subheading: 16,
    heading: 25,
  },
  fonts: {
    main: Platform.select({
      ios: 'Arial',
      android: 'Roboto',
      default: 'System',
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
}; 

export default theme;