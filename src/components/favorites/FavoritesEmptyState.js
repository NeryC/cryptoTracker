import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function FavoritesEmptyState() {
  return (
    <View style={styles.container}>
      <Text style={styles.favoritesText}>You don't have any favorites</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  favoritesText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    alignSelf: 'center',
  },
});

export default FavoritesEmptyState;
