import React, { Component, useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  Modal,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getSharesApi, postAddShareApi, deleteShare, postLike } from '../../../../Ultils/async';
// import Modal from "react-native-modal";
import { icons, images } from '../../../../../constants';
const { height, width } = Dimensions.get('window')

export default function ChiTietPhongBanScreen({ navigation, route }) {
  const [internetCheck, setInternetCheck] = useState(0);
  const [shares, setShares] = useState([]);
  const [content, setContent] = useState('');


  // hien thi bai viet
  const callGetSharesApi = async () => {
    let param = {}
    let data = await getSharesApi(param);
    console.log('Shares api:', data.data.data.list);
    setShares(data.data.data.list);
    setInternetCheck(internetCheck + 1);
  };

  // tao bai viet moi
  const onShare = async (content) => {
    const res = await postAddShareApi({ content: content });
    if (res.data.code == 200) {
      alert('Thêm thành công!');
      setInternetCheck(internetCheck + 1);
      setContent('');
    }
    else {
      alert('Thêm thất bại!.')
    }
  };

  //Show Modal
  const [infoModal, setInfoModal] = useState([]);
  // Modal Edit Shares
  const [modalEdit, setModalEdit] = useState(false);
  const onShowModalEditShare = (post) => {
    setModalEdit(true);
    setInfoModal(post);
  }
  // Modal Comments
  const [modalComments, setModalComments] = useState(false);
  const onShowModalComments = (post) => {
    setModalComments(true);
    setInfoModal(post);
  }

  //Xoa bai viet
  const onRemoveShare = async (infoModal) => {
    console.log('item delete', infoModal.id)
    const response = await deleteShare(infoModal.id);
    if (response.data.code == 200) {
      alert('Xóa thành công!');
      setInternetCheck(internetCheck + 1);
      setModalEdit(false);
    }
    else {
      alert('Bạn không có tuổi xóa bình luận này!')
    }
  }

  //Chuyen sang man sua bai viet
  const onMoveToDetailShare = (infoModal) => {
    setModalEdit(false);
    navigation.navigate('DetailShare', { detail: infoModal });
  }

  //Thich bai viet
  const [isLike, setIsLike] = useState(false)
  const onLike = (post) => async () => {
    const response = await postLike({ id: post.id, type: 'share' });
    if (response.data.code == 200) {
      setInternetCheck(internetCheck + 1);
    }
    else {
      alert('Lỗi.')
    }
  };

  useEffect(() => {
    //Hien thi danh sach bai share
    callGetSharesApi();
  }, [internetCheck])

  return (
    <View>
      <ScrollView
        style={{
          backgroundColor: '#D4DCE4',
        }}>
        <StatusBar backgroundColor='#FFE8D1'
          barStyle='dark-content' />
        <View
          style={{
            backgroundColor: '#FFE8D1',
            paddingVertical: 12,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 8,

          }}>
          <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
            <Image source={icons.ArrowLeft1} style={{ height: 24, width: 24 }} />
          </TouchableOpacity>
          <View style={{}} >
            <Text style={{ fontSize: 18, fontWeight: '500', color: 'black' }}>
              Chi tiết phòng ban
            </Text>
          </View>
          <TouchableOpacity
            style={{}}
            onPress={() => navigation.navigate("HomeMain")}>
            <Image style={{ height: 24, width: 24 }} source={icons.Home} />
          </TouchableOpacity>
        </View>
        <View style={{
          backgroundColor: '#FFFFFF',
          paddingHorizontal: 16,
          marginBottom: 8,
        }}>
          <TouchableOpacity onPress={() => navigation.navigate('Danh Sách Phòng Ban')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: 56,
              borderColor: '#D4DCE4',
              borderBottomWidth: 1,
            }}>
            <Image
              source={images.Document}
              style={{ height: 20, width: 18 }}
            />
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: 18,
              }}>
              Danh mục các bưu điện
            </Text>
            <Image
              source={icons.ArrowRight}
              style={{}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 78,
              paddingVertical: 5
            }}
            onPress={() => onShare(content)}
          >
            <View style={{ flexDirection: 'row', }}>
              <Image
                source={icons.Edit}
                style={{ width: 24, height: 24, tintColor: 'black', alignItems: 'center' }}
              />
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 20,
                  color: '#BA6700'
                }}>
                Tạo chia sẻ
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <TextInput
                placeholder={'bạn đang nghĩ gì vậy ???'}
                placeholderTextColor={'#6D7989'}
                onChangeText={setContent}
                value={content}
                style={{
                  height: 45,
                  width: '85%',
                  fontSize: 20,
                  color: '#000',
                  paddingLeft: 25,
                }}
                multiline={true}
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* bai viet */}
        <View>
          {shares.map((post) => (
            <View style={{ backgroundColor: 'white', padding: 16, marginBottom: 8 }}>
              <View style={{}}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Image
                      source={{uri: post.author.avatar}}
                      style={{ width: 40, height: 40, borderRadius: 50 }}
                    />
                    <View style={{ marginLeft: 8 }}>
                      <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black' }}>
                        {post.author.full_name}
                      </Text>
                      <Text style={{ fontSize: 14, color: 'black' }}>
                        {post.created_at}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => onShowModalEditShare(post)}
                  >
                    <Image
                      source={icons.MoreSquare}
                      style={{ width: 24, height: 24, borderRadius: 50 }}
                    />
                  </TouchableOpacity>

                </View>
                <View style={{ paddingVertical: 8, }}>
                  {/* <Image
                    source={{ uri: post.image }}
                    style={{ resizeMode: 'cover' }}
                  /> */}
                  <Text
                    style={{
                      fontSize: 18,
                      color: 'black',
                      fontFamily: 'Times New Roman',
                      fontWeight: 'normal',
                      lineHeight: 28,
                      textAlign: 'justify'
                    }}>
                    {post.content}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  borderTopWidth: 1,
                  borderColor: '#D4DCE4',
                  paddingVertical: 8,
                }}>
                {post.liked == false
                  ?
                  <TouchableOpacity
                    onPress={onLike(post)}
                    style={{ flex: 1, flexDirection: 'row' }}>
                    <Icon name="heart-outline" color="black" size={24} />
                    <Text style={{ fontSize: 18, color: '#000' }}> Thích ({post.likes_count})</Text>
                  </TouchableOpacity>
                  :
                  <TouchableOpacity
                    onPress={onLike(post)}
                    style={{ flex: 1, flexDirection: 'row' }}>
                    <Icon name="heart" color="#FCB814" tintColor='#FCB814' size={24} />
                    <Text style={{ fontSize: 18, color: '#000' }}> Bỏ thích ({post.likes_count})</Text>
                  </TouchableOpacity>
                }
                <TouchableOpacity
                  onPress={() => onShowModalComments(post)}
                  style={{ flex: 1, flexDirection: 'row' }}>
                  <Icon name="chatbubble-ellipses-outline" color="black" size={24} />
                  <Text style={{ fontSize: 18, color: '#000' }}> Bình Luận ({post.comments_count})</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
        <Modal
          visible={modalEdit}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalEdit(false)}
        >
          <View style={{
            flex: 1,
            justifyContent: "flex-end",
          }}>
            <View style={{
              backgroundColor: '#FFFFFF',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              justifyContent: 'center',
              padding: 20,
            }}>
              <TouchableOpacity onPress={() => onMoveToDetailShare(infoModal)}
                style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
              >
                <Image source={icons.Edit_Outline} style={{ height: 24, width: 24, marginRight: 5 }} />
                <Text style={{ color: 'black', fontSize: 20 }}>
                  Chỉnh sửa bài viết
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onRemoveShare(infoModal)}
                style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={icons.Delete} style={{ height: 24, width: 24, marginRight: 5 }} />
                <Text style={{ color: 'black', fontSize: 20 }}>
                  Xoá bài viết {infoModal.id}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal
          visible={modalComments}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalComments(false)}
        >
          <View style={{
            flex: 1,
            justifyContent: "flex-end",
          }}>
            <View style={{
              backgroundColor: '#FFFFFF',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              justifyContent: 'center',
              padding: 20,
            }}>
              <Text style={{ color: '#000' }}>
                Hello {infoModal.id}
              </Text>
            </View>
          </View>
        </Modal>
      </View>
    </View >
  );
}
const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
});
