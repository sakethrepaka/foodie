import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from './tailwind';
import { Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import COLORS from './constants/colors';
import Button from './components/Button';
import { FIREBASE_AUTH } from './firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const Login = ({ navigation }) => {
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const auth = FIREBASE_AUTH

    const signIn = async () => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password)
            console.log(response)
            setEmail('')
            setPassword('')
            navigation.navigate('Home',{Useremail:email})

        }
        catch (error) {
            console.log(error)
            alert("sign in failed" + error.message)
        }
    }


    return (
        <SafeAreaView style={tw`flex-1 bg-white`}>
            <View style={tw`flex-1 mx-6`}>
                <View style={tw`my-6`}>
                    <Text style={tw`text-2xl font-bold mb-3 text-black`}>Hi Welcome Back ! 👋</Text>
                    <Text style={tw`text-lg text-black`}>Hello again you have been missed!</Text>
                </View>

                <View style={tw`mb-4`}>
                    <Text style={tw`text-lg font-medium mb-2`}>Email address</Text>
                    <View style={tw`border border-black rounded-lg px-4 py-2`}>
                        <TextInput
                            placeholder="Enter your email address"
                            placeholderTextColor={COLORS.black}
                            keyboardType="email-address"
                            onChangeText={(text) => setEmail(text)}
                            value={email}
                        />
                    </View>
                </View>

                <View style={tw`mb-4`}>
                    <Text style={tw`text-lg font-medium mb-2`}>Password</Text>
                    <View style={tw`border border-black rounded-lg px-4 py-2 flex-row items-center`}>
                        <TextInput
                            placeholder="Enter your password"
                            placeholderTextColor={COLORS.black}
                            secureTextEntry={!isPasswordShown}
                            onChangeText={(text) => setPassword(text)}
                            value={password}
                            style={tw`w-5/6`}
                        />
                        <TouchableOpacity onPress={() => setIsPasswordShown(!isPasswordShown)} style={tw`w-1/6 items-center`}>
                            <Ionicons name={isPasswordShown ? 'eye-off' : 'eye'} size={24} color={COLORS.black} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={tw`flex-row items-center mb-4`}>
                    <Checkbox value={isChecked} onValueChange={setIsChecked} color={isChecked ? COLORS.primary : undefined} />
                    <Text style={tw`text-base ml-2`}>Remember Me</Text>
                </View>

                <TouchableOpacity onPress={signIn}>
                    <Button title="Login" onPress={signIn} filled style={tw`my-4`} />
                </TouchableOpacity>

                <View style={tw`flex-row items-center justify-center`}>
                    <Text style={tw`text-lg text-black`}>Don't have an account ? </Text>
                    <Pressable onPress={() => navigation.navigate('SignUp')}>
                        <Text style={tw`text-lg text-primary font-bold ml-2`}>Register</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Login;
