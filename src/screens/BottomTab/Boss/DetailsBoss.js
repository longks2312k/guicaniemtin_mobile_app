import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, StatusBar, SafeAreaView, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from "react-redux";

import { icons, images } from '../../../../constants';

export default function DetailsBoss({ navigation, route }) {
    const info = useSelector((store) => store.bossReducer.items);
    return (
        <SafeAreaView>
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
                <View style={{ alignItems: 'center' }} >
                    <Image
                        source={{ uri: info.avatar }}
                        style={{ width: 120, height: 120, borderRadius: 120 / 2 }}
                    />
                    <Text style={styles.TxtNameManager}>Sếp {info.full_name}</Text>
                    <Text style={styles.TxtPosition}>{info.position}</Text>
                </View>
                <View style={styles.Info}>
                    <View style={styles.Info1}>
                        <Text style={styles.Txt1}>Vị trí:</Text>
                        <Text style={styles.Txt2}>{info.position}</Text>
                    </View>
                    <View style={styles.Info1}>
                        <Text style={styles.Txt1}>Đơn vị:</Text>
                        <Text style={styles.Txt2}>{info.unit}</Text>
                    </View>
                    <View style={styles.Info1}>
                        <Text style={styles.Txt1}>Ngày sinh:</Text>
                        <Text style={styles.Txt2}>{info.birthday}</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    Container: {
        paddingTop: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 15,
        marginBottom: 60,
    },
    TxtNameManager: {
        marginTop: 16,
        fontSize: 14,
        fontWeight: 'bold',
        width: 220,
        height: 22,
        textAlign: 'center',
        textTransform: 'uppercase',
        color: '#144E8C',
    },
    TxtPosition: {
        fontSize: 14,
        width: 220,
        height: 50,
        color: '#05253D',
        textAlign: 'center',
    },
    Info: {
        marginTop: 32,
        width: 294,
        height: 82,
    },
    Info1: {
        flexDirection: 'row',
        paddingBottom: 8,
    },
    Txt1: {
        width: 85,
        fontSize: 12,
        color: '#6D7989',
    },
    Txt2: {
        width: 218,
        fontSize: 13,
        color: '#202833',
    }
})

