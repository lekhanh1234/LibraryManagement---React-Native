/* eslint-disable prettier/prettier */
import { View, Text, Button, Modal, StyleSheet ,ImageBackground,TouchableHighlight,TouchableOpacity, StatusBar} from 'react-native';
export default function Bai2() {
    return(
    <View style = {{flex : 1, backgroundColor : 'red',justifyContent : 'center'}}>
         <ImageBackground 
         style ={{flex : 1, backgroundColor : 'green',justifyContent : 'center' }}
         source = {require('../../color/1454hinh-nen-phong-canh-thien-nhien.jpg')}
          > 
           <StatusBar  barStyle="dark-content" ></StatusBar>
         <Text style={{height : 130,width : 250 ,marginBottom : 20,fontSize : 40,marginStart : 30,color : 'white'}}>Discover world with us</Text>

         <Text style={{color : 'white',flex : 0,width : 370,marginBottom : 20,marginStart : 20,lineHeight : 20}}>
           Ngôn ngữ lập trình C++ là một ngôn ngữ lập trình hướng đối tượng(OOP – Object-oriented programming) được phát triển bởi Bjarne Stroustrup. C++ là ngôn ngữ lập trình được phát triển trên nên tảng của ngôn ngữ lập trình C. 
         </Text>
         <TouchableOpacity title = "Login" style = {{backgroundColor : 'grey',height : 70,width : 130,marginBottom : 20,borderRadius : 20,justifyContent : 'center',alignItems : 'center',marginStart : 20}}>
           <Text style={{color : 'white'}}>Get Started</Text>
        </TouchableOpacity>
         </ImageBackground>     
   </View>
    )
}