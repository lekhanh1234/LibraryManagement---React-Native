/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  drawerContent: {
    flex: 1,
  },
  drawerHeaderImage : {
   width : "100%",
   height : 120
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
