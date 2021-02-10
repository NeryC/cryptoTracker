import AsyncStorage from '@react-native-async-storage/async-storage';

class Storage {
  static instance = new Storage();

  store = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.log('AsyncStorage store error', error);
      return false;
    }
  };
  get = async (key) => {
    try {
      await AsyncStorage.getItem(key);
    } catch (error) {
      console.log('AsyncStorage get error', error);
      throw new Error(error);
    }
  };
  getAll = async (keys) => {
    try {
      await AsyncStorage.multiGet(keys);
    } catch (error) {
      console.log('AsyncStorage getAll error', error);
      throw new Error(error);
    }
  };
  getAllKeys = async () => {
    try {
      await AsyncStorage.getAllKeys();
    } catch (error) {
      console.log('AsyncStorage getAllKeys error', error);
      throw new Error(error);
    }
  };
  remove = async (key) => {
    try {
      await AsyncStorage.remove(key);
      return true;
    } catch (error) {
      console.log('AsyncStorage remove error', error);
      return false;
    }
  };
}
