import AsyncStorage from '@react-native-async-storage/async-storage';
import {ReminderProps} from '../types/ReminderProps';

export const GetReminders = async () => {
  let reminders: Array<ReminderProps> = [];
  const reminders_array = await AsyncStorage.getItem('reminders_array');
  if (reminders_array) {
    reminders = [...JSON.parse(reminders_array as string)];
  }
  return reminders;
};

export const SaveReminders = (reminders: Array<ReminderProps>) => {
  AsyncStorage.removeItem('reminders_array');
  AsyncStorage.setItem('reminders_array', JSON.stringify(reminders));
};
