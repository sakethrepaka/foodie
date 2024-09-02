import { View, Text, TouchableOpacity } from 'react-native'
import React, { forwardRef, useMemo, useCallback,useState,useEffect } from 'react'
import { BottomSheetBackdrop, BottomSheetModal, useBottomSheet, useBottomSheetModal } from '@gorhom/bottom-sheet'
import tw from '../tailwind';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { setLocationName } from '../feautures/LocationNameslice';


const BottomSheet = forwardRef((props, ref) => {
    const snapPoints = useMemo(() => ['25%'], [])
    const renderback = useCallback((props) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />, [])
    const { dismiss } = useBottomSheetModal()
    const navigation = useNavigation()
    const updatedlocation = useSelector((state) => state.LocationName);
    console.log(updatedlocation,'name')

    const [loc, setLoc] = useState("")


    useEffect(() => {
        setLoc(updatedlocation.locname)
      }, [updatedlocation]);
    
     
    return (
        <BottomSheetModal handleIndicatorStyle={{ display: 'none' }} backgroundStyle={tw.style('bg-gray-50')} ref={ref} snapPoints={snapPoints} backdropComponent={renderback}>
            <View style={{ flex: 1 }}>
                {/* Your Location Section */}
                <TouchableOpacity style={tw.style('flex-row', 'items-center', 'p-4', 'mx-1')} onPress={() => {/* Handle onPress */ }}>
                    <Text style={tw.style('text-gray-700', 'font-bold')}>Your Location</Text>
                </TouchableOpacity>

                {/* Current Location Indication Placeholder */}
                <TouchableOpacity onPress={()=>navigation.navigate('Location')}>
                    <View style={tw.style('flex-row', 'items-center', 'p-4', 'mx-5', 'border', 'border-gray-400')}>
                        <Icon name="map-marker" size={20} color="#900" style={{ marginRight: 10 }} />
                        <Text style={tw.style('text-gray-700', 'font-bold')}>{loc}</Text>
                    </View>
                </TouchableOpacity>

                {/* Confirm Button */}
                <TouchableOpacity style={tw.style('bg-[#900]', 'p-4', 'rounded-md', 'items-center', 'mx-5', 'mt-auto')} onPress={() => dismiss()}>
                    <Text style={tw.style('text-white', 'font-bold')}>Confirm</Text>
                </TouchableOpacity>
            </View>
        </BottomSheetModal>
    )
})

export default BottomSheet;
