import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  Touchable,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Dimensions,
  RefreshControl,
  StyleSheet,
} from 'react-native';

import { icons, images } from '../../../../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import HTMLView from 'react-native-htmlview';

const { height, width } = Dimensions.get('window');

import {
  postLike,
  deleteTopic,
  getComment,
  postComment,
  deleteComment,
  putEditComment,
  postFollow,
} from '../../../Ultils/async';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export default function ChiTietBaiVietD({ navigation, route }) {
  const { data } = route.params;
  const [internetCheck, setInternetCheck] = useState(0);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  //Show Modal
  const [infoModal, setInfoModal] = useState([]);
  // Modal Edit Shares
  const [modalEdit, setModalEdit] = useState(false);
  const onShowModalEditShare = data => {
    setModalEdit(true);
    setInfoModal(data);
  };

  //Xoa bai viet
  const onRemoveShare = async infoModal => {
    //console.log('item delete', infoModal.id);
    const response = await deleteTopic(infoModal.id);
    if (response.data.code == 200) {
      alert('Xóa thành công!');
      //setInternetCheck(internetCheck + 1);
      navigation.navigate('All');
      setModalEdit(false);
    } else {
      alert('Bạn không có tuổi xóa bình luận này!');
    }
  };

  //Chuyen sang man sua bai viet
  const onMoveToDetailShare = infoModal => {
    setModalEdit(false);
    navigation.navigate('EditTopic', { detail: infoModal });
  };

  const [comment, setComment] = useState([]);
  const [commentChild, setCommentChild] = useState('');
  const [content, setContent] = useState('');
  const onChangeContent = val => setContent(val);

  const onGetComment = async () => {
    // call api
    try {
      const response = await getComment({
        commentable_id: data.id,
        type: 'topic',
        size: 10,
      });
      setComment(response.data.data.list);
      //console.log('cmt', response.data.data.list);
    } catch (error) {
      console.error(error.response);
    }
  };

  const onComment = async () => {
    try {
      const response = await postComment({
        comment: content,
        commentable_id: data.id,
        type: 'topic',
      });
      //console.log('cmt1', response.data.data);
      if (response.data.code == 200) {
        alert('Thêm thành công!');
        setInternetCheck(internetCheck + 1);
        setContent('');
      } else {
        alert('Lỗi.');
      }
    } catch (error) {
      console.error(error.response);
    }
  };

  //Xoa bai viet
  const onDelCmt = (item) => async () => {
    //console.log('item delete', infoModal.id);
    const response = await deleteComment(item.id);
    if (response.data.code == 200) {
      alert('Xóa thành công!');
      setInternetCheck(internetCheck + 1);
      setModalEdit(false);
    } else {
      alert('Bạn không có tuổi xóa bình luận này!');
    }
  };

  //Chuyen sang man sua bai viet
  const onMoveToDetailCmt = (item) => () => {
    navigation.navigate('EditComment', { detail: item });
  };

  //Chuyen sang man Tra loi Comment
  const onToCommentChild = (item) => () => {
    navigation.navigate('CommentChild', { detail: item });
  };

  //Theo dõi
  const [follow, setFollow] = useState([]);
  const onFollow = data => async () => {
    const response = await postFollow({ id: data.id });
    setFollow(response.data.data);
    if (response.data.code == 200) {
      setInternetCheck(internetCheck + 1);
    } else {
      alert('Lỗi.');
    }
  };

  //Thich bai viet
  const [isLike, setIsLike] = useState([]);
  const onLike = data => async () => {
    const response = await postLike({ id: data.id, type: 'topic' });
    setIsLike(response.data.data);
    if (response.data.code == 200) {
      setInternetCheck(internetCheck + 1);
    } else {
      alert('Lỗi.');
    }
  };

  useEffect(() => {
    onGetComment();
  }, [refreshing, internetCheck]);

  return (
    <View>
      <View
        style={{ backgroundColor: '#FFE8D1', height: 48, flexDirection: 'row' }}>
        <TouchableOpacity
          style={{ width: '15%' }}
          onPress={() => navigation.goBack()}>
          <Image
            source={icons.ArrowLeft1}
            style={{ height: 32, width: 32, left: 10, top: 5.33 }}
          />
        </TouchableOpacity>
        <View style={{ width: '70%', top: 8, alignItems: 'center' }}>
          <Text style={{ fontSize: 18, fontWeight: '500', color: 'black' }}>
            Chi tiết bài viết
          </Text>
        </View>
        <TouchableOpacity
          style={{ width: '15%', left: 20, top: 10 }}
          onPress={() => navigation.popToTop()}>
          <Image style={{ height: 24, width: 24 }} source={icons.Home} />
        </TouchableOpacity>
      </View>



      {/* Chi tiet bai viet */}
      <ScrollView
        style={{ backgroundColor: 'white', padding: 16 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

          {/*Start Thông tin người đăng */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={{uri: data.author.avatar}}
              style={{ width: 45, height: 45, borderRadius: 50 }}
            />
            <View style={{ marginLeft: 4 }}>
              <Text style={{ fontSize: 14, color: '#202833', fontWeight: '700' }}>
                {data.author.full_name}
              </Text>
              <Text style={{ fontSize: 12, color: '#919EB0' }}>
                {data.created_at}
              </Text>
            </View>
          </View>

          <TouchableOpacity onPress={() => onShowModalEditShare(data)}>
            <Image
              source={icons.Dots}
              style={{ height: 25, width: 25 }}
            />
          </TouchableOpacity>
        </View>
        {/*End Thông tin người đăng */}

        {/*Start categories bai đăng */}
        <View style={{ marginTop: 8, flexDirection: 'row' }}>
          {data.categories.map(index => (
            <TouchableOpacity
              key={index.id}
              style={{
                backgroundColor: index.color,
                borderRadius: 4,
                paddingHorizontal: 8,
                paddingVertical: 2,
                alignItems: 'center',
                marginRight: 10,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '700',
                }}>
                {index.name}
              </Text>
            </TouchableOpacity>
          ))
          }

        </View>
        {/*End categories bai đăng */}

        {/*Start nội dung bai viet */}
        <View style={{ marginTop: 16 }}>
          <Text
            style={{
              fontWeight: '500',
              fontSize: 18,
              textAlign: 'justify',
              color: 'black',
            }}>
            {data.title}
          </Text>
          <HTMLView
            value={`${data.content}`}
            stylesheet={styles.HTML}
          />
        </View>
        {/*End nội dung bai viet */}

        {/*Start follow, likes, comments and views */}
        <View
          style={{
            flexDirection: 'row',
            marginTop: 8,
            justifyContent: 'space-between',
            alignItems: 'center',
            flex: 1,
          }}>

          {/* like and comment */}
          <View
            style={{ flexDirection: 'row', flex: 1, }}
          >
            {/* Follow */}
            {follow.is_follow == false ? (
              <TouchableOpacity
                onPress={onFollow(data)}
                style={{ flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: 20 }}>
                <Image
                  source={icons.Follow}
                  style={{
                    width: 24,
                    height: 24,
                    tintColor: '#202833'
                  }}
                />
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '400',
                    marginLeft: 4,
                    color: '#202833',
                  }}>
                  Theo dõi
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={onFollow(data)}
                style={{ flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: 20 }}>
                <Image
                  source={icons.Follow2}
                  tintColor="#FCB814"
                  style={{
                    width: 24,
                    height: 24,
                  }}
                />
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '400',
                    marginLeft: 4,
                    color: '#FCB814',
                  }}>
                  Theo dõi
                </Text>
              </TouchableOpacity>
            )}

            {/* Like */}
            <View style={{ flexDirection: 'row', flex: 1, }}>
              {isLike.is_like == false
                ?
                (<TouchableOpacity
                  style={{ flexDirection: 'row', alignItems: 'center' }}
                  onPress={onLike(data)}>
                  <Icon name="heart-outline" color="black" size={24} />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '400',
                      marginLeft: 4,
                      color: '#202833',
                    }}>
                    {data.likes_count}
                  </Text>
                </TouchableOpacity>)
                :
                (<TouchableOpacity
                  style={{ flexDirection: 'row', alignItems: 'center' }}
                  onPress={onLike(data)}>
                  <Icon name="heart" color="#FCB814" size={24} />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '400',
                      marginLeft: 4,
                      color: '#FCB814',
                    }}>
                    {data.likes_count}
                  </Text>
                </TouchableOpacity>
                )}
            </View>
          </View>
          {/*End like and comment */}

          {/* comments and views */}
          <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>

            {/* Views */}
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginRight: 25 }}>
              <Icon
                name="chatbubble-ellipses-outline"
                size={24}
                color="#919EB0"
              />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '400',
                  marginLeft: 4,
                  color: '#919EB0',
                }}>
                {data.comments_count}
              </Text>
            </TouchableOpacity>

            {/* Comments */}
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="eye-outline" size={26} color="#919EB0" />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '400',
                  marginLeft: 4,
                  color: '#919EB0',
                }}>
                {data.viewed_count}
              </Text>
            </TouchableOpacity>
          </View>
          {/* comments and views */}
        </View>
        {/*End follow, likes, comments and views */}


        {/* Viết comments */}
        <View
          style={{
            marginTop: 20,
            marginBottom: 17,
            backgroundColor: '#ECF0F3',
            flexDirection: 'row',
            borderRadius: 25,
            alignItems: 'center',
            paddingHorizontal: 16,
            justifyContent: 'space-between',
          }}>
          <TextInput
            style={{
              fontSize: 16,
              color: 'black',
              fontFamily: 'Times New Roman',
              fontWeight: 'normal',
              textAlign: 'justify',
              color: 'black',
            }}
            onChangeText={onChangeContent}
            multiline={true}
            placeholder="Nhập bình luận của bạn"
            placeholderTextColor="#6D7989"
            value={content}
          />
          <TouchableOpacity onPress={onComment}>
            <Image
              source={icons.Send}
              style={{ height: 24, width: 24 }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: '#ECF0F3',
            height: 4,
            marginBottom: 20,
          }}></View>
        <View style={{width: '100%', flexDirection: 'column'}}>
          {comment.map(item => (
            <View key={item.id}>
              <View
                style={{ width: '100%', marginBottom: 20, flexDirection: 'row'}}>
                <Image
                  source={{uri: item.author.avatar}}
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                />
                <View style={{width: '85%', marginLeft: 10}}>
                  <View
                    style={{
                      backgroundColor: '#ECF0F3',
                      borderRadius: 10,
                      padding: 10,
                    }}>
                      <Text
                        style={{fontSize: 14, textAlign: 'justify', width: '100%', color: 'black'}}>
                        {item.author.full_name}
                    </Text>
                    <Text
                      style={{fontSize: 16, textAlign: 'justify', width: '100%'}}>
                      {item.comment}
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity style={{marginTop: 5, marginRight: 10}} onPress={onToCommentChild(item)}>
                      <Text
                        style={{
                          color: '#144E8C',
                          fontSize: 14,
                          fontWeight: 'bold',
                        }}>
                        Trả lời ({item.reply_count})
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginTop: 5, marginRight: 10}} onPress={onMoveToDetailCmt(item)}>
                      <Text
                        style={{
                          color: '#144E8C',
                          fontSize: 14,
                          fontWeight: 'bold',
                        }}>
                        Chỉnh sửa
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginTop: 5, marginRight: 10}} onPress={onDelCmt(item)}>
                      <Text
                        style={{
                          color: '#144E8C',
                          fontSize: 14,
                          fontWeight: 'bold',
                        }}>
                        Xóa
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                {/*End Thêm sửa xoá comments */}
              </View>

              
            </View>
          ))}
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity>
            <Text
              style={{
                fontSize: 14,
                color: '#144E8C',
                fontWeight: '700',
                borderBottomWidth: 1,
                borderBottomColor: '#144E8C'
              }}>Xem thêm</Text>
          </TouchableOpacity>
        </View>
        <View style={{height: 100}}></View>
      </ScrollView>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Modal
          visible={modalEdit}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalEdit(false)}>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
            }}>
            <View
              style={{
                backgroundColor: '#FFFFFF',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                justifyContent: 'center',
                padding: 20,
              }}>
              <TouchableOpacity
                onPress={() => onMoveToDetailShare(infoModal)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                <Image
                  source={icons.Edit_Outline}
                  style={{ height: 24, width: 24, marginRight: 5 }}
                />
                <Text style={{ color: 'black', fontSize: 20 }}>
                  Chỉnh sửa bài viết
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onRemoveShare(infoModal)}
                style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={icons.Delete}
                  style={{ height: 24, width: 24, marginRight: 5 }}
                />
                <Text style={{ color: 'black', fontSize: 20 }}>
                  Xoá bài viết {infoModal.id}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/* <Modal
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
                </Modal> */}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
HTML:{
  fontSize: 16,
  textAlign: 'justify',
  marginTop: 8,
  color: '#202833',
  fontWeight: '400'
}
});