import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView, StyleSheet, Platform } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { selectRestaurant } from './feautures/restaurantSlice'
import { removeFromBasket, selectBasketItems, selectBasketTotal, addToBasket } from './feautures/basketSlice'
import tw from './tailwind';
import Icon from 'react-native-vector-icons/Feather';
import Sticker from 'react-native-vector-icons/FontAwesome5'
import Phone from 'react-native-vector-icons/MaterialCommunityIcons'
import Notes from 'react-native-vector-icons/Foundation'
import { urlFor } from './sanity'
import DeliveryTypeSelection from './components/DeliveryTypeSelection'
import { setTime } from './feautures/TimeSlice'
import { selectPremium } from './feautures/premiumSlice'
import RazorpayCheckout from 'react-native-razorpay';
import { selectUser } from './feautures/UserSlice'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { clearBasket } from './feautures/basketSlice'



const RoundedScrollView = ({ children }) => {
    return (
        <View style={styles.scrollViewContainer}>
            <ScrollView style={styles.scrollView}>
                {children}
            </ScrollView>
        </View>
    );
};

const BasketScreen = () => {
    const navigation = useNavigation()
    const restaurant = useSelector(selectRestaurant)
    const items = useSelector(selectBasketItems)
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedTip, setSelectedTip] = useState(0)
    const dispatch = useDispatch()
    const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([])
    const [fee, setFee] = useState(9)
    
    const basketTotal = useSelector(selectBasketTotal)
    const premium = useSelector(selectPremium)
    // console.log(premium,"pre")
    // console.log(premium,"hello")
    let paymentTotal = basketTotal + fee + selectedTip + 5 + 15 + 20 - (premium ? 5 : 0)
    const data = useSelector(selectUser)

    const updatedtime = useSelector((state) => state.Time);
    

    useMemo(() => {
        const groupedItems = items.reduce((results, item) => {
            (results[item.id] = results[item.id] || []).push(item);
            return results
        }, {});

        setGroupedItemsInBasket(groupedItems);
    }, [items]);

    const handleTipPress = (tipAmount) => {
        if (selectedTip === tipAmount) {
            setSelectedTip(0);
        } else {
            setSelectedTip(tipAmount);
        }
    };

    const handlePayment = async (price) => {

        navigation.navigate('Preparing')
        // const orderDetails = {
        //     orderId: 123,
        //     restaurant:restaurant,
        //     date:new Date,
        //     items: groupedItemsInBasket, 
        //     paymentTotal: paymentTotal,
        //     tip: selectedTip,
        //     basketTotal:basketTotal,
        //     fee:fee,
        //     Platformfee:5,
        //     GST:15,
        //     Restaurantcharges:20
        // };

        // try {
        //     const userDataJSON = await AsyncStorage.getItem(data.email);
        //     if (userDataJSON !== null) {
        //         const userData = JSON.parse(userDataJSON);
        //         if (!userData.orders) {

        //             userData.orders = []
        //         }
        //         userData.orders.push(orderDetails);

        //         await AsyncStorage.setItem(data.email, JSON.stringify(userData));
        //         navigation.navigate('Preparing')
        //         console.log(groupedItemsInBasket)
        //         console.log(items)
        //         dispatch(clearBasket())
        //         // console.log(userData)
        //     } else {
        //         console.log('User not found.');
        //     }
           
        // }
        // catch (error) {
        //     console.log(error)
        //     alert("adding failed")
        // }
    
        // try {
        //   const options = {
        //     description: 'Payment for your order',
        //     image: 'https://your-company-logo.png', // Replace with your company logo URL
        //     currency: 'INR',
        //     key: 'rzp_test_1T5G8lkt8JRnFe', 
        //     amount: price*100, 
        //     name: 'foodie',
        //     prefill: {
        //       email: 'customer@example.com',
        //       contact: '9999999999',
        //       name: 'John Doe',
        //     },
        //     theme: { color: '#3399cc' },
        //   };
    
        //   RazorpayCheckout.open(options)
        //     .then((data) => {
        //       // Handle success
        //       console.log(data);
           
        //       navigation.navigate('Preparing')
        //     })
        //     .catch((error) => {
        //       // Handle error
        //       console.log(error);
        //       Alert.alert('Payment Error', 'An error occurred while processing payment.');
        //     });
        // } catch (error) {
        //   console.error(error);
        //   Alert.alert('Error', 'An error occurred while processing payment.');
        // }
      };
    



    return (
        <SafeAreaView style={tw.style('flex-1', 'bg-white')}>
            <View style={tw.style('flex-1', 'bg-gray-100', 'pt-10')}>
                <View style={tw.style('p-5', 'border-b', 'border-[#900]', 'bg-white', 'shadow')}>
                    <View>
                        <Text style={tw.style('text-center', 'text-lg', 'font-bold')}>Basket</Text>
                        <Text style={tw.style('text-center', 'text-gray-400')}>{restaurant.title}</Text>
                    </View>

                    <TouchableOpacity onPress={() => navigation.goBack()} style={tw.style('rounded-full', 'bg-gray-100', 'absolute', 'top-3', 'right-5')}>
                        <Icon name="x-circle" size={22} color="#900" />

                    </TouchableOpacity>
                </View>

                <ScrollView style={{ flex: 1 }}>

                    <View style={tw.style('flex-row', 'items-center', 'gap-4', 'bg-white', 'px-4', 'py-3', 'my-5')}>
                        <Image source={{ uri: 'https://img.freepik.com/premium-vector/delivery-boy-scooter-doing-delivery-service-illustration_602666-23.jpg' }}
                            style={tw.style('h-12', 'w-12', 'p-4', 'rounded-full', 'p-4')} />
                        <Text style={tw.style('flex-1')}>Deliver In {(updatedtime).time}</Text>
                        <TouchableOpacity>
                            <Text style={tw.style('text-[#900]')}>Change</Text>
                        </TouchableOpacity>
                    </View>

                    <RoundedScrollView>
                        {Object.entries(groupedItemsInBasket).map(([key, items]) => (
                            <View key={key} style={tw.style('flex-row', 'items-center', 'gap-3', 'px-2', 'py-5', 'bg-white', { marginBottom: 0, borderBottomColor: 'gray', borderWidth: 0.5, borderTopWidth: 0, borderRightWidth: 0, borderLeftWidth: 0 })}>
                                {/* <Image source={{ uri: urlFor(items[0]?.image).url() }} style={tw.style('h-12', 'w-12', 'rounded-full')} /> */}
                                <Text style={tw.style('flex-1')}>{items[0].name}</Text>
                                <TouchableOpacity style={styles.buttonContainer} onPress={() => dispatch(removeFromBasket({ id: key }))}>
                                    <Text style={styles.buttonText}>-</Text>
                                </TouchableOpacity>
                                <Text style={tw.style('text-[#900]', 'font-bold')}>{items.length}</Text>
                                <TouchableOpacity style={styles.buttonContainer} onPress={() => dispatch(addToBasket({ id: key, name: items[0].name, description: items[0]?.description, price: items[0]?.price, image: items[0].image }))}>
                                    <Text style={styles.buttonText}>+</Text>
                                </TouchableOpacity>
                                <Text style={tw.style('text-gray-500', 'font-bold')}>{items[0]?.price}</Text>
                            </View>
                        ))}
                    </RoundedScrollView>


                    <DeliveryTypeSelection setFee={setFee}></DeliveryTypeSelection>

                    <View style={tw`px-4 mb-8`}>
                        <Text style={tw`text-lg font-bold mt-5`}>Delivery Instructions</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`mt-3 p-1`}>
                            <TouchableOpacity
                                style={[styles.deliveryInstructionCard, tw`shadow-lg`, selectedOption === 'bell' && tw`border-[#900]`, { marginRight: 10 }]}
                                onPress={() => setSelectedOption('bell')}>
                                <Icon name="bell-off" size={24} color="#900" />
                                <Text style={[styles.deliveryInstructionTitle, selectedOption === 'bell' && tw`text-[#900]`, tw`text-sm mt-1`]}>Avoid</Text>
                                <Text style={[styles.deliveryInstructionTitle, selectedOption === 'bell' && tw`text-[#900]`, tw`text-sm`]}>Bell</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.deliveryInstructionCard, tw`shadow-lg`, selectedOption === 'door' && tw`border-[#900]`, { marginRight: 10 }]}
                                onPress={() => setSelectedOption('door')}>
                                <Sticker name="door-closed" size={24} color="#900" />
                                <Text style={[styles.deliveryInstructionTitle, selectedOption === 'door' && tw`text-[#900]`, tw`text-sm mt-1`]}>Leave</Text>
                                <Text style={[styles.deliveryInstructionTitle, selectedOption === 'door' && tw`text-[#900]`, tw`text-sm`]}>at Door</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.deliveryInstructionCard, tw`shadow-lg`, selectedOption === 'contactless' && tw`border-[#900]`, { marginRight: 10 }]}
                                onPress={() => setSelectedOption('contactless')}>
                                <Phone name="phone-cancel" size={24} color="#900" />
                                <Text style={[styles.deliveryInstructionTitle, selectedOption === 'contactless' && tw`text-[#900]`, tw`text-sm mt-1`]}>Avoid</Text>
                                <Text style={[styles.deliveryInstructionTitle, selectedOption === 'contactless' && tw`text-[#900]`, tw`text-sm`]}>Calling</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.deliveryInstructionCard, tw`shadow-lg`, selectedOption === 'special' && tw`border-[#900]`, { marginRight: 10 }]}
                                onPress={() => setSelectedOption('special')}>
                                <Notes name="clipboard-notes" size={24} color="#900" />
                                <Text style={[styles.deliveryInstructionTitle, selectedOption === 'special' && tw`text-[#900]`, tw`text-sm mt-1`]}>Special</Text>
                                <Text style={[styles.deliveryInstructionTitle, selectedOption === 'special' && tw`text-[#900]`, tw`text-sm`]}>Instruction</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>

                    <Text style={tw`text-lg font-bold mt-5 mx-3 mb-2`}>Tip Your Partner</Text>
                    <View style={[tw`mx-2 bg-white p-2 mb-8 pb-4 px-3 shadow-lg`, { borderRadius: 20 }]}>

                        <Text style={tw`text-sm mt-2`}>Thank your delivery partner by leaving them a tip.</Text>
                        <Text style={tw`text-sm`}>100% of the tip will go to your delivery partner</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`mt-3`}>
                            <TouchableOpacity
                                style={[styles.tipCard, selectedTip === 10 && tw`border-[#900]`, { marginRight: 10 }]}
                                onPress={() => handleTipPress(10)}>
                                <Text style={[styles.tipAmount, selectedTip === 10 && tw`text-[#900]`]}>₹10</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.tipCard, selectedTip === 20 && tw`border-[#900]`, { marginRight: 10 }]}
                                onPress={() => handleTipPress(20)}>
                                <Text style={[styles.tipAmount, selectedTip === 20 && tw`text-[#900]`]}>₹20</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.tipCard, selectedTip === 30 && tw`border-[#900]`, { marginRight: 10 }]}
                                onPress={() => handleTipPress(30)}>
                                <Text style={[styles.tipAmount, selectedTip === 30 && tw`text-[#900]`]}>₹30</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.tipCard, selectedTip === 40 && tw`border-[#900]`, { marginRight: 10 }]}
                                onPress={() => handleTipPress(40)}>
                                <Text style={[styles.tipAmount, selectedTip === 40 && tw`text-[#900]`]}>₹40</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>


                    <Text style={tw`text-lg font-bold mb-3 mx-4`}>Bill Details</Text>
                    <View style={tw`bg-white rounded-lg shadow-lg p-5 mb-8 mx-2`}>

                        <View style={tw`flex-row justify-between mb-2`}>
                            <Text style={tw`text`}>Subtotal</Text>
                            <Text style={tw`font-bold`}>₹{basketTotal}</Text>
                        </View>

                        <View style={tw`flex-row justify-between mb-2`}>
                            <Text style={tw`text`}>Delivery Fee</Text>
                            <Text style={tw`font-bold`}>₹{fee}</Text>
                        </View>

                        <View style={tw`flex-row justify-between mb-2`}>
                            <Text style={tw`text`}>Tip</Text>
                            <Text style={tw`font-bold`}>₹{selectedTip}</Text>
                        </View>

                        <View style={tw`flex-row justify-between mb-2`}>
                            <Text style={tw`text`}>Platform Fee</Text>
                            <Text style={tw`font-bold`}>₹5</Text>
                        </View>

                        

                        <View style={tw`flex-row justify-between mb-2`}>
                            <Text style={tw`text`}>GST</Text>
                            <Text style={tw`font-bold`}>₹15</Text>
                        </View>

                        <View style={tw`flex-row justify-between mb-2`}>
                            <Text style={tw``}>Restaurant Charges</Text>
                            <Text style={tw`font-bold`}>₹20</Text>
                        </View>

                        {premium&&(
                            <View style={tw`flex-row justify-between mb-2`}>
                            <Text style={tw``}>Premium Discount</Text>
                            <Text style={tw`font-bold`}>-₹5</Text>
                        </View>
                        )}

                        <View style={tw`border-t border-darkgray mt-4 pt-2 flex-row justify-between`}>
                            <Text style={tw`font-bold text-lg`}>Total to Pay</Text>
                            <Text style={tw`font-bold text-lg`}>₹{basketTotal + fee + selectedTip + 5 + 15 + 20 - (premium ? 5 : 0)}</Text>
                        </View>

                        <TouchableOpacity style={tw`rounded-lg p-4 bg-[#900] mt-4`} onPress={() => handlePayment(paymentTotal)}>
                            <Text style={tw`text-center text-white text-lg font-bold`}>Place Order</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={tw`text-lg font-bold mb-3 mx-3`}>Review Your Order</Text>
                    <View style={tw`p-5 bg-white mb-4 mx-3 rounded-lg shadow-lg`}>

                        <View style={tw`mb-4`}>
                            <Text style={tw`text-[#900] font-bold`}>Note:</Text>
                            <Text style={tw`mt-2`}>
                                Please review your order carefully to avoid cancellations. Make sure all items and quantities are correct before placing your order.
                            </Text>

                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        marginTop: 10,
        marginLeft: 15,
        marginRight: 15,
        borderWidth: 0,
        borderRadius: 20,
    },
    buttonContainer: {
        borderWidth: 0.75,
        borderColor: '#000',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    deliveryInstructionCard: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        width: 100,
        height: 100
    },
    deliveryInstructionTitle: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    tipCard: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 12,
        alignItems: 'center',
    },
    tipAmount: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default BasketScreen
