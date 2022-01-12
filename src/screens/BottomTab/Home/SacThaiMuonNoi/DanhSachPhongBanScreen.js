import React, { Component, useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  TextInput,
  Dimensions,
  FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { images, icons } from '../../../../../constants';
import { getUnitsApi, getSearch } from '../../../../Ultils/async';

const { height, width } = Dimensions.get('window');
const itemWidth = (width - 40);

export default function DanhSachPhongBanScreen({ navigation }) {
  const [postOffice, setPostOffice] = useState([]);
  const [content, setContent] = useState('');
  const onChangeContent = (val) => setContent(val);

  const onSearch = async () => {
      const data = await getSearch({q: content, type: 'unit', size: '5'});
      setPostOffice(data.data.data.unit.list);
    };

  const callGetUnitsApi = async () => {
    const data = await getUnitsApi();
    console.log(data.data.data.list);
    setPostOffice(data.data.data.list);
  }
  useEffect(() => {
    callGetUnitsApi();
  }, [])
  return (
    <View>
      <ScrollView style={{ backgroundColor: 'white' }} showsVerticalScrollIndicator={false}>
        <View style={{
          flexDirection: "row",
          flexWrap: "wrap",
          flex: 1,
          justifyContent: 'space-around',
          alignContent: 'space-around',
        }}>
          <ImageBackground
            source={images.Login}
            resizeMode="stretch"
            style={styles.image}>
            <View
          style={{
            margin: 20,
            padding: 10,
            marginBottom: 20,
            marginTop: 100,
            backgroundColor: '#ECF0F3',
            flexDirection: 'row',
            width: '90%',
            height: height * 0.06,
            justifyContent: 'space-between',
            borderRadius: 25,
          }}>
          <TextInput
            style={{
              width: width * 0.7,
              padding: 4,
              fontSize: 16,
              color: 'black',
              fontFamily: 'Times New Roman',
              fontWeight: 'normal',
              textAlign: 'justify',
            }}
            onChangeText={onChangeContent}
            placeholder="Tìm kiếm"
            value={content}
          />
          <TouchableOpacity style={{marginTop: 2}} onPress={onSearch}>
            <Image
              source={icons.Send}
              style={{height: height * 0.03, width: width * 0.07}}
            />
          </TouchableOpacity>
        </View>
          </ImageBackground>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "400", color: "black", marginLeft: 15, marginTop: 10 }}>Danh Sách Bưu Điện "{content}"</Text>
          <View style={{
            flexDirection: "row",
            flexWrap: "wrap",
            flex: 1,
            justifyContent: 'space-around'
          }}>
            {postOffice.map((item) => (

              <TouchableOpacity
                style={{ justifyContent: 'center', alignContent: 'space-around', }}
                key={item.id}
                onPress={() => navigation.navigate("Chi tiết phòng ban")}
              >
                <Image style={{ width: itemWidth / 2, height: itemWidth / 2, borderRadius: 8 }}
                  source={{ uri: item.logo }}
                />
                <Text style={{ marginTop: 9, color: 'black', fontSize: 14, fontWeight: '400', width: itemWidth / 2, height: 50 }} >{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

        </View>
        <View style={{ height: 100 }}></View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  image2: {
    borderRadius: 10,
    height: 100,
    width: 150,
  },
  text1: {
    fontSize: 20,
    color: 'black',
    width: 200,
    paddingHorizontal: 5,
  },
  image1: {
    borderRadius: 10,
    height: 150,
    width: 200,
  },

  scroll: {},
  size: {
    fontFamily: 'Inter',
    fontWeight: 'bold',
    fontSize: 25,
    paddingTop: 30,
    color: 'black',
  },
  image: {
    flex: 1,
    width: '100%',
    height: 300,
  },
  input: {
    marginTop: 100,
    with: 100,
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: 380,
    paddingLeft: 25,
    marginRight: 15,
    marginLeft: 15,
    placeholder: 'Search',
  },
  icon: {
    paddingTop: 8,
    color: 'black',
  },
});
