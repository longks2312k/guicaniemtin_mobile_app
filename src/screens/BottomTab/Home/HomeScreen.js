import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  RefreshControl,
  Dimensions,
} from 'react-native';

import Swiper from 'react-native-swiper';
import { icons, images } from '../../../../constants';
import { getHomeHonorsApi } from '../../../Ultils/async';
import { useSelector, useDispatch } from "react-redux";
import { getHomeSlideApi, getDetailBlog } from '../../../Ultils/async';
import HomeValue from '../../../components/HomeValue';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const { height, width } = Dimensions.get('window');
const itemWidth = (width - 40);

export default function HomeScreen({ navigation }) {
  const [Honors, setHonors] = useState([]);
  const [slideHome, setSlideHome] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const infoUser = useSelector((store) => store.itemReducer.items);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const getHomeSlide = async () => {
    // call api
    let data = await getHomeSlideApi()
    console.log('HomeSlide api', data.data.data)
    setSlideHome(data.data.data)
  }
  const getHomeHonors = async () => {
    // call api
    let data = await getHomeHonorsApi()
    console.log('Honors api', data.data.data.list)
    setHonors(data.data.data.list)
  }

  useEffect(() => {
    getHomeSlide();
    getHomeHonors();
    console.log('info homeScreen', infoUser)
  }, [refreshing]);

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
      <ScrollView
        style={{ flex: 1, flexDirection: 'column' }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        style={{ backgroundColor: 'white' }}>
        <SafeAreaView>
          <Swiper
            flex={1}
            backgroundColor={'#D8D8D8'}
            style={{ height: 460 }}
            showsButtons={false}
            autoplay={true}>
            <View style={styles.slide1}>
              <Image style={styles.SlideImg} source={{ uri: slideHome[0] }} />
            </View>
            <View style={styles.slide1}>
              <Image style={styles.SlideImg} source={{ uri: slideHome[1] }} />
            </View>
            <View style={styles.slide1}>
              <Image style={styles.SlideImg} source={{ uri: slideHome[2] }} />
            </View>
            <View style={styles.slide1}>
              <Image style={styles.SlideImg} source={{ uri: slideHome[3] }} />
            </View>
          </Swiper>

          <View style={{ position: 'absolute', top: 20, right: 15, flexDirection: 'row', }}>
            {infoUser.avatar ?
              (
                <TouchableOpacity
                  style={styles.TouchProfile}
                  onPress={() => navigation.navigate('userProfile')}>
                  <Image style={{ height: 24, width: 24, borderRadius: 25 }} source={{ uri: infoUser.avatar }} />
                </TouchableOpacity>
              )
              :
              (
                <TouchableOpacity
                  style={styles.TouchProfile}
                  onPress={() => navigation.navigate('login')}>
                  <Image style={{ height: 24, width: 24, tintColor: '#FCB814' }} source={icons.Profile} />
                </TouchableOpacity>
              )}
            <TouchableOpacity
              style={styles.TouchBell}
              onPress={() => navigation.navigate('Notification')}>
              <Image style={{ height: 24, width: 24, tintColor: '#FCB814' }} source={icons.Notification} />
            </TouchableOpacity>
          </View>
          <Image
            style={{ height: 41, width: '100%', marginTop: 0, position: 'absolute', bottom: 0, }}
            source={icons.EndLine}
          />
        </SafeAreaView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignContent: 'space-around',
            paddingHorizontal: 16,
            marginTop: 16,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Danh sách')}
            style={styles.TouchBDTY}>
            <View style={{ flexDirection: 'row', marginLeft: 19 }}>
              <Image
                style={{ height: 30, width: 36, marginTop: 12, marginRight: 16 }}
                source={icons.heart}
              />
              <View>
                <Text
                  style={{ fontSize: 18, color: 'white', fontFamily: 'inter' }}>
                  Bưu điện
                </Text>
                <Text
                  style={{ fontSize: 18, color: 'white', fontFamily: 'inter' }}>
                  tôi yêu{' '}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <View style={{ width: 20 }}></View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Danh sách')}
            style={styles.TouchNBD}>
            <View style={{ flexDirection: 'row', marginLeft: 16 }}>
              <Image
                style={{ height: 36, width: 36, marginTop: 8, marginRight: 16 }}
                source={icons.Group}
              />
              <View>
                <Text
                  style={{ fontSize: 18, color: 'white', fontFamily: 'inter' }}>
                  Người
                </Text>
                <Text
                  style={{ fontSize: 18, color: 'white', fontFamily: 'inter' }}>
                  bưu điện
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignContent: 'space-around',
            paddingHorizontal: 16,
            marginBottom: 16,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Danh sách')}
            style={styles.TouchST}>
            <View style={{ flexDirection: 'row', marginLeft: 20 }}>
              <Image
                style={{ height: 36, width: 32, marginTop: 4, marginRight: 16 }}
                source={icons.Mail}
              />
              <View>
                <Text
                  style={{ fontSize: 18, color: 'white', fontFamily: 'inter' }}>
                  Sắc thái
                </Text>
                <Text
                  style={{ fontSize: 18, color: 'white', fontFamily: 'inter' }}>
                  muôn nơi{' '}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <View style={{ width: 20 }}></View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Danh sách')}
            style={styles.TouchTN}>
            <View
              style={{
                flexDirection: 'row',
                marginLeft: 16,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{ height: 33, width: 33, marginRight: 16 }}
                source={icons.Image}
              />
              <View>
                <Text
                  style={{ fontSize: 18, color: 'white', fontFamily: 'inter' }}>
                  Tài nguyên
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', padding: 16 }}>
          <Text style={styles.TextTV}>Tôn Vinh </Text>
          <View style={{ position: 'absolute', top: 25, right: 15 }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Tôn vinh')}
              style={{ flexDirection: 'row' }}>
              <Text style={styles.TextXemTC}>Xem tất cả</Text>
              <Image
                style={{ height: 18, width: 9, marginLeft: 5, tintColor: 'blue' }}
                source={icons.ArrowRight}
              />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          style={{ flex: 1, width: '100%', backgroundColor: 'white', marginBottom: 20, paddingLeft: 5 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'space-around', height: 230, }}>
            {Honors.map((item) => (
              <TouchableOpacity
                onPress={onMoveToDetail(item)}
                key={item.id}
                style={styles.TouchLs}>
                <View style={{ backgroundColor: 'white' }}>
                  <Image
                    style={{ height: itemWidth / 2.5, width: itemWidth / 2.5, borderRadius: 15 }}
                    source={{ uri: item.image }}
                  />
                </View>
                <View style={{ backgroundColor: 'white', borderRadius: 5 }}>
                  <Text style={styles.TextLs} ellipsizeMode="tail" numberOfLines={3}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <View
          style={{
            height: 656,
            width: '100%',
            backgroundColor: '#FCB814',
            marginVertical: 20,
          }}>
          <Image style={styles.ImageSep} source={icons.Chat} />
          <ImageBackground style={styles.ImgBgr} source={icons.Mesbox}>
            <View style={{ height: 20 }}></View>
            <Image style={styles.Image1} source={icons.SepOi} />
            <Image style={styles.Image2} source={icons.Text} />
            <TouchableOpacity onPress={() => { navigation.navigate('Sếp ơi') }} style={styles.TouchQues}>
              <Text style={{ fontSize: 16, color: 'white' }}>
                Đặt câu hỏi cho sếp
              </Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>

        <View style={{ flex: 1, marginBottom: 20 }}>
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.TextTV}>Giá trị cốt lõi Bưu điện Việt Nam</Text>
          </View>
          
        </View>
        <View style={{padding:10, flex: 1, alignItems: 'center'}}>
            <HomeValue/>
          </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  SlideImg: {
    height: 460,
    width: '100%',
  },
  JustAlin: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  TouchProfile: {
    alignItems: 'center',
    backgroundColor: 'white',
    height: 32,
    width: 32,
    borderRadius: 32 / 2,
    justifyContent: 'center',
  },
  TouchBell: {
    alignItems: 'center',
    marginLeft: 15,
    backgroundColor: 'white',
    height: 32,
    width: 32,
    borderRadius: 32 / 2,
    justifyContent: 'center',
  },
  TextOngL: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: 'bold',
    marginLeft: 2,
    color: 'black',
    fontFamily: 'inter',
  },
  TextXemTC: {
    fontSize: 16,
    fontWeight: '500',
    color: 'blue',
    marginTop: -2.5,
    marginRight: 5,
    fontFamily: 'inter',
  },
  TextTV: {
    fontSize: 24,
    fontWeight: '500',
    color: 'black',
    fontFamily: 'inter',
  },
  header: {
    backgroundColor: '#FFE8D1',
    height: 48,
    flexDirection: 'row',
  },
  ImgBgr: {
    height: 380,
    width: '96%',
    marginLeft: '4%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Image1: {
    height: 45,
    width: '35%',
    marginBottom: 5,
    marginLeft: -10,
    marginTop: 35,
  },
  Image2: {
    height: 135,
    width: '90%',
    marginBottom: 10,
    marginLeft: -8,
    marginTop: 10,
  },
  ImageSep: {
    height: 220,
    width: '90%',
    marginLeft: '5%',
    marginTop: 32,
  },
  TouchBDTY: {
    flexDirection: 'row',
    height: 68,
    width: '50%',
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
    backgroundColor: '#FCB814',
  },
  TouchNBD: {
    flexDirection: 'row',
    height: 68,
    width: '50%',
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
    backgroundColor: '#7176CE',
  },
  TouchST: {
    flexDirection: 'row',
    height: 68,
    width: '50%',
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
    backgroundColor: '#61AA9D',
  },
  TouchTN: {
    flexDirection: 'row',
    height: 68,
    width: '50%',
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
    backgroundColor: '#E36B69',
  },
  TouchOl: {
    flex: 1,
    width: 140,
    marginHorizontal: 5,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  TouchQues: {
    height: 46,
    width: 242,
    borderRadius: 30,
    marginBottom: 10,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FCB814',
    marginRight: 15,
    marginTop: 20,
  },
  Touch1: {
    marginLeft: 16,
    marginRight: 16,
    padding: 10,
    height: 116,
    width: 116,
    borderRadius: 8,
    backgroundColor: '#E8DEF0',
    backgroundColor: '#FFE4F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Touch2: {
    marginRight: 16,
    padding: 10,
    height: 116,
    width: 116,
    borderRadius: 8,
    backgroundColor: '#CEF0F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Touch3: {
    marginRight: 16,
    padding: 10,
    height: 116,
    width: 116,
    borderRadius: 8,
    backgroundColor: '#FDF3E4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Touch4: {
    marginLeft: 16,
    marginRight: 16,
    padding: 10,
    height: 116,
    width: 116,
    borderRadius: 8,
    backgroundColor: '#FFE4F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Touch5: {
    backgroundColor: '#F0D2D3',
    padding: 10,
    height: 116,
    width: 116,
    marginRight: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Touch6: {
    padding: 10,
    marginRight: 16,
    height: 116,
    width: 116,
    borderRadius: 8,
    backgroundColor: '#ECF8E7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ViewText: {
    backgroundColor: 'white',
    width: 250,
    borderRadius: 5,
    marginLeft: 10,
    marginTop: 3,
  },
  headerName: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
    marginTop: 10,
  },
  TextLs: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: 'bold',
    width: itemWidth / 2.5,
    color: 'black',
    fontFamily: 'inter',
    height: 40
  },
  TouchLs: {
    flex: 1,
    width: itemWidth / 2.5,
    marginHorizontal: 5,
    backgroundColor: 'white',
    borderRadius: 10,
  },
});
