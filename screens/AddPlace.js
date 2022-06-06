import {View, Text} from 'react-native';
import React from 'react';

import PlaceForm from '../components/Places/PlaceForm';
import {insertPlace} from '../util/database';

export default function AddPlace({navigation}) {
  const createPlaceHandler = (place) => {
    // await insertPlace(place);
    insertPlace(place);
    navigation.navigate('AllPlaces'
    // , {
    //   place: place,
    // }
    );
  };

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
}
