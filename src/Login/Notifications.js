import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  ScrollView,
} from 'react-native';

import {icons, images} from '../../constants';
import RenderHtml from 'react-native-render-html';
import HTMLView from 'react-native-htmlview';
import { getNotificationApi } from '../Ultils/async';

const { height, width } = Dimensions.get('window');
const itemWidth = (width - 40);

export default function Notifications({navigation}) {
  const [notification, setNotification] = useState([]);

  const getNotification = async () => {
    // call api
    let param = {}
    let data = await getNotificationApi(param)
    console.log('boss api', data.data.data.list)
    setNotification(data.data.data.list)
}
useEffect(() => {
    getNotification()
}, []);

  return (
    <SafeAreaView styles={styles.container}>
      <StatusBar backgroundColor="#FFE8D1" barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.Icon}
          onPress={() => navigation.goBack()}>
          <Image
            source={icons.ArrowLeft1}
            style={{height: 30, width: 30, marginRight: 10}}
          />
        </TouchableOpacity>
        <View style={{width: '70%', alignItems: 'center', flex: 6}}>
          <Text style={styles.headerName}>Thông báo</Text>
        </View>
        <TouchableOpacity
          style={styles.Icon}
          onPress={() => navigation.popToTop()}>
          <Image
            style={{height: 24, width: 24, marginRight: 5}}
            source={icons.home}
          />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {notification.map(item => (
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignContent: 'space-around',
            }}
            key={item.id}>
            {item.readed == true
            ?
            <View style={{flexDirection: 'row',paddingHorizontal:8}}>
              <View style={{
                flex: 1,
                padding: 5,
                backgroundColor: '#fff',
                borderRadius: 10,
                marginTop: 8,
                width: itemWidth,
              }}>
                  <HTMLView
                    value={`${item.content}`}
                    stylesheet={styles.HTML}
                  />
              </View>
            </View>
            :
            <View style={{flexDirection: 'row',paddingHorizontal:8,backgroundColor:'#ECF0F3'}}>
              <View style={{
                flex: 1,
                padding: 5,
                backgroundColor: '#ADBDCC',
                borderRadius: 10,
                marginTop: 8,
                width: itemWidth,
              }}>
                  <HTMLView
                    value={`${item.content}`}
                    stylesheet={styles.HTML}
                  />
              </View>
            </View>
            }
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  Image: {
    height: 75,
    width: 120,
    borderRadius: 8,
  },
  Icon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#FFE8D1',
    height: 48,
    flexDirection: 'row',
  },
  Touch: {
    flex: 1,
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 8,
    width: itemWidth,
  },
  headerName: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
    marginTop: 10,
  },
  HTML:{
    fontSize: 16,
    textAlign: 'justify',
    marginTop: 8,
    color: '#202833',
    fontWeight: '400'
  }
});
