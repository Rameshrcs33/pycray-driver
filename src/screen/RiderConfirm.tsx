import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import messaging from '@react-native-firebase/messaging';

import { getData, storeData } from '../common/asyncStore';
import Loader from '../component/Loader';
import { getRide, updateRide } from '../redux/slice/bookingReducer';
import { getUser, updateFcmToken } from '../redux/slice/userReducer';
import { token } from '../utils/API_KEY';

const RiderConfirm = () => {
  const [Booking, setBooking] = useState<any>([]);

  const dispatch: any = useDispatch();
  const { userList } = useSelector((state: any) => state.user);
  const { bookingList, loading } = useSelector((state: any) => state.booking);

  useEffect(() => {
    getToken();
    dispatch(getRide());
  }, []);

  useEffect(() => {
    setBooking([...bookingList]);
  }, [bookingList]);

  const getToken = async () => {
    try {
      const fcmToken = await getData(token);
      if (!fcmToken) {
        updateToken();
      } else {
        fetchUser();
      }
    } catch (error) {}
  };

  const updateToken = async () => {
    try {
      await messaging().registerDeviceForRemoteMessages();
      const fcmToken = await messaging().getToken();
      const payload: any = {
        role: 'driver',
        fcmToken: fcmToken,
      };
      await storeData(token, fcmToken);
      await dispatch(updateFcmToken(payload));
      fetchUser();
    } catch (error) {}
  };

  const fetchUser = () => {
    try {
      const payload: string = 'driver';
      dispatch(getUser(payload));
    } catch (error) {}
  };

  const approveRide = async (item: any, status: string) => {
    const payload: any = {
      id: item?._id,
      driverId: userList[0]?._id,
      status: status,
    };

    await dispatch(updateRide(payload));
    dispatch(getRide());
  };

  const renderItem = ({ item }: any) => {
    return (
      <View
        style={{
          width: '100%',
          paddingVertical: 10,
          borderBottomWidth: 1,
          borderColor: 'lightgray',
          paddingHorizontal: 10,
          backgroundColor: 'white',
        }}
      >
        <Text style={{ color: 'black', fontSize: 14 }}>
          Booking ID : {item?._id}
        </Text>
        <Text style={{ color: 'black', fontSize: 14 }}>
          Pickup Location : {item?.pickup}
        </Text>
        <Text style={{ color: 'black', fontSize: 14 }}>
          Drop Location : {item?.destination}
        </Text>
        <Text style={{ color: 'black', fontSize: 14 }}>
          Booking status :{' '}
          <Text
            style={{
              color: item?.status === 'rejected' ? 'red' : 'green',
              fontWeight: '500',
            }}
          >
            {item?.status}
          </Text>
        </Text>

        <View style={{ marginVertical: 10 }} />

        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <Pressable
            onPress={() => approveRide(item, 'accepted')}
            style={{
              backgroundColor: 'green',
              paddingHorizontal: 15,
              paddingVertical: 10,
              borderRadius: 8,
            }}
          >
            <Text style={{ color: 'white', fontWeight: '500' }}>Accept</Text>
          </Pressable>

          <Pressable
            onPress={() => approveRide(item, 'rejected')}
            style={{
              backgroundColor: 'red',
              paddingHorizontal: 15,
              paddingVertical: 8,
              borderRadius: 8,
            }}
          >
            <Text style={{ color: 'white', fontWeight: '500' }}>Reject</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 18, fontWeight: '600', color: 'black' }}>
        Confirm Ride
      </Text>

      {Booking.length !== 0 && (
        <FlatList
          style={{ marginTop: 20 }}
          data={Booking}
          keyExtractor={(item: any, key: any) => key.toString()}
          renderItem={renderItem}
        />
      )}

      {loading && <Loader Visible={loading} />}
    </View>
  );
};

export default RiderConfirm;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  input: {
    height: 44,
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    paddingVertical: 1,
    fontSize: 14,
    color: 'black',
  },
});
