import {Text, StyleSheet, View} from 'react-native';
import React, {Component} from 'react';
import Field from './src/components/Field';
import params from './src/params';
import Flag from './src/components/Flag';
import MineField from './src/components/MineField';
import {createMineBoard} from './src/functions';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.createState();
  }

  minesAmount = () => {
    const cols = params.getColumnsAmount();
    const rows = params.getRowsAmount();
    return Math.ceil(cols * rows * params.difficultLevel);
  };

  createState = () => {
    const cols = params.getColumnsAmount();
    const rows = params.getRowsAmount();
    return {
      board: createMineBoard(rows, cols, this.minesAmount()),
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Iniciando o Mines!!!</Text>
        <Text style={styles.instructions}>
          Tamanho da grade:
          {params.getRowsAmount()}x{params.getColumnsAmount}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  board: {
    alignItems: 'center',
    backgroundColor: '#AAA',
  },
});
