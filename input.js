import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {FloatingLabelInput} from 'react-native-floating-label-input';

export default FloatingInput = props => {
  return (
    <View style={[styles.container, props.style]}>
      {props.label ? <Text style={styles.label}>{props.label}</Text> : null}
      <View style={styles.subContainer}>
        <View style={{flex: 2, justifyContent: 'center'}}>
          <FloatingLabelInput
            // staticLabel
            // label={props.label}
            value={props.value}
            onChangeText={props.onChange ? props.onChange : props.onChangeText}
            multiline={props.multiline}
            keyboardType={props.keyboardType}
            mask={props.mask}
            maskType={props.maskType}
            hint={props.hint}
            rightComponent={props.rightComponent}
            leftComponent={props.leftComponent}
            // hintTextColor="#ccc"
            // labelStyles={{ backgroundColor: 'white', paddingHorizontal: 0, fontSize: 20, top: 0, color: '#333' }}
            containerStyles={{
              borderWidth: 0,
              paddingVertical: 0,
              marginRight: -20,
              height: 28,
            }}
            inputStyles={{
              fontSize: 16,
              marginTop: 0,
              marginLeft: 5,
              color: '#000',
              paddingVertical: 0,
            }}
            customLabelStyles={{fontSizeFocused: 12}}
          />
        </View>
        <View style={{flex: 1}}>
          {props.renderRight != undefined ? (
            <View style={styles.right}>{props.renderRight()}</View>
          ) : null}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    paddingVertical: 10,
    marginHorizontal: 0,
    marginVertical: 10,
    borderRadius: 5,
    borderColor: '#CCC',
  },
  subContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  label: {
    position: 'absolute',
    left: 20,
    top: -10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    color: '#999',
  },
  right: {
    alignSelf: 'flex-end',
  },
});
