import React from 'react';
import {View, Text, Image, StyleSheet, Platform, Pressable} from 'react-native';
import colors from '../../res/colors';

function CoinsItem({coin, onPress}) {
  const getImageArrow = (item) => {
    if (item.percent_change_1h > 0) {
      return require('../../assets/arrow_up.png');
    }
    return require('../../assets/arrow_down.png');
  };

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.symbolText}>{coin.name}</Text>
        <Text style={styles.nameText}>{coin.symbol}</Text>
        <Text style={styles.priceText}>{`$${coin.price_usd}`}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.percentText}>{coin.percent_change_1h}</Text>
        <Image style={styles.imgIcon} source={getImageArrow(coin)} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomColor: colors.zircon,
    borderBottomWidth: 1,
    marginLeft: Platform.OS === 'ios' ? 16 : 0,
    paddingLeft: Platform.OS === 'ios' ? 0 : 16,
  },
  row: {
    flexDirection: 'row',
  },
  symbolText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 12,
  },
  nameText: {
    color: '#fff',
    fontSize: 14,
    marginRight: 16,
  },
  percentText: {
    color: '#fff',
    fontSize: 12,
    marginRight: 8,
  },
  priceText: {
    color: '#fff',
    fontSize: 14,
  },
  imgIcon: {
    height: 22,
    width: 22,
  },
});

export default CoinsItem;
