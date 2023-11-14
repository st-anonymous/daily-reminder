import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {HomeScreen} from './HomeScreen';
import {ReminderScreen} from './ReminderScreen';

export const HomeStackScreen = () => {
  const HomeStack = createNativeStackNavigator();
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name={'Home'} component={HomeScreen} />
    </HomeStack.Navigator>
  );
};

export const SetReminderStackScreen = () => {
  const SetReminderStack = createNativeStackNavigator();
  return (
    <SetReminderStack.Navigator screenOptions={{headerShown: false}}>
      <SetReminderStack.Screen name={'Reminder'} component={ReminderScreen} />
    </SetReminderStack.Navigator>
  );
};
