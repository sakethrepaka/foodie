import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectBasketItems, selectBasketTotal } from '../feautures/basketSlice'
import { useNavigation } from '@react-navigation/native'
import tw from '../tailwind';
const BasketIcon = () => {

    const items  = useSelector(selectBasketItems)
    const navigation = useNavigation()
    const basketTotal = useSelector(selectBasketTotal)

    if(items.length<=0)
    {
      return
    }

  return (
    <View style={tw.style('absolute','bottom-10','w-full','z-50')}> 
     <TouchableOpacity style={tw.style('bg-[#900]','mx-5','flex-row','items-center','rounded-lg','gap-1','p-4')} onPress={()=> navigation.navigate('Basket')} >
        <Text style={tw.style('text-lg','text-white','font-extrabold','py-1','px-2','bg-[#cf3e3e]')}>{items.length}</Text>
        <Text style={tw.style('flex-1','text-white','font-extrabold','text-lg','text-center')}>View Basket</Text>
        <Text style={tw.style('text-lg','text-white','font-extrabold')}>₹{basketTotal}</Text>
     </TouchableOpacity>
    </View>
  )
}

export default BasketIcon