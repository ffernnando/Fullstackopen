import { useFormik } from 'formik';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import theme from '../theme';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';

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
    fontFamily: theme.fonts.main,
  },

  pressable: {
    backgroundColor: theme.colors.secondary,
    padding: 20,
    borderRadius: 3,
    alignItems: 'center',
  },
  pressableText: {
    fontFamily: theme.fonts.main,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.textTertiary,
  },
});

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const SignIn = () => {
  const navigate = useNavigate();
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const data = await signIn({ username, password });
      console.log(data);
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.viewContainer}>
      <View style={styles.formContainer}>
        <View>
          <TextInput
            placeholder='Username'
            value={formik.values.username}
            onChangeText={formik.handleChange('username')}
            style={[
              styles.textInput,
              formik.errors.username && { borderColor: 'red' },
            ]}
          />
          {formik.touched.username && formik.errors.username && (
            <Text style={{ color: 'red' }}>{formik.errors.username}</Text>
          )}
        </View>

        <View>
          <TextInput
            placeholder='Password'
            value={formik.values.password}
            onChangeText={formik.handleChange('password')}
            secureTextEntry
            style={[
              styles.textInput,
              formik.errors.password && { borderColor: 'red' },
            ]}
          />
          {formik.touched.password && formik.errors.password && (
            <Text style={{ color: 'red' }}>{formik.errors.password}</Text>
          )}
        </View>

        <Pressable onPress={formik.handleSubmit} style={styles.pressable}>
          <Text style={styles.pressableText}>Sign in</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignIn;
