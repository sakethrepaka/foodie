import { View, Text, ScrollView, Image, SafeAreaView, TouchableOpacity,Alert } from 'react-native';
import React from 'react';
import tw from './tailwind';
import { LinearGradient } from 'expo-linear-gradient';
import client from './sanity'
import { useState, useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { setPremium } from './feautures/premiumSlice';
import RazorpayCheckout from 'react-native-razorpay';
import { selectPremium } from './feautures/premiumSlice'

const PremiumScreen = () => {

    const dispatch = useDispatch();
    const premium = useSelector(selectPremium)
    console.log(premium,"new")

    const [showAnswer1, setShowAnswer1] = useState(false);
    const [showAnswer2, setShowAnswer2] = useState(false);
    const [showAnswer3, setShowAnswer3] = useState(false);
    const [showAnswer4, setShowAnswer4] = useState(false);

    const toggleAnswer1 = () => {
        setShowAnswer1(!showAnswer1);
    };

    const toggleAnswer2 = () => {
        setShowAnswer2(!showAnswer2);
    };

    const toggleAnswer3 = () => {
        setShowAnswer3(!showAnswer3);
    };

    const toggleAnswer4 = () => {
        setShowAnswer4(!showAnswer4);
    };

    const restaurants = [
        { id: 1, name: 'Paradise Biryani', image: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { id: 2, name: 'Bawarchi', image: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { id: 3, name: 'Chutneys', image: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { id: 4, name: 'Subbayya Gari Hotel', image: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { id: 5, name: 'Creamstone', image: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { id: 6, name: 'BunWorld', image: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=400' },
    ];
    const navigation = useNavigation()

    const handlePayment = async () => {
    
        try {
          const options = {
            description: 'Payment for your order',
            image: 'https://your-company-logo.png', // Replace with your company logo URL
            currency: 'INR',
            key: 'rzp_test_1T5G8lkt8JRnFe', 
            amount: 1500, 
            name: 'foodie',
            prefill: {
              email: 'customer@example.com',
              contact: '9999999999',
              name: 'John Doe',
            },
            theme: { color: '#3399cc' },
          };
    
          RazorpayCheckout.open(options)
            .then((data) => {
              // Handle success
              console.log(data);
              Alert.alert('Payment Success', `Payment ID: ${data.razorpay_payment_id}`);
              dispatch(setPremium(true))
              console.log(premium,"check")
              navigation.navigate('Home')
            })
            .catch((error) => {
              // Handle error
              console.log(error);
              Alert.alert('Payment Error', 'An error occurred while processing payment.');
            });
        } catch (error) {
          console.error(error);
          Alert.alert('Error', 'An error occurred while processing payment.');
        }
      };
    


    return (
        <SafeAreaView style={tw`flex-1 bg-white`}>
            <ScrollView>
                <View style={tw`p-4`}>

                    <View style={tw`bg-white rounded-lg shadow-md overflow-hidden p-2`}>
                        <Image
                            source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Ww6NTqCKx0dn8pklIN5xTBS-Pp0jdneRXg&s' }}
                            style={tw`w-20 h-20 mx-auto`}
                            resizeMode="cover"
                        />
                        <View style={tw`p-4`}>
                            <Text style={tw`text-lg font-bold mb-2 text-center`}>Heavy Benefits, Lite Price!</Text>
                        </View>
                    </View>

                    <View style={tw`bg-white rounded-lg shadow-md overflow-hidden p-2 mt-8 items-center`}>
                        <Image
                            source={{ uri: 'https://img.freepik.com/premium-vector/delivery-boy-scooter-doing-delivery-service-illustration_602666-23.jpg' }}
                            style={tw`w-20 h-20 rounded-full`}
                            resizeMode="cover"
                        />
                        <Text style={tw`text-lg font-bold mb-2 text-center text-[#900]`}>Unlock 8 Deliveries!</Text>
                        <TouchableOpacity style={tw`bg-[#DAA520] py-2 px-4 rounded-lg mt-3`} onPress={handlePayment}>
                            <Text style={tw`text-white font-bold text-lg w-65 text-center`}>Buy Premium at 150</Text>
                            <Text style={tw`text-white font-bold text-xs text-center`}>for 1 month</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={tw`bg-white rounded-lg shadow-md overflow-hidden p-2 mt-8 flex-row items-center`}>
                        <Image
                            source={{ uri: 'https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTAxL3Jhd3BpeGVsb2ZmaWNlMThfYV9jdXRlXzNkX29mX2FfbGlrZV9lbW9qaV9pc29sYXRlZF9vbl9hX3doaXRlX18wMTI4NDc0Ny1hNTc3LTRmYmEtYjZjNS02YjBhMzc3MmEzOWIucG5n.png' }} // Replace with your savings image URL
                            style={tw`w-20 h-20 rounded-full`}
                            resizeMode="cover"
                        />
                        <View style={tw`flex-1 ml-4`}>
                            <Text style={tw`text-sm text-gray-800`}>You can save ₹300 in one month with premium membership</Text>
                        </View>
                    </View>

                    <View style={tw`bg-white rounded-lg shadow-md overflow-hidden py-6 px-2 mt-8 mb-2 flex-row`}>
                        <Image
                            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Vegetarian_Curry.jpeg/640px-Vegetarian_Curry.jpeg' }} // Replace with your food image URL
                            style={tw`w-20 h-20 rounded-full`}
                            resizeMode="cover"
                        />
                        <View style={tw`flex-1 px-6`}>
                            <Text style={tw`text-lg font-bold text-[#900] mb-1`}>8 free deliveries</Text>
                            <Text style={tw`text-sm mb-2`}>above 149 on all restaurants in 10km Radius</Text>
                            <Text style={tw`text-lg font-bold text-[#900] mb-1`}>Up to 30% extra </Text>
                            <Text style={tw`text-sm mb-2`}>over & above other offers</Text>
                            <Text style={tw`text-lg font-bold text-[#900] mb-1`}>No surge fee</Text>
                            <Text style={tw`text-sm mb-2`}>order whenever you want!</Text>
                        </View>
                    </View>

                    <Text style={tw`text-lg font-bold text-[#900] mb-1 mt-6 text-center`}>Extra discounts on your favourite restaurants! Lets go!</Text>

                    <View style={tw`flex-row flex-wrap justify-between mt-2 bg-gray-100 rounded-lg shadow-md overflow-hidden py-6 px-4`}>

                        {restaurants.map(restaurant => (
                            <View key={restaurant.id} style={tw`w-22 mb-4 bg-white mr-2 rounded-lg p-0.5`} onPress={() => { }}>
                                <Text style={tw`text-xs font-semibold mt-2 text-center bg-[#e8b3b3] rounded-lg py-0.2`} >Extra 10%off</Text>
                                <Image
                                    source={{ uri: restaurant.image }}
                                    style={tw`w-10 h-10 rounded-full mx-auto my-2`}
                                    resizeMode="cover"
                                />
                                <Text style={tw`text-xs font-semibold mt-2 text-center`}>{restaurant.name}</Text>
                            </View>
                        ))}

                    </View>

                    <View style={tw`bg-white rounded-lg shadow-md overflow-hidden py-6 px-2 mt-8 mb-2`}>
                        <Text style={tw`text-lg font-bold text-[#900] mb-4 mt-2 px-4`}>Frequently Asked Questions</Text>

                        <TouchableOpacity onPress={toggleAnswer1} style={tw`border-b border-gray-300 py-4 px-4`}>
                            <Text style={tw`text-lg font-semibold text-gray-800`}>What benefits do I get with the premium subscription?</Text>
                            {showAnswer1 && (
                                <Text style={tw`mt-2 text-sm text-gray-600`}>
                                    With the premium subscription, you get access to exclusive discounts, free deliveries, and priority support.
                                </Text>
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity onPress={toggleAnswer2} style={tw`border-b border-gray-300 py-4 px-4`}>
                            <Text style={tw`text-lg font-semibold text-gray-800`}>How much does the premium subscription cost?</Text>
                            {showAnswer2 && (
                                <Text style={tw`mt-2 text-sm text-gray-600`}>
                                    The premium subscription costs $10 per month, with discounts available for longer subscription periods.
                                </Text>
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity onPress={toggleAnswer3} style={tw`border-b border-gray-300 py-4 px-4`}>
                            <Text style={tw`text-lg font-semibold text-gray-800`}>Can I cancel my subscription at any time?</Text>
                            {showAnswer3 && (
                                <Text style={tw`mt-2 text-sm text-gray-600`}>
                                    Yes, you can cancel your subscription at any time without any additional charges.
                                </Text>
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity onPress={toggleAnswer4} style={tw`py-4 px-4`}>
                            <Text style={tw`text-lg font-semibold text-gray-800`}>How do I upgrade to premium?</Text>
                            {showAnswer4 && (
                                <Text style={tw`mt-2 text-sm text-gray-600`}>
                                    You can upgrade to premium directly from the app settings. Simply navigate to the subscription section and choose the premium plan.
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>

                </View>


            </ScrollView>
        </SafeAreaView>
    );
};

export default PremiumScreen;
