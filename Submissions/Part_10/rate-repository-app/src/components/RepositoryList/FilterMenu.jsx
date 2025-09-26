import { View, Pressable, StyleSheet } from 'react-native';
import { useState } from 'react';
import { Menu, Text } from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import theme from '../../theme';

const styles = StyleSheet.create({
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

const FilterMenu = ({ setOrderPrinciple }) => {
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
            <Entypo name='triangle-down' color='#777' size={25} />
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

export default FilterMenu;
