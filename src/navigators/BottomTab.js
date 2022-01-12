import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, StatusBar,Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

import Home from '../screens/BottomTab/Home/HomeScreen';
import HomeOptions from '../screens/BottomTab/Home/HomeOptions';
import Discussion from '../screens/BottomTab/Discussion/DiscussionScreen';
import Boss from '../screens/BottomTab/Boss/BossScreen';
import Option from '../screens/BottomTab/Option/OptionScreen';
import Login from '../Login/Login';
import Regist from '../Login/Regist';
import PassRetrieval from '../Login/passRetrieval';
import TonVinh from '../screens/BottomTab/Home/BuuDienToiYeu/TonVinh';
import ChiTietBaiViet from '../screens/BottomTab/Home/BuuDienToiYeu/ChiTietBaiViet';
import ChiTietPhongBan from '../screens/BottomTab/Home/SacThaiMuonNoi/ChiTietPhongBanScreen';
import Album from '../screens/BottomTab/Home/ResourceScreen/AlbumScreen'
import Video from '../screens/BottomTab/Home/ResourceScreen/VideoScreen'
import ListImages from '../screens/BottomTab/Home/ResourceScreen/ListImages';
import Webview from '../screens/BottomTab/Home/ResourceScreen/Webview'
import LichSu from '../screens/BottomTab/Home/BuuDienToiYeu/LichSu';
import AnChoi from '../screens/BottomTab/Home/BuuDienToiYeu/AnChoi';
import NgoNghieng from '../screens/BottomTab/Home/BuuDienToiYeu/NgoNghieng';
import userProfile from '../Login/userProfile';
import Notification from '../Login/Notifications';
import DetailsBoss from '../screens/BottomTab/Boss/DetailsBoss';
import SepOiScreen from '../screens/BottomTab/Boss/SepOiScreen';
import DetailShare from '../screens/BottomTab/Boss/DetailShare';
import ContactAndSupport from '../screens/BottomTab/Option/ContactAndSupport';
import Contact from '../screens/BottomTab/Option/Contact';
import ChiTietBaiVietD from '../screens/BottomTab/Discussion/ChiTietBaiVietD';
import All from '../screens/BottomTab/Discussion/All';
import CreatPost from '../screens/BottomTab/Discussion/CreatPost';
import AboutUs from '../screens/BottomTab/Option/AboutUs';
import EditTopic from '../screens/BottomTab/Discussion/EditTopic';
import EditComment from '../screens/BottomTab/Discussion/EditComment';
import CommentChild from '../screens/BottomTab/Discussion/CommentChild';



import { icons } from '../../constants';



const Tab = createBottomTabNavigator();
const BossStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();
const OptionStack = createNativeStackNavigator();
const DiscussionStack = createNativeStackNavigator();

export default function App() {
    function DiscussionScreen() {
        return (
            <DiscussionStack.Navigator>
                <DiscussionStack.Screen
                    name="Discussion"
                    component={Discussion}
                    options={{ headerShown: false }}
                />
                <DiscussionStack.Screen
                    name="ChiTietBaiVietD"
                    component={ChiTietBaiVietD}
                    options={{ headerShown: false }}
                />
                <DiscussionStack.Screen
                    name="All"
                    component={All}
                    options={{ headerShown: false }}
                />
                <DiscussionStack.Screen
                    name="CreatPost"
                    component={CreatPost}
                    options={{ headerShown: false }}
                />
                <DiscussionStack.Screen
                    name="EditTopic"
                    component={EditTopic}
                    options={{ headerShown: false }}
                />
                <DiscussionStack.Screen
                    name="EditComment"
                    component={EditComment}
                    options={{ headerShown: false }}
                />
                <DiscussionStack.Screen
                    name="CommentChild"
                    component={CommentChild}
                    options={{ headerShown: false }}
                />
            </DiscussionStack.Navigator>

        );

    }

    function OptionScreen({ navigation }) {
        return (
            <OptionStack.Navigator  >
                <OptionStack.Screen name="Option" component={Option} options={{ headerShown: false }} />
                <OptionStack.Screen name="Home" component={HomeMain} options={{ headerShown: false }} />
            </OptionStack.Navigator>
        );
    }

    function BossScreen() {
        return (
            <BossStack.Navigator>
                <BossStack.Screen name="Boss" component={Boss} options={{ headerShown: false }} />
                <BossStack.Screen name="SepOi"
                    component={SepOiScreen}
                    options={{ headerShown: false }}
                />
                <BossStack.Screen name="DetailShare"
                    component={DetailShare}
                    options={{ headerShown: false }}
                />
                <BossStack.Screen name="DetailsBoss"
                    component={DetailsBoss}
                    options={{ headerShown: false }}
                />
            </BossStack.Navigator>
        );
    }

    const { height, width } = Dimensions.get('window');

    function HomeMain() {
        return (
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        height: height * 0.07, paddingHorizontal: 12,
                    }
                }}
            >
                <Tab.Screen name="Trang chủ" component={Home} options={{
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{ backgroundColor: focused ? '#FFE8D1' : '#fff', justifyContent: 'center', flexDirection: 'row', alignItems: 'center', borderRadius: 20, height: height * 0.05, width: width * 0.24 }}>
                            <Image
                                source={icons.Home}
                                resizeMode='contain'
                                style={{
                                    width: 24, height: 24, alignItems: 'center', justifyContent: 'center',
                                    tintColor: focused ? '#E89E0D' : '#D4DCE4'
                                }} />
                            {focused && <Text style={{ color: focused ? '#E89E0D' : '#D4DCE4', fontSize: 12, fontFamily: 'Inter', margin: 5 }}>Trang chủ</Text>}
                        </View>
                    )
                }} />
                <Tab.Screen name="Thảo luận" component={DiscussionScreen} options={{
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{ backgroundColor: focused ? '#FFE8D1' : '#fff', justifyContent: 'center', flexDirection: 'row', alignItems: 'center', borderRadius: 20, height: height * 0.05, width: width * 0.23 }}>
                            <Image
                                source={icons.Disscussion}
                                resizeMode='contain'
                                style={{
                                    width: 24, height: 24, alignItems: 'center', justifyContent: 'center',
                                    tintColor: focused ? '#E89E0D' : '#D4DCE4'
                                }} />
                            {focused && <Text style={{ color: focused ? '#E89E0D' : '#D4DCE4', fontSize: 12, fontFamily: 'Inter', margin: 5 }}>Thảo luận</Text>}
                        </View>
                    )
                }} />
                <Tab.Screen name="Sếp ơi" component={BossScreen} options={{
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{ backgroundColor: focused ? '#FFE8D1' : '#fff', justifyContent: 'center', flexDirection: 'row', alignItems: 'center', borderRadius: 20, height: height * 0.05, width: width * 0.22 }}>
                            <Image
                                source={icons.User}
                                resizeMode='contain'
                                style={{
                                    width: 24, height: 24, alignItems: 'center', justifyContent: 'center',
                                    tintColor: focused ? '#E89E0D' : '#D4DCE4'
                                }} />
                            {focused && <Text style={{ color: focused ? '#E89E0D' : '#D4DCE4', fontSize: 12, fontFamily: 'Inter', margin: 5 }}>Sếp ơi</Text>}
                        </View>
                    )
                }} />
                <Tab.Screen name="Tùy chọn" component={OptionScreen} options={{
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{ backgroundColor: focused ? '#FFE8D1' : '#fff', justifyContent: 'center', flexDirection: 'row', alignItems: 'center', borderRadius: 20, height: height * 0.05, width: width * 0.24 }}>
                            <Image
                                source={icons.Category}
                                resizeMode='contain'
                                style={{
                                    width: 24, height: 24, alignItems: 'center', justifyContent: 'center',
                                    tintColor: focused ? '#E89E0D' : '#D4DCE4'
                                }} />
                            {focused && <Text style={{ color: focused ? '#E89E0D' : '#D4DCE4', fontSize: 12, fontFamily: 'Inter', margin: 5 }}>Tùy chọn</Text>}
                        </View>
                    )
                }} />
            </Tab.Navigator>
        );
    }
    return (
        <NavigationContainer>
            <MainStack.Navigator >
                <MainStack.Screen name="HomeMain" component={HomeMain} options={{ headerShown: false }} />
                <MainStack.Screen name="login" component={Login} options={{ headerShown: false }} />
                <MainStack.Screen name="userProfile" component={userProfile} options={{ headerShown: false }} />
                <MainStack.Screen name="Regist" component={Regist} options={{ headerShown: false }} />
                <MainStack.Screen name="PassWord" component={PassRetrieval} options={{ headerShown: false }} />
                <MainStack.Screen name="Person" component={userProfile} options={{ headerShown: false }} />
                <MainStack.Screen name="Notification" component={Notification} options={{ headerShown: false }} />
                <MainStack.Screen name="ListImages" component={ListImages} options={{ headerShown: false }} />
                <MainStack.Screen name="Danh sách" component={HomeOptions} options={{ headerShown: false, }} />
                <MainStack.Screen name="webview" component={Webview} options={{ headerShown: false }} />
                <MainStack.Screen name="Album" component={Album} options={{ headerShown: false }} />
                <MainStack.Screen name="Video" component={Video} options={{ headerShown: false }} />
                <MainStack.Screen name="Chi tiết phòng ban" component={ChiTietPhongBan} options={{ headerShown: false }} />
                <MainStack.Screen name="Tôn vinh" component={TonVinh} options={{ headerShown: false }} />
                <MainStack.Screen name="Lịch sử" component={LichSu} options={{ headerShown: false }} />
                <MainStack.Screen name="Ăn Chơi" component={AnChoi} options={{ headerShown: false }} />
                <MainStack.Screen name="Ngó Nghiêng" component={NgoNghieng} options={{ headerShown: false }} />
                <MainStack.Screen name="chi tiết bài viết" component={ChiTietBaiViet} options={{ headerShown: false }} />
                <MainStack.Screen name="ContractAndSupport" component={ContactAndSupport} options={{ headerShown: false }} />
                <MainStack.Screen name="AboutUs" component={AboutUs} options={{ headerShown: false }} />
                <MainStack.Screen name="Contact" component={Contact} options={{ headerShown: false }} />
                <MainStack.Screen name="DetailShare" component={DetailShare} options={{ headerShown: false }} />
            </MainStack.Navigator>
        </NavigationContainer>
    );
}
