import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    ImageBackground,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    FlatList,
    Dimensions,
    RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { icons, images } from '../../../../../constants';
import { getPlay, getDetailBlog } from '../../../../Ultils/async';

const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
const { height, width } = Dimensions.get('window');
const itemWidth = (width - 40);

export default function AnChoi({ navigation }) {
    const [play, setPlay] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const callGetPlay = async () => {
        // call api
        let data = await getPlay();
        console.log('Play api', data.data.data.list)
        setPlay(data.data.data.list);
    };

    const onMoveToDetail = (item) => async () => {
    try {
        const response = await getDetailBlog(item.id);
        navigation.navigate('chi tiết bài viết', { data: response.data.data.details })
        }
        catch (error) {
        console.error(error.response);
        }
    };

    useEffect(() => {
        callGetPlay();
    }, [refreshing]);

    const renderItem = ({ item }) => (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={onMoveToDetail(item)}
                style={styles.Touch}>
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Image source={{ uri: item.image }} style={styles.Image} />
                    </View>
                    <View
                        style={styles.ViewText}>
                        <Text
                            ellipsizeMode="tail"
                            numberOfLines={2}
                            style={{ fontSize: 16, fontWeight: 'bold', color: 'black', width: itemWidth * 0.55, }}>
                            {item.title}
                        </Text>
                        <View style={{ flexDirection: 'row', width: itemWidth * 0.55, }}>
                            <Text style={{ fontSize: 14 }}>
                                {item.created_at}
                            </Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 14, marginRight: 5 }}>
                                    {item.author}
                                </Text>
                                <Text style={{ fontSize: 14 }}>
                                    {item.created_at}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView styles={styles.container}>
            <StatusBar backgroundColor="#FFE8D1" barStyle="dark-content" />
            <View
                style={styles.header}>
                <TouchableOpacity
                    style={styles.Icon}
                    onPress={() => navigation.goBack()}>
                    <Image
                        source={icons.ArrowLeft1}
                        style={{ height: 30, width: 30, marginRight: 10 }}
                    />
                </TouchableOpacity>
                <View style={{ width: '70%', alignItems: 'center', flex: 6 }}>
                    <Text
                        style={styles.headerName}>
                        Ăn Chơi
                    </Text>
                </View>
                <TouchableOpacity
                    style={styles.Icon}
                    onPress={() => navigation.popToTop()}>
                    <Image
                        style={{ height: 24, width: 24, marginRight: 5 }}
                        source={icons.home}
                    />
                </TouchableOpacity>
            </View>
            <View style={{ justifyContent: 'space-around', alignItems: 'center' }}>
                <FlatList
                    data={play}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        />
                    }
                    style={{ marginBottom: 10 }}
                />
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    Image: {
        height: 75,
        width: itemWidth * 0.35,
        borderRadius: 8,
    },
    Icon: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        backgroundColor: '#FFE8D1'
        , height: 48,
        flexDirection: 'row'
    },
    Touch: {
        flex: 1,
        padding: 5,
        backgroundColor: 'white',
        marginTop: 8,
        width: itemWidth,
    },
    ViewText: {
        backgroundColor: 'white',
        width: itemWidth * 0.55,
        borderRadius: 5,
        marginLeft: 10,
        marginTop: 3,
    },
    headerName: {
        fontSize: 20,
        fontWeight: '500',
        color: 'black',
        marginTop: 10,
    }
});