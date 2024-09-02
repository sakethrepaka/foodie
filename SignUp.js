import React, { useState,useCallback,useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Pressable, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from './tailwind';
import { Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import Button from './components/Button';
import COLORS from './constants/colors';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { signInWithEmailAndPassword,createUserWithEmailAndPassword,onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Signup = ({ navigation }) => {
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);
    const [username, setUsername] = useState("")
    const auth = FIREBASE_AUTH

    const [fontsLoaded,fontError] = useFonts({
        'Poppins': require('./assets/Poppins.ttf'),
    });

    const checkIfUserExists = async (key) => {
        const userData = await AsyncStorage.getItem(key);
        return userData ? true : false;
    };

    const signUp = async() =>{

        try {
            const exists = await checkIfUserExists(email);
            if (exists) {
                alert("User with this email already exists");
            } else {
               
                const userData = { email,username,phoneNumber };
                await AsyncStorage.setItem(email, JSON.stringify(userData));
                console.log("New user signed up:", userData);
                try{
                    const response= await createUserWithEmailAndPassword(auth,email,password)
                    console.log(response)
                }
                catch(error){
                    console.log(error)
                    alert("sign in failed"+error.message)
                }
            }
        } catch (error) {
            console.log(error);
            alert("Sign up failed: " + error.message);
        }

    }


    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded || fontError) {
          await SplashScreen.hideAsync();
        }
      }, [fontsLoaded, fontError]);
    
      if (!fontsLoaded && !fontError) {
        return null;
      }
    
    const validateEmail = (text) => {
        setEmail(text);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(text)) {
            setErrors((prevState) => ({ ...prevState, email: 'Invalid email address' }));
            setIsEmailValid(false);
        } else {
            setErrors((prevState) => ({ ...prevState, email: null }));
            setIsEmailValid(true);
        }
    };

    const validatePhoneNumber = (text) => {
        setPhoneNumber(text);
        if (text.trim() === '') {
            setErrors((prevState) => ({ ...prevState, phoneNumber: 'Phone number is required' }));
            setIsPhoneNumberValid(false);
        } else {
            setErrors((prevState) => ({ ...prevState, phoneNumber: null }));
            setIsPhoneNumberValid(true);
        }
    };

    const validatePassword = (text) => {
        setPassword(text);
        const passwordRegex = /^(?=.*[!@#$%^&*])(?=.{7,})/;
        if (!passwordRegex.test(text)) {
            setErrors((prevState) => ({ ...prevState, password: 'Password must be at least 7 characters long and contain at least one special character' }));
            setIsPasswordValid(false);
        } else {
            setErrors((prevState) => ({ ...prevState, password: null }));
            setIsPasswordValid(true);
        }
    };

    const validateUsername = (text) => {
        setUsername(text);
        const UserRegex = /^(?=.{7,})/;
        if (!UserRegex.test(text)) {
            setErrors((prevState) => ({ ...prevState, username: 'Password must be at least 7 characters long and contain at least one special character' }));
            setIsPasswordValid(false);
        } else {
            setErrors((prevState) => ({ ...prevState, username: null }));
            setIsPasswordValid(true);
        }
    };

    const validateConfirmPassword = (text) => {
        setConfirmPassword(text);
        if (text !== password) {
            setErrors((prevState) => ({ ...prevState, confirmPassword: 'Passwords do not match' }));
            setIsConfirmPasswordValid(false);
        } else {
            setErrors((prevState) => ({ ...prevState, confirmPassword: null }));
            setIsConfirmPasswordValid(true);
        }
    };

    const handleSubmit = () => {
        setErrors({});
        validateEmail(email);
        validatePhoneNumber(phoneNumber);
        validatePassword(password);
        validateConfirmPassword(confirmPassword);
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        setPhoneNumber('')
        

        if (isEmailValid && isPhoneNumberValid && isPasswordValid && isConfirmPasswordValid && isChecked) {
            signUp()
            navigation.navigate('Home',{Useremail:email})
        }
    };

    return (
        <SafeAreaView style={tw`flex-1 bg-white pt-5`}>
            <ScrollView style={tw`flex-1 mx-6`} onLayout={onLayoutRootView}>
                <View style={tw`my-6`}>
                    <Text style={[tw`text-2xl font-bold mb-3 text-black text-center text-[#900]`, { fontFamily: 'Poppins' }]}>Create Account</Text>
                    <Text style={[{ fontFamily: 'Poppins', textAlign:'center',fontSize:15}]}>Create an account and order food from your favourite restaurants</Text>
                </View>

                <View style={tw`mb-6`}>
                    <View style={tw`bg-gray-100 rounded-lg px-4 py-4`}>
                        <TextInput
                            placeholder="Email"
                            placeholderTextColor={"gray"}
                            keyboardType="email-address"
                            onChangeText={(text) => validateEmail(text)}
                            value={email}
                        />
                    </View>
                    {errors.email && <Text style={tw`text-red-500 text-sm mt-1`}>{errors.email}</Text>}
                </View>

                <View style={tw`mb-6`}>
                    <View style={tw`bg-gray-100 rounded-lg px-4 py-4`}>
                        <TextInput
                            placeholder="Username"
                            placeholderTextColor={"gray"}
                            onChangeText={(text) => validateUsername(text)}
                            value={username}
                        />
                    </View>
                    {errors.email && <Text style={tw`text-red-500 text-sm mt-1`}>{errors.username}</Text>}
                </View>

                <View style={tw`mb-6`}>
                    <View style={tw` bg-gray-100 rounded-lg px-4 py-4 flex-row items-center`}>
                        <TextInput
                            placeholder="+91"
                            placeholderTextColor={"gray"}
                            keyboardType="numeric"
                            style={tw`w-1/6`}
                            onChangeText={(text) => validatePhoneNumber(text)}
                            
                        />
                        <TextInput
                            placeholder="Enter your phone number"
                            placeholderTextColor={"gray"}
                            keyboardType="numeric"
                            style={tw`w-5/6`}
                            // style={{fontFamily:'Poppins',fontSize:14,width:"100%",marginTop:2}}
                            onChangeText={(text) => validatePhoneNumber(text)}
                            value={phoneNumber}
                        />
                    </View>
                    {errors.phoneNumber && <Text style={tw`text-red-500 text-sm mt-1`}>{errors.phoneNumber}</Text>}
                </View>

                <View style={tw`mb-6`}>
                    <View style={tw`bg-gray-100 rounded-lg px-4 py-4 flex-row items-center`}>
                        <TextInput
                            placeholder="Enter your password"
                            placeholderTextColor={"gray"}
                            secureTextEntry={!isPasswordShown}
                            style={tw`w-5/6`}
                            onChangeText={(text) => validatePassword(text)}
                            value={password}
                        />
                        <TouchableOpacity onPress={() => setIsPasswordShown(!isPasswordShown)} style={tw`w-1/6 items-center`}>
                            <Ionicons name={isPasswordShown ? 'eye-off' : 'eye'} size={24} color={COLORS.black} />
                        </TouchableOpacity>
                    </View>
                    {errors.password && <Text style={tw`text-red-500 text-sm mt-1`}>{errors.password}</Text>}
                </View>

                <View style={tw`mb-4`}>
                    <View style={tw`bg-gray-100 rounded-lg px-4 py-4 flex-row items-center`}>
                        <TextInput
                            placeholder="Confirm Password"
                            placeholderTextColor={"gray"}
                            secureTextEntry
                            style={tw`w-full`}
                            onChangeText={(text) => validateConfirmPassword(text)}
                            value={confirmPassword}
                        />
                    </View>
                    {errors.confirmPassword && <Text style={tw`text-red-500 text-sm mt-1`}>{errors.confirmPassword}</Text>}
                </View>

                <View style={tw`flex-row items-center mb-4`}>
                    <Checkbox value={isChecked} onValueChange={setIsChecked} color={isChecked ? COLORS.primary : undefined} />
                    <Text style={tw`text-base ml-2`}>I agree to the terms and conditions</Text>
                </View>

                <Button
                    title="Sign Up"
                    filled
                    style={tw`my-4 font-bold text-sm shadow-lg`}
                    onPress={handleSubmit}
                />

                <View style={tw`flex-row items-center justify-center mt-2`}>
                    <Text style={tw`text-sm text-black`}>Already have an account</Text>
                    <Pressable onPress={() => navigation.navigate('Login')}>
                        <Text style={tw`text-base text-primary font-bold ml-2`}>Login</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Signup;
