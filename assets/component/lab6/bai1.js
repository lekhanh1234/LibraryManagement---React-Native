/* eslint-disable prettier/prettier */
import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
function Bai1(){
    const Stack = createStackNavigator();
    return(
    <View style = {{backgroundColor : 'red', flex : 1}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name = "Home" component={Home}/>
            <Stack.Screen name = "Detail" component={Detail}/>
        </Stack.Navigator>
      </NavigationContainer>    
    </View>
    )
}
// quan trong. khi goi cac prop component.
// ham khoi tao se duoc goi voi tham so truyen vao la mot doi tuong co thuoc tinh 
// la navigation de dieu huong giua cac man hinh thông qua ham natigate


const Home = ({navigation})=>{
  console.log(-1119);
   return(
     <View>
        <Text>Chào bạn, đây là màn hình Home</Text>
        <TextInput style = {styles.textInput } placeholder = 'Nhập value'></TextInput>
        <TouchableOpacity 
        style = {styles.touchableOpacity} 
        title = 'Đi đến màn hình Detail'>
          <Text style = {styles.navagationScreenDetail} onPress={() => navigation.navigate("Detail")}> Đi đến màn hình Detail </Text>
        </TouchableOpacity>
     </View>
   )
}

const Detail = ({navigation})=>{
   console.log(111);
    return(
      <View>
         <Text>Chào bạn, đây là màn hình chi tiêt</Text>
         <Text style = {styles.onBackToHome} onPress={()=>navigation.goBack()}>Quay trở lại bằng Onback</Text>
         <Text style = {styles.onBackToHome} onPress={()=>navigation.reset({routes : [{name :'Home'}]})}>Quay trở lại bằng reset</Text>
         <Text style = {styles.onBackToHome} onPress={()=>navigation.pop(1)}>Quay trở lại bằng pop</Text>
         <Text style = {styles.onBackToHome} onPress={()=>navigation.popToTop()}>Quay trở lại bằng popToTop</Text>
      </View>
    )
 }

const styles = {
    container : {
        flex : 1,
        backgroundColor : 'red',

    },
    textInput : {
      width : "80%",
      height : 40,
      backgroundColor : 'white',
      alignSelf : 'center',
      marginTop : 100,
      
    },
    touchableOpacity : {
      width : "60%",
      height : 40,
      backgroundColor : 'blue',
      alignSelf : 'center',
      justifyContent : 'center',
      marginTop : 25
    },
    navagationScreenDetail : {
      flex : 0,
      width : '100%',
      color : 'white',
      fontSize : 15,
      alignSelf : "center",
      textAlign : 'center',
    },
    onBackToHome : {
       width : "80%",
       marginTop : 20,
       fontSize : 15,
       padding : 5,
       color : 'white',
       alignSelf : 'center',
       justifyContent : 'center',
       backgroundColor : 'blue',
       textAlign : 'center'
    }
}
export default Bai1;