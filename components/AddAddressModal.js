import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity } from 'react-native';
import tw from '../tailwind'; // Assuming you have Tailwind styles configured
import  Icon  from 'react-native-vector-icons/FontAwesome';
import  Office  from 'react-native-vector-icons/MaterialCommunityIcons';
import  Friend  from 'react-native-vector-icons/FontAwesome5';

const AddAddressModal = ({ visible, onClose, onAddAddress }) => {
    const [houseNo, setHouseNo] = useState('');
    const [apartment, setApartment] = useState('');
    const [additionalInstructions, setAdditionalInstructions] = useState('');
    const [addressType, setAddressType] = useState('home'); // Default selected option

    const handleAddAddress = () => {
        const newAddress = {
            houseNo,
            apartment,
            additionalInstructions,
            addressType
        };
        onAddAddress(newAddress);
        setHouseNo('');
        setApartment('');
        setAdditionalInstructions('');
        setAddressType(''); // Reset to default selected option
        onClose();
    };

    const handleAddressTypeSelection = (type) => {
        setAddressType(addressType === type ? '' : type); // Toggle selection
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-40`}>
                <View style={tw`bg-white p-8 rounded-lg w-full h-full mt-30`}>
                    <Text style={tw`text-xl font-bold mb-4`}>Add New Address</Text>
                    {/* Explanation of Detailed Instructions */}
                    <View style={tw`mb-4`}>
                        <View style={tw`bg-gray-100 p-4 rounded-md`}>
                            <Text style={tw`text-sm text-center text-gray-600`}>
                                Providing detailed instructions ensures smooth delivery.
                                Include landmarks, floor numbers, and any specific directions.
                            </Text>
                        </View>
                    </View>
                    {/* Address Inputs */}
                    <View style={tw`mb-4 gap-3`}>
                        <TextInput
                            placeholder="HOUSE/FLAT/BLOCK NO."
                            value={houseNo}
                            onChangeText={setHouseNo}
                        />
                        <View style={{ borderBottomWidth: 1, borderBottomColor: 'black', marginTop: 2, borderRadius: 10 }} />
                        <TextInput
                            placeholder="APARTMENT/ROAD"
                            value={apartment}
                            onChangeText={setApartment}
                        />
                        <View style={{ borderBottomWidth: 1, borderBottomColor: 'black', marginTop: 2, borderRadius: 10 }} />
                    </View>
                    <TextInput
                        placeholder="Additional Instructions (Optional)"
                        style={tw`border border-gray-300 p-2 h-30`}
                        value={additionalInstructions}
                        onChangeText={setAdditionalInstructions}
                        multiline={true}
                    />
                    <Text style={tw`text-sm mb-4 mt-4`}>Save As</Text>
                    {/* Address Type Selection */}
                    <View style={tw`flex-row flex-wrap mb-6 gap-5`}>
                        <TouchableOpacity
                            style={[
                                tw`w-1/3.5 bg-gray-200 py-2 px-4 rounded-md flex-row`,
                                addressType === 'Home' && tw`bg-green-500`,
                                { borderRadius: 20 } // Fully rounded left side
                            ]}
                            onPress={() => handleAddressTypeSelection('Home')}
                        >
                            <Icon name='home' size={20}></Icon>
                            <Text style={tw`text-center text-sm font-bold ml-2`}>Home</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                tw`w-1/3.5 bg-gray-200 py-2 px-4 rounded-md flex-row`,
                                addressType === 'Work' && tw`bg-green-500`,
                                { borderRadius: 20 }
                            ]}
                            onPress={() => handleAddressTypeSelection('Work')}
                        >
                            <Office name='office-building' size={20}></Office>
                            <Text style={tw`text-center text-sm font-bold ml-2`}>Work</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                tw`w-1/3.3 bg-gray-200 py-2 px-4 rounded-md flex-row`,
                                addressType === 'Friends' && tw`bg-green-500`,
                                { borderRadius: 20 }
                            ]}
                            onPress={() => handleAddressTypeSelection('Friends')}
                        >
                            <Friend name='user-friends' size={20}></Friend>
                            <Text style={tw`text-center text-sm font-bold ml-2`}>Friend</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                tw`w-1/3.5 bg-gray-200 py-2 px-4 rounded-md flex-row`,
                                addressType === 'Other' && tw`bg-green-500`,
                                { borderRadius: 20 } // Fully rounded right side
                            ]}
                            onPress={() => handleAddressTypeSelection('Other')}
                        >
                            <Icon name='map-pin' size={20}></Icon>
                            <Text style={tw`text-center text-sm font-bold ml-2`}>Other</Text>
                        </TouchableOpacity>
                    </View>
                    {/* Buttons */}
                    <TouchableOpacity
                        style={tw`bg-green-500 py-2 px-4 rounded-md`}
                        onPress={handleAddAddress}
                    >
                        <Text style={tw`text-white font-bold text-center`}>Add Address</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={tw`mt-4`}
                        onPress={onClose}
                    >
                        <Text style={tw`text-red-500 text-center font-bold`}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

export default AddAddressModal;
