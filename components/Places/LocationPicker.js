import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Geolocation from '@react-native-community/geolocation';

import OutlinedButton from '../UI/OutlinedButton';
import {Colors} from '../../constants/colors';

export default function LocationPicker() {
  const getLocationHandler = () => {
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);

        console.log(
          'currentLongitude => ',
          currentLongitude,
          'currentLatitude => ',
          currentLatitude,
        );
      },
      error => alert(error.message),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      },
    );
  };
  const pickOnMapHandler = () => {};

  return (
    <View>
      <View style={styles.mapPreview}></View>
      <View style={styles.actions}>
        <OutlinedButton
          children="Locate User"
          icon="location"
          onPress={getLocationHandler}
        />
        <OutlinedButton
          children="Pick on Map"
          icon="map"
          onPress={pickOnMapHandler}
        />
      </View>
      <Text>LocationPicker</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
