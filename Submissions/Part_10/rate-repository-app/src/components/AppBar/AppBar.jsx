import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import Theme from '../../theme';
import { useQuery } from '@apollo/client/react';
import { ME } from '../../graphql/queries';
import useAuthStorage from '../../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client/react';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: Theme.colors.primary,
  },
  scrollView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sideTabs: {
    display: 'flex',
    flexDirection: 'row',
  },
});

const AppBar = () => {
  const auth = useAuthStorage();
  const apolloClient = useApolloClient();

  const verifyUser = useQuery(ME);
  console.log('verifyUser: ', verifyUser.data);

  const signOut = async () => {
    console.log('GETTING CALLED HERE');
    await auth.removeAccessToken();
    await apolloClient.resetStore();
    console.log('Signing out!');
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollView}>
        <AppBarTab text='Repositories' link='/' />
        {verifyUser?.data?.me !== null ? (
          <View style={styles.sideTabs}>
            <AppBarTab text='Sign-out' link='/' onPress={signOut} />
            <AppBarTab text='Create review' link='/create-review' />
          </View>
        ) : (
          <View style={styles.sideTabs}>
            <AppBarTab text='Sign-in' link='/sign-in' />
            <AppBarTab text='Sign-up' link='/sign-up' />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
