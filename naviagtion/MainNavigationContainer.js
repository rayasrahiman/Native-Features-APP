import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AllPlaces from '../screens/AllPlaces';
import AddPlace from '../screens/AddPlace';
import PlaceDetails from '../screens/PlaceDetails';
import IconButton from '../components/UI/IconButton';
import {Colors} from '../constants/colors';

const Stack = createNativeStackNavigator();

const MainNavigationContainer = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.primary500,
          },
          headerTintColor: Colors.gray700,
          contentStyle: {backgroundColor: Colors.gray700},
        }}>
        <Stack.Screen
          name="AllPlaces"
          component={AllPlaces}
          options={({navigation}) => ({
            title: 'Your Favorite Places',
            headerRight: ({tintColor}) => (
              <IconButton
                icon="add"
                size={24}
                color={tintColor}
                onPress={() => navigation.navigate('AddPlace')}
              />
            ),
          })}
        />
        <Stack.Screen
          name="AddPlace"
          component={AddPlace}
          options={{title: 'Add a new Place'}}
        />
        <Stack.Screen
          name="PlaceDetails"
          component={PlaceDetails}
          options={{title: 'Loading Place...'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigationContainer;
