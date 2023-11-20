import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import PushNotification from 'react-native-push-notification';
import {Platform} from 'react-native';
PushNotification.configure({
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);
  },
  onAction: function (notification) {
    console.log('ACTION:', notification.action);
    console.log('NOTIFICATION:', notification);
  },
  onRegistrationError: function (err) {
    console.error(err.message, err);
  },
  popInitialNotification: false,
  requestPermissions: Platform.OS === 'ios',
});
PushNotification.createChannel(
  {
    channelId: 'daily-reminder',
    channelName: 'daily reminder channel',
    channelDescription:
      'A channel to categorise your daily reminder notifications',
    playSound: true,
    soundName: 'default',
    vibrate: true,
    importance: 4,
  },
  created => console.log(`createChannel returned '${created}'`),
);

AppRegistry.registerComponent(appName, () => App);
