import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors from '../../res/colors';

function CoinMarketItem({coin}) {
  return (
    <View style={styles.container}>
      <Text style={styles.nameText}>{coin.name}</Text>
      <Text style={styles.priceText}>{coin.price_usd}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderColor: colors.zircon,
    borderWidth: 1,
    padding: 16,
    marginRight: 8,
    alignItems: 'center',
  },
  nameText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  priceText: {
    color: '#fff',
  },
});

export default CoinMarketItem;
