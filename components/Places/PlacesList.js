import {View, Text, FlatList, StyleSheet} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

import PlaceItem from './PlaceItem';
import {Colors} from '../../constants/colors';

export default function PlacesList({places}) {
  const navigation = useNavigation();

  const selectPlaceHandler = id => {
    navigation.navigate('PlaceDetails', {
      placeId: id,
    });
  };

  if (!places || places.length === 0) {
    return (
      <View style={styles.fallBackContainer}>
        <Text style={styles.fallBackText}>
          No places added yet, Please start adding some!!!
        </Text>
      </View>
    );
  }
  const renderItem = ({item}) => (
    <PlaceItem place={item} onSelect={selectPlaceHandler} />
  );

  return (
    <View>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.list}
        data={places}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    margin: 24,
  },
  fallBackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallBackText: {
    color: Colors.primary200,
    fontSize: 16,
  },
});
