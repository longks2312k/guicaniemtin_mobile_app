import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, SafeAreaView, StatusBar, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { icons, images } from '../../constants';
import { useSelector, useDispatch } from "react-redux";
import { postLoginApi } from '../Ultils/async';

export default function Login({ navigation }) {

    const dispatch = useDispatch();
    const [acc, setAcc] = useState('admin')
    const [pass, setPass] = useState('guicaniemtin')
    const [id, setID] = useState()
    const onChangeAcc = (val) => setAcc(val)
    const onChangePass = (val) => setPass(val)
    const storeData = async (value) => {
        await AsyncStorage.setItem('@storage_Key', value);
        console.log('stored', value);
    }
    const onLogin = async () => {
        try {
            const response = await postLoginApi({ username: acc, password: pass });
            console.log('rs', response.data.data.token); // data tu api tra ve
            if (response.data.code == 200) {
                navigation.navigate('HomeMain');
                alert('Đăng nhập thành công!');
                dispatch({ type: 'USER_LOGIN', data: { ...response.data.data.user_info } });
                console.log('userInfo', response.data.data.user_info)
                storeData(response.data.data.token);
            }
            else {
                alert('Thông tin đăng nhập không chính xác.')
            }
        }
        catch (error) {
            console.error(error.response);
        }
    };

    return (
        <View>
            <View>
                <Image
                    style={{ height: 230, width: '100%' }}
                    source={images.Login}
                />
                <TouchableOpacity style={{
                    position: 'absolute', top: 40, left: 20, alignItems: 'center',
                    backgroundColor: '#1C1C1C', height: 50, width: 50, borderRadius: 50 / 2, justifyContent: 'center'
                }} onPress={() => navigation.navigate('HomeMain')} >
                    <Icon name="chevron-back" size={30} color="white" />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
                <View style={{ height: 800, marginTop: -30, borderTopLeftRadius: 30, borderTopRightRadius: 30, backgroundColor: 'white' }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 40, }}>
                        <Image
                            style={{ height: 87.6, width: 159.6, marginBottom: 10, }}
                            source={icons.Logo}
                        />
                        <View style={{ flexDirection: 'row', width: '90%', borderRadius: 10, marginTop: 20, backgroundColor: '#ECF0F3', justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                style={{ height: 28, width: 23, marginRight: 10, marginLeft: 5 }}
                                source={icons.Profile}
                            />
                            <TextInput
                                textAlign={'left'}
                                clearTextOnFocus={true}
                                onChangeText={onChangeAcc}
                                placeholder="Tài Khoản Đăng Nhập"
                                placeholderTextColor='#6D7989'
                                secureTextEntry={false}
                                value={acc}
                                style={{
                                    height: 56,
                                    width: '80%',
                                    fontSize: 18,
                                    backgroundColor: '#ECF0F3',
                                    fontFamily: 'Times New Roman',
                                    borderRadius: 10,
                                    marginLeft: 3,
                                    color: '#202833'
                                }}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', width: '90%', borderRadius: 10, marginTop: 20, backgroundColor: '#ECF0F3', justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                style={{ height: 32, width: 32, marginRight: 10 }}
                                source={icons.Lock}
                            />
                            <TextInput
                                textAlign={'left'}
                                clearTextOnFocus={true}
                                onChangeText={onChangePass}
                                placeholder="Mật Khẩu"
                                placeholderTextColor='#6D7989'
                                secureTextEntry={true}
                                value={pass}
                                style={{
                                    height: 56,
                                    width: '80%',
                                    fontSize: 18,
                                    backgroundColor: '#ECF0F3',
                                    fontFamily: 'Times New Roman',
                                    borderRadius: 10,
                                    color: '#202833'
                                }} />
                        </View>
                        <TouchableOpacity onPress={onLogin} style={{ height: 48, width: '88%', borderRadius: 30, marginBottom: 10, marginTop: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: "#EB9B00" }}>
                            <Text style={{ fontSize: 18, color: 'white' }}>Đăng Nhập</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginTop: 20 }} onPress={() => navigation.navigate('PassWord')}>
                            <Text style={{ fontSize: 16, color: '#EB9B00', fontWeight: 'bold' }}>Quên mật khẩu?</Text>
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', marginTop: 20 }} >
                            <Text style={{ fontSize: 16 }}>Bạn chưa có tài khoản?</Text>
                            <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => navigation.navigate('Regist')}>
                                <Text style={{ fontSize: 16, color: '#EB9B00', fontWeight: 'bold' }}>Đăng ký ngay!</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}
