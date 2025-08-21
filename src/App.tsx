import React, { useEffect } from 'react';
import RiderConfirm from './screen/RiderConfirm';
import { Alert, PermissionsAndroid } from 'react-native';
import messaging from '@react-native-firebase/messaging';

export default function App() {
  useEffect(() => {
    const requestPermissions = async () => {
      const granted: any = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      } else {
      }
    };
    requestPermissions();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  return <RiderConfirm />;
}
