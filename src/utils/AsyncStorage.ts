import AsyncStorage from '@react-native-async-storage/async-storage';

export const GetReminders = async () => {
  let reminders: Array<Object> = [];
  const reminders_array = await AsyncStorage.getItem('reminders_array');
  if (reminders_array) {
    reminders = [...JSON.parse(reminders_array as string)];
  }
  return reminders;
};

export type AddReminderProps = {
  reminderNote: string;
  date: Date;
  repeat: string;
};

export const AddReminder = async (props: AddReminderProps) => {
  const {reminderNote, date, repeat} = props;
  let reminders = await GetReminders();
  reminders.push({
    reminderNote: reminderNote,
    date: date,
    repeat: repeat,
  });
  AsyncStorage.setItem('reminders_array', JSON.stringify(reminders));
};
