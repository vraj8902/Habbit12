import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Dashboard from '../Screens/Dashboard';
import Details from '../Screens/HabbitDetail';
import {Text, View} from 'react-native';
const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Dashboard}
        options={{
          headerTitle: 'Habits',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#0b0b0b',
          },
        }}
      />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
};

export default Navigator;
