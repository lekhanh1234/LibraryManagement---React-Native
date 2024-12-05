/* eslint-disable prettier/prettier */

import {Alert, Text, TextInput, TouchableOpacity, View} from 'react-native';
import styles from '../style/StyleAddBookScreen';
import DropDownPicker from 'react-native-dropdown-picker';
import {BookAttributeForm} from '../component/CustomView';
import {useEffect, useState} from 'react';
import CategoryDao from '../js/CategoryDao';
import BookDao from '../js/BookDao';

function checkNewBook(param) {
  let {bookName, bookAuthor, bookPrice, categoryValue} = param;
  if (
    bookName.length == 0 ||
    bookAuthor.length == 0 ||
    bookPrice.length == 0 ||
    categoryValue.length == 0
  ) {
    return false;
  }
  let regex = /^[-+]?\d+(\.\d+)?$/;
  return regex.test(bookPrice) && parseFloat(bookPrice) >= 0;
}

const AddBook = ({navigation, route}) => {
  const [bookCategory, setCategoryBook] = useState([]);
  useEffect(() => {
    new CategoryDao().getAllCategory(route.params.user.id).then(result => {
      if (result.success == true) {
        const updatedArray = result.data.map(item => ({
          label: item.categoryName,
          value: item.id,
        }));
        setCategoryBook(updatedArray);
      } else {
        console.log('co loi : ' + result.message);
      }
    });
  }, [route.params.user.id]);
  const [bookAuthor, setBookAuthor] = useState('');
  const [bookName, setBookName] = useState('');
  const [bookPrice, setBookPrice] = useState('');
  const [openDropDown, setOpenDropDown] = useState(false);
  const [categoryValue, setCategoryValue] = useState('');
  return (
    <View style={styles.container}>
      <BookAttributeForm
        data={bookAuthor}
        setData={setBookAuthor}
        placeholder="Tác giả"
      />
      <BookAttributeForm
        data={bookName}
        setData={setBookName}
        placeholder="Tên Sách"
      />
      <DropDownPicker
        style={styles.categoryDropDown}
        open={openDropDown}
        setOpen={setOpenDropDown} // hàm để sẽ được gọi khi ta click vào DropDownPicker, để xác định nó có mở xuống hay k
        value={categoryValue} // để giúp người dùng dễ dàng nhận thấy mục được lựa chọn hiện tại khi ta mở dropdown xuống
        setValue={setCategoryValue} // khi ta click 1 phần tử , hàm này sẽ được gọi trên value phần tử đó
        items={bookCategory} // danh sách item để lựa chọn
        placeholder="Lựa chọn danh mục"
        //nhãn có thể trùng, nhưng value thì k
      />
      <BookAttributeForm
        data={bookPrice}
        setData={setBookPrice}
        placeholder="Giá thuê"
      />
      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => {
          if (
            checkNewBook({bookName, bookAuthor, bookPrice, categoryValue}) ==
            false
          ) {
            Alert.alert('Dữ liệu không hợp lệ !', 'OK');
            return;
          }
          new BookDao()
            .saveNewBook(
              bookName,
              bookAuthor,
              parseInt(bookPrice),
              categoryValue,
              route.params.user.id,
            )
            .then(result => {
              if (result.success == true) {
                Alert.alert('Đã thêm sách ', 'OK');
              } else {
                Alert.alert('Sách đã tồn tại', 'OK');
              }
            })
            .catch(() => {
              Alert.alert('Xảy ra lỗi !', 'OK');
              navigation.reset({
                route: [{name: 'Welcome'}],
                index: 0,
              });
            });
        }}>
        <Text style={styles.saveButtonText}>Lưu</Text>
      </TouchableOpacity>
    </View>
  );
};
export default AddBook;
