/* eslint-disable prettier/prettier */
import {
  Alert,
  FlatList,
  Image,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from '../style/StyleCategoryComponent';
import {useEffect, useState} from 'react';
import CategoryDao from '../js/CategoryDao';

const Category = ({route,navigation}) => {
  const user = route.params.user;
  const [data, setData] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [addCategoryInput, setAddCategoryInput] = useState(false);
  const [categoryAdded, setCategoryAdded] = useState('');
  useEffect(() => {
    new CategoryDao().getAllCategory(user.id).then(result => {
      if(result.success == true ) setData(result.data);
    });
  }, [user.id]);
  const Item = ({item}) => (
    <View style={styles.containerItem}>
      <Text style={styles.textItem}>{item.categoryName}</Text>
      <TouchableOpacity
        style={styles.buttonDelete}
        title="delete item"
        onPress={() => {
          new CategoryDao().deleteCategory(user.id,item.id).then(result => {
            if (result.success == true) {
              const tempData = [...data]; 
              tempData.splice(tempData.indexOf(item),1);
              setData(tempData);
              Alert.alert(result.message, 'OK');
            } else {
              Alert.alert("Thao tác thất bại !,Tồn tại sách với Danh mục hiện tại");
            }
          }).catch(()=>{
            navigation.reset({
              route : [{name : "Welcome"}],
              index : 0
            }) // nếu bất có lỗi nào xảy ra thì cho return về luôn Welcome.
          })
        }}>
        <Image
          source={require('../img/icon_delete.png')}
          style={styles.buttonDeleteImage}
          resizeMode="center"
        />
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={styles.container}>
      <Modal animationType="slide" transparent={true} visible={openModal}>
        <View style={styles.modalContainer}>
          <View style={styles.saveButtonContainer}>
            <TouchableOpacity
              style={styles.saveCategoryButton}
              onPress={() => {
                setOpenModal(false);
                if (categoryAdded.length > 0) {
                  new CategoryDao()
                    .saveNewCategory(user.id, categoryAdded)
                    .then(result => {
                      if (result.success){
                        data.push(result.data);
                        setData(data);
                        setAddCategoryInput(false)
                        setCategoryAdded("")
                      } else {
                        Alert.alert('Lỗi : ' + result.message);
                      }
                    });
                } else {
                  Alert.alert('Thông tin trống !', 'OK');
                }
              }}>
              <Text style={styles.saveCategotyText}>Đồng ý</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={styles.addCategoryButton}
        title="add phieu"
        onPress={() => {
          setAddCategoryInput(true);
        }}>
        <Text style={styles.categoryAddText}>Thêm danh mục sách !</Text>
      </TouchableOpacity>
      {addCategoryInput ? (
        <View style={styles.addBookContainer}>
          <View style={styles.leftContainer}>
            <TextInput
              style={styles.addCategoryEditText}
              value={categoryAdded}
              onChangeText={setCategoryAdded}
            />
          </View>

          <View style={styles.rightContainer}>
            <TouchableOpacity
              style={styles.categoryButtonContainer}
              onPress={() => {
                setOpenModal(true);
              }}>
              <Image
                style={styles.addCategoryImage}
                source={require('../img/icon_add_tick.png')}
                resizeMode="center"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.categoryButtonContainer}
              onPress={() => {
                setAddCategoryInput(false);
                setCategoryAdded("")
              }}>
              <Image
                style={styles.deleteCategoryImage}
                source={require('../img/icon_X.png')}
                resizeMode="center"
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
      <FlatList
        style={styles.flatList}
        data={data}
        renderItem={({item}) => <Item item={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default Category;
