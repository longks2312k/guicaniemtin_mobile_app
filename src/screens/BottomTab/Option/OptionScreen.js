import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image, StatusBar,
    ScrollView,
    ImageBackground,
    SafeAreaView,
} from 'react-native';

import { icons, images } from '../../../../constants';

export default function OptionScreen({ navigation }) {

    return (
        <View style={{ flex: 1, flexDirection: 'column', paddingHorizontal: 16, paddingTop: 44, backgroundColor: 'white' }}>

            <TouchableOpacity onPress={() => navigation.navigate('AboutUs')} style={{ flexDirection: 'row', borderBottomWidth: 1, paddingBottom: 25, borderColor: '#D4DCE4', marginBottom: 30 }}>
                <Image
                    style={{ height: 28, width: 28, marginRight: 17 }}
                    source={icons.Star}
                />
                <Text style={{ fontSize: 18, fontWeight: '600', color: 'black',marginTop:3 }}>Về chúng tôi</Text>
                <Image
                    style={{ height: 24, width: 24, position: 'absolute', right: 15 ,top:3 }}
                    source={icons.ArrowRight}
                />
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: 'row', borderBottomWidth: 1, paddingBottom: 25, borderColor: '#D4DCE4', marginBottom: 30 }}
                onPress={() => navigation.navigate('ContractAndSupport')}
            >
                <Image
                    style={{ height: 28, width: 28, marginRight: 17 }}
                    source={icons.Call}
                />
                <Text style={{ fontSize: 18, fontWeight: '600', color: 'black' ,marginTop:3}}>Liên hệ và hỗ trợ</Text>
                <Image
                    style={{ height: 24, width: 24, position: 'absolute', right: 15,top:3 }}
                    source={icons.ArrowRight}
                />
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: 'row', borderBottomWidth: 1, paddingBottom: 25, borderColor: '#D4DCE4', marginBottom: 30 }}
                onPress={() => navigation.navigate('Contact')}>
                <Image
                    style={{ height: 28, width: 28, marginRight: 17 }}
                    source={icons.Profile}
                />
                <Text style={{ fontSize: 18, fontWeight: '600', color: 'black' ,marginTop:3}}>Danh bạ</Text>
                <Image
                    style={{ height: 24, width: 24, position: 'absolute', right: 15 ,top:3 }}
                    source={icons.ArrowRight}
                />
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: 'row', paddingBottom: 20, borderColor: '#D4DCE4' }}>
                <Image
                    style={{ height: 24, width: 24, marginRight: 17 }}
                    source={icons.Send}
                />
                <Text style={{ fontSize: 18, fontWeight: '600', color: 'black' }}>Mạng xã hội</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', marginBottom: 20, marginLeft: 20 }}>
                <TouchableOpacity>
                    <Image
                        style={{ height: 32, width: 32, marginHorizontal: 20 }}
                        source={icons.Pinterest}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image
                        style={{ height: 32, width: 32, marginHorizontal: 20 }}
                        source={icons.LinkedIn}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image
                        style={{ height: 32, width: 32, marginHorizontal: 20 }}
                        source={icons.Instagram}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image
                        style={{ height: 32, width: 32, marginHorizontal: 20 }}
                        source={icons.Zalo}
                    />
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', marginLeft: 20 }}>
                <TouchableOpacity>
                    <Image
                        style={{ height: 32, width: 32, marginHorizontal: 20 }}
                        source={icons.Youtube}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image
                        style={{ height: 32, width: 32, marginHorizontal: 20 }}
                        source={icons.FaceBook}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image
                        style={{ height: 32, width: 32, marginHorizontal: 20 }}
                        source={icons.Twitter}
                    />
                </TouchableOpacity>
            </View>
        </View>
        // <ContractAndSupport />
    )
}
