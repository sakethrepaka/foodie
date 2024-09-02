import { View, Text, Touchable, TouchableOpacity,Image } from 'react-native'
import React from 'react'
import tw from '../tailwind';

const CategoryCard = ({imgUrl,title}) => {
  return (
    <TouchableOpacity style={tw.style('relative','mr-2')}>
        <Image source={{uri:imgUrl}} style={tw.style('h-20','w-20','rounded')}/>
      <Text style={tw.style('absolute','font-bold','text-white','left-1','bottom-1')}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CategoryCard