import React, {useState, useContext} from 'react';
import {
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import {format} from 'date-fns';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../contexts/auth';

import Header from '../../components/Header';
import {Background, Input, SubmitButton, SubmitText} from './styles';
import Picker from '../../components/Picker';
import {get, onValue, ref, set} from 'firebase/database';
import {db} from '../../services/firebaseConnection';

export default function New() {
  const navigation = useNavigation();

  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState(null);
  const {user: usuario} = useContext(AuthContext);

  function handleSubmit() {
    Keyboard.dismiss();
    if (isNaN(parseFloat(valor)) || tipo === null) {
      alert('Preencha todos os campos!');
      return;
    }

    Alert.alert(
      'Confirmando dados',
      `Tipo ${tipo} - Valor: ${parseFloat(valor)} `,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Continuar',
          onPress: () => handleAdd(),
        },
      ],
    );
  }

  async function handleAdd() {
    let uid = usuario.uid;

    let key = await get(ref(db, `historico/${uid}`)).key;

    await set(ref(db, `historico/${uid}/${key}`), {
      tipo: tipo,
      valor: parseFloat(valor),
      date: format(new Date(), 'dd/MM/yyyy'),
    });

    //Atualizar o nosso saldo
    onValue(ref(db, `users/${uid}`), snapshot => {
      let saldo = parseFloat(snapshot.val().saldo);

      tipo === 'despesa'
        ? (saldo -= parseFloat(valor))
        : (saldo += parseFloat(valor));

      set(ref(db, `users/${uid}/saldo`), saldo);
    });

    Keyboard.dismiss();
    setValor('');
    navigation.navigate('Home');
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Background>
        <Header />

        <SafeAreaView style={{alignItems: 'center'}}>
          <Input
            placeholder="Valor desejado"
            keyboardType="numeric"
            returnKeyType="next"
            onSubmitEditing={() => Keyboard.dismiss()}
            value={valor}
            onChangeText={text => setValor(text)}
          />

          <Picker onChange={setTipo} tipo={tipo} />

          <SubmitButton onPress={handleSubmit}>
            <SubmitText>Registrar</SubmitText>
          </SubmitButton>
        </SafeAreaView>
      </Background>
    </TouchableWithoutFeedback>
  );
}
