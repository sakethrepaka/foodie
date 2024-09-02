import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setLocation } from '../feautures/Locationslice';
import { useSelector } from 'react-redux';
import { setLocationName } from '../feautures/LocationNameslice';


const GoogleSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const dispatch = useDispatch();

  const fetchSearchResults = async (searchQuery) => {
    try {
      const response = await axios.get('https://map-places.p.rapidapi.com/autocomplete/json', {
        params: {
          input: searchQuery,
          radius: '50000',
          language: 'en',
          location: 'India',
          locationbias: 'India'
        },
        headers: {
          'X-RapidAPI-Key': 'bdff66d5bfmsha6b120b80df685dp19edd1jsnd5e8f666557b',
          'X-RapidAPI-Host': 'map-places.p.rapidapi.com'
        }
      });
      setSearchResults(response.data.predictions);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (query) => {
    setSearchTerm(query);
    fetchSearchResults(query);
  };

  const handlePress = async (placeId) => {
    try {
      const response = await axios.get('https://trueway-geocoding.p.rapidapi.com/Geocode', {
        params: {
          address: placeId,
          language: 'en'
        },
        headers: {
          'X-RapidAPI-Key': 'bdff66d5bfmsha6b120b80df685dp19edd1jsnd5e8f666557b',
          'X-RapidAPI-Host': 'trueway-geocoding.p.rapidapi.com'
        }
      });
      console.log(placeId,'place')
      dispatch(setLocationName(placeId))
      const location = response.data.results[0].location;
      console.log(location);
      dispatch(setLocation(location));
    } catch (error) {
      console.error(error);
    } finally {
      setSearchTerm(placeId)
      setSearchResults([]);
    }
  };

  const renderSearchItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item.description)}>
      <Text style={styles.searchItem}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search"
        value={searchTerm}
        onChangeText={handleSearch}
      />
      <FlatList
        style={styles.searchList}
        data={searchResults}
        renderItem={renderSearchItem}
        keyExtractor={(item) => item.place_id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    zIndex: 1,
    elevation: 3, // For Android shadow
  },
  input: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  searchList: {
    marginTop: 10,
  },
  searchItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});

export default GoogleSearch;
