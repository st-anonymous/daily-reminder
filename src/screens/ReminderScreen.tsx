/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {DateTime} from '../components/DateTime';
import {useRecoilState} from 'recoil';
import {CurrentReminder, ReminderDataAtom} from '../data/reminderCluster';
import {SaveReminders} from '../utils/AsyncStorage';
import {ReminderProps} from '../types/ReminderProps';
import {useNavigation} from '@react-navigation/native';
import {
  DeleteNotification,
  ScheduleNotification,
} from '../utils/PushNotification';
import {GetRepeatTime, GetRepeatType} from '../types/GetRepeat';

export const ReminderScreen = () => {
  const [id, setId] = useState<number | null>(null);
  const [reminderNote, setReminderNote] = useState('');
  const [date, setDate] = useState(new Date());
  const [repeat, setRepeat] = useState('never');
  const [isFocus, setIsFocus] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [reminders, setReminders] = useRecoilState(ReminderDataAtom);
  const [currentReminder, setCurrentReminder] = useRecoilState(CurrentReminder);

  const navigation = useNavigation();

  const repeatOptions = [
    {label: 'never', value: 'never'},
    {label: 'daily', value: 'daily'},
    {label: 'weekly', value: 'weekly'},
    {label: 'bi-weekly', value: 'bi-weekly'},
  ];

  useEffect(() => {
    if (currentReminder) {
      setId(currentReminder.id);
      setReminderNote(currentReminder.reminderNote);
      setDate(new Date(currentReminder.date));
      setRepeat(currentReminder.repeat);
    }
    return () => {
      setCurrentReminder(null);
    };
  }, [currentReminder]);

  useEffect(() => {
    SaveReminders(reminders);
  }, [reminders]);

  useEffect(() => {
    if (date && reminderNote && repeat) {
      if (
        id &&
        reminderNote === currentReminder?.reminderNote &&
        new Date(date).getTime() === currentReminder.date &&
        repeat === currentReminder.repeat
      ) {
        setIsReady(false);
      } else {
        setIsReady(true);
      }
    } else {
      setIsReady(false);
    }
  }, [date, reminderNote, repeat]);

  const HandleAddReminder = async () => {
    if (isReady) {
      let currRem: ReminderProps = {
        id: id ? id : Date.now(),
        reminderNote: reminderNote,
        date: new Date(date).getTime(),
        repeat: repeat,
      };
      const currReminders = [
        currRem,
        ...reminders.filter(item => item.id !== id),
      ];
      setReminders(currReminders);

      DeleteNotification(currRem.id);
      ScheduleNotification({
        id: currRem.id,
        message: currRem.reminderNote,
        date: currRem.date,
        repeatType: GetRepeatType(currRem.repeat),
        repeatTime: GetRepeatTime(currRem.repeat),
      });

      setReminderNote('');
      setDate(new Date());
      setRepeat('never');

      navigation.navigate('HomeStack', {
        screen: 'Home',
      });
    }
  };

  const renderLabel = () => {
    if (repeat || isFocus) {
      return (
        <Text style={[styles.label, isFocus && {color: 'blue'}]}>
          select repeat
        </Text>
      );
    }
    return null;
  };

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
          Set Reminder
        </Text>
      </View>
      <View
        style={{
          height: '92.5%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <TextInput
          placeholder={'Reminder Note...'}
          value={reminderNote}
          onChangeText={text => setReminderNote(text)}
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            width: '80%',
            fontSize: 24,
            marginVertical: 16,
          }}
        />
        <DateTime date={date} setDate={setDate} />
        <View style={styles.container}>
          {renderLabel()}
          <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            placeholder={!isFocus ? 'select repeat' : '...'}
            data={repeatOptions}
            labelField={'label'}
            valueField={'value'}
            value={repeat}
            onChange={item => {
              setRepeat(item.value);
              setIsFocus(false);
            }}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
          />
        </View>
        <TouchableOpacity
          onPress={HandleAddReminder}
          style={{
            borderColor: isReady ? 'black' : 'grey',
            borderWidth: 1,
            borderRadius: 10,
            backgroundColor: '#4CAF50',
            width: '80%',
            height: '7.5%',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 150,
            opacity: isReady ? 1 : 0.3,
          }}>
          <Text style={{fontSize: 24, color: isReady ? 'black' : 'grey'}}>
            {id ? 'Edit Reminder' : 'Add Reminder'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginTop: 16,
    padding: 16,
    width: '80%',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 10,
    paddingHorizontal: 8,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 27,
    top: 7,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 12,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
});
