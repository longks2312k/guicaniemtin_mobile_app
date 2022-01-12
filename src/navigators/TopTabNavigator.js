import React from 'react';
import { View, Text, Button, StyleSheet, Image, StatusBar } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import ChiTietBaiViet from '../screens/BottomTab/Discussion/ChiTietBaiVietD';
import BuuDienToiYeu from '../screens/BottomTab/Home/BuuDienToiYeu/BuuDienToiYeu';
import ResourceScreen from '../screens/BottomTab/Home/ResourceScreen/ResourceScreen';
import DanhSachPhongBanScreen from '../screens/BottomTab/Home/SacThaiMuonNoi/DanhSachPhongBanScreen';
import KetNoiChuyenMon from '../screens/BottomTab/Home/KetNoiChuyenMon/KetNoiChuyenMon';
import UI from '../screens/BottomTab/Home/SacThaiMuonNoi/UI';
import ChiTietPhongBanScreen from '../screens/BottomTab/Home/SacThaiMuonNoi/ChiTietPhongBanScreen';

const Tab = createMaterialTopTabNavigator();
const SacthaiStack = createNativeStackNavigator();
const BuudienStack = createNativeStackNavigator();
const TainguyenStack = createNativeStackNavigator();
function SacthaiScreen() {
  return (
    <SacthaiStack.Navigator>
      <SacthaiStack.Screen
        name="Sắc thái"
        component={UI}
        options={{ headerShown: false }}
      />
      <SacthaiStack.Screen
        name="Chi tiết bài viết"
        component={ChiTietBaiViet}
        options={{ headerShown: false }}
      />
      <SacthaiStack.Screen
        name="Danh Sách Phòng Ban"
        component={DanhSachPhongBanScreen}
        options={{ headerShown: false }}
      />
    </SacthaiStack.Navigator>
  );
}
function BuudienScreen() {
  return (
    <BuudienStack.Navigator>
      <BuudienStack.Screen
        name="Bưu điện tôi yêu"
        component={BuuDienToiYeu}
        options={{ headerShown: false }}
      />
    </BuudienStack.Navigator>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator
      //initialRouteName='Tài Nguyên'
      screenOptions={{
        tabBarStyle: { backgroundColor: '#FFF4E7' },
        tabBarIndicatorStyle: {
          backgroundColor: '#FFF4E7',
        },
        tabBarScrollEnabled: true,
        tabBarPressColor: '#FFF4E7'
      }}>
      <Tab.Screen
        name="Bưu Điện Tôi Yêu"
        component={BuudienScreen}
        options={{
          title: ({ focused }) => (
            <View style={focused ? styles.containerFocus : styles.container}>
              <Text
                style={{
                  color: focused ? '#FFFFFF' : '#3F4A59',
                  fontSize: 11,
                  fontFamily: 'Inter',
                  textAlign: 'center',
                  fontWeight: focused ? 'bold' : 'normal',
                }}>
                BƯU ĐIỆN TÔI YÊU
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Người bưu điện"
        component={KetNoiChuyenMon}
        options={{
          title: ({ focused }) => (
            <View style={focused ? styles.containerFocus1 : styles.container}>
              <Text
                style={{
                  color: focused ? '#FFFFFF' : '#3F4A59',
                  fontSize: 11,
                  fontFamily: 'Inter',
                  textAlign: 'center',
                  fontWeight: focused ? 'bold' : 'normal',
                }}>
                KẾT NỐI CHUYÊN MÔN
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Sắc thái muôn nơi"
        component={SacthaiScreen}
        options={{
          title: ({ focused }) => (
            <View style={focused ? styles.containerFocus2 : styles.container}>
              <Text
                style={{
                  color: focused ? '#FFFFFF' : '#3F4A59',
                  fontSize: 11,
                  fontFamily: 'Inter',
                  textAlign: 'center',
                  fontWeight: focused ? 'bold' : 'normal',
                }}>
                SẮC THÁI MUÔN NƠI
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Tài Nguyên"
        component={ResourceScreen}
        options={{
          title: ({ focused }) => (
            <View style={focused ? styles.containerFocus3 : styles.container}>
              <Text
                style={{
                  color: focused ? '#FFFFFF' : '#3F4A59',
                  fontSize: 11,
                  fontFamily: 'Inter',
                  textAlign: 'center',
                  fontWeight: focused ? 'bold' : 'normal',
                }}>
                TÀI NGUYÊN
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function TopTabNavigator() {
  return (
    <View style={{ height: '100%', width: '100%' }}>
      <MyTabs />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 138,
    height: 25,
    backgroundColor: '#D4DCE4',
    borderRadius: 100,
  },
  containerFocus: {
    alignItems: 'center',
    flexDirection: 'row',
    width: 138,
    height: 25,
    backgroundColor: '#FCB814',
    borderRadius: 100,
    justifyContent: 'center',
  },
  containerFocus1: {
    alignItems: 'center',
    flexDirection: 'row',
    width: 138,
    height: 25,
    backgroundColor: '#7C82EB',
    borderRadius: 100,
    justifyContent: 'center',
  },
  containerFocus2: {
    alignItems: 'center',
    flexDirection: 'row',
    width: 138,
    height: 25,
    backgroundColor: '#74CCBC',
    borderRadius: 100,
    justifyContent: 'center',
  },
  containerFocus3: {
    alignItems: 'center',
    flexDirection: 'row',
    width: 138,
    height: 25,
    backgroundColor: '#F75F5D',
    borderRadius: 100,
    justifyContent: 'center',
  },
});
