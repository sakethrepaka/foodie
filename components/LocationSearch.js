import { View, Text, Button, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import tw from '../tailwind';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps'
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import GoogleSearch from './GoogleSearch';
import { useSelector } from 'react-redux';

const LocationSearch = () => {
  const navigation = useNavigation()
  const updatedlocation = useSelector((state) => state.Location);
  // console.log(updatedlocation, 'updated')
  const [location, setLocation] = useState({
    latitude: updatedlocation.latitude,
    longitude: updatedlocation.longitude,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02
  });

  useEffect(() => {
    setLocation((prev) => {
      return {
        ...prev,
        latitude: updatedlocation.lat,
        longitude: updatedlocation.lng
      };
    });
  }, [updatedlocation]);


  return (
    <View style={tw.style('flex-1')}>
      <GoogleSearch></GoogleSearch>

      <MapView
        region={location}
        style={tw.style('flex-1')}
      >
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude
          }}
          title="Your Location"
          identifier='origin'
          pinColor="#900"
        />

      </MapView>
   
      <View style={{ position: 'absolute', bottom: 20, width: '100%' }}>
        <TouchableOpacity style={{ backgroundColor: '#900', padding: 16, margin: 16, alignItems: 'center', borderRadius: 8}} onPress={() => navigation.goBack()} >
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
            Confirm
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default LocationSearch