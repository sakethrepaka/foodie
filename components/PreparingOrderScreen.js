import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect,useState } from 'react'
import tw from '../tailwind';
import * as Animatable from 'react-native-animatable'
import * as Progress from 'react-native-progress'
import { useNavigation } from '@react-navigation/native';
import { sendNotification } from '../NotificationService';
import * as Notifications from 'expo-notifications';
import { useSelector } from 'react-redux';

const PreparingOrderScreen = () => {

    const navigation = useNavigation()
    const updatedlocation = useSelector((state) => state.LocationName);
    // console.log(updatedlocation,'name')

    const [loc, setLoc] = useState("")

    useEffect(() => {
      setLoc(updatedlocation.locname)
    }, [updatedlocation]);

    useEffect(()=>{
        setTimeout(()=>{
            navigation.navigate('Delivery')
            sendNotification(
              'Order Confirmed',
              `Your order is accepted and will be delivered to ${(updatedlocation.locname).slice(0,10).replace(',','')}`,
              'https://img.freepik.com/premium-vector/delivery-boy-scooter-doing-delivery-service-illustration_602666-23.jpg',
            )
          },4000)
    },[])
  return (
    <SafeAreaView style={tw.style('bg-gray-200','flex-1','justify-center','items-center')}>
     <Animatable.Image
      source={require('../assets/delivery.gif')}
      animation="bounceIn"
      iterationCount={1}
      style={tw.style('h-96','w-96')}
     />

     <Animatable.Text
     animation="slideInUp"
     iterationCount={1}
     style={tw.style('text-lg','my-10','text-black','font-bold','text-center')}>
    
      Waiting for Restaurant to accept your order!
     </Animatable.Text>

     <Progress.Circle size={60} indeterminate={true} color='black'></Progress.Circle>



    </SafeAreaView>
  )
}

export default PreparingOrderScreen