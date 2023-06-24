import {StyleSheet, View, Text} from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
  display: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
  },
  displayValue: {
    fontSize: 60,
    color: '#fff',
  },
});

export default function Display(props) {
  return (
    <View style={styles.display}>
      <Text style={styles.displayValue} numberOfLines={1}>
        {props.value}
      </Text>
    </View>
  );
}
