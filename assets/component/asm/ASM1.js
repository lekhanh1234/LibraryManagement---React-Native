/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text ,TextInput,SafeAreaView,StyleSheet,TouchableOpacity,Image, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import Product from './Product'
import DetailScreen from './Details';

// Màn hình dang ki


const checkEmailExistenceAndSendOTP = async (email) => {
  try {
    // Kiểm tra xem địa chỉ email đã tồn tại trong hệ thống hay chưa
    const userRecord = await auth().getUserByEmail(email);
    console.log(2332);
    // Nếu địa chỉ email đã tồn tại, gửi OTP hoặc email xác thực
    // Trong trường hợp này, chúng ta sẽ giả sử gửi một mã OTP bằng SMS
    // Hiển thị thông báo cho người dùng
    Alert.alert('Thông báo', 'Một mã OTP đã được gửi đến email của bạn. Vui lòng nhập mã OTP để tiếp tục đăng ký.');

  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      // Nếu địa chỉ email không tồn tại, tiếp tục quá trình đăng ký
      console.log('Địa chỉ email chưa tồn tại. Tiếp tục quá trình đăng ký...');
      // Tiếp tục với quá trình đăng ký tài khoản
      // Ví dụ: registerWithEmail(email, password);
    } else {
      console.error('Lỗi khi kiểm tra địa chỉ email:', error);
      Alert.alert('Lỗi', 'Đã xảy ra lỗi khi kiểm tra địa chỉ email. Vui lòng thử lại sau.');
    }
  }
};



const Stack = createStackNavigator();


const styles = StyleSheet.create({
    input: {

    },
    image : {
        width : "80%",
        height : "25%",
        backgroundColor : 'green',
        marginTop : 20
       }
  });


export default ASM;
