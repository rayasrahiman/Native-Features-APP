import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';

import PlacesList from '../components/Places/PlacesList';
import {fetchPlaces} from '../util/database';

export default function AllPlaces({route}) {
  const [loadedPlaces, setLoadedPlaces] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadPlaces() {
      const places = await fetchPlaces();
      setLoadedPlaces(places);
    }
    if (
      isFocused
      // && route.params
    ) {
      loadPlaces();
      // setLoadedPlaces(currentPlaces => [...currentPlaces, route.params.place]);
    }
  }, [
    isFocused,
    // route
  ]);

  return <PlacesList places={loadedPlaces} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
