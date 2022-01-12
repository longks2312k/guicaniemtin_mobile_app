import React from 'react'
import { View, Text ,Image} from 'react-native'
import { icons, images } from '../../constants';

export default function SplashScreen() {
  return (
    <View style={{backgroundColor:'white',justifyContent:'center',alignItems:'center',height:'100%'}}>
      <Image style={{height:80,width:150}} source={icons.Logo}/>
    </View>
  )
}
