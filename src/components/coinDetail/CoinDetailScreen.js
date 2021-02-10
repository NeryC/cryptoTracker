import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  FlatList,
  SectionList,
  Pressable,
  Alert,
} from 'react-native';
import CoinMarketItem from './CoinMarketItem';
import colors from '../../res/colors';
import Storage from '../../libs/storage';
import Http from '../../libs/http';

class CoinDetailScreen extends Component {
  state = {
    coin: {},
    markets: [],
    isFavorite: false,
  };
  getSymbolIcon = (coinNameId) => {
    if (coinNameId) {
      return `https://c1.coinlore.com/img/16x16/${coinNameId}.png`;
    }
  };
  getSections = (coin) => {
    const sections = [
      {
        title: 'Price',
        data: [coin.price_usd],
      },
      {
        title: 'Market Cap',
        data: [coin.market_cap_usd],
      },
      {
        title: 'Volume 24h',
        data: [coin.volume24],
      },
    ];
    return sections;
  };
  getMarkets = async (coinId) => {
    const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`;
    const markets = await Http.instance.get(url);
    this.setState({markets});
  };
  toggleFavorite = () => {
    if (this.state.isFavorite) {
      this.removeFavorite();
    } else {
      this.addFavorite();
    }
  };
  removeFavorite = async () => {
    Alert.alert('Remove Favorite', 'Are you sure?', [
      {text: 'Cancel', onPress: () => {}, style: 'cancel'},
      {
        text: 'remove',
        onPress: async () => {
          const coin = JSON.stringify(this.state.coin);
          const key = `favorite-${this.state.coin.id}`;
          const stored = await Storage.instance.store(key, coin);
          if (stored) {
            this.setState({isFavorite: true});
          }
        },
        styles: 'destructive',
      },
    ]);
  };
  addFavorite = async () => {
    const key = `favorite-${this.state.coin.id}`;

    await Storage.instance.remove(key);
    this.setState({isFavorite: false});
  };
  getFavorite = async () => {
    try {
      const key = `favorite-${this.state.coin.id}`;
      const favoriteString = await Storage.instance.get(key);
      if (favoriteString != null) {
        this.setState({isFavorite: true});
      }
    } catch (error) {
      console.log('get Favorite error:', error);
    }
  };

  componentDidMount() {
    const {coin} = this.props.route.params;
    this.props.navigation.setOptions({title: coin.symbol});
    this.getMarkets(coin.id);
    this.setState({coin}, () => {
      this.getFavorite();
    });
  }

  render() {
    const {coin, markets, isFavorite} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.subHeader}>
          <View style={styles.row}>
            <Image
              style={styles.iconImg}
              source={{uri: this.getSymbolIcon(coin.nameid)}}
            />
            <Text
              style={[
                styles.titleText,
                isFavorite
                  ? styles.btnFavoritesRemove
                  : styles.btnFavoritesRemove,
              ]}>
              {coin.name}
            </Text>
          </View>

          <Pressable onPress={this.toggleFavorite}>
            <Text style={[styles.btnFavoritesText]}>
              {isFavorite ? 'Remove' : 'Add'}
            </Text>
          </Pressable>
        </View>
        <SectionList
          style={styles.sectionComponent}
          sections={this.getSections(coin)}
          keyExtractor={(item) => item}
          renderItem={({item}) => (
            <View style={styles.sectionItem}>
              <Text style={styles.itemText}>{item}</Text>
            </View>
          )}
          renderSectionHeader={({section}) => (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionText}>{section.title}</Text>
            </View>
          )}
        />
        <Text style={styles.marketsTitle}>Markets</Text>
        <FlatList
          style={styles.listComponent}
          horizontal={true}
          data={markets}
          renderItem={({item}) => <CoinMarketItem coin={item} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.charade,
  },
  row: {
    flexDirection: 'row',
  },
  subHeader: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 16,
    color: colors.white,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  iconImg: {
    height: 25,
    width: 25,
  },
  sectionHeader: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 8,
  },
  sectionItem: {
    padding: 8,
  },
  sectionComponent: {
    maxHeight: 220,
  },
  itemText: {
    color: colors.white,
    fontSize: 14,
  },
  sectionText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  listComponent: {
    maxHeight: 100,
    paddingLeft: 16,
  },
  marketsTitle: {
    color: colors.white,
    fontSize: 16,
    marginBottom: 16,
    marginLeft: 16,
    fontWeight: 'bold',
  },
  btnFavorites: {
    padding: 8,
    borderRadius: 8,
  },
  btnFavoritesAdd: {
    backgroundColor: colors.picton,
  },
  btnFavoritesRemove: {
    backgroundColor: colors.carmine,
  },
  btnFavoritesText: {
    color: colors.white,
  },
});

export default CoinDetailScreen;
