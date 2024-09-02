import { View, Text, SafeAreaView, Image, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import tw from './tailwind';
import Icon from 'react-native-vector-icons/FontAwesome';
import Categories from './components/Categories';
import FeauturedRow from './components/FeauturedRow';
import client from './sanity'
import {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import BottomSheet from './components/BottomSheet';
import { useSelector } from 'react-redux';
import { setLocationName } from './feautures/LocationNameslice';
import { setUser } from './feautures/UserSlice';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Badge } from 'react-native-paper';
import { selectPremium } from './feautures/premiumSlice'
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import PremiumModal from './components/PremiumModal';




const Homescreen = ({route}) => {

    const navigation = useNavigation()
    const [feauturedCategories, setFeauturedCategories] = useState([])
    const [loc, setLoc] = useState("")
    const [data, setData] = useState({})
    const bottomSheetRef = useRef();
    const premiumRef = useRef();
    const premium = useSelector(selectPremium)
    const storagekey = route.params?.Useremail || 'default@example.com';

    console.log(storagekey,"hello")

    const dispatch = useDispatch()


    useEffect(() => {
        const getUserDetails = async (email) => {
            try {
                const keys = await AsyncStorage.getAllKeys();
                console.log(keys);
                
                const userKey = keys.find(key => key === email);
                console.log(userKey);
                
                if (userKey) {
                    const userData = await AsyncStorage.getItem(userKey);
                    return JSON.parse(userData);
                } else {
                    return null;
                }
            } catch (error) {
                console.error("Error retrieving user details:", error);
                return null;
            }
        };
    
        const email = storagekey; 
        getUserDetails(email)
            .then(user => {
                if (user) {
                    console.log("User details:", user);
                    setData(user)
                    dispatch(setUser(user))
                } else {
                    console.log("User not found");
                }
            })
            .catch(error => {
                console.error("Error getting user details:", error);
            });
    }, []);
    
 
    

    useLayoutEffect(() => {
        navigation.setOptions(
            {
                headerShown: false
            }
        )
    }, [])
    //saketh.repaka03@gmail.com
    //Avengers3@

    useEffect(() => {
        client.fetch(`*[_type == "feautured"]{
            ...,
            restaurants[]->{
                ...,
                dishes[]->
            }
        }`).then(data => {
            setFeauturedCategories(data)
        })
    }, [])

    const openModal = () => {
        bottomSheetRef.current?.present()
    }

    const openPremiumModal = () => {
        premiumRef.current?.present()
    }

    const updatedlocation = useSelector((state) => state.LocationName);
    useEffect(() => {
        setLoc(updatedlocation.locname)
    }, [updatedlocation]);

    useEffect(() => {
        const timer = setTimeout(() => {
            openPremiumModal();
        }, 8000);

        return () => clearTimeout(timer);
    }, []);



    return (
        <BottomSheetModalProvider>
            <BottomSheet ref={bottomSheetRef} />
            <PremiumModal ref={premiumRef}/>
            <SafeAreaView style={tw.style('pt-15', 'bg-white')}>
                <View style={tw.style('flex-row', 'pb-3', 'items-center', 'mx-1.5', 'px-3')}>
                    <Image source={{ uri: 'https://img.freepik.com/premium-vector/delivery-boy-scooter-doing-delivery-service-illustration_602666-23.jpg' }}
                        style={tw.style('h-12', 'w-12', 'rounded-full', 'p-4', 'bg-gray-300')}>

                    </Image>
                    <View style={tw.style('flex-1')}>
                        <Text style={tw.style('font-bold', 'text-gray-400', 'text-xs')}>Deliver Now!</Text>
                        <Text style={tw.style('font-bold', 'text-xl')}>{loc.slice(0, 10).replace(',', '')}
                            <Icon name="chevron-down" size={17} color="#900" onPress={openModal} />
                        </Text>
                    </View>
                    <View style={tw`flex-col items-center mr-5 p-1`}>
                        <TouchableOpacity onPress={() => navigation.navigate('Premium')}>
                            <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Ww6NTqCKx0dn8pklIN5xTBS-Pp0jdneRXg&s' }} style={{ height: 30, width: 30 }}></Image>
                        </TouchableOpacity>
                        <Text style={tw`font-bold text-xs`}>Premium</Text>
                    </View>
                    <TouchableOpacity onPress={()=>navigation.navigate('Account')}>
                        <Icon name="user" size={30} color="#900" />
                        {premium&&(<Badge style={{position:'absolute',top:-10,left:8,backgroundColor:'transparent'}}>👑</Badge>)}
                    </TouchableOpacity>
                </View>
                <View style={tw.style('flex-row', 'items-center', 'pb-2', 'mx-1')}>
                    <View style={tw.style('flex-row', 'bg-gray-200', 'p-3', 'mr-1', 'flex-1', 'ml-3')}>
                        <Icon name="search" size={20} color="gray" style={{ marginRight: 5 }} />
                        <TextInput placeholder='Search Restaurants and Items' keyboardType='default'>
                        </TextInput>
                    </View>
                    <Icon name="filter" size={20} color="#900" />
                </View>
                <ScrollView style={tw.style('bg-gray-100')} contentContainerStyle={{ paddingBottom: 120 }}>
                    <Categories></Categories>

                    {feauturedCategories?.map(category => (
                        <FeauturedRow
                            key={category._id}
                            id={category._id}
                            title={category.name}
                            description={category.short_description}
                        />

                    ))}
                </ScrollView>

            </SafeAreaView>
        </BottomSheetModalProvider>
    )
}

export default Homescreen