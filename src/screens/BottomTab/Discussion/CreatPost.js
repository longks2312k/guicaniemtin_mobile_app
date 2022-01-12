import React, { useState, useEffect } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, TextInput, Modal } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CheckBox from '@react-native-community/checkbox';
import { icons } from '../../../../constants';

import { postAddTopicApi } from '../../../Ultils/async';
import { getCategoriesApi } from '../../../Ultils/async';

export default function CreatPost({ navigation }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const onChangeTitle = (val) => setTitle(val);
    const onChangeContent = (val) => setContent(val);

    const onShare = async () => {
        try {
            let tagsID = tags.map(id => id.id)
            console.log('tagsID', tagsID);
            const response = await postAddTopicApi({ title: title, content: content, categories: tagsID });
            console.log(response);
            if (response.data.code == 200) {
                alert('Thêm thành công!');
            }
            else {
                alert('Lỗi.')
            }
        }
        catch (error) {
            console.error(error.response);
        }
    };

    //lay du lieu categories
    const [categories, setCategories] = useState([]);


    //Modal
    const [modalEdit, setModalEdit] = useState(false);
    const onShowCateModal = () => {
        setModalEdit(true);
    };
    //Checkbox
    const [isChecked, setIsChecked] = useState(false)
    const [tags, setTags] = useState([])
    const OnAddToListCate = (a) => {
        // let index = categories.findIndex(val => val.id === a.id);
        if (a.checked == false) {
            a.checked = true
        }
        else {
            a.checked = false;
        }
        let newCate = categories.filter(b => b.checked == true);
        console.log('newcate', newCate);
        setTags(newCate);
    }

    //Xoa tag
    const onRemoveTag = (tag) => {
        let newTags = tags.filter(e => e !== tag)
        setTags(newTags);
    }


    const [refreshing, setRefreshing] = React.useState(false);
    useEffect(() => {
        const getCategories = async () => {
            let data2 = await getCategoriesApi();
            let data3 = [...data2.data.data.list.map((val) => ({ ...val, checked: false }))]
            console.log('cate', data3);
            console.log('check', data3[1].checked);
            setCategories(data3);
        };
        getCategories()
    }, []);


    return (
        <ScrollView style={{ backgroundColor: '#D4DCE4' }}>
            <View style={{ backgroundColor: '#FFE8D1', height: 48, flexDirection: 'row' }}>
                <TouchableOpacity style={{ width: '15%' }} onPress={() => navigation.goBack()}>
                    <Image source={icons.ArrowLeft1} style={{ height: 32, width: 32, left: 10, top: 5.33 }} />
                </TouchableOpacity>
                <View style={{ width: '70%', top: 8, alignItems: 'center' }} >
                    <Text style={{ fontSize: 18, fontWeight: '500', color: 'black' }}>Chi tiết bài viết</Text>
                </View>
                <TouchableOpacity style={{ width: '15%', left: 20, top: 10 }} onPress={() => navigation.popToTop()}>
                    <Image style={{ height: 24, width: 24 }} source={icons.Home} />
                </TouchableOpacity>
            </View>
            <View style={{ backgroundColor: '#D4DCE4' }}>
                {/* Tiêu đề */}
                <View
                    style={{
                        flexDirection: 'column',
                        backgroundColor: '#FFFFFF',
                        paddingVertical: 10,
                        paddingHorizontal: 16,
                        marginBottom: 5
                    }}>
                    <Text
                        style={{
                            fontSize: 16,
                            color: 'black',
                            fontWeight: '600'
                        }}>Tiêu đề</Text>
                    <TextInput
                        style={{
                            fontSize: 14,
                            color: 'black',
                            fontFamily: 'Times New Roman',
                            fontWeight: '600',
                            textAlign: 'left',
                            padding: 0
                        }}
                        onChangeText={onChangeTitle}
                        multiline={true}
                        placeholder={"Nhập tiêu đề..."}
                        placeholderTextColor={'#919EB0'}
                    >
                    </TextInput>
                </View>

                {/* Nội dung */}
                <View style={{
                    flexDirection: 'column',
                    backgroundColor: '#FFFFFF',
                    paddingVertical: 10,
                    paddingHorizontal: 16,
                    marginBottom: 5,
                    minHeight: 150
                }}>
                    <Text style={{
                        fontSize: 16,
                        color: 'black',
                        fontWeight: '600'
                    }}>
                        Nội dung
                    </Text>
                    <TextInput
                        style={{
                            fontSize: 16,
                            color: 'black',
                            fontFamily: 'Times New Roman',
                            fontWeight: '600',
                            textAlign: 'justify',
                            padding: 0,
                        }}
                        onChangeText={onChangeContent}
                        multiline={true}
                        placeholder={"Nhập nội dung"}
                        placeholderTextColor={'#919EB0'}
                    >
                    </TextInput>
                </View>

                {/* Chọn Tag */}
                <View
                    style={{
                        flexDirection: 'column',
                        backgroundColor: '#FFFFFF',
                        paddingVertical: 10,
                        paddingHorizontal: 16,
                        marginBottom: 5,
                        minHeight: 150,
                    }}
                >
                    <Text
                        style={{
                            color: 'black',
                            fontWeight: '600',
                            fontSize: 16,
                            marginBottom: 8,
                        }}
                    >
                        Chọn các tag danh mục bài viết
                    </Text>
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#ECF0F3',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 16,
                            paddingVertical: 14,
                            borderRadius: 5,
                            marginBottom: 14,
                        }}
                        onPress={() => onShowCateModal(true)}
                    >
                        <Text
                            style={{
                                color: '#6D7989',
                                fontWeight: '400',
                                fontSize: 14
                            }}
                        >
                            Chọn loại danh mục
                        </Text>
                        <Image source={icons.Arrow_Down} style={{ height: 24, width: 24 }} />
                    </TouchableOpacity>


                    <View
                        style={{
                            flexDirection: 'row',
                            borderBottomWidth: 1,
                            borderColor: '#ECF0F3',
                            flexWrap: 'wrap',
                        }}
                    >
                        {tags.map((tag, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => onRemoveTag(tag)}
                                key={tag.id}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    backgroundColor: tag.color,
                                    paddingVertical: 8,
                                    paddingHorizontal: 8,
                                    borderRadius: 4,
                                    marginRight: 10,
                                    marginBottom: 5
                                }}
                            >
                                <Text
                                    style={{
                                        color: 'black',
                                        fontWeight: '700',
                                        fontSize: 12,
                                        marginRight: 5
                                    }}
                                >
                                    {tag.name}
                                </Text>
                                <Image source={icons.Exit} style={{ height: 12, width: 12 }} />
                            </TouchableOpacity>
                        ))

                        }


                    </View>
                    <View
                        style={{
                            paddingTop: 8,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}
                        >
                            <TouchableOpacity style={{ height: 24, width: 24, marginRight: 20 }}>
                                <Image source={icons.Pin} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ height: 24, width: 24, marginRight: 20 }}>
                                <Image source={icons.Picture} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginRight: 15 }}>
                                <FontAwesome name="bold" size={15} color="#000000" />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginRight: 15 }}>
                                <FontAwesome name="italic" size={15} color="#000000" />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <FontAwesome name="underline" size={15} color="#000000" />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            style={{
                                paddingHorizontal: 34.5,
                                backgroundColor: '#D4DCE4',
                                paddingVertical: 9,
                                borderRadius: 20
                            }}
                            onPress={onShare}>
                            <Text style={{ fontSize: 18, fontWeight: '600', }}>
                                Gửi
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <Modal
                visible={modalEdit}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalEdit(false)}
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
                        }}>
                        <View
                            style={{
                                marginBottom: 20
                            }}
                        >
                            {categories && categories.map(index => (
                                <View
                                    key={index.id}
                                    style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <CheckBox
                                        disabled={false}
                                        value={index.checked}
                                        onValueChange={() => OnAddToListCate(index)}
                                        tintColors={'#000'}
                                    />
                                    <Text
                                        style={{ color: 'black' }}
                                    >
                                        {index.name}{index.checked}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                </View>
            </Modal>
        </ScrollView>
    )
}
