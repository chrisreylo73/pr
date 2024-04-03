import { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Alert,
  Dimensions,
  PanResponder,
  Animated,
  ImageBackground,
  Keyboard,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Add = () => {
  const [url, setUrl] = useState('');

  const onChange = (inputText) => {
    setUrl(inputText);
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#000000', '#111111', '#000000']} style={styles.gradient}>
        <View style={styles.inputContainer}>
          <Text style={[styles.inputHeader, { paddingTop: 10 }]}>URL</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChange}
            value={url}
            caretHidden={false}
            autoCorrect={false}
            autoCapitalize="characters"></TextInput>
        </View>
        <TouchableOpacity style={styles.findButton}>
          <Text style={{ fontSize: 12, fontWeight: 'bold' }}>SEARCH</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

export default Add;

const styles = StyleSheet.create({
  gradient: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#080808',
  },
  inputContainer: {
    width: '90%',
    top: 0,
    position: 'absolute',
  },
  inputHeader: {
    marginTop: 15,
    width: '100%',
    color: '#333333',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 40,
    borderBottomColor: '#FFFFFF',
    borderBottomWidth: 1,
    backgroundColor: 'black',
    // alignSelf: "center",
    textAlign: 'auto',
    fontSize: 15,
    color: '#FFA500',
    paddingHorizontal: 10,
  },
  findButton: {
    position: 'absolute',
    width: 100,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'white',
    bottom: 110,
    left: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {},
});
