/* eslint-disable prettier/prettier */
import { useState } from "react";
import styles from "../style/StyleRegisterScreen";
import { HandleRegister } from "../js/UserAuthentication";
import { Text,SafeAreaView,TextInput,TouchableOpacity,View,ImageBackground } from "react-native";

const RegisterScreen = ({navigation}) => {
    const [userName,setUserName] = useState("lekhanh123");
    const [password,setPassword] = useState("1234567");
    const [rePassWord,setRePassWord] = useState("1234567");
   
    return (
        <SafeAreaView style = {styles.container}>
        <ImageBackground style ={styles.backgroundImage}
        source={require('../img/library.png')}
        >
        <Text style = {styles.title}>Đăng kí Tài khoản</Text>
        <TextInput
          style={styles.userNameField}
          value = {userName}
          onChangeText={(userName)=>setUserName(userName)}
          placeholder="Nhập UserName"
        />
        <TextInput
          style={styles.passwordField}
          value={password}
          onChangeText={(password)=>setPassword(password)}
          placeholder="Nhập Password"
        />
        <TextInput
          style={styles.passwordField}
          value={rePassWord}
          onChangeText={(rePassWord)=>setRePassWord(rePassWord)}
          placeholder="Nhập lại Password"
        />
          <TouchableOpacity   
          title="Sign up"
          style={styles.registerButton}
          onPress={()=>{
            HandleRegister(navigation,userName,password,rePassWord)
          }}
      >
        <Text style ={styles.registerButtonText}>Đăng kí</Text>
      </TouchableOpacity>
                </ImageBackground>
        </SafeAreaView>
    );
  };
  export default RegisterScreen