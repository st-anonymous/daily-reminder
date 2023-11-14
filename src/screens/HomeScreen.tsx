/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View} from 'react-native';

export const HomeScreen = () => {
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
        <Text
          style={{
            fontSize: 36,
            color: 'white',
          }}>
          Body
        </Text>
      </View>
    </View>
  );
};
