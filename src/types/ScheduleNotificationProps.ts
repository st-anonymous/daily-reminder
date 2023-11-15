export type ScheduleNotificationProps = {
  id: number;
  channelId?: string;
  message: string;
  date: number;
  repeatType: 'week' | 'day' | 'hour' | 'minute' | 'time' | undefined;
  repeatTime: number;
};
