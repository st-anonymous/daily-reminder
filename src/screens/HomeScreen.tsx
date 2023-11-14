/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {ReminderScroll} from '../components/ReminderScroll';
import {useSetRecoilState} from 'recoil';
import {CurrentReminder, ReminderDataAtom} from '../data/reminderCluster';
import {GetReminders} from '../utils/AsyncStorage';
import {useIsFocused} from '@react-navigation/native';

export const HomeScreen = () => {
  const setReminders = useSetRecoilState(ReminderDataAtom);
  const setCurrentReminder = useSetRecoilState(CurrentReminder);
  const isFocused = useIsFocused();

  if (isFocused) {
    setCurrentReminder(null);
  }

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
