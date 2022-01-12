import React from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Dimensions, FlatList } from 'react-native'
import { images } from '../../../../../constants'

const { height, width } = Dimensions.get('window');

export default function Nhabuudien({ navigation }) {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={{ flexDirection: 'row' ,flex:1,justifyContent:'center',alignContent:'space-around',paddingHorizontal:16,marginTop:16}}>
        <TouchableOpacity style={styles.img}>
          <Text style={styles.text}>Nhà Tài</Text>
          <Text style={styles.text2}>Ban tài chính bưu chính</Text>
          <Image source={images.Group1}
            resizeMode='contain'
            style={styles.Image} />
        </TouchableOpacity>
        <View style={{width:16}}></View>
        <TouchableOpacity style={styles.img2}>
          <Text style={styles.text}>Nhà Đoàn</Text>
          <Text style={styles.text2}>Đoàn thanh niên</Text>
          <Image source={images.Group2}
            resizeMode='contain'
            style={styles.Image} />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row' ,flex:1,justifyContent:'center',alignContent:'space-around',paddingHorizontal:16,marginTop:16}}>
        <TouchableOpacity style={styles.img}>
          <Text style={styles.text}>Nhà Hoạch</Text>
          <Text style={styles.text2}>Ban kế hoạch đầu tư</Text>
          <Image source={images.Group3}
            resizeMode='contain'
            style={styles.Image} />
        </TouchableOpacity>
        <View style={{width:16}}></View>
        <TouchableOpacity style={styles.img2}>
          <Text style={styles.text}>Nhà Văn</Text>
          <Text style={styles.text2}>Văn phòng</Text>
          <Image source={images.Group4}
            resizeMode='contain'
            style={styles.Image} />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row' ,flex:1,justifyContent:'center',alignContent:'space-around',paddingHorizontal:16,marginTop:16}}>
        <TouchableOpacity style={styles.img}>
          <Text style={styles.text}>Nhà Bưu</Text>
          <Text style={styles.text2}>Ban dịch vụ bưu chính</Text>
          <Image source={images.Group5}
            resizeMode='contain'
            style={styles.Image} />
        </TouchableOpacity>
        <View style={{width:16}}></View>
        <TouchableOpacity style={styles.img2}>
          <Text style={styles.text}>Nhà Công</Text>
          <Text style={styles.text2}>Công đoàn</Text>
          <Image source={images.Group6}
            resizeMode='contain'
            style={styles.Image} />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row' ,flex:1,justifyContent:'center',alignContent:'space-around',paddingHorizontal:16,marginTop:16}}>
        <TouchableOpacity style={styles.img}>
          <Text style={styles.text}>Nhà Soát</Text>
          <Text style={styles.text2}>Trung tâm đối soát</Text>
          <Image source={images.Group7}
            resizeMode='contain'
            style={styles.Image} />
        </TouchableOpacity>
        <View style={{width:16}}></View>
        <TouchableOpacity style={styles.img2}>
          <Text style={styles.text}>Nhà Tin</Text>
          <Text style={styles.text2}>TT công nghệ thông tin</Text>
          <Image source={images.Group8}
            resizeMode='contain'
            style={styles.Image} />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row' ,flex:1,justifyContent:'center',alignContent:'space-around',paddingHorizontal:16,marginTop:16}}>
        <TouchableOpacity style={styles.img}>
          <Text style={styles.text}>Nhà Kỹ</Text>
          <Text style={styles.text2}>Ban kỹ thuật công nghệ</Text>
          <Image source={images.Group9}
            resizeMode='contain'
            style={styles.Image} />
        </TouchableOpacity>
        <View style={{width:16}}></View>
        <TouchableOpacity style={styles.img2}>
          <Text style={styles.text}>Nhà Tra</Text>
          <Text style={styles.text2}>Ban thanh tra</Text>
          <Image source={images.Group10}
            resizeMode='contain'
            style={styles.Image} />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row' ,flex:1,justifyContent:'center',alignContent:'space-around',paddingHorizontal:16,marginTop:16}}>
        <TouchableOpacity style={styles.img}>
          <Text style={styles.text}>Nhà Tem</Text>
          <Text style={styles.text2}>Ban tem</Text>
          <Image source={images.Group11}
            resizeMode='contain'
            style={styles.Image} />
        </TouchableOpacity>
        <View style={{width:16}}></View>
        <TouchableOpacity style={styles.img2}>
          <Text style={styles.text}>Nhà Dự</Text>
          <Text style={styles.text2}>Ban quản lí dự án</Text>
          <Image source={images.Group12}
            resizeMode='contain'
            style={styles.Image} />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row' ,flex:1,justifyContent:'center',alignContent:'space-around',paddingHorizontal:16,marginTop:16}}>
        <TouchableOpacity style={styles.img}>
          <Text style={styles.text}>Nhà Lượng</Text>
          <Text style={styles.text2}>Ban quản lí chất lượng</Text>
          <Image source={images.Group13}
            resizeMode='contain'
            style={styles.Image} />
        </TouchableOpacity>
        <View style={{width:16}}></View>
        <TouchableOpacity style={styles.img2}>
          <Text style={styles.text}>Nhà Tổ</Text>
          <Text style={styles.text2}>Ban tổ chức lao động</Text>
          <Image source={images.Group14}
            resizeMode='contain'
            style={styles.Image} />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row' ,flex:1,justifyContent:'center',alignContent:'space-around',paddingHorizontal:16,marginTop:16}}>
        <TouchableOpacity style={styles.img}>
          <Text style={styles.text}>Nhà Toán</Text>
          <Text style={styles.text2}>Ban tổ chức kế toán</Text>
          <Image source={images.Group15}
            resizeMode='contain'
            style={styles.Image} />
        </TouchableOpacity>
        <View style={{width:16}}></View>
        <TouchableOpacity style={styles.img2}>
          <Text style={styles.text}>Nhà Thông</Text>
          <Text style={styles.text2}>Ban phân phối truyền thông</Text>
          <Image source={images.Group16}
            resizeMode='contain'
            style={styles.Image} />
        </TouchableOpacity>
      </View>
      <View style={{ height: 100 }}></View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  img: {
    height: 162, width: 162, borderWidth: 1, flex:1, marginTop: 0, borderRadius: 5, borderColor: '#CCD4DB', backgroundColor: '#FFE8D1'
  },
  img2: {

    height: 162, width: 162, borderWidth: 1, flex:1, marginTop: 0, borderRadius: 5, borderColor: '#CCD4DB', backgroundColor: '#F8F9FA'

  },
  Image: {
    height: 48, width: 48, marginTop: 4, marginLeft: 16
  },
  text: {
    fontSize: 20, margin: 16, fontWeight: '400', color: '#A34D00', height: 30,
  },
  text2: {
    fontSize: 14, marginLeft: 16, marginTop: -10, fontWeight: '400', height: 40, width: 122
  }
})
