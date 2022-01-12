import React from 'react';
import { View, Text, Touchable, TouchableOpacity, Image } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import All from './All';

import Follow from './Follow';


const Tab = createMaterialTopTabNavigator();
export default function DiscussionScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {height: 49, width: '100%'},
        tabBarActiveTintColor: 'white',
        tabBarPressColor: '#FFF',
        tabBarIndicatorStyle: {
          backgroundColor: '#A34D00',
          width: '20%',
          left: '15%',
          height: 3,
        },
      }}>
      <Tab.Screen
        name="Tất Cả"
        component={All} 
        options={{
          title: ({focused}) => (
            <View>
              <Text
                style={{
                  color: focused ? '#A34D00' : '#6D7989',
                  fontSize: 16,
                  fontFamily: 'Inter',
                  textAlign: 'center',
                }}>
                Tất Cả
              </Text>
            </View>
          ),
        }}
        />
      <Tab.Screen
        name="Theo Dõi" 
        component={Follow}
        options={{
          title: ({focused}) => (
            <View>
              <Text
                style={{
                  color: focused ? '#A34D00' : '#6D7989',
                  fontSize: 16,
                  fontFamily: 'Inter',
                  textAlign: 'center',
                }}>
                Theo Dõi
              </Text>
            </View>
          ),
        }}/>
    </Tab.Navigator>
  );
}
