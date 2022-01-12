import React, { useEffect, useState, useCallback } from 'react'
import {
    StyleSheet,
    Text,
    View, Image,
    TouchableOpacity,
    TextInput,
    ScrollView,
    StatusBar,
    SafeAreaView,
    Modal,
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const { height, width } = Dimensions.get('window')

import { icons, images } from '../../../../constants';
import { getSharesApi, postAddShareApi, postLike, deleteShare } from '../../../Ultils/async';

export default function DetailsBoss({ navigation, route }) {

    const { sepoi } = route.params;
    const [shares, setShares] = useState([]);
    const [content, setContent] = useState([]);
    const [internetCheck, setInternetCheck] = useState(0);

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
        callGetSharesApi();
        const interval = setInterval(() => {
            setInternetCheck((internetCheck) => internetCheck + 1);
        }, 1000);
        const unsubscribe = navigation.addListener('focus', () => {
            setInternetCheck(0);
        });
        return () => {
            clearTimeout(interval);
            unsubscribe;
        };
    }, [navigation, internetCheck])

    return (
        <SafeAreaView>
            <ScrollView showsHorizontalScrollIndicator={false}>
                <StatusBar backgroundColor='#FFE8D1'
                    barStyle='dark-content' />
                <View style={{ backgroundColor: '#FFE8D1', height: 48, flexDirection: 'row' }}>
                    <TouchableOpacity style={{ width: '15%' }} onPress={() => navigation.goBack()}>
                        <Image source={icons.ArrowLeft1} style={{ height: 32, width: 32, left: 10, top: 5.33 }} />
                    </TouchableOpacity>
                    <View style={{ width: '70%', top: 8, alignItems: 'center' }} >
                        <Text style={{ fontSize: 18, fontWeight: '500', color: 'black' }}>Thông tin Sếp</Text>
                    </View>
                    <TouchableOpacity style={{ width: '15%', left: 20, top: 10 }} onPress={() => navigation.popToTop()}>
                        <Image style={{ height: 24, width: 24 }} source={icons.Home} />
                    </TouchableOpacity>
                </View>
                <View style={styles.Container}>
                    <View style={styles.Boss}>
                        <Image
                            source={{ uri: sepoi.avatar }}
                            style={{
                                width: 70,
                                height: 70,
                                borderRadius: 70 / 2,
                            }}
                        />
                        <View style={styles.Info}>
                            <Text style={styles.TxtNameManager}>Sếp {sepoi.full_name}</Text>
                            <Text style={styles.TxtPosition}>{sepoi.position}</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('DetailsBoss')}
                            style={{ marginTop: 23.5, width: 30, height: 30 }}
                        >
                            <Image
                                source={icons.right}
                                style={{ width: 9, height: 16 }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.Share}>
                        <View style={styles.Txt}>
                            <Image
                                source={icons.Edit}
                                style={{
                                    width: 24,
                                    height: 24,
                                }}
                            />
                            <TouchableOpacity onPress={onShare}
                            >
                                <Text style={{ color: '#BA6700', fontSize: 18, fontWeight: '500', paddingLeft: 4, height: 25 }}>Tạo chia sẻ</Text>
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            style={{ padding: 0, paddingLeft: 44, height: 22, color: '#000' }}
                            placeholder="Bạn nghĩ gì vậy ???"
                        />
                    </View>
                    <View style={styles.Comment}>
                        {shares.map((post) => (
                            <View key={post.id} style={{ backgroundColor: 'white', padding: 16, marginBottom: 8 }}>
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
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        padding: 0,
        marginBottom: 40,
    },
    Boss: {
        paddingTop: 16,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#FFFFFF',
        height: 102,
    },
    Info: {
        flexDirection: 'column',
        width: 220,
    },
    TxtNameManager: {
        marginTop: 16,
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: '#144E8C',
    },
    TxtPosition: {
        fontSize: 14,
        color: '#05253D',
    },
    Share: {
        borderTopColor: '#d4dce4',
        borderTopWidth: 8,
        backgroundColor: '#FFFFFF',
        paddingBottom: 10,
        color: "#000",
    },
    Txt: {
        flexDirection: 'row',
        paddingTop: 9,
        paddingLeft: 9,
        marginBottom: 6,
        color: "#000",
    },
    Comment: {
        backgroundColor: '#FFFFFF',
        borderTopColor: '#d4dce4',
        borderTopWidth: 8,
        padding: 16,
    },
    User: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    InfoUser: {
        flexDirection: 'column',

    },
    TxtNameUser: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#202833',
    },
    TxtDateTime: {
        fontSize: 12,
        color: '#202833',
    },
    ContentCmt: {
    },
    React: {
        width: '100%',
        height: 40,
        borderTopColor: '#D4DCE4',
        borderTopWidth: 1,
        marginTop: 5,
        flexDirection: 'row',
    },
    LikeCmt: {
        width: 248,
        height: 24,
        marginTop: 11,
        flexDirection: 'row',
    },
    Like: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 85,
        height: 24,
    },
    Cmt: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 54,
        width: 110,
        height: 24,
    }
});

