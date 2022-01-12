import React, { useState, useEffect } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, TextInput, Dimensions, RefreshControl } from 'react-native'

import { icons, images } from '../../../../constants';

import { putEditComment, getComment, postComment, deleteComment } from '../../../Ultils/async';

const { height, width } = Dimensions.get('window');
const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
};

export default function CommentChild({ navigation, route }) {
    const { detail } = route.params;
    const [content, setContent] = useState('');
    const [commentChild, setCommentChild] = useState([]);
    const onChangeContent = (val) => setContent(val);

    const [internetCheck, setInternetCheck] = useState(0);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const onGetCommentChild = async () => {
        // call api
        try {
        const response = await getComment({
            type: 'topic',
            size: 10,
            parent_id: detail.id,
        });
        setCommentChild(response.data.data.list);
        //console.log('cmt', response.data.data.list);
        } catch (error) {
        console.error(error.response);
        }
    };
    
    const onComment = async () => {
        try {
        const response = await postComment({
            comment: content,
            commentable_id: detail.commentable_id,
            parent_id: detail.id,
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
        } else {
        alert('Bạn không có tuổi xóa bình luận này!');
        }
    };

    //Chuyen sang man sua bai viet
    const onMoveToDetailCmt = (item) => () => {
        navigation.navigate('EditComment', { detail: item });
    };

    useEffect(() => {
        onGetCommentChild();
    }, [internetCheck, refreshing]);
    return (
        <View style={{backgroundColor: 'white'}}>
            <View
                style={{
                    backgroundColor: '#FFE8D1',
                    flexDirection: 'row',
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                }}
            >
                <TouchableOpacity style={{ alignItems: 'center', marginLeft: -14,}} onPress={() => navigation.goBack()}>
                    <Image source={icons.ArrowLeft1} />
                </TouchableOpacity>
                <View style={{ alignItems: 'center', marginLeft: width/2.7 }} >
                    <Text style={{ fontSize: 18, fontWeight: '500', color: 'black' }}>Trả lời</Text>
                </View>
            </View>
            <ScrollView style={{height: height * 0.9}}
            refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <View style={{ padding: 10, backgroundColor: 'white', height: height * 0.78}}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, marginTop: 10 }}>
                        <Image
                            source={{uri: detail.author.avatar}}
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
                                {detail.author.full_name}
                            </Text>
                            <Text
                                style={{fontSize: 16, textAlign: 'justify', width: '100%'}}>
                                {detail.comment}
                            </Text>
                            </View>
                        </View>
                    </View>
                    <ScrollView style={{paddingLeft: 50, width: '100%', height: '85%'}}>
                        {commentChild.map(item => (
                            <View
                            key={item.id}
                            style={{flexDirection: 'row', width: '100%', marginBottom: 20}}>
                                <Image
                                    source={{uri: item.author.avatar}}
                                    style={{
                                    height: 30,
                                    width: 30,
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
                            </View>
                        ))}
                    </ScrollView>
                </View>
                {/* Viết comments */}
                <View
                    style={{
                        marginTop: 20,
                        margin: 10,
                        marginBottom: 17,
                        backgroundColor: '#ECF0F3',
                        flexDirection: 'row',
                        borderRadius: 25,
                        alignItems: 'center',
                        paddingHorizontal: 16,
                        justifyContent: 'space-between',
                        height: height * 0.06
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
            </ScrollView>
        </View>
    )
};
