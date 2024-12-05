/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  backgroundImage: {
    height: '100%',
    justifyContent: 'center', // căn giữa theo chiều dọc
    alignItems: 'center', // căn giữa theo chiều ngang
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'blue',
    marginTop: -80,
  },
  inputContainer: {
    marginTop: 80,
    height: 120,
    width: '85%',
    justifyContent: 'space-between',
  },
  inputField: {
    height: '40%',
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray', // màu của viền
    borderRadius: 5, // bo tròn góc của viền
    backgroundColor: 'white',
  },
  buttonLogin: {
    borderRadius: 20,
    height: 50,
    width: '70%',
    backgroundColor: 'blue',
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonRegister: {
    borderRadius: 20,
    height: 50,
    width: '70%',
    backgroundColor: 'blue',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextContent: {
    color: 'white',
    fontSize: 15,
  },

  drawerContent: {
    flex: 1,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding : 15,
    width: "100%",
  },
  drawerIcon: {
    width: 25,
    height : "100%",
    marginRight : 20,
    tintColor : 'black'
  },
  drawerText: {
    width : "100%",
    height : '100%',
    fontSize: 16,
  },
});
export default styles;
