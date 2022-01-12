import React from 'react'
import { View, Text, Image, TouchableOpacity, StatusBar } from 'react-native'
import TopTabNavigator from '../../../navigators/TopTabNavigator';
import { useSelector, useDispatch } from "react-redux";
import { icons, images } from '../../../../constants';

export default function HomeOptions({ navigation }) {
  const infoUser = useSelector((store) => store.itemReducer.items);
  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor='#FFF4E7'
        barStyle='dark-content' />
      {!infoUser.avatar ?
        (
          <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ color: '#000' }}>Bạn cần đăng nhập</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('login')}
                style={{
                  backgroundColor: '#EB9B00',
                  borderRadius: 10,
                  paddingHorizontal: 10,
                  paddingVertical: 5
                }}>
                <Text style={{ color: 'black' }}>Đăng Nhập</Text>
              </TouchableOpacity>
            </View>
          </View>
        )
        :
        (
          <View>
            <View style={{ flexDirection: 'row', backgroundColor: '#FFF4E7' }}>
              <TouchableOpacity onPress={() => navigation.navigate('HomeMain')}>
                <Image
                  style={{ height: 43, width: 80, left: 16 }}
                  source={icons.Logo}
                />
              </TouchableOpacity >
              <View style={{ flex: 1 }}></View>
              <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
                <Image
                  style={{ height: 26, width: 26, right: 25, top: 11 }}
                  source={icons.Notification}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Person')}>
                <Image
                  style={{ height: 26, width: 26, right: 15, top: 11, borderRadius: 25 }}
                  source={{ uri: infoUser.avatar }}
                />
              </TouchableOpacity>
            </View>
            <View style={{}}>
              <TopTabNavigator />
            </View>
          </View>
        )}
    </View>
  )
}
