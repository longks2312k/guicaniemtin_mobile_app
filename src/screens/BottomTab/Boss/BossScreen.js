import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';

import { icons, images } from '../../../../constants';
import { useSelector, useDispatch } from "react-redux";

import { getBossListApi, getLeadListApi } from '../../../Ultils/async';


export default function BossScreen({ navigation, props }) {
    const dispatch = useDispatch();
    const infoUser = useSelector((store) => store.itemReducer.items);
    const MoveToSepOi = (item) => () => {
        navigation.navigate('SepOi', { sepoi: item });
        dispatch({ type: 'BOSS_LIST', data: { ...item } });
    }

    const [bossList, setBossList] = useState([]);
    const [leadlist, setLeadList] = useState([]);

    const getBossList = async () => {
        // call api
        let param = {}
        let data = await getBossListApi(param)
        console.log('boss api', data.data.data.list)
        setBossList(data.data.data.list)
    }
    const getLeadList = async () => {
        // call api
        let param = {}
        let data = await getLeadListApi(param)
        console.log('boss api', data.data.data.list)
        setLeadList(data.data.data.list)
    }
    useEffect(() => {
        getBossList()
        getLeadList()
    }, []);

    return (
        <SafeAreaView style={{ backgroundColor: '#E5E5E5', flex: 1 }}>
            <StatusBar backgroundColor='#FFBF3F'
                barStyle='dark-content' />
            {
                !infoUser.avatar ?
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
                        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                            <View
                                style={{
                                    flexDirection: "row",
                                    flexWrap: "wrap",
                                    flex: 1,
                                    justifyContent: 'space-around',
                                    marginBottom: 10,
                                }}
                            >
                                {bossList.map((item) => (
                                    <TouchableOpacity
                                        style={{ justifyContent: 'center', alignContent: 'space-around', marginBottom: 20 }}
                                        key={item.id}
                                        onPress={MoveToSepOi(item)}
                                    >
                                        <Image style={styles.Image}
                                            source={{ uri: item.avatar }}
                                        />
                                        <View style={styles.Info_Boss}>
                                            <View style={styles.Name_Boss}>
                                                <Text style={styles.TxtNameBoss}>{item.name}</Text>
                                            </View>
                                            <View style={styles.Message_Boss}>
                                                <Image
                                                    source={icons.ChatBoss}
                                                    style={styles.IconsMess}
                                                />
                                                <Text style={styles.Message}>20</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                ))}

                            </View>

                            <ScrollView showsHorizontalScrollIndicator={false} horizontal style={{ marginTop: 8 }}>
                                {leadlist.map((item) => (
                                    <TouchableOpacity
                                        key={item.id}
                                        onPress={MoveToSepOi(item)}
                                        style={styles.Manager}
                                    >
                                        <Image
                                            source={{ uri: item.avatar }}
                                            style={{ width: 100, height: 100, borderRadius: 100 / 2 }}
                                        />
                                        <Text style={styles.TxtNameManager}>{item.name}</Text>
                                        <Text style={styles.TxtPosition}>{item.position}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </ScrollView>
                    )
            }
        </SafeAreaView >
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
        paddingTop: 10,
    },
    Image: {
        height: 200,
        width: 165,
        borderRadius: 8,
    },
    Boss: {
        height: 200,
        width: 165,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 20,
        marginTop: 5,
        marginBottom: 5,
    },
    Info_Boss: {
        position: 'absolute',
        top: 172,
        height: 20,
        flexDirection: 'row',
    },
    Name_Boss: {
        width: 100,
        height: 20,
        alignItems: 'center',
        color: 'black',
        alignItems: 'center',
        justifyContent: 'center',

    },
    Message_Boss: {
        backgroundColor: '#FCB814',
        width: 45,
        height: 20,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        borderRadius: 16,
    },
    TxtNameBoss: {
        color: '#FFFFFF',
        fontSize: 15,
    },
    Message: {
        color: '#FFFFFF',
        fontSize: 10,
        marginRight: 3,
    },
    IconsMess: {
        marginLeft: 3,
        width: 10,
        height: 10,
    },
    Manager: {
        width: 80,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 15,
        marginBottom: 60,
    },
    TxtNameManager: {
        fontSize: 12,
        width: 100,
        height: 30,
        textAlign: 'center',
        color: '#144E8C',
    },
    TxtPosition: {
        fontSize: 10,
        width: 70,
        height: 15,
        textAlign: 'center',
    }
})
