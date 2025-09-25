import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import theme from '../../theme';
import { useEffect, useState } from 'react';
import useRepositories from '../../hooks/useRepositories';
import SingleRepository from './RepositoryItem';
import ItemSeparator from './ItemSeparator';
import { Button, Icon, Menu, Text } from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.backgroundPrimary,
  },
  menuContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    flex: 1,
    backgroundColor: theme.colors.backgroundSecondary,
  },
  menuText: {
    fontSize: theme.fontSizes.subheading,
    
  },
});

/*
  1. Add button/menu for selecting filter type - react native paper menu
    1.1. Default is latest first; other options: highest rated and lowest rated
  2. Setup repositories query with specific "orderBy" (CREATED_AT or RATING_AVERAGE) and 
    "orderDirection" (ASC-smallest value first | DESC - biggest value first) args 
    2.1. Default - orderBy: CREATED_AT; orderDirection: DESC 
        Highest rated - orderBy: RATING_AVERAGE; orderDirection: DESC
        Lowest rated - orderBy: RATING_AVERAGE; orderDirection: ASC
  3. Selected ordering principle stored in a useState()
  4. 

*/

const FilterMenu = ({ orderPrinciple, setOrderPrinciple }) => {
  const [menuVisibility, setMenuVisibility] = useState(false);
  const [filterText, setFilterText] = useState('Latest repositories');

  const latestRepos = {
    orderBy: 'CREATED_AT',
    orderDirection: 'DESC',
    filterText: 'Latest repositories',
  };
  const highestRated = {
    orderBy: 'RATING_AVERAGE',
    orderDirection: 'DESC',
    filterText: 'Highest rated',
  };
  const lowestRated = {
    orderBy: 'RATING_AVERAGE',
    orderDirection: 'ASC',
    filterText: 'Lowest rated',
  };

  const chooseMenuItem = ({ orderBy, orderDirection, filterText }) => {
    setOrderPrinciple({
      orderBy,
      orderDirection,
    });
    setFilterText(filterText);
    setMenuVisibility(false);
  };

  return (
    <View>
      <Menu
        visible={menuVisibility}
        onDismiss={() => setMenuVisibility(false)}
        anchor={
          <Pressable
            style={styles.menuContainer}
            onPress={() => setMenuVisibility(true)}
          >
            <Text style={styles.menuText}>{filterText}</Text>
            <Entypo name='triangle-down' color='#000' size={25}/>
          </Pressable>
        }
        contentStyle={styles.menuItemStyle}
      >
        <Menu.Item
          onPress={() => chooseMenuItem(latestRepos)}
          title='Latest repositories'
        />
        <Menu.Item
          onPress={() => chooseMenuItem(highestRated)}
          title='Highest rated'
        />
        <Menu.Item
          onPress={() => chooseMenuItem(lowestRated)}
          title='Lowest rated'
        />
      </Menu>
    </View>
  );
};

export const RepositoryListContainer = ({
  repositories,
  orderPrinciple,
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
      ListHeaderComponent={
        <FilterMenu
          orderPrinciple={orderPrinciple}
          setOrderPrinciple={setOrderPrinciple}
        />
      }
    />
  );
};

const RepositoryList = () => {
  const [orderPrinciple, setOrderPrinciple] = useState({
    orderBy: 'CREATED_AT',
    orderDirection: 'DESC',
  });
  const { repositories } = useRepositories(orderPrinciple);

  return (
    <RepositoryListContainer
      repositories={repositories}
      orderPrinciple={orderPrinciple}
      setOrderPrinciple={setOrderPrinciple}
    />
  );
};

export default RepositoryList;
