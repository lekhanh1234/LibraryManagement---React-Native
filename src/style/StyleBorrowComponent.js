/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C6E2FF',
  },
  containerModal: {
    width : "100%",
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Sử dụng RGBA để tạo nền đen mờ
    alignItems: 'center',
  },
  containerForm: {
    height: 550,
    width: '80%',
    backgroundColor: 'white',
    alignItems: 'center',
    alignSelf : 'center',
  },
  dropDownPicker: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
  },
  formTitle: {
    fontSize: 22,
    color: 'blue',
    fontWeight: '700',
  },
  bookItemContainer: {
    padding: 0,
    margin: 0,
    height: 40,
    width: '90%',
    alignSelf: 'center',
  },
  bookItemText: {
    height: '100%',
    width: '100%',
    fontSize: 16,
    textAlignVertical: 'center',
    color: 'black',
  },
  buttonSave: {
    height: 40,
    width: 140,
    backgroundColor: 'blue',
    marginTop: 10,
    borderWidth: 1, // Độ dày của viền
    borderColor: 'white', // Màu sắc của viền (đen)
    borderRadius: 10, // Bo tròn góc viền (tuỳ chọn)
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSaveText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
  checkBoxContainer: {
    height: 30,
    marginTop: 10,
    width: '90%',
    alignSelf : 'center',
    flexDirection: 'row',
    alignItems : 'center'
  },
  checkbox: {
    height: '50%',
    width: 40,
  },
  headerWithAddButton: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    marginTop: 10,
    marginStart: 10,
    color: 'black',
    fontWeight: 'bold',
  },
  addButton: {
    height: 30,
    width: 120,
    marginTop: 10,
    marginRight: 10,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkBoxText: {
    fontSize: 14,
    marginEnd: 40,
  },
  addButtonText: {
    color: 'white',
  },
  dataList: {
    flex: 1,
    marginTop: 5,
  },
});
export default styles;
