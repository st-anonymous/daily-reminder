import PushNotification from 'react-native-push-notification';
import {ScheduleNotificationProps} from '../types/ScheduleNotificationProps';

export const ScheduleNotification = (props: ScheduleNotificationProps) => {
  const {id, channelId, message, date, repeatType, repeatTime} = props;
  PushNotification.localNotificationSchedule({
    id: id.toString(),
    channelId: channelId,
    title: 'hello!!!',
    message: message,
    date: new Date(date),
    allowWhileIdle: true,
    repeatType: repeatType,
    repeatTime: repeatTime,
  });
};

export const DeleteNotification = (id: number) => {
  PushNotification.cancelLocalNotification(id.toString());
};
