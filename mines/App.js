import {Text, StyleSheet, View} from 'react-native';
import React, {Component} from 'react';
import Field from './src/components/Field';

export default class App extends Component {
  render() {
    return (
      <View>
        <Text>App</Text>
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
