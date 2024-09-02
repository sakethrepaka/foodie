import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';

const PaymentPage = () => {
  const [amount, setAmount] = useState('');

  const handlePayment = async () => {
    // Check if amount is valid
    if (!amount || isNaN(amount) || amount <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount.');
      return;
    }

    try {
      const options = {
        description: 'Payment for your order',
        image: 'https://your-company-logo.png', // Replace with your company logo URL
        currency: 'INR',
        key: 'rzp_test_1T5G8lkt8JRnFe', 
        amount: 100, 
        name: 'foodie',
        prefill: {
          email: 'customer@example.com',
          contact: '9999999999',
          name: 'John Doe',
        },
        theme: { color: '#3399cc' },
      };

      RazorpayCheckout.open(options)
        .then((data) => {
          // Handle success
          console.log(data);
          Alert.alert('Payment Success', `Payment ID: ${data.razorpay_payment_id}`);
        })
        .catch((error) => {
          // Handle error
          console.log(error);
          Alert.alert('Payment Error', 'An error occurred while processing payment.');
        });
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while processing payment.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Enter Amount (INR)</Text>
      <TextInput
        style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, marginBottom: 20 }}
        onChangeText={text => setAmount(text)}
        value={amount}
        keyboardType="numeric"
      />
      <Button title="Pay Now" onPress={handlePayment} />
    </View>
  );
};

export default PaymentPage;
