/* eslint-disable prettier/prettier */
import {
  Alert,
  FlatList,
  Image,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from '../style/StyleBookComponent';
import React, {useEffect, useState} from 'react';
import BookDao from '../js/BookDao';
import {useFocusEffect} from '@react-navigation/native';
// Màn hình đăng nhập
const Book = ({route, navigation}) => {
  const [data, setData] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      new BookDao().getAllBook(route.params.user.id).then(result => {
        if (result.success == true) setData(result.data);
        else {
          Alert.alert('Lỗi : ' + result.message, 'OK');
        }
      });
    }, [route.params.user.id]),
  );
  const Item = ({item}) => {
    return (
      <View style={styles.bookInfoContainer}>
        <Text style={styles.bookAttribute}>tác giả : {item.author}</Text>
        <Text style={styles.bookAttribute}>Tên sách : {item.bookName}</Text>
        <Text style={styles.bookAttribute}>
          Loại sách : {item.categoryName}
        </Text>
        <View style={styles.itemActionBottomContainer}>
          <Text style={styles.bookAttribute}>Giá thuê : {item.price}</Text>
          <TouchableOpacity
            style={styles.deleteItem}
            onPress={() => {
              new BookDao()
                .deleteBook(item.id,route.params.user.id)
                .then(result => {
                  if (result.success == true){
                    Alert.alert('Đã xóa sách');
                    const newData = [...data];
                    newData.splice(newData.indexOf(item),1)
                    setData(newData);
                  }
                  else
                    Alert.alert(
                      'Thao tác thất bại, Tồn tại biên lai với sách hiện tại ');
                })
                .catch(() => {
                  navigation.reset({ // lỗi. khởi động lại ứng dụng
                    route: [{name: 'Welcome'}],
                    index: 0,
                  });
                });
            }}>
            <Image
              style={styles.deleteItemImage}
              source={require('../img/icon_delete.png')}
              resizeMode="center"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.addBookContainer}>
        <TouchableOpacity
          style={styles.addBookButton}
          onPress={() => {
            navigation.navigate('AddBook', {user: route.params.user});
          }}>
          <Text style={styles.addBookButtonText}>Thêm sách</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.bookList}
        data={data}
        key={data => data}
        renderItem={({item}) => <Item item={item} />}
      />
    </View>
  );
};

export default Book;
