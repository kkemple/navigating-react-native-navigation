import React from 'react'
import {
  View,
  Image,
  StyleSheet,
  Text
} from 'react-native'

import humidityIcon from '../assets/water.png'

export default ({ humidity }) => (
  <View style={styles.container}>
    <Image style={styles.icon} source={humidityIcon} />
    <Text style={styles.humidity}>{Math.ceil(humidity)}</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  humidity: {
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
