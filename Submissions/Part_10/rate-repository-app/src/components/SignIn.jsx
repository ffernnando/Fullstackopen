import { useFormik } from 'formik';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: theme.colors.backgroundSecondary,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },

  formContainer: {
    backgroundColor: theme.colors.backgroundPrimary,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    gap: 20,
    padding: 20,
  },

  textInput: {
    borderColor: theme.colors.textPrimary,
    padding: 10,
    borderWidth: 1,
    borderRadius: 3,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.normal,
  },

  pressable: {
    backgroundColor: theme.colors.secondary,
    padding: 20,
    borderRadius: 3,
    alignItems: 'center'
  },
  pressableText: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.textTertiary,
  },
});

const initialValues = {
  username: '',
  password: '',
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <View style={styles.viewContainer}>
      <View style={styles.formContainer}>
        <TextInput
          placeholder='Username'
          value={formik.values.username}
          onChangeText={formik.handleChange('username')}
          style={styles.textInput}
        />
        <TextInput
          placeholder='Password'
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
          secureTextEntry
          style={styles.textInput}
        />
        <Pressable onPress={formik.handleSubmit} style={styles.pressable}>
          <Text style={styles.pressableText}>Sign in</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignIn;
