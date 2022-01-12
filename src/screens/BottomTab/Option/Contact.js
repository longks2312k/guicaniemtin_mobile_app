import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  TextInput,
  RefreshControl,
  FlatList,
  Dimensions,
} from 'react-native';
import {icons} from '../../../../constants';
import {getContactsApi} from '../../../Ultils/async';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export default function Contact({navigation}) {
  const [contact, setContact] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const callGetContactsApi = async () => {
    try {
      const response = await getContactsApi();
      console.log('danh ba', response.data.data.list);
      setContact(response.data.data.list);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    callGetContactsApi();
  }, [refreshing]);

  const renderItem = ({item}) => (
    <View style={{justifyContent: 'center', alignItems: 'center',borderBottomWidth:1,borderColor:'#ECF0F3',marginVertical:10}}>
      <TouchableOpacity style={{width:'80%',height:120,marginBottom:10}}>
        <View>
          <Text style={styles.txtBold}>{item.full_name}</Text>
        </View>
        <View style={{flex:1,flexDirection:'row'}}>
          <View style={{flex:2, marginTop:5}}>
            <Text ellipsizeMode="tail" numberOfLines={2} style={{flex:1,height:60}}>{item.unit}</Text>
            <Text ellipsizeMode="tail" numberOfLines={2} style={{flex:1,height:60}}>{item.position}</Text>
          </View>
          <View style={{flex:1,marginTop:5,flexDirection:'column-reverse'}}>
            <Text ellipsizeMode="tail" numberOfLines={1} style={{flex:1,height:60}}>{item.mail}</Text>
            <Text ellipsizeMode="tail" numberOfLines={1} style={{flex:1,height:60}}>{item.phone}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#FFE8D1" barStyle="dark-content" />
      <View
        style={{backgroundColor: '#FFE8D1', height: 48, flexDirection: 'row'}}>
        <TouchableOpacity
          style={{width: '15%'}}
          onPress={() => navigation.goBack()}>
          <Image
            source={icons.ArrowLeft1}
            style={{height: 28, width: 28,marginTop:5}}
          />
        </TouchableOpacity>
        <View style={{width: '70%', top: 8, alignItems: 'center'}}>
          <Text style={{fontSize: 18, fontWeight: '500', color: 'black'}}>
            Danh bạ
          </Text>
        </View>

        <TouchableOpacity
          style={{width: '15%', left: 20, top: 10}}
          onPress={() => navigation.popToTop()}>
          <Image style={{height: 24, width: 24}} source={icons.Home} />
        </TouchableOpacity>
      </View>
      <View style={{height: '100%', backgroundColor: 'white'}}>
        <View
          style={{
            height: 38,
            backgroundColor: '#ECF0F3',
            borderRadius: 20,
            width: '91%',
            left: 16,
            top: 8,
          }}>
          <TextInput
            style={{
              paddingLeft: 45,
            }}
            placeholder="Tìm kiếm tên, email, chức vụ, điện thoại"
          />
          <Image
            source={icons.Search}
            style={{
              height: 24,
              width: 24,
              top: -32,
              left: 10,
              tintColor: '#200E32',
            }}
          />
          <Image source={icons.Line} style={{top: -8, left: 8}} />
        </View>
        <FlatList
        data={contact}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{marginBottom: 10,marginTop:30}}
      />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  txtBold: {
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: 'bold',
    color: '#202833',
  },
});
