import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useRoute, useNavigation } from "@react-navigation/native"
import tw from '../tailwind';
import { urlFor } from '../sanity';
import Icon from 'react-native-vector-icons/FontAwesome';
import Pin from 'react-native-vector-icons/FontAwesome6'
import { useDispatch,useSelector } from 'react-redux';
import { removeFromBasket,addToBasket,selectBasketItemsWithID } from '../feautures/basketSlice';

const DishRow = ({
  id, name, description, price, image
}) => {

  const [isPressed, setIsPressed] = useState(false)
  const items = useSelector((state)=> selectBasketItemsWithID(state,id))
  const dispatch = useDispatch()

  const addItemToBasket = () => {
    dispatch(addToBasket({ id, name, description, price, image }))
  }

  const removeItemFromBasket = () => {

    if(!items.length >0)
    {
      return
    }
    dispatch(removeFromBasket({ id }))
  }
  return (
    <>
      <TouchableOpacity onPress={() => setIsPressed(!isPressed)} style={tw.style('bg-white', 'border', 'p-4', 'border-gray-200', `${isPressed && 'border-b-0'}`)}>
        <View style={tw.style('flex-row',)}>
          <View style={tw.style('flex-1', 'pr-2')}>
            <Text style={tw.style('text-lg', 'mb-3')}>{name}</Text>
            <Text style={tw.style('text-gray-500')}>{description}</Text>
            <Text style={tw.style('text-green-500', 'mt-1')}>{price}</Text>
          </View>
          <View>
            <Image source={{ uri: urlFor(image).url() }} style={[tw.style('w-20', 'h-20', 'bg-gray-300', 'p-4'), { borderWidth: 1, borderColor: '#F3F3F4' }]} />
          </View>
        </View>
      </TouchableOpacity>

      {isPressed && (
        <View style={tw.style('bg-white', 'p-4')}>
          <View style={tw.style('flex-row', 'items-center', 'gap-2', 'pb-1')}>
            <TouchableOpacity onPress={removeItemFromBasket} >
              <Icon name="minus" size={30} color={items.length>0?'#900':'gray'}/>
            </TouchableOpacity>
            <Text>{items.length}</Text>
            <TouchableOpacity onPress={addItemToBasket}>
              <Icon name="plus" size={30} color="#900" />
            </TouchableOpacity>


          </View>
        </View>
      )}
    </>
  )
}

export default DishRow