import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { WebView } from 'react-native-webview';

export default function ListImages({ route }) {
  const { detail } = route.params;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>

        <WebView
          source={{ uri: detail.video_url}}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
  },
});
