import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeStackScreen, SetReminderStackScreen} from './src/screens/navigator';

const App = () => {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: [
            {
              display: 'flex',
            },
            null,
          ],
          tabBarActiveTintColor: '#4CAF50',
          tabBarInactiveTintColor: 'grey',
        }}>
        <Tab.Screen
          name="HomeStack"
          component={HomeStackScreen}
          options={{title: 'Home'}}
        />
        <Tab.Screen
          name="SetReminderStack"
          component={SetReminderStackScreen}
          options={{title: 'Set Reminder'}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
