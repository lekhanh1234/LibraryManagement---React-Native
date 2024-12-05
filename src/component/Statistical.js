/* eslint-disable prettier/prettier */
import {
  Alert,
  FlatList,
  Image,
  Platform,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from '../style/StyleStatisticalComponent';
import {useState} from 'react';
import BorrowingSlipDao from '../js/BorrowingSlipDao';

const Statistical = ({route}) => {
  const user = route.params.user;
  const [revenueSum,setRevenueSum] = useState("");
  const [selectedFromDate, setSelectFromDate] = useState("");
  const [selectedToDate, setSelectToDate] = useState("");
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [showCalendarStartDate, setShowCalendarStartDate] = useState(false);
  const [showCalendarToDate, setShowCalendarToDate] = useState(false);

  const onChangeFromDate = (event, selectedDate) => {
    setShowCalendarStartDate(false);
    if (event.type === "set" && selectedDate) {
      setSelectFromDate(selectedDate.toLocaleString('vi-VN').split(',')[1].trim())
      setFromDate(selectedDate);
    } 
  };

  const onChangeToDate = (event, selectedDate) => {
    setShowCalendarToDate(false);
    if (event.type === "set" && selectedDate) {
      setSelectToDate(selectedDate.toLocaleString('vi-VN').split(',')[1].trim())
      setToDate(selectedDate);
    } 
  };
  return (
    <View style={styles.container}>
      <View style={styles.fromDataContainer}>
        <Text style={styles.fromDateText}>
          Từ ngày   : {selectedFromDate}
        </Text>
        <TouchableOpacity
          onPress={() => {
            setShowCalendarStartDate(true);
          }}
          style={styles.selectDateButton}>
          <Image
            style={styles.selectDateImg}
            resizeMode="center"
            source={require('../img/calendar.png')}
          />
        </TouchableOpacity>
        {showCalendarStartDate ? (
          <DateTimePicker
            testID="dateTimePicker"
            value={fromDate}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChangeFromDate}
          />
        ) : null}
      </View>
      <View style={styles.fromDataContainer}>
        <Text style={styles.fromDateText}>
          đến ngày : {selectedToDate}
        </Text>
        <TouchableOpacity
          onPress={() => {
            setShowCalendarToDate(true);
          }}
          style={styles.selectDateButton}>
          <Image
            style={styles.selectDateImg}
            resizeMode="center"
            source={require('../img/calendar.png')}
          />
        </TouchableOpacity>
        {showCalendarToDate ? (
          <DateTimePicker
            testID="dateTimePicker"
            value={toDate}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChangeToDate}
          />
        ) : null}
      </View>
      <TouchableOpacity
      style = {styles.statisticalButton}
      onPress={()=>{
          if(selectedFromDate == "" || selectedToDate == ""){
            Alert.alert("Bạn chưa chọn ngày !");
          }else{
            // gọi ham. nhưng vi sqlite date luu theo dang 2022/12/20 nen can chuyen doi nguoc selectedFromDate và selectedToDate
            const startDate = selectedFromDate.split("/").reverse().join("-");
            const toDate = selectedToDate.split("/").reverse().join("-");
            new BorrowingSlipDao().getBorrowingsByDateRange(user.id,startDate,toDate).then(result =>{
              if(result.success == true){
                let revenueSum = 0;
                result.data.forEach(item =>{
                  revenueSum += item.price;
                });
              setRevenueSum(""+revenueSum);
              }
            })
          }
      }}
      >
        <Text style = {styles.statisticalText}>Thống kê</Text>
      </TouchableOpacity>
      {revenueSum == "" ? null : <Text style = {styles.statisticalSumText}>Tổng : {revenueSum}$</Text>
    }
    </View>
  );
};

export default Statistical;
