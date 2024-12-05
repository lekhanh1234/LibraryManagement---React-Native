/* eslint-disable prettier/prettier */
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Keyboard,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {useEffect, useState} from 'react';
import styles from '../style/StyleBorrowItemComponent';
import screenStyles from '../style/StyleBorrowComponent';
import {InputLoanSlipForm} from '../component/CustomView';
import DropDownPicker from 'react-native-dropdown-picker';
import BorrowingSlipDao from '../js/BorrowingSlipDao';
import BookDao from '../js/BookDao';
import MemberDao from '../js/MemberDao';

const BorrowingSlip = ({route, navigation}) => {
  const userId = route.params.user.id;
  const screenHeight = Dimensions.get('window').height;
  const [turnKeyboard, setTurnKeyboard] = useState(false);
  const [editBorrowingSlipId, setEditBorrowingSlipId] = useState(0);
  const [borrowingSlipList, setBorrowingSlipList] = useState([]);
  const [memberList, setMemberList] = useState([]);
  const [bookDownPicker, setBookDownPicker] = useState(null);
  const [slipCode, setSlipCode] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [memberName, setMemberName] = useState('');
  const [ableEditMemberName, setAbleEditMemberName] = useState(true);
  const [isPaid, setIsPaid] = useState(false);
  const [isUnpaid, setIsUnpaid] = useState(false);
  const [rentalDate, setRentalDate] = useState('');
  const [deadline, setDeadline] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [openBookDDP, setOpenBookDDP] = useState(false);
  const [valueBookPicker, setValueBookPicker] = useState(false); //

  const changeCardNumber = text => {
    for (let i = 0; i < memberList.length; i++) {
      if (memberList[i].cardNumber == text) {
        setCardNumber(text);
        setMemberName(memberList[i].memberName);
        setAbleEditMemberName(false);
        return;
      }
    }
    setCardNumber(text);
    setAbleEditMemberName(true);
  };
  useEffect(() => {
    updateLayoutWithData(
      userId,
      setBorrowingSlipList,
      setBookDownPicker,
      setMemberList,
      navigation,
    );
    Keyboard.addListener('keyboardDidShow', () => {
      setTurnKeyboard(true);
    });
    Keyboard.addListener('keyboardDidHide', () => {
      setTurnKeyboard(false);
    });
  }, [userId, navigation]);

  const Item = ({item}) => (
    <View style={styles.container}>
      <Text style={styles.borrowingSlipCode}>
        Mã Phiếu : {item.ReceiptNumber}
      </Text>
      <Text style={styles.bookName}>Tên Sách : {item.bookName}</Text>
      <Text style={styles.memberName}>Người dùng : {item.memberName}</Text>
      <Text style={styles.state}>
        Tình trạng : {item.state === 1 ? 'đã trả ' : 'chưa trả'}
      </Text>
      <View style={styles.containerTextAndButton}>
        <View style={styles.containerText}>
          <Text style={styles.rentalDate}>Ngày thuê : {item.rentalDate.split("-").reverse().join("-")}</Text>
          <Text style={styles.deadline}>Thời hạn : {item.rentalDuration.split("-").reverse().join("-")}</Text>
        </View>
        <View style={styles.containerButton}>
          <TouchableOpacity
            style={styles.buttonEdit}
            title="editItem"
            onPress={() => {
              setOpenModal(true);
              setModalTitle('Edit Thông tin !');
              setSlipCode(item.ReceiptNumber);
              setValueBookPicker(item.bookId);
              setCardNumber(item.cardNumber);
              setMemberName(item.memberName);
              setAbleEditMemberName(false);
              setRentalDate(item.rentalDate.split("-").reverse().join("-")); 
              setDeadline(item.rentalDuration.split("-").reverse().join("-"));
              setIsPaid(item.state == 1);
              setIsUnpaid(!(item.state == 1));
              setEditBorrowingSlipId(item.id);
            }}>
            <Image
              source={require('../img/icon_edit.png')}
              style={styles.img_icon_edit}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonEdit}
            title="deleteItem"
            onPress={() => {
              new BorrowingSlipDao()
                .deleteBorrowingSlip(item.id)
                .then(result => {
                  Alert.alert('Đã xóa phiếu !', 'OK');
                  updateLayoutWithData(
                    userId,
                    setBorrowingSlipList,
                    setBookDownPicker,
                    setMemberList,
                  );
                })
                .catch(() => {
                  Alert.alert('Xảy ra lỗi !', 'OK');
                  navigation.reset({
                    routes: [{name: 'Welcome'}, {name: 'Login'}], // xếp lại ngăn xếp, index = 0 -> cuối ngăn xếp
                    index: 1,
                  });
                });
            }}>
            <Image
              source={require('../img/icon_delete.png')}
              style={styles.img_icon_edit}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={screenStyles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={openModal}
        onRequestClose={() => {}}>
        <TouchableWithoutFeedback onPress={() => setOpenModal(false)}>
          <View
            style={[
              screenStyles.containerModal,
              {height: screenHeight},
              turnKeyboard
                ? {justifyContent: 'flex-start'}
                : {justifyContent: 'center'},
            ]}>
            <TouchableWithoutFeedback>
              <View style={screenStyles.containerForm}>
                <Text style={screenStyles.formTitle}>{modalTitle}</Text>
                <InputLoanSlipForm
                  data={slipCode}
                  setData={setSlipCode}
                  placeholder=" Mã Phiếu"
                />
                <DropDownPicker
                  style={screenStyles.dropDownPicker}
                  containerStyle={{zIndex: 2000}}
                  open={openBookDDP}
                  setOpen={setOpenBookDDP}
                  value={valueBookPicker}
                  setValue={setValueBookPicker}
                  items={bookDownPicker}
                  setItems={setBookDownPicker}
                  placeholder="Sách"
                  renderListItem={({item}) => (
                    <View style={screenStyles.bookItemContainer}>
                      <Pressable
                        onPress={() => {
                          setValueBookPicker(item.id);
                          setOpenBookDDP(false);
                        }}
                        style={{flex: 1}}>
                        <Text style={screenStyles.bookItemText}>
                          {item.bookName}
                        </Text>
                      </Pressable>
                    </View>
                  )}
                />
                <InputLoanSlipForm
                  data={cardNumber}
                  setData={changeCardNumber}
                  placeholder="Mã Sinh Viên"
                />
                <InputLoanSlipForm
                  data={memberName}
                  setData={setMemberName}
                  placeholder="Tên Sinh Viên"
                  editable={ableEditMemberName}
                />
                <InputLoanSlipForm
                  data={rentalDate}
                  setData={setRentalDate}
                  placeholder=" Ngày mượn"
                />
                <InputLoanSlipForm
                  data={deadline}
                  setData={setDeadline}
                  placeholder=" Thời hạn"
                />
                <View style={screenStyles.checkBoxContainer}>
                  <CheckBox
                    value={isPaid}
                    onValueChange={() => {
                      setIsPaid(true);
                      setIsUnpaid(false);
                    }}
                    style={screenStyles.checkbox}
                  />
                  <Text style={screenStyles.checkBoxText}>Đã trả</Text>
                  <CheckBox
                    value={isUnpaid}
                    onValueChange={() => {
                      setIsPaid(false);
                      setIsUnpaid(true);
                    }}
                    style={screenStyles.checkbox}
                  />
                  <Text style={screenStyles.checkBoxText}>Chưa trả</Text>
                </View>
                <TouchableOpacity
                  style={screenStyles.buttonSave}
                  onPress={() => {
                    if (
                      checkBorrowingSlipInfo({
                        slipCode,
                        idBook: valueBookPicker,
                        cardNumber,
                        memberName,
                        state: 0,
                        rentalDate,
                        deadline,
                        isPaid,
                        isUnpaid,
                      }) == false
                    ) {
                      Alert.alert('Thông tin không hợp lệ', 'OK');
                      return;
                    }
                    const idBook = parseInt(valueBookPicker);
                    const state = isPaid == true ? 1 : 0;
                    const modalBorrowingSlip = {
                      slipCode,
                      idBook,
                      userId,
                      cardNumber,
                      memberName,
                      state,
                      rentalDate: rentalDate.split("-").reverse().join("-"),
                      deadline : deadline.split("-").reverse().join("-"),
                    };
                    if (editBorrowingSlipId == 0){
                      new BorrowingSlipDao()
                        .saveNewBorrowingSlip(modalBorrowingSlip)
                        .then(result => {
                          if (result.success == true) {
                            updateLayoutWithData(
                              userId,
                              setBorrowingSlipList,
                              setBookDownPicker,
                              setMemberList,
                            );
                            Alert.alert('Đã thêm phiếu mượn');
                            setOpenModal(false)
                          } else {
                            Alert.alert(
                              'Thao tác không khả thi ! Lưu ý mã biên lai là duy nhất',
                            );
                          }
                        })
                        .catch(() => {
                          Alert.alert('Xảy ra lỗi !');
                          navigation.reset({
                            routes: [{name: 'Welcome'}], // xếp lại ngăn xếp, index = 0 -> cuối ngăn xếp
                            index: 0,
                          });
                        });
                    } else {
                      new BorrowingSlipDao()
                        .updateBorrowingSlip({
                          id: editBorrowingSlipId,
                          ...modalBorrowingSlip,
                        })
                        .then(result => {
                          if (result.success == true) {
                            updateLayoutWithData(
                              userId,
                              setBorrowingSlipList,
                              setBookDownPicker,
                              setMemberList,
                            );
                            Alert.alert('Đã cập nhật phiếu mượn !');
                            setOpenModal(false)
                          } else {
                            Alert.alert(
                              'Thao tác không khả thi ! Mã biên lai đã tồn tại',
                            );
                          }
                        });
                    }
                  }}>
                  <Text style={screenStyles.buttonSaveText}>Lưu</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <View style={screenStyles.headerWithAddButton}>
        <Text style={screenStyles.title}>Danh sách phiếu mượn</Text>
        <TouchableOpacity
          style={screenStyles.addButton}
          title="addItem"
          onPress={() => {
            setOpenModal(true);
            setModalTitle('Thêm phiếu');
            setSlipCode('');
            setCardNumber('');
            setMemberName('');
            setDeadline('');
            setRentalDate('');
            setEditBorrowingSlipId(0); // thêm thiếu //
          }}>
          <Text style={screenStyles.addButtonText}>Thêm phiếu</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={screenStyles.dataList} //
        data={borrowingSlipList}
        renderItem={({item}) => <Item item={item} />}
        keyExtractor={item => item.id}
      />
    </View>
    //hàm render Item mặc định sẽ truyền vào một object có các thuộc tính : item. đại diện cho mỗi phần tử
    // các tham số khác như index,separators và có thể nhiều hơn.
  );
};

function updateLayoutWithData(
  userId,
  setBorrowingSlipList,
  setBookDownPicker,
  setMemberList,
  navigation,
) {
  new BorrowingSlipDao()
    .getAllBorrowingSlip(userId)
    .then(result => {
      setBorrowingSlipList(result.data);
    })
    .catch(result => {
      Alert.alert('Xảy ra lỗi !');
      navigation.reset({
        routes: [{name: 'Welcome'}], // xếp lại ngăn xếp, index = 0 -> cuối ngăn xếp
        index: 0,
      });
    });
  new BookDao().getAllBook(userId).then(result => {
    const bookRender = [];
    result.data.forEach(item => {
      bookRender.push({...item, label: item.bookName, value: item.id});
    });
    setBookDownPicker(bookRender);
  });
  new MemberDao().getAllMember(userId).then(result => {
    setMemberList(result.data);
  });
}
function checkBorrowingSlipInfo(modal) {
  const {
    slipCode,
    idBook,
    cardNumber,
    memberName,
    state,
    rentalDate,
    deadline,
    isPaid,
    isUnpaid,
  } = modal;
  console.log('kiem tra info : ' + JSON.stringify(modal));
  if (
    slipCode.length > 0 &&
    idBook > 0 &&
    cardNumber.length > 0 &&
    memberName.length > 0 &&
    state >= 0 &&
    state <= 1 &&
    ((isPaid == true && isUnpaid == false) ||
      (isPaid == false && isUnpaid == true))
  ) {
    console.log('ok : ' + JSON.stringify(modal));
    if (isValidRentalDate(rentalDate) && isValidRentalDate(deadline)) {
      return true;
    } else return false;
  }
  return false;
}

function isValidRentalDate(time) {
  console.log('kiem tra time : ' + JSON.stringify(time));
  const regex = /^\d{1,2}-\d{1,2}-\d{4}$/;
  if (!regex.test(time)) return false;
  const [day, month, year] = time.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() + 1 === month &&
    date.getDate() === day
  );
}

export default BorrowingSlip;
