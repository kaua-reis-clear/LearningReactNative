import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard,
} from 'react-native';
import {child, get, getDatabase, ref, remove, set} from 'firebase/database';

import Login from './src/components/Login';
import TaskList from './src/components/TaskList';
import app from './src/services/firebaseConfig';

export default function App() {
  const db = getDatabase(app);
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);

  const [newTask, setNewTask] = useState('');

  const getUser = useCallback(() => {
    if (!user) {
      return;
    }
    get(child(ref(db), `tarefas/${user}`)).then(snapshot => {
      if (snapshot.exists()) {
        setTasks([]);
        snapshot?.forEach(childItem => {
          setTasks(oldTasks => [
            ...oldTasks,
            {key: childItem.key, nome: childItem.val().nome},
          ]);
        });
      }
    });
  }, [user, db]);

  function handleAdd() {
    if (newTask === '') {
      return;
    }

    set(ref(db, `tarefas/${user}/${tasks.length}`), {
      nome: newTask,
    }).then(() => {
      setTasks(oldTasks => [
        ...oldTasks,
        {key: oldTasks.length, nome: newTask},
      ]);

      Keyboard.dismiss();
      setNewTask('');
    });
  }

  function handleDelete(key) {
    if (!user) {
      return;
    }
    remove(ref(db, `tarefas/${user}/${key}`)).then(() => getUser());
  }

  function handleEdit(data) {
    console.log('ITEM CLICADO', data);
  }

  useEffect(() => {
    getUser();
  }, [getUser]);

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  if (!user) {
    return <Login changeStatus={user => setUser(user)} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerTask}>
        <TextInput
          style={styles.input}
          placeholder="O que vai fazer hoje?"
          value={newTask}
          onChangeText={text => setNewTask(text)}
        />
        <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        keyExtractor={item => item?.key}
        renderItem={({item}) => (
          <TaskList
            data={item}
            deleteItem={handleDelete}
            editItem={handleEdit}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    paddingHorizontal: 10,
    backgroundColor: '#F2F6FC',
  },
  containerTask: {
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#141414',
    height: 45,
  },
  buttonAdd: {
    backgroundColor: '#141414',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    paddingHorizontal: 14,
    borderRadius: 4,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 22,
  },
});
