import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    ImageBackground,
    SafeAreaView,
    StatusBar,
} from 'react-native';

import { icons, images } from '../../../../constants';

export default function ContactAndSupport({ navigation }) {
    return (
        <SafeAreaView>
            <StatusBar backgroundColor='#FFE8D1'
                barStyle='dark-content' />
            <View style={{ backgroundColor: '#FFE8D1', height: 48, flexDirection: 'row' }}>
                <TouchableOpacity style={{ width: '15%' }} onPress={() => navigation.goBack()}>
                    <Image source={icons.ArrowLeft1} style={{ height: 32, width: 32, left: 10, top: 5.33 }} />
                </TouchableOpacity>
                <View style={{ width: '70%', top: 8, alignItems: 'center' }} >
                    <Text style={{ fontSize: 18, fontWeight: '500', color: 'black' }}>Liên hệ và hỗ trợ</Text>
                </View>

                <TouchableOpacity style={{ width: '15%', left: 20, top: 10 }} onPress={() => navigation.popToTop()}>
                    <Image style={{ height: 24, width: 24 }} source={icons.Home} />
                </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'column', paddingHorizontal: 16, paddingVertical: 24, backgroundColor: 'white', height: '100%' }}>
                <View style={{ flexDirection: 'column', borderBottomWidth: 1, borderColor: '#D4DCE4', paddingBottom: 16, marginBottom: 17 }}>
                    <TouchableOpacity style={{ flexDirection: 'row', marginBottom: 1 }}>
                        <Image
                            style={{ height: 24, width: 24, marginRight: 8 }}
                            source={icons.Message}
                        />
                        <Text
                            style={{ color: '#144E8C', fontSize: 16, fontWeight: '600', fontFamily: 'body semi bold' }}
                        >
                            hotrotaikhoan@vnpost.vn
                        </Text>
                    </TouchableOpacity>
                    <Text style={{ color: '#202833', fontSize: 16, fontWeight: '400', fontFamily: 'body semi bold' }}>
                        Guicaniemtin luôn sẵn sàng giải đáp và hỗ trợ mọi vướng mắc của độc giả về tài khoản trong quá trình sử dụng Website.
                    </Text>
                </View>
                <View style={{ flexDirection: 'column', borderBottomWidth: 1, borderColor: '#D4DCE4', paddingBottom: 16, marginBottom: 17 }}>
                    <TouchableOpacity style={{ flexDirection: 'row', marginBottom: 1 }}>
                        <Image
                            style={{ height: 24, width: 24, marginRight: 8 }}
                            source={icons.Message}
                        />
                        <Text
                            style={{ color: '#144E8C', fontSize: 16, fontWeight: '600' }}
                        >
                            donggopnoidung@vnpost.vn
                        </Text>
                    </TouchableOpacity>
                    <Text style={{ color: '#202833', fontSize: 16, fontWeight: '400' }}>
                        Guicaniemtin rất hoan nghênh độc giả gửi bài viết, thông tin và góp ý cho chúng tôi.
                    </Text>
                </View>
                <View style={{ flexDirection: 'column', borderColor: '#D4DCE4', paddingBottom: 16, marginBottom: 17 }}>
                    <TouchableOpacity style={{ flexDirection: 'row', marginBottom: 1 }}>
                        <Image
                            style={{ height: 24, width: 24, marginRight: 8 }}
                            source={icons.Location}
                        />
                        <View style={{ marginRight: 110 }}>
                            <Text
                                style={{ color: '#144E8C', fontSize: 16, fontWeight: '600' }}
                            >
                                Số 05 đường Phạm Hùng - Mỹ Đình 2 - Nam Từ Liêm - Hà Nội - Việt Nam
                            </Text>
                        </View>

                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}
