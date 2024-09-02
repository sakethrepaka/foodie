import { View, Text, Image, TouchableOpacity } from 'react-native'
import tw from '../tailwind';
import Icon from 'react-native-vector-icons/FontAwesome';
import { urlFor } from '../sanity';
import { useNavigation } from '@react-navigation/native'


const RestaurantCard = ({
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
}) => {

    const navigation = useNavigation()
    return (
        <TouchableOpacity onPress={() => {
            navigation.navigate('Restaurant', {
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
            })
        }} style={tw.style('mr-3', 'shadow', 'bg-white', 'mb-2')}>
            <Image source={{ uri: urlFor(imgUrl).url() }} style={tw.style('h-36', 'w-64', 'rounded-sm')} />

            <View style={tw.style('mb-4', 'px-2')}>
                <Text style={tw.style('font-bold', 'text-lg', 'pt-2')}>{title}</Text>
                <View style={tw.style('flex-row', 'items-center')}>
                    <Icon name="star" style={{ opacity: 0.5, marginRight: 4 }} size={20} color="#900" />
                    <Text style={tw.style('text-gray-500', 'text-xs')}>
                        <Text style={tw.style('text-green-500')}>{rating}</Text>  {genre}</Text>
                </View>
                <View style={tw.style('flex-row', 'items-center', 'gap-2')}>
                    <Icon name="location-arrow" size={20} color="#900" />
                    <Text style={tw.style('text-xs', 'text-gray-500')}>Near by {address}</Text>
                </View>
            </View>

        </TouchableOpacity>
    )
}

export default RestaurantCard