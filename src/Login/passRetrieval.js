import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, SafeAreaView, TextInput } from 'react-native'
import RnIcon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Ionicons';

import { icons, images } from '../../constants';

import { postPasswordRetrieval } from '../Ultils/async';

export default function PassRetrieval({ navigation }) {

    const [acc, setAcc] = useState()
    const [mail, setMail] = useState()
    const onChangeAcc = (val) => setAcc(val)
    const onChangeMail = (val) => setMail(val)

    const onPasswordRetrieval = async () => {
        try {
            const response = await postPasswordRetrieval({ username: acc, email: mail });
            console.log('rs', response.data); // data tu api tra ve
            if (response.data.code == 200) {
                navigation.navigate('login')
                alert('Kiểm tra mail của bạn!')
            }
            else {
                alert('Thông tin tài khoản hoặc email không chính xác!')
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
                        <Text style={{ fontSize: 22, fontWeight: 'bold', fontFamily: 'Times New Roman' }}>Lấy lại mật khẩu</Text>
                        <Image
                            style={{ height: 87.6, width: 159.6, marginBottom: 10, marginTop: 15 }}
                            source={icons.Logo}
                        />
                        <TextInput
                            textAlign={'left'}
                            clearTextOnFocus={true}
                            placeholder="  Tài khoản"
                            onChangeText={onChangeAcc}
                            value={acc}
                            secureTextEntry={false}
                            style={{ height: 56, width: '90%', fontSize: 18, backgroundColor: '#ECF0F3', fontFamily: 'Times New Roman', borderRadius: 10, marginBottom: 0, marginTop: 10 }}
                        />
                        <TextInput
                            textAlign={'left'}
                            clearTextOnFocus={true}
                            placeholder="  Email"
                            onChangeText={onChangeMail}
                            value={mail}
                            secureTextEntry={false}
                            style={{ height: 56, width: '90%', fontSize: 18, backgroundColor: '#ECF0F3', fontFamily: 'Times New Roman', borderRadius: 10, marginBottom: 0, marginTop: 10 }}
                        />

                        <TouchableOpacity style={{ height: 48, width: '88%', borderRadius: 30, marginBottom: 5, marginTop: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: "#EB9B00" }}
                            onPress={onPasswordRetrieval}>
                            <Text style={{ fontSize: 18, color: 'white' }}>Cập nhật mật khẩu</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}
