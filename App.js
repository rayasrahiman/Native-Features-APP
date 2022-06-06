import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';

import { Colors } from './constants/colors';

import MainNavigationContainer from './naviagtion/MainNavigationContainer';
import {init} from './util/database';

const App = () => {
  useEffect(() => {
    async function createTable() {
      await init();
    }

    createTable();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="default" backgroundColor={Colors.primary500} />
      <MainNavigationContainer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
