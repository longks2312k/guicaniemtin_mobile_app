import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, SafeAreaView, TextInput, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

import { icons, images } from '../../constants';
import { postRegisterApi } from '../Ultils/async'

export default function Regist({ navigation }) {

    const [name, setName] = useState()
    const [mail, setMail] = useState()
    const [pass, setPass] = useState()
    const [pass2, setPass2] = useState()
    const onChangeName = (val) => setName(val)
    const onChangeMail = (val) => setMail(val)
    const onChangePass = (val) => setPass(val)
    const onChangePass2 = (val) => setPass2(val)


    const onRegist = async () => {
        try {
            const response = await postRegisterApi({ username: name, email: mail, password: pass, password_confirmation: pass2 });
            console.log('rs', response.data); // data tu api tra ve
            if (response.data.code == 200) {
                navigation.navigate('Home');
                alert('Đăng ký thành công!')
            }
            else {
                alert('Thông tin đăng ký không chính xác.')
            }
        }
        catch (error) {
            console.error(error.response);
        }
    };

    return (
        <ScrollView >
            <View>
                <Image
                    style={{ height: 200, width: '100%' }}
                    source={images.Login}
                />
                <TouchableOpacity style={{
                    position: 'absolute', top: 40, left: 20, alignItems: 'center',
                    backgroundColor: '#1C1C1C', height: 50, width: 50, borderRadius: 50 / 2, justifyContent: 'center'
                }} onPress={() => navigation.goBack()} >
                    <Icon name="chevron-back" size={30} color="white" />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
                <View style={{ height: 800, marginTop: -30, borderTopLeftRadius: 30, borderTopRightRadius: 30, backgroundColor: 'white' }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20, }}>
                        <Text style={{ fontSize: 22, fontWeight: 'bold', fontFamily: 'Times New Roman' }}>Đăng ký Tài khoản</Text>
                        <Image
                            style={{ height: 87.6, width: 159.6, marginBottom: 10, marginTop: 15 }}
                            source={icons.Logo}
                        />
                        <TextInput
                            textAlign={'left'}
                            clearTextOnFocus={true}
                            placeholder="  Họ Tên"
                            secureTextEntry={false}
                            onChangeText={onChangeName}
                            value={name}
                            style={{ height: 56, width: '90%', fontSize: 18, backgroundColor: '#ECF0F3', fontFamily: 'Times New Roman', borderRadius: 10, marginBottom: 0, marginTop: 10 }}
                        />
                        <TextInput
                            textAlign={'left'}
                            clearTextOnFocus={true}
                            placeholder="  Email"
                            secureTextEntry={false}
                            onChangeText={onChangeMail}
                            value={mail}
                            style={{ height: 56, width: '90%', fontSize: 18, backgroundColor: '#ECF0F3', fontFamily: 'Times New Roman', borderRadius: 10, marginBottom: 0, marginTop: 10 }}
                        />
                        <TextInput
                            textAlign={'left'}
                            clearTextOnFocus={true}
                            placeholder="  Mật Khẩu"
                            secureTextEntry={true}
                            onChangeText={onChangePass}
                            value={pass}
                            style={{ height: 56, width: '90%', fontSize: 18, backgroundColor: '#ECF0F3', fontFamily: 'Times New Roman', borderRadius: 10, marginBottom: 0, marginTop: 10 }}
                        />
                        <TextInput
                            textAlign={'left'}
                            clearTextOnFocus={true}
                            placeholder="  Nhập Lại Mật Khẩu"
                            secureTextEntry={true}
                            value={pass2}
                            onChangeText={onChangePass2}

                            style={{ height: 56, width: '90%', fontSize: 18, backgroundColor: '#ECF0F3', fontFamily: 'Times New Roman', borderRadius: 10, marginBottom: 0, marginTop: 10 }}
                        />

                        <TouchableOpacity onPress={onRegist} style={{ height: 48, width: '88%', borderRadius: 30, marginBottom: 5, marginTop: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: "#EB9B00" }}>
                            <Text style={{ fontSize: 18, color: 'white' }}>Đăng Ký</Text>
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Text style={{ fontSize: 16 }}>Bạn đã có tài khoản?</Text>
                            <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => navigation.navigate('login')}>
                                <Text style={{ fontSize: 16, color: '#EB9B00', fontWeight: 'bold' }}>Đăng nhập ngay!</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}
