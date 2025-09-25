import { useFormik } from 'formik';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import theme from '../../theme';
import * as yup from 'yup';
import useSignIn from '../../hooks/useSignIn';
import { useNavigate } from 'react-router-native';
import useSignUp from '../../hooks/useSignUp';

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

/*
  1. Set up formik and yup schema
    1.1. Password confirmation might be tricky
  2. Set up the form appearance itself
  3. Make a createUser mutation
  4. Make a useCreateUser hook to get the mutation function as well as result data
  5. On success, sign-in the user with the given data
  6. Navigate to the default repository view page

  7. Add an appropriate Sign-up tab in the AppBar
*/

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: '',
};

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Password confirmation is required'),
});

export const SignUpContainer = ({ onSubmit }) => {
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

        <View>
          <TextInput
            placeholder='Password confirmation'
            value={formik.values.passwordConfirmation}
            onChangeText={formik.handleChange('passwordConfirmation')}
            secureTextEntry
            style={[
              styles.textInput,
              formik.errors.passwordConfirmation && { borderColor: 'red' },
            ]}
          />
          {formik.touched.passwordConfirmation &&
            formik.errors.passwordConfirmation && (
              <Text style={{ color: 'red' }}>
                {formik.errors.passwordConfirmation}
              </Text>
            )}
        </View>

        <Pressable onPress={formik.handleSubmit} style={styles.pressable}>
          <Text style={styles.pressableText}>Sign up</Text>
        </Pressable>
      </View>
    </View>
  );
};

const SignUp = () => {
  const navigate = useNavigate();
  const [signUp] = useSignUp();
  const [signin] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const signUpData = await signUp({ username, password });
      console.log('signUp data in form file: ', signUpData);

      const signInData = await signin({ username, password });
      console.log('signIn data in form file: ', signInData);

      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;
