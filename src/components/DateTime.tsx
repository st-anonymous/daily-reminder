import React from 'react';
import {Dimensions, View} from 'react-native';
import DatePicker from 'react-native-date-picker';

export type DateTimeProps = {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
};

export const DateTime = (props: DateTimeProps) => {
  const {date, setDate} = props;
  const width = Dimensions.get('screen').width * 0.8;

  return (
    <View>
      <View>
        <DatePicker
          mode={'datetime'}
          date={date}
          onDateChange={setDate}
          minuteInterval={1}
          minimumDate={new Date()}
          androidVariant={'iosClone'}
          fadeToColor={'white'}
          style={{width: width}}
        />
      </View>
      <View />
    </View>
  );
};
