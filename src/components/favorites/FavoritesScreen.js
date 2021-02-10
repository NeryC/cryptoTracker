import React, {Component} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import FavoritesEmptyState from './FavoritesEmptyState';
import CoinsItem from '../coins/CoinsItem';
import colors from '../../res/colors';
import Storage from '../../libs/storage';

export default class FavoritesScreen extends Component {
  state = {
    favorites: [],
  };
  getFavorites = async () => {
    try {
      const allKeys = await Storage.instance.getAllKeys();
      const keys = allKeys.filter((key) => key.includes('favorites-'));
      const favs = await Storage.instance.getAllKeys(keys);
      const favorites = favs.map((f) => JSON.parse(f[1]));
      this.setState({favorites});
    } catch (error) {
      console.log('get Favorites error', error);
    }
  };
  handlePress = (coin) => {
    this.props.navigate('CoinDetail', {coin});
  };

  componentDidMount() {
    this.props.navigation.addEventListener('focus', this.getFavorites);
  }
  componentWillUnmount() {
    this.props.navigation.removeEventListener('focus', this.getFavorites);
  }
  render() {
    const {favorites} = this.state;
    return (
      <View style={styles.container}>
        {favorites.length == 0 ? (
          <FavoritesEmptyState />
        ) : (
          <FlatList
            data={favorites}
            renderItem={({item}) => (
              <CoinsItem coin={item} onPress={() => this.handlePress(item)} />
            )}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.charade,
    flex: 1,
  },
});
