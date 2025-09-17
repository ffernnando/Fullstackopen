import { Text, View } from 'react-native';

const RepositoryItem = ({ item }) => {
  return (
    <View>
      <Text>Full name: {item.fullName}</Text>
      <Text>Description: {item.description}</Text>
      <Text>Language: {item.language}</Text>
      <Text>Stars: {item.forksCount}</Text>
      <Text>Forks: {item.stargazersCount}</Text>
      <Text>Reviews: {item.ratingAverage}</Text>
      <Text>Rating: {item.reviewCount}</Text>
    </View>
  );
};

export default RepositoryItem;
/*
{
    id: 'jaredpalmer.formik',
    fullName: 'jaredpalmer/formik',
    description: 'Build forms in React, without the tears',
    language: 'TypeScript',
    forksCount: 1589,
    stargazersCount: 21553,
    ratingAverage: 88,
    reviewCount: 4,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
  },
*/
