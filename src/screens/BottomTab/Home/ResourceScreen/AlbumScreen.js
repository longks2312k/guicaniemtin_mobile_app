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
  RefreshControl,
} from 'react-native';
import { icons } from '../../../../../constants';
import { getGalleriesAllApi } from '../../../../Ultils/async';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
const { height, width } = Dimensions.get('window');
	const itemWidth = (width - 40);

export default function AlbumScreen({ navigation }) {
  
  const [galleries, setGalleries] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const callGetGalleries = async () => {
    // call api
    let data = await getGalleriesAllApi();
    console.log('Galleries api', data.data.data.list)
    setGalleries(data.data.data.list);
};

useEffect(() => {
  callGetGalleries();
}, [refreshing]);

  const renderItem = ({ item }) => (
        <View style={styles.Item}>
          <TouchableOpacity style={{}} onPress={onMoveToList(item)}>
            <Image 
            source={{uri: item.images[0]}} 
            style={{width: itemWidth/2,height: itemWidth/2,borderRadius: 8,}} 
            />
            <Text 
              style={{ 
                width: itemWidth/2,
                lineHeight: 20,
                marginTop: 3,
                fontSize: 14,
                color: '#202833'
              }}
              ellipsizeMode="tail" numberOfLines={2}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        </View>
    );

  const onMoveToList = (data) => () => {
    navigation.navigate('ListImages', { detail: data });
  };
  return (
    <SafeAreaView  style={styles.container}>
      <StatusBar backgroundColor='#FFE8D1'
        barStyle='dark-content' />
      <View 
      // refreshControl={
      //   <RefreshControl
      //     refreshing={refreshing}
      //     onRefresh={onRefresh}
      //   />
      // } 
        style={{ backgroundColor: '#FFE8D1', height: 48, flexDirection: 'row' }}>
        <TouchableOpacity style={{ width: '15%' }} onPress={() => navigation.goBack()}>
          <Image source={icons.ArrowLeft1} style={{ height: 32, width: 32, top: 5 }} />
        </TouchableOpacity>
        <View style={{ width: '70%', top: 8, alignItems: 'center' }} >
          <Text style={{ fontSize: 18, fontWeight: '500', color: 'black' }}>Album ảnh</Text>
        </View>

        <TouchableOpacity style={{ width: '15%', left: 20, top: 10 }} onPress={() => navigation.navigate("HomeMain")}>
          <Image style={{ height: 24, width: 24 }} source={icons.Home} />
        </TouchableOpacity>
      </View>
      <View style={{}}>
        <FlatList
          data={galleries}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          numColumns={2}
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
    paddingHorizontal: 10,
    marginVertical: 8,
    flexWrap: "wrap",
    justifyContent: 'space-around'
  },
});
