import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import tw from '../tailwind';
import { useDispatch } from 'react-redux';
import { setTime } from '../feautures/TimeSlice';

const DeliveryOption = ({ title, time, description, selectedOption, onSelectOption,setFee,fee }) => {
    const dispatch = useDispatch()

    const handleSelectOption = () => {
        onSelectOption(title);
        dispatch(setTime(time))
        setFee(fee)
    };

    return (
        <TouchableOpacity
            style={[
                styles.deliveryOptionCard,
                selectedOption === title && styles.selectedCard,
            ]}
            onPress={handleSelectOption}
        >
            <View style={tw`flex-row items-center justify-between mb-3 shadow-lg`}>
                <Text style={tw`text-lg font-bold `}>{time}</Text>
                <View style={[styles.tickCircle, selectedOption === title && styles.selectedTick]}>
                    {selectedOption === title && <Text style={styles.tick}>✓</Text>}
                </View>
            </View>
            <Text style={tw`text-sm text-gray-600`}>{description}</Text>
        </TouchableOpacity>
    );
};

const DeliveryTypeSelection = ({setFee}) => {
    const [selectedOption, setSelectedOption] = React.useState("EcoSaver");

    const handleSelectOption = (option) => {
        setSelectedOption(selectedOption === option ? null : option);
    };

    return (
        <View style={[tw`px-4 mt-8 mb-8 shadow-lg`]}>
            <Text style={tw`text-lg font-bold`}>Delivery Type</Text>
            <View style={tw`flex-row mt-3 justify-between`}>
                <DeliveryOption
                    title="EcoSaver"
                    time="60-90 min"
                    description="Eco-friendly delivery option"
                    selectedOption={selectedOption}
                    onSelectOption={handleSelectOption}
                    setFee={setFee}
                    fee={9}
                />
                <View style={{ width: 10 }} />
                <DeliveryOption
                    title="Standard"
                    time="45-60 min"
                    description="Regular delivery option"
                    selectedOption={selectedOption}
                    onSelectOption={handleSelectOption}
                    setFee={setFee}
                    fee={18}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    deliveryOptionCard: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 20,
    },
    selectedCard: {
        borderColor: '#900',
    },
    tickCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedTick: {
        backgroundColor: '#008000',
        borderColor: '#008000',
    },
    tick: {
        fontSize: 16,
        color: '#fff',
    },
});

export default DeliveryTypeSelection;
