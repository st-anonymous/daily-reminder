import CustomPushNotification from '../../Notification';
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

  const scheduleTime = new Date(date);
  const scYear = scheduleTime.getFullYear(),
    scMonth = scheduleTime.getMonth(),
    scDate = scheduleTime.getDate(),
    scHour = scheduleTime.getHours(),
    scMinute = scheduleTime.getMinutes(),
    scSecond = scheduleTime.getSeconds();

  CustomPushNotification.localNotificationSchedule({
    id: '' + id,
    channelId: channelId,
    title: 'hello!!!',
    message: message,
    date: new Date(scYear, scMonth, scDate, scHour, scMinute, scSecond),
    userInfo: {},
    allowWhileIdle: true,
    repeatType: repeatType,
    repeatTime: repeatTime,
    playSound: true,
    soundName: 'default',
  });
};

export const DeleteNotification = (id: number) => {
  CustomPushNotification.cancelLocalNotification('' + id);
};
