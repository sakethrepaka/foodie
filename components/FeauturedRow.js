import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import tw from '../tailwind';
import RestaurantCard from './RestaurantCard';
import client from '../sanity';

const FeauturedRow = ({ id,title, description}) => {
    const [restaurants, setRestaurants] = useState([])

    useEffect(() => {
        client.fetch(`*[_type == "feautured" && _id == $id]{
            ...,
            restaurants[]->{
                ...,
                dishes[]->,
                type->{
                    name
                }
            }
        }[0]`, { id }).then(data => {
            setRestaurants(data?.restaurants)
        })
    }, [])
    

    // console.log(restaurants)

    return (
        <View>
            <View style={tw.style('mt-4', 'flex-row', 'px-4', 'items-center', 'justify-between')}>
                <Text style={tw.style('font-bold', 'text-lg')}>{title}</Text>
                <Icon name="arrow-right" size={20} color="#900" />
            </View>
            <Text style={tw.style('px-4', 'text-xs', 'text-gray-500', 'mb-2')}>{description}</Text>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 15 }} horizontal showsHorizontalScrollIndicator={false} style={{ paddingTop: 4 }} >
                
                
                {
                    restaurants?.map((restaurant)=>(
                        <RestaurantCard
                        key={restaurant._id}
                        id={restaurant._id}
                        imgUrl={restaurant.image}
                        title={restaurant.name}
                        rating={restaurant.rating}
                        genre={restaurant.type?.name}
                        address={restaurant.address}
                        short_description={restaurant.short_description}
                        dishes={restaurant.dishes}
                        long={restaurant.long}
                        lat={restaurant.lat}
                    />
                    ))
                }

            </ScrollView>
        </View>
    )
}

export default FeauturedRow