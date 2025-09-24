import { useFormik } from 'formik';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import theme from '../../theme';
import * as yup from 'yup';
import useSignIn from '../../hooks/useSignIn';
import { useNavigate } from 'react-router-native';
import useCreateReview from '../../hooks/useCreateReview';

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
  name: '',
  rating: null,
  review: '',
};

const validationSchema = yup.object().shape({
  username: yup.string().required(`Repository owner's username is required`),
  name: yup.string().required(`Repository's name is required`),
  rating: yup.number().required('Rating is required (0 - 100)'),
  review: yup.string(),
});

export const CreateReviewContainer = ({ onSubmit }) => {
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
            placeholder="Repository owner's username"
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
            placeholder='Repository name'
            value={formik.values.name}
            onChangeText={formik.handleChange('name')}
            style={[
              styles.textInput,
              formik.errors.name && { borderColor: 'red' },
            ]}
          />
          {formik.touched.name && formik.errors.name && (
            <Text style={{ color: 'red' }}>{formik.errors.name}</Text>
          )}
        </View>
        <View>
          <TextInput
            placeholder='Rating between 0 and 100'
            value={formik.values.rating}
            onChangeText={formik.handleChange('rating')}
            style={[
              styles.textInput,
              formik.errors.rating && { borderColor: 'red' },
            ]}
          />
          {formik.touched.rating && formik.errors.rating && (
            <Text style={{ color: 'red' }}>{formik.errors.rating}</Text>
          )}
        </View>
        <View>
          <TextInput
            placeholder='Review'
            value={formik.values.review}
            onChangeText={formik.handleChange('review')}
            style={[
              styles.textInput,
              formik.errors.review && { borderColor: 'red' },
            ]}
            multiline
          />
          {formik.touched.review && formik.errors.review && (
            <Text style={{ color: 'red' }}>{formik.errors.review}</Text>
          )}
        </View>

        <Pressable onPress={formik.handleSubmit} style={styles.pressable}>
          <Text style={styles.pressableText}>Create a review</Text>
        </Pressable>
      </View>
    </View>
  );
};

//Add createReview mutation
//Add a useCreateReview hook to handle it and just send back the function
//Add dropdown picker?
//After a successful review, navigate to repo in question
const CreateReview = () => {
  const navigate = useNavigate();
  const [createReview] = useCreateReview();

  const onSubmit = async (values) => {
    const { name, rating, review, username } = values;
    console.log('values: ', values);
    try {
      const data = await createReview({
        ownerName: username,
        rating: Number(rating),
        repositoryName: name,
        text: review,
      });
      console.log(`/repository/${data}`);
      navigate(`/repository/${data}`);
    } catch (e) {
      console.log(e);
    }
  };

  /*const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const data = await signIn({ username, password });
      console.log(data);
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  }; */

  return <CreateReviewContainer onSubmit={onSubmit} />;
};

export default CreateReview;
