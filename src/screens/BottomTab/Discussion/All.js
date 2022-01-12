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
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/Ionicons';
import Draggable from 'react-native-draggable';
import { icons, images } from '../../../../constants';
import { getTopicsApi, postLike, getDetailTopicsApi } from '../../../Ultils/async';
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { getCategoriesApi } from '../../../Ultils/async';

const { height, width } = Dimensions.get('window');
const itemWidth = width - 40;
const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export default function All({ navigation }) {

  const [Topics, setTopics] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [internetCheck, setInternetCheck] = useState(0);
  const infoUser = useSelector((store) => store.itemReducer.items);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const getTopics = async () => {
    // call api
    const response = await getTopicsApi();
    setTopics(response.data.data.list);
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
  const [visibleModal, setVisibleModal] = useState(false)
  const onFilterModal = () => {
    setVisibleModal(true);
    console.log('visibleModal', visibleModal)
  }

  const [categories, setCategories] = useState([]);
  const getCategories = async () => {
    let data2 = await getCategoriesApi();
    setCategories(data2.data.data.list);
  };

  // Loc list bai viet forum theo cat_slug
  const filterCategory = async (cate) => {
    let data2 = await getTopicsApi({ cat_slug: cate });
    console.log('cateFilter', data2.data.data.list);
    setTopics(data2.data.data.list);
  }

  useEffect(() => {
    getTopics();
    getCategories();
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
          <View>
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
                  onPress={() => onFilterModal()}
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
                      {item.categories.map(index => (
                        <TouchableOpacity
                          key={index.id}
                          style={{
                            backgroundColor: index.color,
                            borderRadius: 4,
                            marginRight: 10,
                          }}>
                          <Text
                            style={{ fontSize: 12, color: '#3D4073', fontWeight: 'bold', paddingHorizontal: 5 }}>
                            {index.name}
                          </Text>
                        </TouchableOpacity>
                      ))}

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
                        <View
                          style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Icon
                            name="chatbubble-ellipses-outline"
                            size={16}
                            color="#919EB0"
                          />
                          <Text style={{ fontSize: 14, fontWeight: '400', color: '#919EB0' }}>
                            {item.comments_count}
                          </Text>
                        </View>
                        {item.liked == false
                          ?
                          <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                            <Icon name="heart" color="#FCB814" tintColor='#FCB814' size={16} />
                            <Text style={{ fontSize: 14, fontWeight: '400', color: '#919EB0' }}>
                              {item.likes_count}
                            </Text>
                          </View>
                          :
                          <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                            <Icon name="heart-outline" color="#919EB0" tintColor='#919EB0' size={16} />
                            <Text style={{ fontSize: 14, fontWeight: '400', color: '#919EB0' }}>
                              {item.likes_count}
                            </Text>
                          </View>
                        }
                        <View
                          style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Icon name="eye-outline" size={16} color="#919EB0" />
                          <Text style={{ fontSize: 14, fontWeight: '400', color: '#919EB0' }}>{item.viewed_count}</Text>
                        </View>
                      </View>
                      {/* End comments and likes counter */}
                    </View>
                    {/*info post */}
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
            <Draggable
              imageSource={icons.Edit}
              isCircle
              shouldReverse
              renderSize={48}
              renderColor='#FCB814'
              onShortPressRelease={() => navigation.navigate('CreatPost')}
              x={300}
              y={540}
            />

            {/* Modal_Filter */}
            <Modal
              visible={visibleModal}
              animationType="slide"
              transparent={true}
              onRequestClose={() => setVisibleModal(false)}
            >
              <TouchableWithoutFeedback
                onPress={() => setVisibleModal(false)}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                  }}>
                  <ScrollView
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderTopLeftRadius: 20,
                      borderTopRightRadius: 20,
                      padding: 18,
                      maxHeight: 300,
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 1,
                        height: 12,
                      },
                      shadowOpacity: 0.58,
                      shadowRadius: 16.00,

                      elevation: 24,
                    }}>
                    <View
                      style={{
                        marginBottom: 20
                      }}
                    >
                      {categories && categories.map(index => (
                        <TouchableOpacity
                          onPress={() => filterCategory(index.slug)}
                          key={index.id}
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              color: 'black',
                              fontSize: 18,
                              padding: 5
                            }}
                          >
                            {index.name}{index.checked}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </ScrollView>
                </View>
              </TouchableWithoutFeedback>

            </Modal>
          </View>
        )
      }
    </View >

  );
}
