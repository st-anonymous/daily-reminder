/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {ReminderScroll} from '../components/ReminderScroll';
import {useSetRecoilState} from 'recoil';
import {CurrentReminder, ReminderDataAtom} from '../data/reminderCluster';
import {GetReminders} from '../utils/AsyncStorage';
import {useIsFocused} from '@react-navigation/native';
import PushNotification from 'react-native-push-notification';

export const HomeScreen = () => {
  const setReminders = useSetRecoilState(ReminderDataAtom);
  const setCurrentReminder = useSetRecoilState(CurrentReminder);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setCurrentReminder(null);
      PushNotification.getScheduledLocalNotifications(value => {
        console.log(value, 'scheduledNotifs');
      });
      PushNotification.getChannels(value => {
        console.log(value, 'channels');
      });
      PushNotification.getDeliveredNotifications(value => {
        console.log(value, 'deliveredNotifs');
      });
    }
  }, [isFocused]);

  useEffect(() => {
    const getReminder = async () => {
      const rems = await GetReminders();
      setReminders(rems);
    };
    getReminder();
  }, []);

  return (
    <View
      style={{
        flexDirection: 'column',
        height: '100%',
        alignItems: 'center',
      }}>
      <View
        style={{
          height: '7.5%',
          width: '100%',
          backgroundColor: '#4CAF50',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 36,
            color: 'white',
          }}>
          Daily Reminder
        </Text>
      </View>
      <View
        style={{
          height: '92.5%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ReminderScroll />
      </View>
    </View>
  );
};
