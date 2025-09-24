import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import theme from '../../theme';
import NumberContainer from './NumberContainer';
import { useNavigate, useParams } from 'react-router-native';
import * as Linking from 'expo-linking';
import ItemSeparator from './ItemSeparator';

const style = StyleSheet.create({
  container: {
    display: 'flex',
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

  linkPressable: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: 10,
    backgroundColor: theme.colors.secondary,
  },
  linkText: {
    color: theme.colors.backgroundSecondary,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
  },

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

const RepositoryInfo = ({ item, id }) => {
  console.log();
  if (!item) {
    return null;
  }
  const navigate = useNavigate();

  console.log('params id: ', id);

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

  const pressSelect = () => {
    console.log('navigatePath: ', `/repository/${item.id}`);
    navigate(`/repository/${item.id}`);
  };

  return (
    <View style={style.container} testID='repositoryItem'>
      <Pressable onPress={pressSelect}>
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
      </Pressable>
      {id ? (
        <View>
          <Pressable
            style={style.linkPressable}
            onPress={() => {
              Linking.openURL(item.url);
            }}
          >
            <Text style={style.linkText}>Open in GitHub</Text>
          </Pressable>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

const ReviewItem = ({ review }) => {
  const data = review.node;
  console.log('review ietm: ', data);
  return (
    <View style={style.reviewContainer}>
      <View style={style.ratingContainer}>
        <View style={style.rating}>
          <Text style={style.ratingText}>{data.rating}</Text>
        </View>
      </View>

      <View style={style.reviewContent}>
        <Text style={style.usernameText}>{data.user.username}</Text>
        <Text style={style.createdDateText}>{data.createdAt}</Text>
        <Text style={style.reviewText}>{data.text}</Text>
      </View>
    </View>
  );
};

const SingleRepository = ({ repository }) => {
  if (!repository) {
    return null;
  }
  console.log('REPO: ', repository);
  const params = useParams();
  console.log('params id: ', params.id);

  const reviews = params.id ? repository.reviews : [];
  console.log('reviews: ', reviews.edges);

  return (
    <FlatList
      data={reviews.edges}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => (
        <View>
          <RepositoryInfo item={repository} id={params.id} />
          <ItemSeparator />
        </View>
      )}
    />
  );
};
export default SingleRepository;

/*
const RepositoryItem = ({ item }) => {
  if (!item) {
    return null;
  }
  const navigate = useNavigate();
  const params = useParams();
  console.log('params id: ', params.id);

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

  const pressSelect = () => {
    console.log('navigatePath: ', `/repository/${item.id}`);
    navigate(`/repository/${item.id}`);
  };

  return (
    <View style={style.container} testID='repositoryItem'>
      <Pressable onPress={pressSelect}>
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
      </Pressable>
      {params.id ? (
        <View>
          <Pressable
            style={style.linkPressable}
            onPress={() => {
              Linking.openURL(item.url);
            }}
          >
            <Text style={style.linkText}>Open in GitHub</Text>
          </Pressable>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

export default RepositoryItem;
*/
