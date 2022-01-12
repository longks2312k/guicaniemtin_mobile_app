import React, { Component, useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  View,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import { icons, images } from '../../../../../constants';

import Icon from 'react-native-vector-icons/Ionicons';
import { getActivitiesApi, getDetailBlog } from '../../../../Ultils/async';
import { NavigationRouteContext } from '@react-navigation/core';

const { height, width } = Dimensions.get('window');
const itemWidth = (width - 40);

export default function UI({ navigation }) {
  const [activityNews, setActivityNews] = useState([]);
  const callGetActivitiesApi = async () => {
    let data = await getActivitiesApi();
    console.log('Activities News api', data.data.data.list)
    setActivityNews(data.data.data.list);
  }
  useEffect(() => {
    callGetActivitiesApi();
  }, [])

  const onMoveToDetail = (item) => async () => {
    try {
      const response = await getDetailBlog(item.id);
      navigation.navigate('chi tiết bài viết', { data: response.data.data.details })
    }
    catch (error) {
      console.error(error.response);
    }
  };

  return (
    <View style={{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'stretch',
      backgroundColor: 'white',
    }}>
      <ScrollView >
        <View>
          <ImageBackground
            source={images.Login}
            resizeMode="stretch"
            style={styles.image}>
            <View >
              <TextInput
                style={styles.TouchNgang} placeholder=" Search" />
              <Icon
                name="search-outline"
                size={26}
                color="black"
                style={{ marginTop: -35, marginLeft: 20 }}
                onPress={() => { navigation.navigate("Danh Sách Phòng Ban") }}
              />
            </View>
          </ImageBackground>
        </View>
        <View style={{}}>
          <View style={{ flexDirection: 'row', paddingVertical: 16 }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: '500',
                color: 'black',
                marginLeft: 15,
              }}>
              Tin Tức Hoạt Động
            </Text>
          </View>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal
            style={{
              flex: 1,
              width: '100%',
              backgroundColor: 'white',
              paddingBottom: 15,
            }}>
            {activityNews.map((item) => (
              <TouchableOpacity style={{ marginHorizontal: 5 }} key={item.id} onPress={onMoveToDetail(item)}>
                <Image style={{ width: itemWidth / 2.5, height: itemWidth / 2.5, borderRadius: 8 }}
                  source={{ uri: item.image }}
                />
                <Text ellipsizeMode="tail"
                  numberOfLines={2}
                  style={{ marginTop: 5, color: 'black', fontSize: 14, fontWeight: '400', width: itemWidth / 2.5, lineHeight: 20, }} >{item.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={{ marginRight: 16 }}>
            {activityNews.map((item) => (
              <TouchableOpacity
                style={styles.TouchDoc}
                key={item.id}
                onPress={onMoveToDetail(item)}
              >
                <View style={{flexDirection: "row", flexWrap: "wrap", flex: 1, justifyContent: 'space-around', padding: 5}}>
                  <Image
                    style={{ width: itemWidth * 0.4, height: 80, borderBottomLeftRadius: 8, borderTopLeftRadius: 8 }}
                    source={{ uri: item.image }}
                  />
                  <View style={{ alignItems: 'stretch', marginLeft: 10, justifyContent: 'center' }}>
                    <Text
                      ellipsizeMode="clip"
                      numberOfLines={2}
                      style={{ color: 'black', fontSize: 16, fontWeight: '600', width: itemWidth * 0.55 }}
                    >
                      {item.title}
                    </Text>
                    <Text ellipsizeMode="tail" style={{ fontSize: 14, width: itemWidth * 0.55 }}>
                      {item.created_at}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  image2: {
    borderRadius: 10,
    height: 100,
    width: 150,
  },
  text1: {
    fontSize: 20,
    color: 'black',
    width: 200,
    paddingHorizontal: 5,
  },
  image1: {
    borderRadius: 10,
    height: 150,
    width: 200,
  },
  scroll: {},
  size: {
    fontFamily: 'Inter',
    fontWeight: 'bold',
    fontSize: 25,
    paddingTop: 30,
    color: 'black',
  },
  image: {
    flex: 1,
    width: '100%',
    height: 300,
  },
  TouchNgang: {
    marginTop: 125,
    paddingLeft: 25,
    backgroundColor: '#FFFFFF',
    width: '90%',
    marginLeft:'5%',
    borderRadius:20,
  },
  input: {
    marginTop: 100,
    with: 100,
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: 380,
    paddingLeft: 25,
    marginRight: 15,
    marginLeft: 15,
    placeholder: 'Search',
  },
  icon: {
    paddingTop: 8,
    color: 'black',
  },
});
