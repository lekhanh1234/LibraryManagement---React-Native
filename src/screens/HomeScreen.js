/* eslint-disable prettier/prettier */
import {SafeAreaView, Text, TouchableOpacity, View, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from '../style/StyleHomeScreen';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import Book from '../component/Book';
import BorrowingSlip from '../component/BorrowingSlip';
import Category from '../component/Category';
import Member from '../component/Member';
import Statistical from '../component/Statistical';

function CustomDrawerContent(props) {
  const navigation = useNavigation();
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <Image
          source={require('../img/icon_librarian.png')}
          style={styles.drawerHeaderImage}
        />
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => navigation.navigate('BorrowingSlip')} // Điều hướng đến BorrowingSlip
        >
          <Image
            style={styles.drawerIcon}
            source={require('../img/icon_borrowing_slip.png')}
          />
          <Text style={styles.drawerText}>Phiếu mượn</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => navigation.navigate('Category')} // Điều hướng đến Category
        >
          <Image
            style={styles.drawerIcon}
            source={require('../img/icon_category.png')}
          />
          <Text style={styles.drawerText}>Danh mục</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => navigation.navigate('Book')} // Điều hướng đến Book
        >
          <Image
            style={styles.drawerIcon}
            source={require('../img/icon_book.png')}
          />
          <Text style={styles.drawerText}>Book</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => navigation.navigate('Member')} // Điều hướng đến Member
        >
          <Image
            style={styles.drawerIcon}
            source={require('../img/icon_member.png')}
          />
          <Text style={styles.drawerText}>Member</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => navigation.navigate('Statistical')} // Điều hướng đến Statistical
        >
          <Image
            style={styles.drawerIcon}
            source={require('../img/icon_money.png')}
          />
          <Text style={styles.drawerText}>Doanh thu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => navigation.pop(1)}>
          <Image
            style={styles.drawerIcon}
            source={require('../img/icon_exit.png')}
          />
          <Text style={styles.drawerText}>Thoát</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();
const HomeScreen = ({route}) => {
  const user = route.params.user;
  return (
    <SafeAreaView style={styles.container}>
      <Drawer.Navigator
        initialRouteName="BorrowingSlip"
        drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen
          name="BorrowingSlip"
          component={BorrowingSlip}
          options={{unmountOnBlur: true}}
          initialParams={{user}} 
        />
        <Drawer.Screen
          name="Category"
          component={Category}
          options={{unmountOnBlur: true}}
          initialParams={{user}} // tham số khởi tạo bắt buộc 1 đối tượng, khi chạy, 
          // ta có thể dùng route.params để truy cập đối tượng đó
          // tiếp đó ta có thể dùng đối tượng đó . đến các thuộc tính, ví dụ ở đây params.user, vì user là thuộc tính
          
        />
        <Drawer.Screen
          name="Book"
          component={Book}
          options={{unmountOnBlur: true}}
          initialParams={{user}}
        />
        <Drawer.Screen
          name="Member"
          component={Member}
          options={{unmountOnBlur: true}}
          initialParams={{user}}
        />
        <Drawer.Screen
          name="Statistical"
          component={Statistical}
          options={{unmountOnBlur: true}}
          initialParams={{user}}
        />
      </Drawer.Navigator>
    </SafeAreaView>
  );
};

export default HomeScreen;
