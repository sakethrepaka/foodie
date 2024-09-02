// PremiumModal.js
import React, { forwardRef, useMemo, useCallback } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import tw from '../tailwind';
import { BottomSheetBackdrop, BottomSheetModal,useBottomSheetModal } from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';



const PremiumModal = forwardRef((props, ref) => {
    const snapPoints = useMemo(() => ['50%'], []);
    const renderback = useCallback((props) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />, []);
    const navigation = useNavigation();
    const animationPath = require('../assets/premiumanimation.json')
    const { dismiss } = useBottomSheetModal()

    return (
        <BottomSheetModal
            handleIndicatorStyle={{ display: 'none' }}
            backgroundStyle={tw.style('bg-gray-50')}
            ref={ref}
            snapPoints={snapPoints}
            backdropComponent={renderback}
        >
            <View style={tw`flex-1 pb-2`}>

                <TouchableOpacity style={styles.closeButton} onPress={() => dismiss()}>
                    <Icon name="times" size={24} color="#000" />
                </TouchableOpacity>

                <LottieView
                    autoPlay
                    style={tw`items-center p-4 h-30`}
                    source={animationPath}
                />
                

                {/* Description */}
                <View style={tw`p-4`}>
                    <Text style={tw`text-lg font-bold`}>Upgrade to Premium</Text>
                    <Text style={tw`text-gray-700 mt-2`}>Unlock exclusive features and benefits with our Premium membership.</Text>
                </View>

                <View style={tw`flex-row items-center justify-start mb-6 px-4`}>
                    <Icon name="check" size={18} color="#4CAF50" style={tw`mr-2`} />
                    <Text style={tw`text-gray-700`}>Avail Free deliveries</Text>
                </View>
                
                <View style={tw`flex-row items-center justify-start mb-6 px-4`}>
                    <Icon name="check" size={18} color="#4CAF50" style={tw`mr-2`} />
                    <Text style={tw`text-gray-700`}>Exclusive discounts and offers</Text>
                </View>

                {/* Upgrade Button */}
                <TouchableOpacity style={tw`bg-[#900] p-4 rounded-md items-center mx-5 mt-auto`} onPress={()=>navigation.navigate('Premium')}>
                    <Text style={tw`text-white font-bold`}>Upgrade Now</Text>
                </TouchableOpacity>
            </View>
        </BottomSheetModal>
    );
});

export default PremiumModal;


const styles = StyleSheet.create({
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
        padding: 10,
    },
});