/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fromDataContainer: {
    height: 45,
    width: '95%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop : 7
  },
  fromDateText: {
    fontSize: 20,
    color: 'black',
  },
  selectDateButton: {
    height: '50%',
    width: 30,
    alignSelf: 'center',
    marginStart: 20,
  },
  selectDateImg: {
    height: '100%',
    width: '100%',
  },
  statisticalButton: {
    height: 40,
    width: 150,
    backgroundColor: 'blue',
    alignSelf: 'center',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius : 5
  },
  statisticalText: {
    fontSize: 15,
    color: 'white',
  },
  statisticalSumText : {
    fontSize : 20, 
    width : '95%',
    alignSelf : 'center',
    color : 'blue',
    fontWeight : '500',
    marginTop : 25
  }
});
export default styles;
