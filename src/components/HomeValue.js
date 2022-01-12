import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const listValue = [
  {
    avatar: require('../../assets/images/g1.png'),
    img: require('../../assets/images/v1.jpeg'),
  },
  {
    avatar: require('../../assets/images/g2.png'),
    img: require('../../assets/images/v2.jpeg'),
  },
  {
    avatar: require('../../assets/images/g3.png'),
    img: require('../../assets/images/v3.jpeg'),
  },
  {
    avatar: require('../../assets/images/g4.png'),
    img: require('../../assets/images/v4.jpeg'),
  },
  {
    avatar: require('../../assets/images/g5.png'),
    img: require('../../assets/images/v5.jpeg'),
  },
  {
    avatar: require('../../assets/images/g6.png'),
    img: require('../../assets/images/v6.jpeg'),
  },
];

function HomeValue() {
  const [visible, setVisible] = useState(false);
  const [idx, setIdx] = useState(0);

  const ModalDetails = () => {
    return (
      <Modal transparent={true} visible={visible}>
        <View
          style={styles.modalWrapper}
          onStartShouldSetResponder={() => setVisible(false)}>
          <Image source={listValue[idx].img} style={styles.img} />
        </View>
      </Modal>
    );
  };

  // render
  return (
    <View style={styles.container}>
      {listValue.map((item, index) => (
          <TouchableOpacity
            style={{marginVertical:8}}
            onPress={() => {
              setIdx(index);
              setVisible(true);
            }}>
            <Image source={item.avatar} style={styles.avatar} />
          </TouchableOpacity>
        ))}
      <ModalDetails />
    </View>
  );
}
export default HomeValue;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap:'wrap',
    justifyContent:'space-around'
  },
  txt: {fontSize: 20, fontWeight: '500'},
  coverImg: {},
  avatar: {
    width: ((width - 40) / 3)-10,
    height: ((width - 40) / 3)-10,
    borderRadius: 8,
  },
  // modal
  modalWrapper: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },

  img: {
    width: (width * 3) / 4 - 20,
    height: width - 20,
    borderRadius: 10,
  },
});
