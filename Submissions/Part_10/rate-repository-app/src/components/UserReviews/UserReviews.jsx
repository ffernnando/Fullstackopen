import { FlatList, StyleSheet, View } from 'react-native';
import ReviewItem from '../RepositoryList/RepositoryItem/ReviewItem';
import ItemSeparator from '../RepositoryList/ItemSeparator';
import { useQuery } from '@apollo/client/react';
import { ME } from '../../graphql/queries';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
});

const getUserReviews = () => {
  try {
    const user = useQuery(ME, {
      variables: { includeReviews: true },
    });
    return user?.data?.me?.reviews?.edges;
  } catch (e) {
    console.log(e);
  }
};

const UserReviews = () => {
  const userReviews = getUserReviews();
  return (
    <View style={styles.container}>
      <FlatList
        data={userReviews}
        renderItem={({ item }) => <ReviewItem review={item} usersReviews={true} />}
        keyExtractor={({ id }) => id}
        ItemSeparatorComponent={<ItemSeparator />}
      /> 
    </View>
  );
};

export default UserReviews;
