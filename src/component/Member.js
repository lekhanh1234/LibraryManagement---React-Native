/* eslint-disable prettier/prettier */
import {
  FlatList,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import styles from '../style/StyleMemberComponent';
import React, {useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {useFocusEffect} from '@react-navigation/native';
import MemberDao from '../js/MemberDao';

const Member = ({route, navigation}) => {
  const user = route.params.user;
  const [data, setData] = useState([1, 2, 3, 4, 5]);
  useFocusEffect(
    React.useCallback(() => {
      new MemberDao().getAllMember(user.id).then(result => {
        if (result.success == true) {
          setData(result.data);
        }
      });
    }, [user.id]),
  );

  const MemberItem = ({item}) => {
    return (
      <View style={styles.flItemContainer}>
        <Text style={styles.studentId}>Thẻ Thành viên : {item.cardNumber}</Text>
        <View style={styles.bottomItemInfoContainer}>
          <Text style={styles.studentName}>Tên : {item.memberName}</Text>
          <View style={styles.studentItemControls}>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => {
                Alert.alert(
                  'Delete Member !',
                  'Lưu ý hành động này sẽ xóa toàn bộ phiếu mượn liên quan đến member này !',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel pressed'),
                      style: 'cancel',
                    },
                    {
                      text: 'OK',
                      onPress: () =>{
                        new MemberDao().deleteMember(item.id,user.id).then(result => {
                          const newData = data.filter(
                            (element, index, array) => {
                              return element.id != item.id;
                            },
                          );
                          setData(newData);
                          Alert.alert(`Đã xóa member !`);
                          console.log('Member deleted');
                        });
                      },
                    },
                  ],
                  {cancelable: false},
                );
              }}>
              <Image
                style={styles.deleteImg}
                source={require('../img/icon_X.png')}
                resizeMode="center"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatList}
        data={data}
        key={item => item}
        renderItem={({item}) => <MemberItem item={item} />}
      />
    </View>
  );
};

export default Member;
