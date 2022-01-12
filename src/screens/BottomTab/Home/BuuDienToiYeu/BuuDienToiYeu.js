import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  SafeAreaView, StyleSheet, RefreshControl, Dimensions

} from 'react-native';

import Loading from '../../../../Ultils/Loading'
import { icons, images } from '../../../../../constants';
import { getHistory, getPlay, getHomeHonorsApi, getLook, getDetailBlog } from '../../../../Ultils/async';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const { height, width } = Dimensions.get('window');
const itemWidth = (width - 40);

export default function BuuDienToiYeu({ navigation }) {

  const [honors, setHonors] = useState([]);
  const [Histories, setHistories] = useState([]);
  const [play, setPlay] = useState([]);
  const [Look, setLook] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false)

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  // call api ton vinh
  const callGetHomeHonorsApi = async () => {
    setIsLoading(true)
    let data = await getHomeHonorsApi();
    console.log('Honors api', data.data.data.list)
    setHonors(data.data.data.list);
    setIsLoading(false)
  };

  // call api lich su va truyen thong
  const callGetHistory = async () => {
    setIsLoading(true)
    let param = {}
    let data = await getHistory(param)
    console.log('History api', data.data.data.list)
    setHistories(data.data.data.list)
    setIsLoading(false)
  };

  // call api an choi
  const callGetPlay = async () => {
    setIsLoading(true)
    let data = await getPlay();
    console.log('Play api', data.data.data.list)
    setPlay(data.data.data.list);
    setIsLoading(false)
  };

  // call api ngo nghieng
  const callGetLook = async () => {
    setIsLoading(true)
    let data = await getLook();
    console.log('Look api', data.data.data.list)
    setLook(data.data.data.list);
    setIsLoading(false)
  };

  useEffect(() => {
    callGetHomeHonorsApi();
    callGetHistory();
    callGetPlay();
    callGetLook();
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
    <View>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: 'white' }}>
        <View>
          <View style={{ height: 500 }}>
            <View style={{ flexDirection: 'row', padding: 15 }}>
              <Text ellipsizeMode="tail" style={styles.TieuDe}>Tôn Vinh</Text>
              <View style={{ position: 'absolute', top: 25, right: 15 }}>
                <TouchableOpacity onPress={() => navigation.navigate('Tôn vinh')} style={{ flexDirection: 'row' }}>
                  <Text style={styles.XemTC}>Xem tất cả</Text>
                  <Image style={{ height: 18, width: 9, marginLeft: 5 }} source={icons.ArrowRight} />
                </TouchableOpacity>
              </View>
            </View>
            {isLoading && <Loading />}
            {honors.map((item) => (
              <TouchableOpacity
                onPress={onMoveToDetail(item)}
                key={item.id}
                style={styles.TouchTv}>
                <View style={{ backgroundColor: 'white', flexDirection: 'row' }}>
                  <View style={{ backgroundColor: 'white' }}>
                    <Image
                      style={{ height: 75, width: itemWidth * 0.4, borderRadius: 8 }}
                      source={{ uri: item.image }}
                    />
                  </View>
                  <View style={styles.ViewTv}>
                    <Text ellipsizeMode="tail" numberOfLines={2} style={styles.TextTv}>
                      {item.title}
                    </Text>
                    <Text style={{ fontSize: 14, marginRight: 5, width: itemWidth * 0.55, }}>{item.created_at}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View style={{ flexDirection: 'row', padding: 15 }}>
            <Text ellipsizeMode="tail" numberOfLines={1} style={styles.TieuDe}>Lịch sử - Truyền thống</Text>
            <View style={{ position: 'absolute', top: 25, right: 15 }}>
              <TouchableOpacity onPress={() => navigation.navigate('Lịch sử')} style={{ flexDirection: 'row' }}>
                <Text style={styles.XemTC}>Xem tất cả</Text>
                <Image style={{ height: 18, width: 9, marginLeft: 5 }} source={icons.ArrowRight} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ height: 230 }}>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal style={styles.ScrollNgang}>
              {Histories.map((item) => (
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
            </ScrollView>
          </View>
          <View style={{ height: 500 }}>
            <View style={{ flexDirection: 'row', padding: 15 }}>
              <Text ellipsizeMode="tail" style={styles.TieuDe}>Ăn chơi</Text>
              <View style={{ position: 'absolute', top: 25, right: 15 }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Ăn Chơi')}
                  style={{ flexDirection: 'row' }}>
                  <Text style={styles.XemTC}>Xem tất cả</Text>
                  <Image style={{ height: 18, width: 9, marginLeft: 5, tintColor: 'blue' }} source={icons.ArrowRight} />
                </TouchableOpacity>
              </View>
            </View>
            {isLoading && <Loading />}
            {play.map((item) => (
              <TouchableOpacity
                onPress={onMoveToDetail(item)}
                key={item.id}
                style={styles.TouchAc}>
                <View style={{ width: '92%', backgroundColor: '#ECF0F3', flexDirection: 'row', borderRadius: 8 }}>
                  <View style={{}}>
                    <Image
                      style={{ height: 80, width: itemWidth * 0.4, height: 80, borderTopLeftRadius: 8, borderBottomLeftRadius: 8, }}
                      source={{ uri: item.image }} />
                  </View>
                  <View style={{ marginLeft: 10, width: '54%', }}>
                    <Text ellipsizeMode="tail" numberOfLines={2} style={styles.TextAc}>
                      {item.title}
                    </Text>
                    <View>
                      <Text style={{ fontSize: 14, width: itemWidth * 0.55 }}>{item.created_at}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={{ height: 500 }}>

          <View style={{ flexDirection: 'row', padding: 15 }}>
            <Text ellipsizeMode="tail" style={styles.TieuDe}> Ngó nghiêng</Text>
            <View style={{ position: 'absolute', top: 25, right: 15 }}>
              <TouchableOpacity onPress={() => navigation.navigate('Ngó Nghiêng')} style={{ flexDirection: 'row' }}>
                <Text style={styles.XemTC}>Xem tất cả</Text>
                <Image style={{ height: 18, width: 9, marginLeft: 5, tintColor: 'blue' }} source={icons.ArrowRight} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flexDirection: "row", flexWrap: "wrap", flex: 1, justifyContent: 'space-around', padding: 10 }}>
            {isLoading && <Loading />}
            {Look.map((item) => (
              <TouchableOpacity style={{ marginBottom: 15 }} key={item.id}>
                <View style={{}}>
                  <Image
                    style={{ height: itemWidth / 2, width: itemWidth / 2, borderRadius: 8, }}
                    source={{ uri: item.image }}
                  />
                  <Text
                    style={{
                      height: 50,
                      borderBottomLeftRadius: 8,
                      borderBottomRightRadius: 8,
                      width: itemWidth / 2,
                      marginTop: -50, padding: 5,
                      color: 'white',
                      fontSize: 12,
                      textAlign: 'center',
                      fontWeight: 'bold',
                      backgroundColor: '#495057',
                    }}
                    ellipsizeMode="tail"
                    numberOfLines={2}
                  >
                    {item.title}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={{ height: 50 }}></View>

      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  TextLs: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: 'bold',
    width: itemWidth / 2.5,
    color: 'black',
    fontFamily: 'inter',
  },
  TouchLs: {
    flex: 1,
    width: itemWidth / 2.5,
    marginHorizontal: 5,

    backgroundColor: 'white',
    borderRadius: 10,

  },
  TouchAc: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,

  },
  TextAc: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    marginLeft: 2,
    color: 'black',
    marginBottom: 5,
  },
  TouchTv: {
    flex: 1,
    width: itemWidth * 0.9,
    padding: 5,
    marginLeft: 15,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  TextTv: {
    fontSize: 16,
    width: itemWidth * 0.55,
    fontWeight: 'bold',
    color: 'black',
    flex: 2,
  },
  ViewTv: {
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 5,
    marginLeft: 10,
    marginTop: 3,
  },
  ScrollNgang: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    marginBottom: 20,
    paddingLeft: 5
  },
  XemTC: {
    fontSize: 14,
    fontWeight: '400',
    color: 'blue',
    marginTop: -2.5,
    marginRight: 5,
    fontFamily: 'inter',
    width: itemWidth * 0.25,
  },
  TieuDe: {
    fontSize: 22,
    fontWeight: '500',
    color: 'black',
    fontFamily: 'inter',
    width: itemWidth * 0.7,

  },
});