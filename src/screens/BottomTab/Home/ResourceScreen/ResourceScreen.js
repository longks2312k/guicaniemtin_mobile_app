import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Animated,
  RefreshControl,
} from 'react-native';
import {getGalleriesApi, getGalleriesVideoApi} from '../../../../Ultils/async';
import {WebView} from 'react-native-webview';

import {icons, images} from '../../../../../constants';

const {height, width} = Dimensions.get('window');
const itemWidth = width - 40;

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function ResourceScreen({navigation}) {
  const [galleries, setGalleries] = useState([]);
  const [galleriesvideo, setGalleriesVideo] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const callGetGalleries = async () => {
    // call api
    let data = await getGalleriesApi();
    console.log('Galleries api', data.data.data.list);
    setGalleries(data.data.data.list);
  };
  const callGetGalleriesVideo = async () => {
    // call api
    let data = await getGalleriesVideoApi();
    console.log('Galleries api', data.data.data.list);
    setGalleriesVideo(data.data.data.list);
  };
  useEffect(() => {
    callGetGalleries();
    callGetGalleriesVideo();
  }, [refreshing]);

  const onMoveToView = data => () => {
    navigation.navigate('webview', {detail: data});
  };

  const onMoveToList = data => () => {
    navigation.navigate('ListImages', {detail: data});
  };

  return (
    <ScrollView
    refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    } 
    style={styles.container} 
    showsVerticalScrollIndicator={false}>
      <View style={{flex: 1.5}}>
        <View style={{flexDirection: 'row', marginTop: -10}}>
          <Text
            style={{
              marginLeft: 10,
              marginTop: 20,
              fontFamily: 'Inter',
              fontSize: 22,
              color: '#202833',
            }}>
            Album ảnh
          </Text>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              position: 'absolute',
              top: 25,
              right: 25,
            }}
            onPress={() => navigation.navigate('Album')}>
            <Text style={{fontSize: 15, color: '#3B76AC', fontFamily: 'Inter'}}>
              Xem tất cả
            </Text>
            <Image
              source={icons.ArrowRight}
              style={{
                width: 9,
                height: 16,
                marginLeft: 11,
                marginTop: 2,
                tintColor: 'blue',
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            flex: 1,
            justifyContent: 'space-around',
          }}>
          {galleries.map(item => (
            <View style={styles.Item} key={item.id}>
              <TouchableOpacity
                style={{flex: 1}}
                onPress={onMoveToList(item)}>
                <Image
                  source={{uri: item.images[0]}}
                  style={{
                    width: itemWidth / 2,
                    height: itemWidth / 2,
                    borderRadius: 8,
                  }}
                />
                <Text
                  style={{
                    width: itemWidth / 2,
                    lineHeight: 18,
                    marginTop: 3,
                    fontSize: 12,
                    color: '#202833',
                  }}
                  ellipsizeMode="tail"
                  numberOfLines={2}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', marginTop: -10}}>
          <Text
            style={{
              marginLeft: 10,
              marginTop: 20,
              fontFamily: 'Inter',
              fontSize: 25,
              color: '#202833',
            }}>
            Video
          </Text>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              position: 'absolute',
              top: 25,
              right: 25,
            }}
            onPress={() => navigation.navigate('Video')}>
            <Text style={{fontSize: 15, color: '#3B76AC', fontFamily: 'Inter'}}>
              Xem tất cả
            </Text>
            <Image
              source={icons.ArrowRight}
              style={{
                width: 9,
                height: 16,
                marginLeft: 11,
                marginTop: 2,
                tintColor: 'blue',
              }}
            />
          </TouchableOpacity>
        </View>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal style={styles.ScrollNgang}>
          {galleriesvideo.map(item => (
            <TouchableOpacity
              style={{
                flex: 1,
                paddingHorizontal: 5,
                flexWrap: 'wrap',
                justifyContent: 'space-around',
              }}
              key={item.id}
              onPress={onMoveToView(item)}>
              <Image source={{uri: item.images[0]}} style={styles.Image1} />
              <Image
                source={icons.Play}
                style={{
                  position: 'absolute',
                  height: 28,
                  width: 28,
                  top: 48,
                  left: 58,
                }}
              />
              <Text
                style={{
                  width: itemWidth / 2.5,
                  height: 40,
                  marginTop: 3,
                  fontSize: 12,
                  lineHeight: 18,
                  color: '#202833',
                }}
                ellipsizeMode="tail"
                numberOfLines={2}>
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={{height:30}}></View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'white',
    flex: 1,
    height: height,
    width: width,
    marginBottom: 50,
  },
  Text: {
    fontFamily: 'Inter',
    fontSize: 15,
    marginTop: 8,
    color: '#202833',
  },
  Image: {
    width: 180,
    height: 180,
    borderRadius: 8,
  },
  Image1: {
    width: itemWidth / 2.5,
    height: itemWidth / 2.5,
    borderRadius: 8,
  },
  playIcon: {
    width: 20,
    height: 20,
    margin: 56,
  },
  Item: {},
  Item1: {
    width: 132,
    height: 150,
  },
  ScrollNgang: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    marginBottom: 10,
  },
});
