import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect, useEffect } from 'react'
import { useRoute, useNavigation } from "@react-navigation/native"
import tw from './tailwind';
import { urlFor } from './sanity';
import Icon from 'react-native-vector-icons/FontAwesome';
import Pin from 'react-native-vector-icons/FontAwesome6'
import DishRow from './components/DishRow';
import BasketIcon from './components/BasketIcon';
import { useDispatch } from 'react-redux';
import { setRestaurant } from './feautures/restaurantSlice';

const RestaurantScreen = () => {

    const navigation = useNavigation()
    const dispatch = useDispatch()

    useLayoutEffect(() => {
        navigation.setOptions(
            {
                headerShown: false
            }
        )
    }, [])

    const {
        params: {
            id,
            imgUrl,
            title,
            rating,
            genre,
            address,
            short_description,
            dishes,
            long,
            lat
        }
    } = useRoute()

    useEffect(() => {

        dispatch(setRestaurant({
            id,
            imgUrl,
            title,
            rating,
            genre,
            address,
            short_description,
            dishes
        }))
    }, [])

    return (
        
            <>
                <BasketIcon />
                <ScrollView>
                    <View style={tw.style('relative')}>
                        <Image source={{ uri: urlFor(imgUrl).url() }} style={tw.style('w-full', 'h-56', 'bg-gray-300', 'p-4')} />
                        <TouchableOpacity onPress={navigation.goBack} style={tw.style('absolute', 'top-14', 'left-5', 'p-2', 'rounded-full', 'bg-gray-200')}>
                            <Icon name="arrow-left" size={22} color="#900" />
                        </TouchableOpacity>
                    </View>

                    <View style={tw.style('bg-white')}>
                        <View style={tw.style('px-4', 'pt-4')}>
                            <Text style={tw.style('text-3xl', 'font-bold')}>{title}</Text>
                            <View style={tw.style('space-x-2', 'my-1', 'flex-row')}>
                                <View style={tw.style('flex-row', 'items-center', 'gap-1')}>
                                    <Icon name="star" size={20} color="green" />
                                    <Text style={tw.style('text-gray-500', 'text-xs')}>
                                        <Text style={tw.style('text-green-500')}>{rating}</Text>  {genre}</Text>
                                </View>
                                <View style={tw.style('flex-row', 'items-center', 'gap-1', 'ml-1.5')}>
                                    <Pin name="location-dot" size={20} color="gray" />
                                    <Text style={tw.style('text-gray-500', 'text-xs')}>
                                        Near by {address}</Text>
                                </View>
                            </View>
                            <Text style={tw.style('text-gray-500', 'mt-2', 'pb-4')}>{short_description}</Text>
                        </View>
                    </View>
                    <View style={tw.style('pb-30')}>
                        <Text style={tw.style('font-bold', 'text-xl', 'px-4', 'pt-6', 'mb-3')}>
                            Menu
                        </Text>
                        {dishes.map((dish) => (
                            <DishRow
                                key={dish._id}
                                id={dish._id}
                                name={dish.name}
                                description={dish.short_description}
                                price={dish.price}
                                image={dish.image}
                            />
                        ))}
                    </View>
                </ScrollView>
            </>
    )
}

export default RestaurantScreen