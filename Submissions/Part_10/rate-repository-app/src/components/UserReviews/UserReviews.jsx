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
    return useQuery(ME, {
      variables: { includeReviews: true },
    });
  } catch (e) {
    console.log(e);
  }
};
//?.data?.me?.reviews?.edges
const UserReviews = () => {
  const user = getUserReviews();
  const userReviews = user?.data?.me?.reviews?.edges;
  const refetch = user?.refetch;
  
  return (
    <View style={styles.container}>
      <FlatList
        data={userReviews}
        renderItem={({ item }) => <ReviewItem review={item} usersReviews={true} refetch={refetch} />}
        keyExtractor={({ id }) => id}
        ItemSeparatorComponent={<ItemSeparator />}
      /> 
    </View>
  );
};

export default UserReviews;
