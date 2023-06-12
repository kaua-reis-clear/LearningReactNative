import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import app from '../../services/firebaseConfig';

export default function Login({changeStatus}) {
  const auth = getAuth(app);
  const [type, setType] = useState('cadastro');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin() {
    if (type === 'login') {
      const user = signInWithEmailAndPassword(auth, email, password)
        .then(user => {
          changeStatus(user.user.uid);
        })
        .catch(err => {
          console.log(err);
          alert('Ops parece que algo está errado!');
          return;
        });
    } else {
      const user = createUserWithEmailAndPassword(auth, email, password)
        .then(user => {
          changeStatus(user.user.uid);
        })
        .catch(err => {
          console.log(err);
          alert('Ops parece que algo está errado!');
          return;
        });
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Seu email"
        style={styles.input}
        value={email}
        onChangeText={text => setEmail(text)}
      />

      <TextInput
        placeholder="*******"
        style={styles.input}
        value={password}
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
      />

      <TouchableOpacity
        style={[
          styles.handleLogin,
          {backgroundColor: type === 'login' ? '#3ea6f2' : '#141414'},
        ]}
        onPress={handleLogin}>
        <Text style={styles.loginText}>
          {type === 'login' ? 'Acessar' : 'Cadastrar'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          setType(type => (type === 'login' ? 'cadastrar' : 'login'))
        }>
        <Text style={{textAlign: 'center'}}>
          {type === 'login' ? 'Criar uma conta' : 'Já possuo uma conta'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 10,
    backgroundColor: '#F2F6FC',
  },
  input: {
    marginBottom: 10,
    backgroundColor: '#FFF',
    borderRadius: 4,
    height: 45,
    padding: 10,
    borderWidth: 1,
    borderColor: '#141414',
  },
  handleLogin: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#141414',
    height: 45,
    marginBottom: 10,
  },
  loginText: {
    color: '#FFF',
    fontSize: 17,
  },
});
