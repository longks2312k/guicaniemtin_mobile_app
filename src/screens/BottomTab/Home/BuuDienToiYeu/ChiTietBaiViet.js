import React from 'react'
import { View, Text, Image, ImageBackground, ScrollView, TouchableOpacity,StyleSheet } from 'react-native'

import { icons, images } from '../../../../../constants';

import HTMLView from 'react-native-htmlview';

export default function ChiTietBaiViet({ navigation, route }) {
  const { data } = route.params;
  console.log('t', data)
  return (
    <ScrollView style={styles.container}>
      <View style={{ marginBottom: 26, justifyContent: 'center', alignItems: 'center' }}>
        <ImageBackground
          style={styles.imgbgr}
          source={{uri: data?.image}}
        >
        <View style={{flex:1,flexDirection:'row'}}>
          <TouchableOpacity style={styles.touch} onPress={() => navigation.goBack()}>
            <Image style={{ height: 30, width: 30, tintColor: 'orange', justifyContent: 'center', alignContent: 'center',marginRight:4,}} source={icons.ArrowLeft1} />
          </TouchableOpacity>
          <View style={{flex:9.5}}></View>
          <TouchableOpacity style={styles.touch1} onPress={() => navigation.popToTop()}>
            <Image style={{ height: 24, width: 24, tintColor: 'orange', justifyContent: 'center', alignContent: 'center'}} source={icons.Home} />
          </TouchableOpacity>
        </View>
        </ImageBackground>
      </View>
      <Text style={{ fontWeight: '500', color: 'black', fontSize: 22, lineHeight: 22, textAlign: 'justify', paddingHorizontal: 15 }}>{data?.title}</Text>
      <Text style={{ fontWeight: '400', fontSize: 14, lineHeight: 22, textAlign: 'justify', paddingHorizontal: 15 }}>{data?.created_at}</Text>
      <View style={{ padding: 15 }}>
        <Text
          style={{
            fontWeight: '500',
            fontSize: 18,
            textAlign: 'justify',
            color: 'black',
          }}>
        </Text>
        <HTMLView
          value={data.content}
          stylesheet={styles.HTML}
        />
      </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imgbgr:{
    height: 236, 
    width: '100%',
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  touch:{
    borderRadius: 20,
    height: 36, 
    width: 36, 
    backgroundColor: 'white',
    justifyContent: 'center', 
    alignItems: 'center',
    flex:1,
    marginLeft:5,
    marginTop:5
  },
  touch1:{
    borderRadius: 20,
    height: 36, 
    width: 36, 
    backgroundColor: 'white',
    justifyContent: 'center', 
    alignItems: 'center',
    flex:1,
    marginRight:5,
    marginTop:5
  },
  text:{
    fontWeight: '400', 
    fontSize: 17, 
    lineHeight: 22, 
    textAlign: 'justify', 
    marginBottom: 16,
  }
});
