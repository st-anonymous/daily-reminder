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

export const SetReminderScreen = () => {
  const [reminderNote, setReminderNote] = useState('');
  const [date, setDate] = useState(new Date());
  const [repeat, setRepeat] = useState('');
  const [isFocus, setIsFocus] = useState(false);

  const repeatOptions = [
    {label: 'never', value: 'never'},
    {label: 'daily', value: 'daily'},
    {label: 'weekly', value: 'weekly'},
    {label: 'monthly', value: 'monthly'},
  ];

  useEffect(() => {
    console.log(date, reminderNote, repeat);
  }, [date, reminderNote, repeat]);

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
          backgroundColor: 'green',
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
          style={{
            borderColor: 'black',
            borderWidth: 1,
            borderRadius: 10,
            backgroundColor: 'lightgrey',
            width: '80%',
            alignItems: 'center',
            marginTop: 150,
          }}>
          <Text style={{fontSize: 24, color: 'black'}}>Add Reminder</Text>
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
    left: 22,
    top: 8,
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
