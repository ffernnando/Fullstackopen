import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import theme from '../../theme';
import { useEffect, useState } from 'react';
import useRepositories from '../../hooks/useRepositories';

import ItemSeparator from './ItemSeparator';
import { Button, Icon, Menu, Searchbar, Text } from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import FilterMenu from './FilterMenu';
import SingleRepository from './RepositoryItem/RepositoryItem';

import { useDebounce } from 'use-debounce';
import RepositoryListHeader from './RepositoryListHeader';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.backgroundPrimary,
  },
});

export const RepositoryListContainer = ({
  repositories,
  searchKeyword,
  setSearchKeyword,
  setOrderPrinciple,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <SingleRepository repository={item} />}
      style={styles.container}
      ListHeaderComponent={<RepositoryListHeader searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} setOrderPrinciple={setOrderPrinciple} />}
    />
  );
};


const RepositoryList = () => {
  const [orderPrinciple, setOrderPrinciple] = useState({
    orderBy: 'CREATED_AT',
    orderDirection: 'DESC',
  });
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchValue] = useDebounce(searchKeyword, 400);

  const { repositories } = useRepositories(orderPrinciple, searchValue);

  return (
    <RepositoryListContainer
      repositories={repositories}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
      setOrderPrinciple={setOrderPrinciple}
    />
  );
};

export default RepositoryList;
