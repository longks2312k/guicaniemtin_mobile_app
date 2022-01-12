import React, {Component} from 'react';
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Tongcongty from './TongCongTy';
import Nhabuudien from './NhaBuuDien';

const Tab = createMaterialTopTabNavigator();

export default function KetNoiChuyenMon() {
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
        name="Nhà bưu điện "
        component={Nhabuudien}
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
                Nhà bưu điện
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Tổng công ty"
        component={Tongcongty}
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
                Tổng công ty
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
