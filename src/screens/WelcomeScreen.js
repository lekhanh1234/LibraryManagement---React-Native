/* eslint-disable prettier/prettier */
import { View,SafeAreaView,ImageBackground} from 'react-native';
import styles from '../style/StyleWelcomeScreen';
import connectDb from '../js/OpenDataBase';
connectDb()
const WelcomeScreen = ({navigation}) => {
    setTimeout(() => {
        navigation.replace('Login');
      },2000);
  return (
    <View style = {styles.container}>
      <SafeAreaView style = {styles.container}>
      <ImageBackground
       source={require('../img/library.png')} // Đường dẫn tới ảnh nền//
       style={styles.backgroundImage}
      />
      </SafeAreaView>   
    </View>
  );
};
export default WelcomeScreen