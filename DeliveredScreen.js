import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import tw from './tailwind';
import { FIRESTORE_DB } from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { selectRestaurant } from './feautures/restaurantSlice';

const DeliveredScreen = () => {
    const navigation = useNavigation();
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const restaurant = useSelector(selectRestaurant)
    const restaurantName = restaurant.title

    // Function to handle submitting rating and feedback
    const handleSubmit = async () => {
       
        try {

            const docRef = await addDoc(collection(FIRESTORE_DB, `${restaurantName}`), {
                rating: rating,
                feedback: feedback,
                timestamp: new Date().toISOString(),

            });
            console.log('Feedback submitted with ID: ', docRef.id);
            
            navigation.navigate('Home');
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    };

    return (
        <View style={tw`flex-1 bg-white justify-center items-center px-5`}>
            <Icon name="check-circle" size={80} color="#900" style={tw`mb-5`} />
            <Text style={[{ fontFamily: 'Poppins', textAlign:'center',fontSize:20,fontWeight:'600'}]}>Hooray, your order has been delivered!</Text>
            <Text style={tw`text-base text-gray-700 mb-5 text-center mt-3 font-bold`}>We hope you will enjoy your meal. Please share your feedback.</Text>
            {/* Rating stars */}
            <View style={tw`flex-row items-center justify-center mb-5`}>
                {[1, 2, 3, 4, 5].map((num) => (
                    <TouchableOpacity key={num} onPress={() => setRating(num)} style={styles.starButton}>
                        <Icon name={num <= rating ? 'star' : 'star-o'} size={40} color="#FFD700" />
                    </TouchableOpacity>
                ))}
            </View>
            {/* Feedback input */}
            <TextInput
                style={styles.feedbackInput}
                placeholder="Add your feedback..."
                multiline
                value={feedback}
                onChangeText={(text) => setFeedback(text)}
            />
            {/* Submit button */}
            <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                <Text style={tw`text-white font-bold text-lg`}>Submit Feedback</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    starButton: {
        marginHorizontal: 5,
    },
    feedbackInput: {
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 10,
        padding: 15,
        width: '100%',
        minHeight: 150,
        marginBottom: 30,
        fontSize: 16,
        fontFamily: 'Roboto', // Example of custom font
        textAlignVertical: 'top', // Vertical alignment of text
    },
    submitButton: {
        backgroundColor: '#900',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
    },
});

export default DeliveredScreen;
