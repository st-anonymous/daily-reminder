import {atom} from 'recoil';
import {ReminderProps} from '../types/ReminderProps';

export const ReminderDataAtom = atom<Array<ReminderProps>>({
  key: 'ReminderDataAtom',
  default: [],
});

export const CurrentReminder = atom<ReminderProps | null>({
  key: 'CurrentReminder',
  default: null,
});
