import React, {useState} from 'react';
import {
  Alert,
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export default props => {
  const [image, setImage] = useState(null);
  const [comment, setComment] = useState('');

  const pickImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
        maxHeight: 600,
        maxWidth: 800,
      },
      res => {
        if (!res.didCancel) {
          setImage({uri: res.assets[0].uri, base64: res.assets[0].data});
        }
      },
    );
  };

  const pickPhoto = () => {
    launchCamera(
      {
        mediaType: 'photo',
        includeBase64: true,
        saveToPhotos: true,
        maxHeight: 600,
        maxWidth: 800,
      },
      res => {
        if (!res.didCancel) {
          setImage({uri: res.assets[0].uri, base64: res.assets[0].data});
        }
      },
    );
  };

  const save = () => {
    Alert.alert('Comentário adicionado', comment);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Compartilhe uma imagem</Text>
        <View style={styles.imageContainer}>
          <Image source={image} style={styles.image} />
        </View>
        <View style={styles.buttomRow}>
          <TouchableOpacity onPress={pickPhoto} style={styles.buttom}>
            <Text style={styles.buttomText}>Tirar uma foto</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={pickImage} style={styles.buttom}>
            <Text style={styles.buttomText}>Escolha a foto</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          placeholder="Algum comentário para a foto?"
          style={styles.input}
          value={comment}
          onChangeText={setComment}
        />
        <TouchableOpacity onPress={save} style={styles.buttom}>
          <Text style={styles.buttomText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginTop: Platform.OS === 'ios' ? 30 : 10,
    fontWeight: 'bold',
  },
  imageContainer: {
    width: '90%',
    height: Dimensions.get('window').width / 2,
    backgroundColor: '#EEE',
    marginTop: 10,
  },
  image: {
    width: '100%',
    height: Dimensions.get('window').width / 2,
    resizeMode: 'center',
  },
  buttomRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  buttom: {
    marginTop: 30,
    padding: 10,
    backgroundColor: '#4286f4',
  },
  buttomText: {
    fontSize: 20,
    color: '#FFF',
  },
  input: {
    marginTop: 20,
    width: '90%',
  },
});
