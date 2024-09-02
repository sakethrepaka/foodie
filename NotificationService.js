// NotificationService.js

import * as Notifications from 'expo-notifications';
import { Alert } from 'react-native';

export const sendNotification = async (title, body, imageUrl) => {
  const attachment = {
    contentType: 'image',
    contentUrl: imageUrl,
    thumbnailUrl: imageUrl, // Optional thumbnail URL
  };

  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      attachments: [attachment], // Add the image attachment
    },
    trigger: null,
  });
};

export const handleNotification = (notification) => {

  const { title, body } = notification.request.content;

  Alert.alert(
    title,
    body,
    [{ text: 'OK', onPress: () => console.log('OK pressed') }],
    { cancelable: false }
  );
};
