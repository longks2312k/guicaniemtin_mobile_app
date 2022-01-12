import React, { Component, useEffect, useState } from 'react';
import {
  Text,
  TextInput,
  View,
  Image,
  Touchable,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Draggable from 'react-native-draggable';
import { icons, images } from '../../../../constants';
import { getTopicsFollowApi, postLike, getDetailTopicsApi } from '../../../Ultils/async';
import { useSelector, useDispatch } from "react-redux";
const { height, width } = Dimensions.get('window');
const itemWidth = width - 40;
const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export default function Follow({ navigation }) {
  const infoUser = useSelector((store) => store.itemReducer.items);
  const [Topics, setTopics] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [internetCheck, setInternetCheck] = useState(0);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const getTopics = async () => {
    // call api
    const response = await getTopicsFollowApi();
    setTopics(response.data.data.list);
  };

  const [isLike, setIsLike] = useState(false)
  const onLike = (item) => async () => {
    const response = await postLike({ id: item.id, type: 'topic' });
    if (response.data.code == 200) {
      //setInternetCheck(internetCheck + 1);
    }
    else {
      alert('Lỗi.')
    }
  };

  const onMoveToDetail = (item) => async () => {
    try {
      const response = await getDetailTopicsApi(item.id);
      navigation.navigate('ChiTietBaiVietD', { data: response.data.data.details })
    }
    catch (error) {
      console.error(error.response);
    }
  };

  useEffect(() => {
    getTopics();
  }, [refreshing]);

  return (
    <View style={{ flex: 1 }}>
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
          <ScrollView
            style={{ backgroundColor: '#FFFFFF' }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flex: 1,
                marginHorizontal: 16,
                paddingVertical: 8,
                backgroundColor: '#FFFFFF',
                borderBottomColor: '#ECF0F3',
                borderBottomWidth: 3
              }}>
              <View
                style={{
                  backgroundColor: '#ECF0F3',
                  borderRadius: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                  flex: 8,
                  paddingHorizontal: 10
                }}>
                <Icon
                  name="search-outline"
                  color="black"
                  size={24}
                  style={{ flex: 1 }}
                />
                <TextInput placeholder={'Tìm kiếm'} placeholderTextColor='black' style={{ color: 'black', flex: 8 }} />
              </View>
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignItems: 'center',
                }}
                onPress={() => navigation.navigate('CreatPost')}
              >
                <Icon
                  name="funnel-outline"
                  color="black"
                  size={24}
                  style={{}}
                />
              </TouchableOpacity>
            </View>

            {/* List forum */}
            <View
              style={{ backgroundColor: '#ECF0F3' }}>
              {Topics.map(item => (
                <TouchableOpacity
                  style={{
                    backgroundColor: 'white',
                    marginBottom: 4,
                    padding: 16,
                  }}
                  key={item.id}
                  onPress={onMoveToDetail(item)}
                >

                  {/* Start categories forum */}
                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#C2C5EE',
                        borderRadius: 4,
                        marginRight: 10
                      }}>
                      <Text
                        style={{ fontSize: 12, color: '#3D4073', fontWeight: 'bold', paddingHorizontal: 5 }}>
                        Chuyển phát - Logistic
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#FFD59D',
                        borderRadius: 4,
                        marginRight: 10
                      }}>
                      <Text
                        style={{ fontSize: 12, color: '#A34D00', fontWeight: 'bold', paddingHorizontal: 5 }}>
                        Công việc
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#B7CFCB',
                        borderRadius: 4,
                        marginRight: 10
                      }}>
                      <Text
                        style={{ fontSize: 12, color: '#355D56', fontWeight: 'bold', paddingHorizontal: 5 }}>
                        vui chơi
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#FFCBCA',
                        borderRadius: 4,
                        marginRight: 10
                      }}>
                      <Text
                        style={{ fontSize: 12, color: '#722C2B', fontWeight: 'bold', paddingHorizontal: 5 }}>
                        IT
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {/*End categories forum */}

                  {/*title forum */}
                  <Text style={{
                    color: 'black',
                    fontSize: 16,
                    fontWeight: '600',
                    marginVertical: 16
                  }}>
                    {item.title}
                  </Text>
                  {/*End title forum */}

                  {/*info post */}
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    flex: 1,
                  }}>

                    {/* info user */}
                    <View style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      flex: 2
                    }}>
                      <Image
                        source={{ uri: item.author.avatar }}
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: 25,
                        }}
                      />
                      <View style={{
                        justifyContent: 'center',
                        marginLeft: 6
                      }}>
                        <Text
                          style={{ fontSize: 14, color: '#202833', fontWeight: '400' }}>
                          {item.author.full_name}
                        </Text>
                        <Text style={{
                          fontSize: 12,
                          color: '#919EB0',
                          fontWeight: '400'
                        }}>
                          {item.created_at}
                        </Text>
                      </View>
                    </View>
                    {/* End info user */}

                    {/* Start comments and likes counter */}
                    <View
                      style={{
                        flexDirection: 'row',
                        flex: 1,
                        justifyContent: 'space-between'
                      }}>
                      <TouchableOpacity
                        style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon
                          name="chatbubble-ellipses-outline"
                          size={16}
                          color="#919EB0"
                        />
                        <Text style={{ fontSize: 14, fontWeight: '400', color: '#919EB0' }}>
                          {item.comments_count}
                        </Text>
                      </TouchableOpacity>
                      {item.liked == false
                        ?
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={onLike(item)}>
                          <Icon name="heart" color="#FCB814" tintColor='#FCB814' size={16} />
                          <Text style={{ fontSize: 14, fontWeight: '400', color: '#919EB0' }}>
                            {item.likes_count}
                          </Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={onLike(item)}>
                          <Icon name="heart-outline" color="#919EB0" tintColor='#919EB0' size={16} />
                          <Text style={{ fontSize: 14, fontWeight: '400', color: '#919EB0' }}>
                            {item.likes_count}
                          </Text>
                        </TouchableOpacity>
                      }
                      <TouchableOpacity
                        style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name="eye-outline" size={16} color="#919EB0" />
                        <Text style={{ fontSize: 14, fontWeight: '400', color: '#919EB0' }}>{item.viewed_count}</Text>
                      </TouchableOpacity>
                    </View>
                    {/* End comments and likes counter */}
                  </View>
                  {/*info post */}
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        )}
    </View>
  );
}
