import { StyleSheet, Text, View } from 'react-native';
import theme from '../../../theme';
import { useQuery } from '@apollo/client/react';
import { ME } from '../../../graphql/queries';

const style = StyleSheet.create({
  //Review
  reviewContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
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
});

const ReviewItem = ({ review, usersReviews = false }) => {
  const data = review.node;
  const date = data ? data.createdAt.split('T')[0] : '';

  console.log('review ietm: ', data);
  return (
    <View style={style.reviewContainer}>
      <View style={style.ratingContainer}>
        <View style={style.rating}>
          <Text style={style.ratingText}>{data.rating}</Text>
        </View>
      </View>

      <View style={style.reviewContent}>
        {
          usersReviews 
            ? <Text style={style.usernameText}>{data.repository.fullName}</Text>
            : <Text style={style.usernameText}>{data.user.username}</Text>
        }
        <Text style={style.createdDateText}>{date}</Text>
        <Text style={style.reviewText}>{data.text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;
