import { StatusBar } from 'expo-status-bar';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import Main from './src/components/Main';
import { NativeRouter } from 'react-router-native';

import { ApolloProvider } from '@apollo/client/react'
import createApolloClient from './src/utils/apolloClient';
import Constants from 'expo-constants';

const apolloClient = createApolloClient();

const App = () => {
  console.log(Constants.expoConfig);
  return (
    <>
        <ApolloProvider client={apolloClient}>
          <NativeRouter>
            <Main />
          </NativeRouter>
          <StatusBar style='auto' />    
        </ApolloProvider>    
    </>
  );
};

export default App;