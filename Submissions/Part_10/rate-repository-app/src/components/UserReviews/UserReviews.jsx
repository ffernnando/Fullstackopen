import { FlatList, StyleSheet, View } from 'react-native';
import ReviewItem from '../RepositoryList/RepositoryItem/ReviewItem';
import ItemSeparator from '../RepositoryList/ItemSeparator';
import useUserReviews from '../../hooks/useUserReviews';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
});


//?.data?.me?.reviews?.edges
const UserReviews = () => {
  const { user, fetchMore, refetch } = useUserReviews();

  //const user = getUserReviews();
  const userReviews = user?.reviews?.edges;
  //const refetch = user?.refetch;

  const onEndReach = () => {
    console.log('End reached');
    fetchMore();
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={userReviews}
        renderItem={({ item }) => (
          <ReviewItem review={item} usersReviews={true} refetch={refetch} />
        )}
        keyExtractor={({ id }) => id}
        ItemSeparatorComponent={ItemSeparator}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default UserReviews;
