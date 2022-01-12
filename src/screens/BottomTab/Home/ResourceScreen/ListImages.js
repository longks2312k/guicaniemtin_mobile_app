import React from 'react';
import { SafeAreaView, StyleSheet, View, Image, StatusBar, TouchableOpacity } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { icons } from '../../../../../constants';
import {NativeModules} from 'react-native';
const RNFetchBlob = NativeModules.RNFetchBlob


export default function ListImages({ navigation, route }) {
  const { detail } = route.params;
  const images = [
    {
      url: detail.images[0],
    },
    {
      url: detail.images[1],
    },
    {
      url: detail.images[2],
    },
    {
      url: detail.images[3],
    },
  ];

  const REMOTE_IMAGE_PATH = detail.images[0]

  const downloadImage = () => {
    let date = new Date();
    let image_URL = REMOTE_IMAGE_PATH;    
    let ext = getExtention(image_URL);
    ext = '.' + ext[0];
    const { config, fs } = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/image_' + 
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Image',
      },
    };
    config(options)
      .fetch('GET', image_URL)
      .then(res => {
        // Showing alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        alert('Image Downloaded Successfully.');
      });
  };

  const getExtention = filename => {
    return /[.]/.exec(filename) ?
            /[^.]+$/.exec(filename) : undefined;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      <StatusBar backgroundColor='black'
        barStyle='dark-content' />
      <View style={{flexDirection: 'row',flex:1}}>
        <View style={{flex:10}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={icons.Exit} style={{ height: 28, width: 28, tintColor: 'white',marginLeft:5 }} />
          </TouchableOpacity>
          </View>
          <View style={{flex:1}}>
          <TouchableOpacity onPress={downloadImage}>
            <Image source={icons.Download} style={{ height: 30, width: 30, tintColor: 'white',position: 'absolute', marginLeft:5}} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 8 }}>
        <ImageViewer
          imageUrls={images}
        />
      </View>
    </SafeAreaView>
  );
};