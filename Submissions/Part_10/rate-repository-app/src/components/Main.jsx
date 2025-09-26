import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList/RepositoryList';
import Text from './Text';
import AppBar from './AppBar/AppBar';

import {
  Route,
  Routes,
  Navigate,
  useMatch,
} from 'react-router-native';
import useRepository from '../hooks/useRepository';
import theme from '../theme';
import CreateReview from './CreateReview/CreateReview';
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';
import SingleRepository from './RepositoryList/RepositoryItem/RepositoryItem';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: theme.colors.backgroundSecondary,
  },
});

const Main = () => {
  const match = useMatch('/repository/:id');
  console.log('MAIN - match params id', match?.params?.id);
  const { repository } = useRepository(match?.params?.id);
  console.log('MAIN - repository: ', repository);

  return (
    <View style={styles.container}>
      <AppBar />

      <Routes>
        <Route path='/' element={<RepositoryList />} />
        <Route
          path='/repository/:id'
          element={<SingleRepository repository={repository} />}
        />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/create-review' element={<CreateReview />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </View>
  );
};

export default Main;
1;
