/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ScrollView, Text} from 'react-native';
import ReminderCard from './ReminderCard';
import {useRecoilValue} from 'recoil';
import {ReminderDataAtom} from '../data/reminderCluster';

export const ReminderScroll = () => {
  const reminders = useRecoilValue(ReminderDataAtom);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {reminders ? (
        reminders.map(item => {
          return (
            <ReminderCard
              key={item.id}
              id={item.id}
              reminderNote={item.reminderNote}
              date={item.date}
              repeat={item.repeat}
            />
          );
        })
      ) : (
        <Text>No reminders found</Text>
      )}
    </ScrollView>
  );
};
