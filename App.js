import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import tw from './tailwind';
import { useDeviceContext } from 'twrnc'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homescreen from './Homescreen';
import RestaurantScreen from './RestaurantScreen';
import { store } from './store'
import { Provider } from 'react-redux'
import BasketScreen from './BasketScreen';
import PreparingOrderScreen from './components/PreparingOrderScreen';
import DeliveryScreen from './DeliveryScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LocationSearch from './components/LocationSearch';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Notifications from 'expo-notifications';
import { handleNotification } from './NotificationService';
import { useEffect, useState, useRef } from 'react';
import PremiumScreen from './PremiumScreen';
import Account from './components/Account';
import Addresses from './components/Addresses';
import Signup from './SignUp';
import Login from './Login';
import PaymentPage from './components/PaymentPage';
import DeliveredScreen from './DeliveredScreen';

export default function App() {


  const Stack = createNativeStackNavigator();
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();


  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  useDeviceContext(tw);

  // useEffect(() => {
  //   // Subscribe to incoming notifications
  //   const subscription = Notifications.addNotificationReceivedListener(handleNotification);

  //   return () => subscription.remove();
  // }, []);
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='SignUp'>
            <Stack.Screen name='SignUp' component={Signup} options={{headerTitle:'',headerShown:false}} />
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Home' component={Homescreen} />
            <Stack.Screen name='Restaurant' component={RestaurantScreen}></Stack.Screen>
            <Stack.Screen name='Basket' component={BasketScreen} options={{ presentation: 'modal', headerShown: false }}></Stack.Screen>
            <Stack.Screen name='Preparing' component={PreparingOrderScreen} options={{ presentation: 'modal', headerShown: false }}></Stack.Screen>
            <Stack.Screen name='Delivery' component={DeliveryScreen} options={{ presentation: 'modal', headerShown: false }}></Stack.Screen>
            <Stack.Screen name='Location' component={LocationSearch} options={{
              presentation: 'modal', headerTitle: 'Confirm Location', headerLeft: () => (<TouchableOpacity>
                <Icon name='close' size={20} style={{ marginRight: 10 }} color={"#900"} ></Icon>
              </TouchableOpacity>)
            }}></Stack.Screen>
            <Stack.Screen name='Premium' component={PremiumScreen} options={({ navigation }) => ({
              headerTitle: "Buy Premium",
              presentation: 'modal',
              headerLeft: () => (
                <TouchableOpacity onPress={navigation.goBack}>
                  <Icon name='arrow-left' size={20} style={{ marginRight: 10 }} color={"gold"} />
                </TouchableOpacity>
              )
            })}></Stack.Screen>
            <Stack.Screen name='Account' component={Account} options={({ navigation }) => ({
              headerTitle: 'My Profile',
              presentation: 'modal',
              headerLeft: () => (
                <TouchableOpacity onPress={navigation.goBack}>
                  <Icon name='arrow-left' size={20} style={{ marginRight: 10 }} color={"#900"} />
                </TouchableOpacity>
              )
            })}></Stack.Screen>
            <Stack.Screen name='Addresses' component={Addresses} options={({ navigation }) => ({
              headerTitle: 'ADDRESSES',
              presentation: 'modal',
              headerLeft: () => (
                <TouchableOpacity onPress={navigation.goBack}>
                  <Icon name='arrow-left' size={20} style={{ marginRight: 10 }} color={"#900"} />
                </TouchableOpacity>
              )
            })}></Stack.Screen>
                        <Stack.Screen name='Payment' component={PaymentPage} options={({ navigation }) => ({
              headerTitle: 'PAYMENT',
              presentation: 'modal',
              headerLeft: () => (
                <TouchableOpacity onPress={navigation.goBack}>
                  <Icon name='arrow-left' size={20} style={{ marginRight: 10 }} color={"#900"} />
                </TouchableOpacity>
              )
            })}></Stack.Screen>
            <Stack.Screen name='Delivered' component={DeliveredScreen} options={({ navigation }) => ({
              headerTitle: '',
              presentation: 'modal',
            })}></Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
