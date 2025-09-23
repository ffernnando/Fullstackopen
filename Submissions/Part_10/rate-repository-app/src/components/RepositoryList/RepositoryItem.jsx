import { Image, StyleSheet, Text, View } from 'react-native';
import theme from '../../theme';
import NumberContainer from './NumberContainer';

const style = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: theme.colors.backgroundPrimary,
    padding: 10,
    gap: 15,
  },
  imageAndTextContainer: {
    flexDirection: 'row',

    gap: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  textInfo: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    gap: 5,
  },
  boldText: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.textPrimary,
  },
  grayText: {
    fontSize: theme.fontSizes.body,
    fontWeight: theme.fontWeights.normal,
    color: theme.colors.textSecondary,
  },
  whiteText: {
    color: theme.colors.textTertiary,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.normal,
  },
  languageView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 5,
    backgroundColor: theme.colors.secondary,
    padding: 5,
  },

  numberContainers: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

const RepositoryItem = ({ item }) => {
  const counts = {
    forksCount:
      item.forksCount >= 1000
        ? `${Math.round(item.forksCount / 100) / 10}k`
        : `${item.forksCount}`,
    stargazersCount:
      item.stargazersCount >= 1000
        ? `${Math.round(item.stargazersCount / 100) / 10}k`
        : `${item.stargazersCount}`,
    ratingAverage:
      item.ratingAverage >= 1000
        ? `${Math.round(item.ratingAverage / 100) / 10}k`
        : `${item.ratingAverage}`,
    reviewCount:
      item.reviewCount >= 1000
        ? `${Math.round(item.reviewCount / 100) / 10}k`
        : `${item.reviewCount}`,
  };

  return (
    <View style={style.container} testID='repositoryItem'>
      <View style={style.imageAndTextContainer}>
        <View>
          <Image style={style.image} source={{ uri: item.ownerAvatarUrl }} />
        </View>

        <View style={style.textInfo}>
          <Text style={style.boldText}>{item.fullName}</Text>
          <Text style={style.grayText}>{item.description}</Text>
          <View style={style.languageView}>
            <Text style={style.whiteText}>{item.language}</Text>
          </View>
        </View>
      </View>

      <View style={style.numberContainers}>
        <NumberContainer
          parentStyle={style}
          data={counts.forksCount}
          label='Forks'
        />
        <NumberContainer
          parentStyle={style}
          data={counts.stargazersCount}
          label='Stars'
        />
        <NumberContainer
          parentStyle={style}
          data={counts.reviewCount}
          label='Reviews'
        />
        <NumberContainer
          parentStyle={style}
          data={counts.ratingAverage}
          label='Rating'
        />
      </View>
    </View>
  );
};

export default RepositoryItem;
