/* eslint-disable prettier/prettier */

import { TextInput, View } from "react-native"
import styles from '../style/StyleCustomView'

const InputLoanSlipForm =({data,setData,placeholder,editable = true})=>{
    return(<View style ={styles.containerInputForm}>
      <TextInput
          style={styles.inputLoanSlipForm}
          value={data}
          onChangeText={(data)=>setData(data)}
          placeholder={placeholder}
          editable = {editable}
      />
    </View>)
}


const BookAttributeForm =({data,setData,placeholder})=>{
    return(
      <TextInput
          style={styles.BookAttributeInputForm}
          value={data}
          onChangeText={(data)=>setData(data)}
          placeholder={placeholder}
      />)
}

export {InputLoanSlipForm,BookAttributeForm}