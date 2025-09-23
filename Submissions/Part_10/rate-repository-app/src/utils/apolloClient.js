import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import Constants from 'expo-constants';

const createApolloClient = () => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: Constants.expoConfig.extra.APOLLO_URI,
      fetch
    })
  })
};

export default createApolloClient;