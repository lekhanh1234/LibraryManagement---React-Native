/* eslint-disable prettier/prettier */
import {SafeAreaView,Platform,ImageBackground,Text,TextInput,TouchableOpacity,KeyboardAvoidingView} from 'react-native';
import { useState } from 'react';
import styles from '../style/StyleLoginScreen';
import { HandleLogin } from '../js/UserAuthentication';


// Màn hình đăng nhập
const LoginScreen = ({ navigation}) => {
  const [userName,setUserName] = useState('lekhanh123');
  const [password,setPassword] = useState('1234567');

return (
  <SafeAreaView style = {styles.container}>
    <ImageBackground
    style = {styles.backgroundImage}
    source={require('../img/library.png')}
    >
    <Text style = {styles.title}>Login vào tài khoản của bạn</Text>
    <KeyboardAvoidingView
       style={styles.inputContainer}  
       behavior='height'
       >
    <TextInput
      style={styles.inputField}
      onChangeText={setUserName}
      value={userName}
      placeholder='Nhập userName'
    />
    <TextInput
      style={styles.inputField}
      onChangeText={setPassword}
      value={password}
      placeholder="Nhập mật khẩu"
    />
    </KeyboardAvoidingView>

    <TouchableOpacity
      title="Login"
      style={styles.buttonLogin}
      onPress={() => {
        HandleLogin(navigation,userName,password);
      }}
     >
    <Text style = {styles.buttonTextContent}>Đăng nhập</Text>
  </TouchableOpacity>

  <TouchableOpacity 
      title="Singup"
      style={styles.buttonRegister}
      onPress={() => navigation.navigate('Register')}
  >
    <Text  style = {styles.buttonTextContent}>Đăng kí</Text>
  </TouchableOpacity>
  </ImageBackground>
  </SafeAreaView>

);
};

export default LoginScreen