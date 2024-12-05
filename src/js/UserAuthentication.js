/* eslint-disable prettier/prettier */

import { Alert } from "react-native";
import { insertUser,login } from "./authenUser";


const HandleLogin = async (navigation,userName,password)=>{
     if(userName.length === 0 || password.length == 0){
        Alert.alert("Error",'Bạn cần nhập username và password')
        return;
     }
     console.log("check login");
     const result = await login(userName,password)
     if(result.success == true){
         console.log("login thanh cong: user la : "+result.user);
         navigation.navigate('Home', { user: result.user});
     }else{
        Alert.alert(`${result.message}`)
    }
}



const HandleRegister = async (navigation,userName,password,rePassword)=>{
    if(userName.length < 7){
        Alert.alert('Error',"UserName phải ít nhất 7 kí tự")
        return;
    }
    if(password.length < 7 ){
      Alert.alert('Error', 'Password phải ít nhất 7 kí tự');
      return;
    }
    if(password !== rePassword){
        Alert.alert('Error', 'Kiểm tra mật khẩu của bạn !');
        return; 
    }
    const result = await insertUser(userName,password)
    if(result.success == true){
        navigation.navigate('Home', {user : result.user});
    }else{
       Alert.alert(`${result.message}`)
   }
}

export {HandleLogin,HandleRegister}