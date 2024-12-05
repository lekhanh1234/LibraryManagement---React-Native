/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
     container : {
        flex : 1
     },
     backgroundImage : {
      flex : 1,
      justifyContent : 'center',
      alignItems : 'center'
     },
     title : {
      textAlign : 'center',
      fontSize : 29,
      marginTop : -100,
      color : 'blue',
      fontWeight : 'bold'
     },
     userNameField : {
      marginTop : 100,
      height: 45,
      width : '85%',
      borderWidth: 1,
      borderColor: 'gray',  // màu của viền
      borderRadius: 5,      // bo tròn góc của viền
      backgroundColor : 'white',
      marginBottom : 20, 
     },
     passwordField : {
      height: 45,
      width : '85%',
      borderWidth: 1,
      borderColor: 'gray',  // màu của viền
      borderRadius: 5,      // bo tròn góc của viền
      backgroundColor : 'white',
      marginBottom : 21
     },
     registerButton : {
     borderRadius : 20, 
     height: 50, 
     width: "70%", 
     backgroundColor: 'blue' ,
     marginTop : 20, 
     alignItems: 'center', 
     justifyContent: 'center' 
     },
     registerButtonText : {
     fontSize : 15,
     color : 'white'
     } 
})
export default styles