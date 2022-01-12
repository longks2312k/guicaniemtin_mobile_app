import React from 'react'
import { View, Text, TouchableOpacity} from 'react-native'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import NhaBuuDien from '../screens/BottomTab/Home/KetNoiChuyenMon/NhaBuuDien';
import TongCongTy from '../screens/BottomTab/Home/KetNoiChuyenMon/TongCongTy';

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Nhà Bưu Điện" component={NhaBuuDien} />
      <Tab.Screen name="Tổng Công Ty" component={TongCongTy} />
    </Tab.Navigator>
  );
}

export default function TopTapNguoiBuuDien() {
  return (
    <View style={{ height: '100%', width: '100%' }}>
      <MyTabs/>
    </View>
  )
}
