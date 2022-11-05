import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
import FloatingInput from '../../Components/TextInput';

export const screenHeight = Math.round(Dimensions.get('window').height) / 100;
export const screenWidth = Math.round(Dimensions.get('window').width) / 100;

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>Habbit Detail</Text>
      <FloatingInput
        onChangeText={v => console.log('sdjn')}
        value={'filter.cargos__lr__number'}
        label="GRN No"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
