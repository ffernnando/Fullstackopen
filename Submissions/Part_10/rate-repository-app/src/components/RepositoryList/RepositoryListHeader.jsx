import { View, StyleSheet } from 'react-native';
import theme from '../../theme';
import { Searchbar } from 'react-native-paper';
import FilterMenu from './FilterMenu';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.backgroundPrimary,
  },
  repositoryListHeader: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    backgroundColor: theme.colors.backgroundSecondary,
    padding: 10,
    gap: 10,
  },
  searchBar: {
    backgroundColor: '#FFF',
    borderRadius: 5,
  },
});

const RepositoryListHeader = ({
  searchKeyword,
  setSearchKeyword,
  setOrderPrinciple,
}) => {
  return (
    <View style={styles.repositoryListHeader}>
      <Searchbar
        style={styles.searchBar}
        value={searchKeyword}
        onChangeText={setSearchKeyword}
      />
      <FilterMenu setOrderPrinciple={setOrderPrinciple} />
    </View>
  );
};

export default RepositoryListHeader;
