import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Modal, TextInput } from 'react-native';
import tw from '../tailwind'; // Assuming you have Tailwind styles configured
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';
import Sticker from 'react-native-vector-icons/MaterialIcons';
import Setting from 'react-native-vector-icons/SimpleLineIcons';
import { selectUser } from '../feautures/UserSlice';
import { useSelector ,useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addToBasket } from '../feautures/basketSlice';

const Account = () => {
    const [dropdowns, setDropdowns] = useState({
        myAccount: false,
        addresses: false,
        paymentsRefunds: false,
        referEarn: false,
        premium: false,
    });
    const data = useSelector(selectUser)
    const [modalVisible, setModalVisible] = useState(false);
    const [details, setDetails] = useState({
        name: data.name || data.username,
        number: data.phoneNumber || data.number,
        email: data.email
    });
    const [editedDetails, setEditedDetails] = useState({});
    const [editedField, setEditedField] = useState(null);
    const [pastOrders, setPastOrders] = useState([]);
    const navigation = useNavigation();
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchPastOrders = async () => {
            try {

                const userEmail = details.email;
                const userDataJSON = await AsyncStorage.getItem(userEmail);
                if (userDataJSON !== null) {
                    const userData = JSON.parse(userDataJSON);
                    if (userData.orders) {
                        setPastOrders(userData.orders);
                    }
                }
            } catch (error) {
                console.error('Error fetching past orders:', error);
            }
        };

        fetchPastOrders();
    }, []);

    const handleReorder = (order) => {

        const itemsObject = order.items;
        
        Object.keys(itemsObject).forEach((itemId) => {
            const item = {
                ...itemsObject[itemId][0],
                image: {
                    _type: 'image',
                    asset: itemsObject[itemId][0].image
                }
            };
            dispatch(addToBasket(item)); 
        });
        

        navigation.navigate('Basket');
    }
    

    const toggleDropdown = (dropdown) => {
        setDropdowns({ ...dropdowns, [dropdown]: !dropdowns[dropdown] });
    };

    const handleEditProfile = () => {
        setEditedDetails(details);
        setModalVisible(true);
    };

    const handleFieldEdit = (field) => {
        setEditedDetails({ ...editedDetails, [field]: details[field] });
        setEditedField(field);
    };

    const handleUpdate = async () => {
        setDetails(editedDetails);
        const newdetails = {
            email: editedDetails.email,
            phoneNumber: editedDetails.phoneNumber,
            username: editedDetails.name
        }
        try {
            await AsyncStorage.setItem(editedDetails.email, JSON.stringify(newdetails));
            console.log("Data edited", newdetails);
        }
        catch (error) {
            console.log(error)
            alert("sign in failed" + error.message)
        }

        setEditedField(null);
    };

    const handleCancelEdit = () => {
        setEditedField(null);
    }
    return (
        <SafeAreaView style={tw`flex-1 bg-white`}>
            <ScrollView >
                <View style={tw`p-4`}>
                    <View style={tw`flex-col justify-between`}>
                        <Text style={tw`text-lg`}>{details.name}</Text>
                        <View style={tw`flex-row`}>
                            <Text style={tw`text-xs`}>{details.email}</Text>
                            <Text style={tw`text-xs ml-4`}>{details.number}</Text>
                        </View>
                        <TouchableOpacity onPress={handleEditProfile}>
                            <Text style={tw`text-sm mt-2 text-[#900] font-bold`}>Edit Profile</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ borderBottomWidth: 5, borderBottomColor: '#900', marginTop: 16, borderRadius: 10 }} />

                    <View style={tw`mt-4`}>
                        <Navigator title="Premium" isOpen={dropdowns.myAccount} onPress={() => navigation.navigate('Premium')}>
                        </Navigator>

                        <Dropdown title="My Account" isOpen={dropdowns.addresses} onPress={() => toggleDropdown('addresses')}>

                            <View style={tw`flex-col bg-white`}>
                                <TouchableOpacity>
                                    <View style={tw`flex-row items-center justify-between mb-5`}>
                                        <View style={tw`flex-row items-center`}>
                                            <Sticker name='favorite-outline' size={20}></Sticker>
                                            <Text style={tw`ml-2`}>Favourites</Text>
                                        </View>
                                        <View>
                                            <Icon name='chevron-right' size={20}></Icon>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <View style={tw`flex-row items-center justify-between`}>
                                        <View style={tw`flex-row items-center`}>
                                            <Setting name='settings' size={20}></Setting>
                                            <Text style={tw`ml-2`}>Settings</Text>
                                        </View>
                                        <View>
                                            <Icon name='chevron-right' size={20}></Icon>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </Dropdown>

                        <Navigator title="Addresses" subtitle='Share, Edit & Add New Addresses' isOpen={dropdowns.paymentsRefunds} onPress={() => navigation.navigate('Addresses')}>

                        </Navigator>

                        <Dropdown title="Payments & Refunds" isOpen={dropdowns.referEarn} onPress={() => toggleDropdown('referEarn')}>
                            {/* Content for Refer & Earn dropdown */}
                            <Text>Refer & Earn content here</Text>
                        </Dropdown>

                        <Dropdown title="Premium" isOpen={dropdowns.premium} onPress={() => toggleDropdown('premium')}>
                            {/* Content for Premium dropdown */}
                            <Text>Premium content here</Text>
                        </Dropdown>
                    </View>
                    <View style={tw`bg-gray-200 p-4`}>
                        <Text style={tw`text-gray-800 font-bold text-sm`}>Past orders</Text>
                    </View>
                    {pastOrders.map((order, index) => (
                        <View key={index} style={tw`my-2`}>
                            {/* Restaurant Info */}
                            <View style={tw`bg-white border border-gray-300`}>
                                <View style={tw`p-4 bg-gray-100 flex-row items-center justify-between`}>
                                    <View>
                                        <Text style={tw`text-lg font-bold`}>{order.restaurant.title}</Text>
                                        <Text style={tw`text-base`}>{order.restaurant.address}</Text>
                                        <Text style={tw`mt-2 text-sm font-bold`}>₹{order.paymentTotal}</Text>
                                    </View>
                                    <View style={tw`flex-row items-center`}>
                                        <Sticker name="check-circle" size={24} color="green" />
                                        <Text style={tw`ml-2 text-green-600`}>Delivered</Text>
                                    </View>
                                </View>

                                {/* Order Details */}
                                <View style={tw`p-4`}>
                                    {Object.values(order.items).map((itemGroup, i) => (
                                        <View key={i} style={tw`pt-2`}>
                                            {itemGroup.map((item, j) => (
                                                <View key={j} style={tw`flex-col justify-between mt-1`}>
                                                    <View>
                                                        <Text style={tw`text-gray-600 mt-3 mb-3`}>
                                                            {item.name}
                                                        </Text>
                                                    </View>
                                                    <View style={tw`flex-row justify-between mt-3 mb-3`}>
                                                        <TouchableOpacity style={tw`px-9 py-2.5 bg-white border border-gray-700 mr-2`} onPress={()=>handleReorder(order)}>
                                                            <Text style={tw`text-gray-900 text-sm font-bold`}>REORDER</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={tw`px-6 py-2.5 bg-white border border-[#900] `}>
                                                            <Text style={tw`text-[#900] text-sm font-bold`}>RATE ORDER</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            ))}
                                        </View>
                                    ))}
                                    <Text style={tw`text-gray-600 mt-2 text-xs`}>
                                        {new Date(order.date).toLocaleString('default', { month: 'short', day: '2-digit', hour: 'numeric', minute: 'numeric' })}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-40`}>
                    <View style={tw`bg-white p-8 rounded-lg h-full w-full mt-100`}>
                        <Text style={tw`text-xl font-bold mb-4`}>Edit Profile</Text>
                        <View style={tw`mb-4`}>
                            {/* Input fields */}
                            {['name', 'email', 'number'].map((field) => (
                                <View key={field} style={tw`mb-4`}>
                                    <Text style={tw`text-base mb-1 font-semibold`}>{field === 'number' ? 'Phone Number' : field.charAt(0).toUpperCase() + field.slice(1)}</Text>
                                    <View style={tw`flex-row justify-between items-center`}>
                                        <TextInput
                                            style={tw`flex-grow`}
                                            value={editedDetails[field]}
                                            onChangeText={(text) => setEditedDetails({ ...editedDetails, [field]: text })}
                                            editable={editedField === field}
                                        />
                                        {(editedField !== field) && (
                                            <TouchableOpacity onPress={() => handleFieldEdit(field)}>
                                                <Text style={tw`text-[#900] font-bold`}>EDIT</Text>
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                    {(editedField === field) && (
                                        <View style={tw`flex-row justify-between mt-2`}>
                                            <TouchableOpacity onPress={handleUpdate} style={tw`border border-green-500 py-2 px-4 rounded-md mr-2`}>
                                                <Text style={tw`text-green-500 font-bold text-center`}>UPDATE</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={handleCancelEdit} style={tw`border border-red-500 py-2 px-4 rounded-md`}>
                                                <Text style={tw`text-red-500 font-bold text-center`}>CANCEL</Text>
                                            </TouchableOpacity>
                                        </View>

                                    )}
                                </View>

                            ))}
                        </View>
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={tw`border border-[#900] py-2 px-4 rounded-md`}>
                            <Text style={tw`text-[#900] font-bold text-center`}>GO BACK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </SafeAreaView>
    );
}

const Dropdown = ({ title, subtitle, isOpen, onPress, children }) => {
    return (
        <View style={tw`mb-4 bg-white`}>
            <TouchableOpacity onPress={onPress} style={tw`flex-row justify-between items-center px-2 py-3 border-b border-gray-300 bg-white`}>
                <View>
                    <Text style={tw`text-lg font-semibold`}>{title}</Text>
                    {subtitle && (<Text style={tw`text-xs mt-1`}>{subtitle}</Text>)}
                </View>
                <Icon name={isOpen ? 'chevron-down' : 'chevron-up'} size={20}></Icon>
            </TouchableOpacity>
            {isOpen && (
                <View style={tw`bg-white p-4`}>
                    {children}
                </View>
            )}
        </View>
    );
};

const Navigator = ({ title, subtitle, isOpen, onPress, children }) => {
    return (
        <View style={tw`mb-4`}>
            <TouchableOpacity onPress={onPress} style={tw`flex-row justify-between items-center px-2 py-3 border-b border-gray-300`}>
                <View>
                    <Text style={tw`text-lg font-semibold`}>{title}</Text>
                    {subtitle && (<Text style={tw`text-xs mt-1`}>{subtitle}</Text>)}
                </View>
                <Icon name='chevron-right' size={20}></Icon>
            </TouchableOpacity>
        </View>
    );
};

export default Account;
