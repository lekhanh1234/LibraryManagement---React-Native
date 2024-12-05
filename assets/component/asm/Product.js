/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import DetailScreen from './Details';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Button ,TextInput,SafeAreaView,StyleSheet,TouchableOpacity,Image, FlatList} from 'react-native';

const Stack = createBottomTabNavigator();
const Home = ({navigation,route})=>{
let [data1,setData1] = useState(route.params.data1); // route.params.data1 trả về địa chỉ của đối tượng data1 gửi từ screen trươsc đó => .mọi thay đổi trong biến let data1  => thay đổi trong param.data1 => biến data1 trong rootScreen  Product cũng thay đổi. 3 biến đều giữ 1 địa chỉ
let [data2,setData2] = useState(route.params.data2); // bất cứ sự thay đổi nào trong 3 biến trên đều dẫn đến sự thay đổi các biến còn lại
const [count,setCount] = useState(0);

let renderItem = ({item,index})=>{
    return (
        <View style ={{height : 160, width : 140,backgroundColor : 'white'}}>
           <TouchableOpacity 
             style = {{height : '80%',width : '100%',position : 'absolute'}}
             activeOpacity={1} // Đặt độ mờ khi chạm vào là 0 (không mờ)
             onPress = {()=>navigation.navigate('DetailScreen',{data : item.id <= 5 ? data1[index] : data2[index]})}>
               <Image
                style = {{height : '100%',width : '100%'}}
                source={item.image}
            ></Image>
           </TouchableOpacity>
           <Text style = {{fontSize : 15, color : 'white'}}>{item.name}</Text>
           <Text style = {{color : 'blue',fontSize : 20,height : '20%', position : 'absolute',bottom : 0}}> {item.price} $</Text>
           <TouchableOpacity
             style = {{ width : 30, height : "20%",backgroundColor : 'white',position : 'absolute',bottom : 0, right : 0,marginEnd : 33 ,justifyContent : 'center'}}
             onPress={()=>{
              // chinh sưa danh sach yeu thich
              item.favourite = !item.favourite;
              setCount(count+1);
             }
             }
           >
            <Image source={require("../../color/star.png")} style = {{width : '80%',height : '80%',alignSelf :'center',tintColor : item.favourite === true ? 'blue' : 'grey'}}></Image>
           </TouchableOpacity>
           <TouchableOpacity
             style = {{ width : 30, height : "20%",backgroundColor : 'blue',position : 'absolute',bottom : 0, right : 0,justifyContent : 'center'}}
             onPress={()=>{
                if(item.id <= 5)  data1[index].amount++;
                if(item.id >= 6)  data2[index].amount++;        
             }
             }
           >
            <Image source={require("../../color/iconAdd.png")} style = {{width : '80%',height : '80%',alignSelf :'center'}}></Image>
           </TouchableOpacity>
        </View>
    )
}

const renderSeparator = () => (
    <View
      style={{
        width: 10, // Đặt chiều cao của margin giữa các phần tử
        backgroundColor: 'transparent', // Đặt màu của margin
      }}
    />
  );
  return (
    <View style = { styles.home}>
        <Text style = {styles.recomender}>Find the best Coffee</Text>
        <Text style = {styles.coffeeBlueMountain}>Coffee Blue Mountain.</Text>

        <FlatList 
         style = {styles.flatList}
         data = {data1}
         renderItem={renderItem}
         horizontal = {true}
         ItemSeparatorComponent={renderSeparator} 
        ></FlatList>
        <Text style = {styles.coffeeBlueMountain}>Coffee Blue Mountain.</Text>
        <FlatList 
         style = {styles.flatList}
         data = {data2}
         renderItem={renderItem}
         horizontal = {true}
         ItemSeparatorComponent={renderSeparator} 
        ></FlatList>
    </View>
  )
}


const Cart = ({navigation,route})=>{
  let data1 = route.params.data1;
  let data2 = route.params.data2;
  let completlyPayment = route.params.completlyPayment;
  let dataReceive = [];
  console.log(completlyPayment);
  for(let i = 0;i<data1.length;i++){
    if(data1[i].statesAdd === true){
      dataReceive.push(data1[i]);
    }
  }
  for(let i = 0;i<data2.length;i++){
    if(data2[i].statesAdd === true){
      dataReceive.push(data2[i]);
    }
  }
  for(let i = 0;i<completlyPayment.length;i++){
    dataReceive.push(completlyPayment[i]);
  }
  let initAmount = 0;
  const [amount,setAmount] = useState(initAmount);


  let renderItem = ({item,index})=>{
    return (
        <View style ={{height : 140, width : "100%",backgroundColor : '#0000FF'}}>
           <Image source={item.image} style = {{height : 130,marginTop : 5, width : 130,marginStart : 10,borderRadius : 20,position : 'absolute'}}></Image>
           <Text style = {{color : 'white',fontSize : 17,position : 'absolute',marginTop : 10, marginStart : 150}}>{item.name}</Text>
           <Text style = {{color : 'white',fontSize : 17,position : 'absolute',marginTop : 40, marginStart : 150}}>{item.amount}</Text>
           <Text style = {{color : 'white',fontSize : 17,position : 'absolute',marginTop : 70, marginStart : 150}}>{item.price}</Text>
           <TouchableOpacity style = {{width : 120, height : 30,justifyContent : 'center',backgroundColor : 'grey',position : 'absolute',marginTop : 100, marginStart : 150}}
            onPress={()=>{
             if(item.completlyPayment === undefined){
              // current state of text is Thanh Toan. because completlyPayment == undefined.
              if(item.id <=5)
              for(let i = 0;i<data1.length;i++){
                if(data1[i].id === item.id) data1[i].statesAdd = false;
              }
              else{
                for(let i = 0;i<data2.length;i++){
                if(data2[i].id === item.id) data2[i].statesAdd = false;
              }
              }
            
            let payProduct = {id : item.id, image : item.image,name : item.name,amount : item.amount,price : item.price,completlyPayment : true}
            completlyPayment.push(payProduct);
            let editData = [...dataReceive];
            for(let i = 0;i<editData.length;i++){
              if(editData[i].id === item.id) editData.splice(i,1);
            }
            editData.push(payProduct);
            setAmount(amount+1);
             }
            }}
           >
            <Text style = {{alignSelf : 'center'}}>{item.completlyPayment === true ? 'Đã thanh toán' : 'Thanh toán'}</Text>
           </TouchableOpacity>
        </View>
    )
}
  // show 1 list sản phẩm đã thêm vào giỏ hàng và sp đã chi trả

  const renderSeparator = () => (
    <View
      style={{
        height: 10, // Đặt chiều cao của margin giữa các phần tử
        backgroundColor: 'transparent', // Đặt màu của margin
      }}
    />
  );

  
    return (
      <View style = {{flex : 1, backgroundColor : 'white'}}>
         <FlatList 
          style = {styles.cartFlatList}
          data = {dataReceive}
          renderItem={renderItem}
          ItemSeparatorComponent={renderSeparator} 
         ></FlatList>
      </View>
    )
  }

  const History = ({route})=>{ 
    // lấy ra danh sách sản phẩm đã thanh toán
    let completlyPayment = route.params.completlyPayment;
    console.log("History duoc goi"+completlyPayment.length);
    let renderItem = ({item})=>{
    return (
        <View style ={{height : 140, width : "100%",backgroundColor : '#9C9C9C'}}>
           <Image source={item.image} style = {{height : 130, width : 130,marginStart : 10,borderRadius : 20,position : 'absolute',marginTop : 5}}></Image>
           <Text style = {{color : 'white',fontSize : 17,position : 'absolute',marginTop : 10, marginStart : 150}}>{item.name}</Text>
           <Text style = {{color : 'white',fontSize : 17,position : 'absolute',marginTop : 40, marginStart : 150}}>Số lượng : {item.amount}</Text>
           <Text style = {{color : 'white',fontSize : 17,position : 'absolute',marginTop : 70, marginStart : 150}}>Giá : {item.price} $</Text>
           <Text style = {{color : 'white',fontSize : 17,position : 'absolute',marginTop : 100, marginStart : 150}}>Tổng chi trả : {item.price* item.amount} $</Text>
        </View>
    )
}
  // show 1 list sản phẩm đã thêm vào giỏ hàng và sp đã chi trả

  const renderSeparator = () => (
    <View
      style={{
        height: 10, // Đặt chiều cao của margin giữa các phần tử
        backgroundColor: 'transparent', // Đặt màu của margin
      }}
    />
  );


    return (
      <View>
        <FlatList 
          style = {styles.history}
          data = {completlyPayment}
          renderItem={renderItem}
          ItemSeparatorComponent={renderSeparator} 
        ></FlatList>
      </View>
    )
  }

  const Favourite = ({route})=>{
    let data1 = route.params.data1;
    let data2 = route.params.data2;
    let dataReceive =[];
    for(let i = 0;i<data1.length;i++){
      if(data1[i].favourite === true) dataReceive.push(data1[i]);
      if(data2[i].favourite === true) dataReceive.push(data2[i]);
    }
    

    let renderItem = ({item})=>{
      return (
          <View style ={{height : 140, width : "100%",backgroundColor : '#9C9C9C'}}>
             <Image source={item.image} style = {{height : 130, width : 130,marginStart : 10,borderRadius : 20,position : 'absolute',marginTop : 5}}></Image>
             <Text style = {{color : 'white',fontSize : 17,position : 'absolute',marginTop : 10, marginStart : 150}}>{item.name}</Text>
             <Text style = {{color : 'white',fontSize : 17,position : 'absolute',marginTop : 40, marginStart : 150}}>Giá : {item.price} $</Text>
             <Image source={require("../../color/star.png")} style = {{tintColor : 'blue', width : 35, height :35,position : 'absolute',marginTop : 80, marginStart : 155}}></Image>
          </View>
      )
  }
    // show 1 list sản phẩm đã thêm vào giỏ hàng và sp đã chi trả
  
    const renderSeparator = () => (
      <View
        style={{
          height: 10, // Đặt chiều cao của margin giữa các phần tử
          backgroundColor: 'transparent', // Đặt màu của margin
        }}
      />
    );
  
  
      return (
        <View>
          <FlatList 
            style = {styles.favourite}
            data = {dataReceive}
            renderItem={renderItem}
            ItemSeparatorComponent={renderSeparator} 
          ></FlatList>
        </View>
      )

  }




function Product({navigation,route}){

  let data1 = [
    {id : 1,image :  require('../../color/coffee1.jpg'), name : "Coffee Akdixl",price : 20,amount : 0,statesAdd : false,favourite : false ,discrible : 'Coffee is a beverage brewed from roasted coffee beans. Darkly colored, bitter, and slightly acidic, coffee has a stimulating effect on humans, primarily due to its caffeine content. It has the highest sales in the world market for hot drinks.[2] The seeds of the Coffea plant fruits are separated to produce unroasted green coffee beans. The beans are roasted and then ground into fine particles typically steeped in hot water before being filtered out,'},
    {id : 2,image :  require('../../color/coffee2.jpg'), name : "Coffee Patenner",price : 30,amount : 0,statesAdd : false,favourite : false ,discrible : 'Though coffee is now a global commodity, it has a long history tied closely to food traditions around the Red Sea. The earliest credible evidence of coffee drinking as the modern beverage appears in modern-day Yemen in southern Arabia in the middle of the 15th century in Sufi shrines, where coffee seeds were first roasted and brewed in a manner similar to how it is now prepared for drinking'},
    {id : 3,image :  require('../../color/coffee3.jpg'), name : "Coffee Alatkaz",price : 15,amount : 0,statesAdd : false,favourite : false ,discrible : ' The coffee beans were procured by the Yemenis from the Ethiopian Highlands via coastal Somali intermediaries, and cultivated in Yemen. By the 16th century, the drink had reached the rest of the Middle East and North Africa, later spreading to Europe.The two most commonly grown coffee bean types are C. arabica and C. robusta.'},
    {id : 4,image :  require('../../color/coffee4.jpg'), name : "Coffee Pizal",price : 17,amount : 0,statesAdd : false,favourite : false ,discrible : 'Coffee plants are cultivated in over 70 countries, primarily in the equatorial regions of the Americas, Southeast Asia, the Indian subcontinent, and Africa. As of 2023, Brazil was the leading grower of coffee beans, producing 35% of the world total. Green, unroasted coffee is traded as an agricultural commodity. Despite sales of coffee reaching billions of dollars worldwide, farmers producing coffee beans disproportionately live in poverty.'},
    {id : 5,image :  require('../../color/coffee5.jpg'), name : "Coffee Nespam",price : 19,amount : 0,statesAdd : false,favourite : false ,discrible : 'Meanwhile, coffee had been introduced to Brazil in 1727, although its cultivation did not gather momentum until independence in 1822.[35] After this time, massive tracts of rainforest were cleared for coffee plantations, first in the vicinity of Rio de Janeiro and later São Paulo.[36] Brazil went from having essentially no coffee exports in 1800 to being a significant regional producer in 1830, to being the largest producer in the world by 1852'},
  ];
  let data2 = [
    {id : 6,image :  require('../../color/coffee6.jpg'), name : "Coffee Thiage",price : 41,amount : 0,statesAdd : false,favourite : false ,discrible : 'Many countries in Central America took up cultivation in the latter half of the 19th century, and almost all were involved in the large-scale displacement and exploitation of the indigenous people[citation needed]. Harsh conditions led to many uprisings, coups, and bloody suppression of peasants.[38] The notable exception was Costa Rica'},
    {id : 7,image :  require('../../color/coffee7.jpg'), name : "Coffee Alatoma",price : 98,amount : 0,statesAdd : false,favourite : false ,discrible : 'where lack of ready labor prevented the formation of large farms. Smaller farms and more egalitarian conditions ameliorated unrest over the 19th and 20th centuries.[39] Rapid growth in coffee production in South America during the second half of the 19th century was matched by an increase in consumption in developed countries'},
    {id : 8,image :  require('../../color/coffee8.jpg'), name : "Coffee Imaniti",price : 44,amount : 0,statesAdd : false,favourite : false ,discrible : 'though nowhere has this growth been as pronounced as in the United States, where a high rate of population growth was compounded by doubling of per capita consumption between 1860 and 1920. Though the United States was not the heaviest coffee-drinking nation at the time (Belgium, the Netherlands and Nordic countries all had comparable or higher levels of per capita consumption), due to its sheer size'},
    {id : 9,image :  require('../../color/coffee9.jpg'), name : "Coffee Viozpd",price : 44,amount : 0,statesAdd : false,favourite : false ,discrible : ' it was already the largest consumer of coffee in the world by 1860, and, by 1920, around half of all coffee produced worldwide was consumed in the US.[37]Coffee has become a vital cash crop for many developing countries. Over one hundred million people in developing countries have become dependent on coffee as their primary source of income. It has become the primary export and economic backbone for African countries like Uganda, Burundi, Rwanda, and Ethiopia,[40] as well as many Central American countries.'},
    {id : 10,image :  require('../../color/coffee10.jpg'), name : "Coffee Yizalota",price : 31,amount : 0,statesAdd : false,favourite : false ,discrible : 'All coffee plants are classified in the large family Rubiaceae. They are evergreen shrubs or trees that may grow 5 m (15 ft) tall when unpruned. The leaves are dark green and glossy, usually 10–15 cm (4–6 in) long and 6 cm (2.4 in) wide, simple, entire, and opposite. Petioles of opposite leaves fuse at the base to form interpetiolar stipules, characteristic of Rubiaceae. The flowers are axillary, and clusters of fragrant white flowers bloom simultaneously. Gynoecium consists of an inferior ovary, also characteristic of Rubiaceae. '},
  ];
  let completlyPayment = [];
  return (
      <Stack.Navigator initialRouteName={"Home"}>
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false ,title : 'Trang chủ'}} initialParams = {{data1,data2}}/> 
            <Stack.Screen name="Cart" component={Cart} options={{ headerShown: false,title : 'Giỏ hàng' }} initialParams = {{data1,data2,completlyPayment}}/>
            <Stack.Screen name="PayProduct" component={History} options={{ headerShown: false,title : 'Thanh toán' }} initialParams = {{completlyPayment}}/>
            <Stack.Screen name="Favourite" component={Favourite} options={{ headerShown: false,title : 'Yêu thích' }} initialParams = {{data1,data2}}/>
      </Stack.Navigator>
  );
};
const styles = {
    home : {
        flex : 1,
        backgroundColor : 'black'
    },
    recomender : {
        color : 'white',
        fontSize : 30,
        marginTop : 10,
        marginStart : 15
    },
    coffeeBlueMountain : {
        color : 'white',
        fontSize : 20,
        marginTop : 15,
        marginStart : 10
    },
    flatList : {
        width : "100%",
        marginTop : 20,
        flexGrow : 0
    },
    cartFlatList : {
      width : "100%",
      marginTop : 20,
      flexGrow : 0
  },
  history : {
    width : "100%",
    marginTop : 20,
    flexGrow : 0
},
favourite : {
  width : "100%",
  marginTop : 20,
  flexGrow : 0
}
}

export default Product;
