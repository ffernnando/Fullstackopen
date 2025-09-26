import { Alert, StyleSheet, Text, View } from 'react-native';
import theme from '../../../theme';
import { useQuery } from '@apollo/client/react';
import { ME } from '../../../graphql/queries';
import { Button } from 'react-native-paper';
import useDeleteReview from '../../../hooks/useDeleteReview';
import { useNavigate } from 'react-router-native';
const style = StyleSheet.create({
  //Review
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.colors.backgroundPrimary,
    padding: 10,
    gap: 10,
  },
  reviewContainer: {
    display: 'flex',
    flexDirection: 'row',

    gap: 10,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  ratingContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  rating: {
    width: 60,
    height: 60,
    borderWidth: 3,
    borderRadius: 30,
    borderColor: theme.colors.secondary,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingText: {
    color: theme.colors.secondary,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
  },

  reviewContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  usernameText: {
    color: theme.colors.textPrimary,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
  },
  createdDateText: {
    color: theme.colors.textSecondary,
    fontWeight: theme.fontWeights.normal,
    fontSize: theme.fontSizes.body,
  },
  reviewText: {
    color: theme.colors.textPrimary,
    fontWeight: theme.fontWeights.normal,
    fontSize: theme.fontSizes.body,
  },

  //Buttons
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 30,
  },
  button: {
    flex: 1,
    backgroundColor: 'black',
    borderRadius: 5,
    padding: 5,
  },
  buttonLabel: {
    color: theme.colors.textTertiary,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.body,
  },
});

const ReviewItem = ({ review, usersReviews = false, refetch }) => {
  const data = review.node;
  const date = data ? data.createdAt.split('T')[0] : '';
  const navigate = useNavigate();

  const [deleteReview, response] = useDeleteReview();

  console.log('response: ', response.loading);

  const pressViewRepository = () => {
    console.log('Data review id: ', data.repository.id);
    navigate(`/repository/${data.repository.id}`);
  };

  const pressDeleteRepository = () => {
    console.log('PressDeleteRepo: ', data.id);
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => {
            try {
              deleteReview(data.id, refetch);
            } catch (e) {
              console.log(e);
            }
          },
          style: 'default',
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  console.log('review ietm: ', data);
  return (
    <View style={style.container}>
      <View style={style.reviewContainer}>
        <View style={style.ratingContainer}>
          <View style={style.rating}>
            <Text style={style.ratingText}>{data.rating}</Text>
          </View>
        </View>

        <View style={style.reviewContent}>
          {usersReviews ? (
            <Text style={style.usernameText}>{data.repository.fullName}</Text>
          ) : (
            <Text style={style.usernameText}>{data.user.username}</Text>
          )}
          <Text style={style.createdDateText}>{date}</Text>
          <Text style={style.reviewText}>{data.text}</Text>
        </View>
      </View>
      {usersReviews ? (
        <View style={style.buttonContainer}>
          <Button
            style={[style.button, { backgroundColor: theme.colors.secondary }]}
            labelStyle={style.buttonLabel}
            onPress={pressViewRepository}
          >
            View repository
          </Button>
          <Button
            style={[style.button, { backgroundColor: theme.colors.quaternary }]}
            labelStyle={style.buttonLabel}
            onPress={pressDeleteRepository}
          >
            Delete repository
          </Button>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

export default ReviewItem;
