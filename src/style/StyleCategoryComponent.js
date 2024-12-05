/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#C6E2FF',
  },
  modalContainer : {
    height : '100%',
    width : "100%",
    justifyContent : 'center',
    alignItems : 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Sử dụng RGBA để tạo nền đen mờ
  },
  saveButtonContainer : {
    height : "50%",
    width : "90%",
    alignSelf : 'center',
    justifyContent : 'center',
    alignItems : 'center',
    backgroundColor : 'white'
  },
  saveCategoryButton : {
    height : 40,
    width : 160,
    justifyContent : 'center',
    alignItems : 'center',
    borderRadius : 10,
    borderWidth : 1,
    borderColor : 'black',
    backgroundColor : 'blue',
  },
  saveCategotyText : {
   color : 'white',
   fontSize : 20,
   textAlign : 'center',
   textAlignVertical : 'center'
  },
  addCategoryButton: {
    height: 35,
    width: 160,
    backgroundColor: 'blue', // Sử dụng RGBA để tạo nền đen mờ
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginStart: 10,
  },
  categoryAddText: {
    color: 'white',
    fontSize: 14,
  },
  addBookContainer: {
    height: 40,
    width: '95%',
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginTop: 10,
    flexDirection: 'row',
  },
  leftContainer: {
    height: '100%',
    width: '70%',
  },
  rightContainer: {
    height: '100%',
    width: '30%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  addCategoryEditText: {
    height: '100%',
    width: '100%',
    fontSize : 18
  },
  categoryButtonContainer: {
    height: '50%',
    width: '20%',
    marginEnd: 20,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  addCategoryImage: {
    height: '100%',
    width: '100%',
  },
  deleteCategoryImage: {
    height: '90%',
    width: '90%',
    alignSelf: 'center',
  },
  flatList: {
    flex: 1,
    width: '95%',
    alignSelf: 'center', // căn chỉnh chính phần tử về chính giữa
    marginTop: 10,
  },
  containerItem: {
    height: 50,
    width: '100%',
    backgroundColor: '#FFFFFFFF',
    marginBottom: 10,
    flexDirection: 'row',
  },
  textItem: {
    height: '100%',
    width: '90%',
    fontSize: 22,
    color: 'black',
    textAlignVertical: 'center',
    padding: 10,
  },
  buttonDelete: {
    height: '100%',
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDeleteImage: {
    height: '60%',
    width: '60%',
  },
});
export default styles;
