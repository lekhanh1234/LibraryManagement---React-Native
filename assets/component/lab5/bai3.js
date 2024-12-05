/* eslint-disable prettier/prettier */
import { ImageBackground,View,Image,Text } from "react-native";
function Bai3(){
    return(
  <View style = {{flex : 1, ImageBackground : 'green'}}>
    <ImageBackground 
    style={{flex : 1 , position : 'relative'}} 
    source={require('../../color/anh_hoi_an.webp')}>
    <Image source={require("../../color/mui_ten.webp")} style = {{width : 20, height : 20,marginStart : 20, marginTop : 40}}></Image>
    <Image source={require("../../color/dots.jpg")} style = {{width : 20, height : 20,marginRight : 20, marginTop : 40, position: 'absolute' , right: 0,top : 0,transform: [{ scale: 3 }]}}></Image>
    <Text style = {{position : 'absolute',bottom : 0,start : 0,marginBottom : 350, marginStart : 20,color : 'white', fontSize : 30,fontWeight : 500}}>PHỐ CỔ HỘI AN</Text>
    <Image source={require("../../color/sao_vang.png")} style = {{position : 'absolute',bottom : 0, end : 0, marginBottom: 370,marginEnd : 50, width : 20, height : 20}}></Image>
    <Text style= {{position : 'absolute',bottom : 0, end : 0,marginBottom: 370,marginEnd : 20,color : 'white'}}>5.0</Text>
    <View style = {{position : 'absolute',bottom : 0, width : "100%", height : 330, backgroundColor : 'white',borderTopLeftRadius : 25, borderTopRightRadius : 25}}>
        <Image source={require("../../color/positionMap.png")} style = {{position : 'absolute',bottom : 0, start : 0,marginBottom : 230, marginStart : 13,width : 30, height : 30}}></Image>
        <Text style = {{position : 'absolute',bottom : 0 , start: 0,marginBottom : 234, marginStart : 50, color : 'blue',fontWeight : '700',fontSize : 17}}>Quảng Nam</Text>
        <Text style = {{flex : 15,marginTop : 120, width : '100%',fontSize : 20 , marginStart : 13,color : 'black', fontWeight : '500'}}>Thông tin chuyến đi</Text>
        <Text numberOfLines ={6} ellipsizeMode="tail"  style = {{flex : 55, width : '100%',padding : 13,color : 'black'}}>
        Kiểu nhà ở phổ biến nhất chính là những ngôi nhà hình ống chỉ một hoặc hai tầng với chiều ngang hẹp, chiều sâu rất dài.. Nhà được làm từ những vật liệu có sức chịu lực và độ bền cao do đặc điểm khí hậu khắc nghiệt nơi đây. Hai bên có tường gạch ngăn cách và khung nhà bằng gỗ, chia thành ba gian với lối đi ở giữa. Mỗi ngôi nhà ở Hội An đều đảm bảo sự hài hòa giữa không gian sống và thiên nhiên. Mỗi ngôi nhà đều có phần sân trời của được lát đá và trang trí bể nước, non bộ, cây cảnh, tạo nên một nét đẹp tổng thể.
        </Text>
        <View style = {{flex : 30,backgroundColor : 'blue',width : '100%',borderTopRightRadius : 20, borderTopLeftRadius : 20}}></View>
     </View>    
    <View style = {{position : 'absolute',bottom : 0, end : 0,marginBottom : 300, marginEnd : 20,width : 60, height : 60,borderRadius : 100,backgroundColor  : 'blue',justifyContent : 'center', alignItems : 'center'}}>
       <Image source={require("../../color/heart.png")} style={{ width : '50%',height : "50%"}}/>
    </View>
    </ImageBackground>

  </View>
    )
}
export default Bai3;
