import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import Navigator from './src/Navigator';
import {View} from 'react-native';

export default function App() {
  return (
    <NavigationContainer>
      <View style={{flex: 1}}>
        <Navigator />
      </View>
    </NavigationContainer>
  );
}
