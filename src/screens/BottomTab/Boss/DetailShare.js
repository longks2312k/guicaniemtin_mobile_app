import React, { useState, useEffect } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, TextInput } from 'react-native'

import { icons } from '../../../../constants';

import { putEdit } from '../../../Ultils/async';

export default function DetailShare({ navigation, route }) {
    const { detail } = route.params;
    const [content, setContent] = useState('');
    const onChangeContent = (val) => setContent(val);

    const onEdit = (detail) => async () => {
        const response = await putEdit(detail.id, { content: content });
        console.log('rs edit share', response);
        if (response.data.code == 200) {
            navigation.goBack();
            alert('Sửa thành công!');
        }
        else {
            alert('Bạn không thể sửa bài viết này!')
        }
    };
    return (
        <View style={{}}>
            <View
                style={{
                    backgroundColor: '#FFE8D1',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    paddingHorizontal: 10,
                    paddingVertical: 8
                }}
            >
                <TouchableOpacity style={{ alignItems: 'center', marginLeft: -14 }} onPress={() => navigation.goBack()}>
                    <Image source={icons.ArrowLeft1} />
                </TouchableOpacity>
                <View style={{ alignItems: 'center' }} >
                    <Text style={{ fontSize: 18, fontWeight: '500', color: 'black' }}>Chi tiết bài viết</Text>
                </View>
                <TouchableOpacity style={{ alignItems: 'center', }}>
                    <Text
                        style={{ fontSize: 18, fontWeight: 'bold', color: '#000' }}
                        onPress={onEdit(detail)}
                    >
                        Lưu
                    </Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={{}}>
                <View style={{ padding: 10 }}>
                    <View >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                                source={{ uri: detail.author.avatar }}
                                style={{ width: 40, height: 40, borderRadius: 50 }}
                            />
                            <View style={{ marginLeft: 8 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black' }}>
                                    {detail.author.full_name}
                                </Text>
                                <Text style={{ fontSize: 14, color: 'black' }}>
                                    {detail.created_at}
                                </Text>
                            </View>
                        </View>
                        <View style={{ paddingVertical: 8, flexDirection: 'row' }}>
                            <TextInput
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    fontSize: 18,
                                    color: 'black',
                                    fontFamily: 'Times New Roman',
                                    fontWeight: 'normal',
                                    lineHeight: 28,
                                    textAlign: 'justify',
                                    padding: 10
                                }}
                                onChangeText={onChangeContent}
                                multiline={true}
                            >
                                {detail.content}
                            </TextInput>
                        </View>
                    </View>
                    <View
                        style={{
                            width: '100%',
                            flexDirection: 'row',
                            borderTopWidth: 1,
                            borderColor: '#D4DCE4',
                            paddingVertical: 8,
                        }}>

                    </View>
                </View>
            </ScrollView>
        </View>
    )
};
