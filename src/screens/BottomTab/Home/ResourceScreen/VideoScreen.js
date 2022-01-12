import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StatusBar,
  ImageBackground,
  RefreshControl,
} from 'react-native';
import { icons } from '../../../../../constants';
import { getGalleriesVideoAllApi } from '../../../../Ultils/async';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
const { height, width } = Dimensions.get('window');
const itemWidth = (width - 40);

export default function AlbumScreen({ navigation }) {
  
  const [galleriesVideoAll, setGalleriesVideoAll] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const callGetGalleriesVideoAll = async () => {
    // call api
    let data = await getGalleriesVideoAllApi();
    console.log('Galleries api', data.data.data.list)
    setGalleriesVideoAll(data.data.data.list);
};
useEffect(() => {
  callGetGalleriesVideoAll();
}, []);

  const renderItem = ({ item }) => (
        <View style={styles.Item}>
          <TouchableOpacity style={{ flex: 1}} onPress={onMoveToView(item)}>
            <Image
              source={{uri: item.images[0]}} 
              style={{width: itemWidth/2,height: itemWidth/2,borderRadius: 8,}} 
            />
            <Image 
                source={icons.Play} 
                style={{ 
                  position: 'absolute',
                  height: 28, 
                  width: 28,
                  top: itemWidth/5,
                  left: itemWidth/5,
                }} 
              />
            <Text 
              style={{ 
                width: itemWidth/2,
                lineHeight: 20,
                marginTop: 3,
                fontSize: 12,
                color: '#202833'
              }}
              ellipsizeMode="tail" numberOfLines={2}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        </View>
    );
  const onMoveToView = (data) => () => {
    navigation.navigate('webview', { detail: data });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor='#FFE8D1'
        barStyle='dark-content' />
      <View style={{ backgroundColor: '#FFE8D1', height: 48, flexDirection: 'row' }}>
        <TouchableOpacity style={{ width: '15%' }} onPress={() => navigation.goBack()}>
          <Image source={icons.ArrowLeft1} style={{ height: 32, width: 32,  top: 5 }} />
        </TouchableOpacity>
        <View style={{ width: '70%', top: 8, alignItems: 'center' }} >
          <Text style={{ fontSize: 18, fontWeight: '500', color: 'black' }}>Danh sách Video</Text>
        </View>

        <TouchableOpacity style={{ width: '15%', left: 20, top: 10 }} onPress={() => navigation.popToTop()}>
          <Image style={{ height: 24, width: 24 }} source={icons.Home} />
        </TouchableOpacity>
      </View>
      <View style={{}}>
        <FlatList
          data={galleriesVideoAll}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          showsVerticalScrollIndicator={false}
          style={{}}
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
    
  },
  Item: {
    flex: 1,
    marginVertical:8,
    paddingHorizontal: 10,
    flexWrap: "wrap",
    justifyContent: 'space-around'
  },
});
