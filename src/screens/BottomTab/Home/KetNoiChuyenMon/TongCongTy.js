import React, { Component } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image, FlatList,
  ScrollView,
  ImageBackground, Dimensions, TextComponent
} from 'react-native';

import Carousel from 'react-native-snap-carousel';
import { images, icons } from '../../../../../constants';

const { height, width } = Dimensions.get('window');

export default class TongCongTy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      carouselItems: [
        {
          title: 'Quản lý chất lượng',
          img: images.Ellipse14,
          img1: icons.Group,
        },
        {
          title: 'Quản lý chất lượng',
          img: images.Ellipse14,
          img1: icons.Group,
        },
        {
          title: 'Quản lý chất lượng',
          img: images.Ellipse14,
          img1: icons.Group,
        },
        {
          title: 'Quản lý chất lượng',
          img: images.Ellipse14,
          img1: icons.Group,
        },
        {
          title: 'Quản lý chất lượng',
          img: images.Ellipse14,
          img1: icons.Group,
        },
        {
          title: 'Quản lý chất lượng',
          img: images.Ellipse14,
          img1: icons.Group,
        },
        {
          title: 'Quản lý chất lượng',
          img: images.Ellipse14,
          img1: icons.Group,
        },
        {
          title: 'Quản lý chất lượng',
          img: images.Ellipse14,
          img1: icons.Group,
        },
        {
          title: 'Quản lý chất lượng',
          img: images.Ellipse14,
          img1: icons.Group,
        },
        {
          title: 'Quản lý chất lượng',
          img: images.Ellipse14,
          img1: icons.Group,
        },
        {
          title: 'Quản lý chất lượng',
          img: images.Ellipse14,
          img1: icons.Group,
        },
      ],
      dataItems: [
        { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }, { id: 10 }, { id: 11 }
      ],
    };
  }

  _renderItem(item, index, activeIndex) {
    return (
      <View style={[
        {
          flex: 1, backgroundColor: index === activeIndex ? '#FFE8D1' : '#ECF0F3'
        }
      ]} >
        <TouchableOpacity onPress={index => this.setState({ activeIndex: index })} >
          <Text style={{ textAlign: 'center' }} >{item.id}</Text>
        </TouchableOpacity>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <TouchableOpacity
            style={
              styles.items}>
            <ImageBackground source={item.img} style={styles.img}>
              <Image style={styles.img1} source={item.img1} />
            </ImageBackground>
            <Text style={[
              styles.Text,
              {
                color: index === activeIndex ? '#A34D00' : '#202833'
              }
            ]} >{item.title}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.items1}>
            <ImageBackground source={item.img} style={styles.img}>
              <Image style={styles.img1} source={item.img1} />
            </ImageBackground>
            <Text style={[
              styles.Text,
              {
                color: index === activeIndex ? '#A34D00' : '#202833'
              }
            ]}>{item.title}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.items2}>
            <ImageBackground source={item.img} style={styles.img}>
              <Image style={styles.img1} source={item.img1} />
            </ImageBackground>
            <Text style={[
              styles.Text,
              {
                color: index === activeIndex ? '#A34D00' : '#202833'
              }
            ]}>{item.title}</Text>
          </TouchableOpacity>
          <View style={{ width: 100 }}></View>
        </ScrollView>
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView style={{ backgroundColor: 'white', flexDirection: 'row', flex: 1 }}>
        <FlatList
          data={this.state.dataItems}
          renderItem={({ item, index }) =>
            this._renderItem(item, index, this.state.activeIndex)

          }
          showsVerticalScrollIndicator={false}



        />
        <View style={{ width: width * 0.9, flexDirection: 'row', top: 50, justifyContent: 'center' }}>
          <Carousel
            layout={'default'}
            ref={ref => (this.carousel = ref)}
            data={this.state.carouselItems}
            vertical={true}
            windowSize={1}
            initialNumToRender={3}
            slideStyle={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            sliderHeight={450}
            itemHeight={150}
            renderItem={({ item, index }) =>
              this._renderItem(item, index, this.state.activeIndex)
            }
            onSnapToItem={index => this.setState({ activeIndex: index })}
            callbackOffsetMargin={10}
            initialNumToRender={3}
            removeClippedSubviews={false}
            useScrollView={true}
            lockScrollTimeoutDuration={0}
            enableMomentum={true}
            inactiveSlideShift={1}
            activeAnimationType={'timing'}
            activeSlideOffset={10}
            activeSlideAlignment={'center'}
            decelerationRate={'normal'}
            inactiveSlideOpacity={1}
            inactiveSlideScale={0.85}
            containerCustomStyle={styles.slider}
          />
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  number: {},
  slider: {},
  items: {
    flex: 1,
    flexDirection: 'column', top: 32, left: 10
  },
  items1: {
    flex: 1,
    flexDirection: 'column', top: 32, left: 30
  },
  items2: {
    flex: 1, flexDirection: 'column', top: 32, left: 50
  },
  item3: {
    flex: 1, flexDirection: 'column', top: 32, left: 60
  },
  img1: {
    height: 35, width: 35, alignItems: 'center', justifyContent: 'center'
  },
  img: {
    alignItems: 'center', justifyContent: 'center', left: 13,
    height: 52, width: 52
  },
  Text: { fontSize: 14, width: 77, height: 44, textAlign: 'center' },
})

