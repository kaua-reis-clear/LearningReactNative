import {Text, StyleSheet, View} from 'react-native';
import React, {Component} from 'react';
import Field from './src/components/Field';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Iniciando o mines</Text>
        <Field />
        <Field opened />
        <Field opened nearMines={1} />
        <Field opened nearMines={2} />
        <Field opened nearMines={3} />
        <Field opened nearMines={6} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
