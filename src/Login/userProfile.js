import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, SafeAreaView, TextInput, ScrollView, StatusBar } from 'react-native'

import { icons, images } from '../../constants';
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';

import {launchImageLibrary} from 'react-native-image-picker';


import { changeUserInfoApi } from '../Ultils/async';


export default function userProfile({ navigation }) {
    const dispatch = useDispatch();
    const [bio, setBio] = useState('Admin');
    const [image, setImage] = useState('');
    const [imageBase64, setImageBase64] = useState('');
    const infoUser = useSelector((store) => store.itemReducer.items);
    const onLogout = () => {
        dispatch({ type: 'CLEAR_LOGIN' });
        navigation.navigate('login');
        AsyncStorage.clear();
    }

    // upload
  // picker image
    const chooseImage = () => {
        let options = {
        title: 'You can choose one image',
        maxWidth: 256,
        maxHeight: 256,
        noData: true,
        mediaType: 'photo',
        includeBase64: true,
        storageOptions: {
            skipBackup: true,
        },
        };
        launchImageLibrary(options, response => {
        if (response.didCancel) {
        } else if (response.error) {
        } else if (response.customButton) {
        } else {
            // ADD THIS
            setImage(response.assets[0].uri);
            setImageBase64(response.assets[0].base64);
        }
        });
    };
    // convert path file
    const updateProfile = async () => {
        const res = await changeUserInfoApi(imageBase64, bio);
        console.log('rs', res.data)
        if (res.data.code == 200) {
        alert('Sửa thành công!');
        }
        else {
        alert('Sửa thất bại!.')
        }
    };

    return (
        <SafeAreaView style={{ backgroundColor: '#E5E5E5', flex: 1 }}>
            <StatusBar backgroundColor='#FFBF3F'
                barStyle='dark-content' />
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
                    <View >
                        <View style={{ backgroundColor: '#FFBF3F' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                                <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
                                    <Image style={{ height: 28, width: 28 }} source={icons.ArrowLeft1} />
                                </TouchableOpacity>
                                <View style={{}}>
                                    <Text style={{ fontFamily: 'Times New Roman', fontSize: 20, fontWeight: '500', color: '#202833' }}>Cá Nhân</Text>
                                </View>
                                <TouchableOpacity style={{}} onPress={() => navigation.navigate('HomeMain')}>
                                    <Image style={{ height: 24, width: 24, marginRight: 10 }} source={icons.Home} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <View style={{ backgroundColor: 'white', borderRadius: 100 }}>
                                    <Image
                                        style={{ height: 96, width: 96, borderRadius: 50, margin: 10 }}
                                        source={{ uri: infoUser.avatar }}
                                    />
                                    <TouchableOpacity
                                        style={{
                                            borderRadius: 100,
                                            borderStyle: 'dashed',
                                            borderColor: '#000',
                                            borderWidth: 1,
                                            backgroundColor: 'white',
                                            position: 'absolute',
                                        }} onPress={chooseImage}>
                                        <Image style={{ height: 24, width: 24, margin: 5 }} source={icons.Camera} />
                                    </TouchableOpacity>
                                </View>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 30 }}>{infoUser.full_name}</Text>
                                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10, marginLeft: -8 }} onPress={updateProfile}>
                                    <Image style={{ height: 24, width: 24, backgroundColor: '#FFBF3F' }} source={icons.Edit} />
                                    <Text style={{ fontSize: 16, textDecorationLine: 'underline', fontWeight: '700' }}>Sửa tên hiển thị</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ backgroundColor: 'white', height: 240, width: 360, borderRadius: 10, margin: 16, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ height: 70, width: '90%', justifyContent: 'center', alignItems: 'center' }}>
                                <View>
                                    <View style={{ flexDirection: 'row', top: 17 }}>
                                        <Image style={{ height: 26, width: 26, tintColor: '#D18300' }} source={icons.Call} />
                                        <Text style={{ fontSize: 14, fontWeight: '400', marginLeft: 10, color: '#D18300' }}>{infoUser.phone}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', top: 17 }}>
                                        <Image style={{ height: 26, width: 26, tintColor: '#D18300' }} source={icons.Message} />
                                        <Text style={{ fontSize: 14, fontWeight: '400', color: '#D18300' }}>{infoUser.email}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ height: 190, flexDirection: 'row', padding: 16 }}>
                                <View style={{ marginRight: 16 }}>
                                    <View style={{ height: 30 }}>
                                        <Text style={{ fontSize: 12, marginLeft: 5, marginTop: 8, fontFamily: 'Inter', fontWeight: '400' }}>Tên đầy đủ:</Text>
                                    </View>
                                    <View style={{ height: 30 }}>
                                        <Text style={{ fontSize: 12, marginLeft: 5, marginTop: 8, fontFamily: 'Inter', fontWeight: '400' }}>Ngày sinh:</Text>
                                    </View>
                                    <View style={{ height: 30 }}>
                                        <Text style={{ fontSize: 12, marginLeft: 5, marginTop: 8, fontFamily: 'Inter', fontWeight: '400' }}>Chức danh:</Text>
                                    </View>
                                    <View style={{ height: 30 }}>
                                        <Text style={{ fontSize: 12, marginLeft: 5, marginTop: 8, fontFamily: 'Inter', fontWeight: '400' }}>Bộ phận, đơn vị làm việc:</Text>
                                    </View>
                                </View>
                                <View>
                                    <View style={{ height: 30 }}>
                                        <Text style={{ fontSize: 14, marginLeft: 10, marginTop: 8, fontFamily: 'Inter', fontWeight: '400' }}>{infoUser.full_name}</Text>
                                    </View>
                                    <View style={{ height: 30 }}>
                                        <Text style={{ fontSize: 14, marginLeft: 10, marginTop: 8, fontFamily: 'Inter', fontWeight: '400' }}>{infoUser.birthday}</Text>
                                    </View>
                                    <View style={{ height: 30 }}>
                                        <Text style={{ fontSize: 14, marginLeft: 10, marginTop: 8, fontFamily: 'Inter', fontWeight: '400' }}>{infoUser.position}</Text>
                                    </View>
                                    <View style={{ height: 40, }}>
                                        <Text style={{ fontSize: 14, marginLeft: 10, marginTop: 8, fontFamily: 'Inter', fontWeight: '400' }}>{infoUser.unit}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{ height: 100, backgroundColor: '#E5E5E5', justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
                            <TouchableOpacity>
                                <Text style={{ fontSize: 16, fontWeight: '700', color: '#A34D00', textDecorationLine: 'underline' }}>Đổi mật khẩu</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={onLogout}
                                style={{
                                    height: 46,
                                    width: '90%',
                                    borderRadius: 23,
                                    marginTop: 8,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: '#FFD59D'
                                }}>
                                <Text style={{ fontSize: 16, color: '#A34D00', fontWeight: '700', }}>
                                    Đăng xuất
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            }
        </SafeAreaView>
    )
}
