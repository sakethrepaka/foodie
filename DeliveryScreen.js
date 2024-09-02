import { View, Text, TouchableOpacity, Image, Linking,Platform } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectRestaurant } from './feautures/restaurantSlice'
import tw from './tailwind'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Feather';
import * as Progress from 'react-native-progress'
import MapView, { Polyline } from 'react-native-maps'
import { Marker } from 'react-native-maps'
import { useState, useEffect } from 'react'
import { decodePolyline } from './polylineDecoder'
import { PROVIDER_GOOGLE } from 'react-native-maps'


const DeliveryScreen = () => {
    const navigation = useNavigation()
    const restaurant = useSelector(selectRestaurant)
    const updatedlocation = useSelector((state) => state.Location)
    const [progress, setProgress] = useState(0);
    // const API_KEY = '9df8623f-3979-4e67-9bb2-825ff6ff1049';

    const [location, setLocation] = useState({
        latitude: updatedlocation.latitude,
        longitude: updatedlocation.longitude,
    });
    const [routeCoordinates, setRouteCoordinates] = useState([])

    useEffect(() => {
        setLocation((prev) => {
            return {
                ...prev,
                latitude: updatedlocation.lat,
                longitude: updatedlocation.lng
            };
        });

    }, [updatedlocation]);


    const coordinates = [
        { latitude: 17.43178995052908, longitude: 78.3720140903029 },
        { latitude: location.latitude, longitude: location.longitude },
    ];

    // useEffect(() => {
    //     const fetchRoute = async () => {
    //         try {
    //             const origin = '17.43178995052908,78.3720140903029'
    //             const destination = `${location.latitude},${location.longitude}`;
    //             const API_KEY = '9df8623f-3979-4e67-9bb2-825ff6ff1049';

    //             const response = await fetch(
    //                 `https://graphhopper.com/api/1/route?point=${origin}&point=${destination}&vehicle=car&locale=en&key=${API_KEY}`
    //             );

    //             const data = await response.json()
    //             const points = data.paths[0].points;
    //             const decodedPoints = decodePolyline(points)
    //             setRouteCoordinates(decodedPoints);
    //             // console.log(routeCoordinates)
    //         } catch (error) {
    //             console.error('Error fetching route:', error);
    //         }
    //     };

    //     fetchRoute();
    // }, [location]);

    const handleCall =()=>{
        if(Platform.OS=='android')
        {
            Linking.openURL("tel:938188888")
        }
    }

    useEffect(() => {
        let timer; // Declare timer variable here

        const fillProgressBar = () => {
            const duration = 5000*5; // 2 minutes in milliseconds
            const interval = 1000; // Interval to update progress (1 second)
            const totalSteps = duration / interval;
            let currentStep = 0;

            timer = setInterval(() => {
                currentStep++;
                const newProgress = currentStep / totalSteps;
                setProgress(newProgress);

                if (currentStep >= totalSteps) {
                    clearInterval(timer);
                    navigation.navigate('Delivered');
                }
            }, interval);
        };

        fillProgressBar();

        return () => clearInterval(timer);
    }, []);

//

    return (
        <View style={tw.style('bg-gray-200', 'flex-1')}>
            <SafeAreaView style={tw.style('z-50')}>
                <View style={tw.style('flex-row', 'justify-between', 'items-center', 'p-5')}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <Icon name="x-circle" size={22} color="#900" />
                    </TouchableOpacity>
                    <Text>Order FAQ</Text>
                </View>

                <View style={tw.style('bg-white', 'mx-5', 'my-2', 'rounded-md', 'p-6', 'z-50', 'shadow-md')}>
                    <View style={tw.style('flex-row', 'justify-between')}>
                        <View>
                            <Text style={tw.style('text-lg', 'text-gray-400')}>Estimated Arrival</Text>
                            <Text style={tw.style('text-3xl', 'font-bold')}>30-35 Minutes</Text>
                        </View>
                        <Image source={{ uri: 'https://img.freepik.com/premium-vector/delivery-boy-scooter-doing-delivery-service-illustration_602666-23.jpg' }} style={tw.style('h-20', 'w-15')} />
                    </View>

                    <Progress.Bar color='#900'  progress={progress}/>

                    <Text style={tw.style('mt-3', 'text-gray-500')}>
                        your order at {restaurant.title} is being prepared
                    </Text>
                </View>
            </SafeAreaView>
            <MapView
                initialRegion={{
                    latitude: 17.4317596730261,
                    longitude: 78.3720140903029,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005
                }}
                provider={PROVIDER_GOOGLE}
                style={tw.style('flex-1', '-mt-10', 'z-0')}
                // mapType='mutedStandard'
            >
                <Marker
                    coordinate={{
                        latitude: 17.43178995052908,
                        longitude: 78.3720140903029,
                    }}
                    title={restaurant.title}
                    description={restaurant.short_description}
                    pinColor='#900'
                />
                {/* Destination marker */}
                <Marker
                    coordinate={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                    }}
                    title="Destination"
                    pinColor='green'
                />
                {/* <Polyline
                    coordinates={routeCoordinates}
                    strokeWidth={10}
                    strokeColor="#4184F3"
                /> */}
            </MapView>

            <SafeAreaView style={tw.style('bg-white', 'flex-row', 'items-center', 'gap-5', 'h-28')}>
                <Image source={{ uri: 'https://img.freepik.com/premium-vector/delivery-boy-scooter-doing-delivery-service-illustration_602666-23.jpg' }} style={tw.style('h-12', 'w-12', 'bg-gray-300', 'p-4', 'rounded-full', 'ml-5', 'mb-10')}></Image>
                <View style={tw.style('flex-1', 'mb-10')}>
                    <Text style={tw.style('text-lg')}>
                        Saketh
                    </Text>
                    <Text style={tw.style('text-gray-400')}>
                        Our Delivery Rider
                    </Text>
                </View>
                <TouchableOpacity onPress={handleCall}>
                    <Text style={tw.style('text-[#00CCBB]', 'text-lg', 'mr-5', 'font-bold')}>Call Us</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    )
}

export default DeliveryScreen

//saketh.repaka04@gmail.com
//Avengers3@