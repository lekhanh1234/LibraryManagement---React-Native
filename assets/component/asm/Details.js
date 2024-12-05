/* eslint-disable prettier/prettier */
import { useState } from "react";
import { Image, Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler";
import { opacity } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

const DetailScreen = ({route,navigation})=>{
    let data = route.params.data;
    const [addProduct,setAddProduct] = useState(data.statesAdd);
    const [amount,setAmount] = useState(data.amount);

    console.log("ham detailScreen duoc goi :"+route.params.data.amount);
    return (
        <View style = {{flex : 1,backgroundColor : 'black'}}
        >
        <Image source={data.image} style = {{width : '100%', height : 350,position : 'absolute'}}>
        </Image>
        <View style = {{width : '100%',height : 500,backgroundColor : 'transparent',bottom : 0,position : 'absolute'}}>
        <View style = {{width : '100%',height : "20%",backgroundColor : 'black',opacity : 0.2}}></View>
        <View style = {{width : '100%',height : "80%",backgroundColor : 'black'}}>
            <Text style = {{width : '100%' ,color : 'white', marginStart : 10, marginEnd : 10, fontSize : 17}}>{data.discrible}</Text>
            <TouchableOpacity style = {{justifyContent : 'center',marginTop : 20,width : 140, height : 50, backgroundColor : 'blue',alignSelf : 'center',borderRadius : 20}}
            onPress={()=>{
                  if(data.amount === 0) return;
                  if(addProduct === true){
                    data.statesAdd = false,
                    data.amount = 0;
                    setAmount(0);
                    setAddProduct(false);
                  }
                  else {
                    data.statesAdd = true;
                    setAddProduct(true);
                  }
                }}    
            >
                <Text  style = {{color : 'white',alignSelf :'center'}}
                >{addProduct === false ? 'Thêm sản phẩm' : 'Xóa sản phẩm'}</Text>
            </TouchableOpacity>
        </View>

        <Text style = {{fontSize : 25,color : 'white',position : 'absolute',marginStart : 10, marginTop : 10}}>{data.name}</Text> 
        <Text style = {{fontSize : 20,color : 'white',position : 'absolute',marginStart : 10, marginTop : 50}}>{data.price} $</Text> 
        <Text style = {{fontSize : 20,color : 'white',position : 'absolute',marginRight : 70, marginTop : 10,right : 0}}>Amount {data.amount}</Text> 
        </View>

        </View>
    )
}
export default DetailScreen;