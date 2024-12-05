/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addBookContainer: {
    height: 30,
    width: '95%',
    alignSelf: 'center',
    marginTop: 20,
  },
  addBookButton: {
    height: 30,
    width: 140,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBookButtonText: {
    fontSize: 20,
    color: 'white',
  },
  bookList: {
    flex: 1,
    width: '95%',
    alignSelf: 'center',
    marginTop: 10,
  },
  bookInfoContainer: {
    height: 100,
    width: '100%',
    paddingStart: 10,
    marginTop: 10,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: 'black',
  },
  itemActionBottomContainer: {
    height: '25%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bookAttribute: {
    textAlignVertical: 'center',
    fontSize: 18,
    color: 'black',
  },
  deleteItem: {
    height: '70%',
    width: 18,
    marginEnd : 10
  },
  deleteItemImage: {
    height: '100%',
    width: '100%',
  },
});
export default styles;
