import PushNotification from 'react-native-push-notification';
import {ScheduleNotificationProps} from '../types/ScheduleNotificationProps';

export const ScheduleNotification = (props: ScheduleNotificationProps) => {
  const {
    id,
    channelId = 'daily-reminder',
    message,
    date,
    repeatType,
    repeatTime,
  } = props;

  PushNotification.localNotificationSchedule({
    id: '' + id,
    channelId: channelId,
    title: 'hello!!!',
    message: message,
    date: new Date(date),
    userInfo: {},
    allowWhileIdle: true,
    repeatType: repeatType,
    repeatTime: repeatTime,
    playSound: true,
    soundName: 'default',
  });
};

export const DeleteNotification = (id: number) => {
  PushNotification.cancelLocalNotification('' + id);
};
