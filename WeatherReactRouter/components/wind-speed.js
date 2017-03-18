import React from 'react'
import {
  View,
  Image,
  StyleSheet,
  Text
} from 'react-native'

import windIcon from '../assets/wind.png'

export default ({ speed }) => (
  <View style={styles.container}>
    <Image style={styles.icon} source={windIcon} />
    <Text style={styles.speed}>{Math.ceil(speed)}</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  speed: {
    color: '#ffffff',
    fontSize: 96,
    fontWeight: '300'
  },
  icon: {
    marginRight: 10,
    width: 48,
    height: 48
  }
})
