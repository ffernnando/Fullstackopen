import { StatusBar } from 'expo-status-bar';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import Main from './src/components/Main';
import { NativeRouter } from 'react-router-native';

import { ApolloProvider } from '@apollo/client/react'
import createApolloClient from './src/utils/apolloClient';
import Constants from 'expo-constants';

import AuthStorage from './src/utils/authStorage';
import AuthStorageContext from './src/contexts/AuthStorageContext';
import { PaperProvider } from 'react-native-paper'

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

const App = () => {
  console.log(Constants.expoConfig);
  return (
    <>
        <ApolloProvider client={apolloClient}>
          <NativeRouter>
            <AuthStorageContext.Provider value={authStorage}>
              <PaperProvider>
                <Main />
              </PaperProvider>
            </AuthStorageContext.Provider>
          </NativeRouter>
          <StatusBar style='auto' />    
        </ApolloProvider>    
    </>
  );
};

export default App;