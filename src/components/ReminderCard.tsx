/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ReminderProps} from '../types/ReminderProps';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {CurrentReminder, ReminderDataAtom} from '../data/reminderCluster';
import {SaveReminders} from '../utils/AsyncStorage';
import {useNavigation} from '@react-navigation/native';
import {months} from '../data/months';

const ReminderCard = (props: ReminderProps) => {
  const {id, reminderNote, date, repeat} = props;
  const [reminders, setReminders] = useRecoilState(ReminderDataAtom);
  const setCurrentReminder = useSetRecoilState(CurrentReminder);

  const dateValue = new Date(date);
  const dateFormat = `${dateValue.getDate().toString().padStart(2, '0')}-${
    months[dateValue.getMonth()]
  }-${dateValue.getFullYear()}`;
  const timeFormat = `${(dateValue.getHours() % 12)
    .toString()
    .padStart(2, '0')}:${dateValue.getMinutes().toString().padStart(2, '0')} ${
    dateValue.getHours() > 12 ? 'PM' : 'AM'
  }`;

  const navigation = useNavigation();

  const HandleEditClick = () => {
    setCurrentReminder({
      id: id,
      reminderNote: reminderNote,
      date: date,
      repeat: repeat,
    });
    navigation.navigate('ReminderStack', {
      screen: 'Reminder',
    });
  };

  const HandleDeleteClick = () => {
    const updatedReminders = reminders.filter(item => item.id !== id);
    SaveReminders(updatedReminders);
    setReminders(updatedReminders);
  };

  return (
    <View key={id} style={styles.container}>
      <View>
        <Text style={{fontSize: 24, color: 'black'}}>{reminderNote}</Text>
      </View>
      <View style={styles.reminderDetailsContainer}>
        <View style={styles.reminderSubDetails}>
          <Text style={styles.detailsKey}>Date</Text>
          <Text style={styles.detailsValue}>{dateFormat}</Text>
        </View>
        <View style={styles.reminderSubDetails}>
          <Text style={styles.detailsKey}>Time</Text>
          <Text style={styles.detailsValue}>{timeFormat}</Text>
        </View>
        <View style={styles.reminderSubDetails}>
          <Text style={styles.detailsKey}>Repeat</Text>
          <Text style={styles.detailsValue}>{repeat}</Text>
        </View>
      </View>
      <View style={styles.reminderDetailsContainer}>
        <TouchableOpacity
          onPress={HandleEditClick}
          style={{...styles.button, backgroundColor: '#4CAF50'}}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={HandleDeleteClick}
          style={{...styles.button, backgroundColor: '#EE4B2B'}}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default React.memo(ReminderCard);

export const styles = StyleSheet.create({
  container: {
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 15,
    height: 150,
    marginVertical: 6,
    padding: 16,
    justifyContent: 'space-around',
  },
  reminderDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reminderSubDetails: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  detailsKey: {
    fontSize: 16,
    color: 'black',
  },
  detailsValue: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 10,
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
