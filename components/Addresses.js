import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import tw from '../tailwind'; // Assuming you have Tailwind styles configured
import AddAddressModal from './AddAddressModal';
import Icon from 'react-native-vector-icons/FontAwesome';
import Office from 'react-native-vector-icons/MaterialCommunityIcons';
import Friend from 'react-native-vector-icons/FontAwesome5';

const Addresses = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [savedAddresses, setSavedAddresses] = useState([]);

    const handleAddAddress = (newAddress) => {
        setSavedAddresses([...savedAddresses, newAddress]);
    };

    return (
        <View style={tw`flex-1 bg-white`}>
            <ScrollView contentContainerStyle={tw`flex-grow bg-white`}>
                <Text style={tw`text-base mb-4 bg-gray-200 p-4 text-gray-700 font-bold`}>Saved Addresses</Text>
                {/* Displaying Saved Addresses */}
                {savedAddresses.map((address, index) => (
                    <TouchableOpacity key={index} style={tw`border-b border-gray-200 p-4 flex-row items-center`} onPress={() => console.log("Address clicked")}>
                        {/* Address Type Icon */}
                        {address.addressType === 'Home' && <Icon name='home' size={20} style={tw`mr-2`} />}
                        {address.addressType === 'Work' && <Office name='office-building' size={20} style={tw`mr-2`} />}
                        {address.addressType === 'Friends' && <Friend name='user-friends' size={20} style={tw`mr-2`} />}
                        {address.addressType === 'Other' && <Icon name='map-pin' size={20} style={tw`mr-2`} />}
                        {/* Address Type Text */}

                        {/* Address Details */}
                        <View style={tw`ml-10`}>
                            <Text style={tw`text-lg font-semibold`}>{address.addressType}</Text>
                            <Text style={tw`text-sm`}>
                                {`${address.houseNo}, ${address.apartment}`}
                            </Text>
                            {address.additionalInstructions && <Text style={tw`text-sm mt-1`}>{address.additionalInstructions}</Text>}
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            {/* Add New Address Button */}
            <TouchableOpacity
                style={tw`bg-white border border-[#54c930] py-4 items-center justify-center mb-2 mx-4`}
                onPress={() => {
                    setModalVisible(true);
                }}
            >
                <Text style={tw`text-[#54c930] font-bold text-base`}>ADD NEW ADDRESS</Text>
            </TouchableOpacity>
            {/* Add Address Modal */}
            <AddAddressModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onAddAddress={handleAddAddress}
            />
        </View>
    );
}

export default Addresses;
