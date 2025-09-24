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
  useParams,
} from 'react-router-native';
import SignIn from './SignIn';
import RepositoryItem from './RepositoryList/RepositoryItem';
import useRepository from '../hooks/useRepository';
import theme from '../theme';

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
  console.log(match?.params?.id);
  const { repository } = useRepository(match?.params?.id);
  console.log('repository: ', repository);

  return (
    <View style={styles.container}>
      <AppBar />

      <Routes>
        <Route path='/' element={<RepositoryList />} />
        <Route
          path='/repository/:id'
          element={<RepositoryItem item={repository} />}
        />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </View>
  );
};

export default Main;
1;
