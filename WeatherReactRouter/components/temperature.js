import React from 'react'
import {
  View,
  Image,
  StyleSheet,
  Text
} from 'react-native'

import celsiusIcon from '../assets/celsius.png'

export default ({ temp }) => (
  <View style={styles.container}>
    <Text style={styles.temperature}>{Math.ceil(temp)}</Text>
    <Image style={styles.unit} source={celsiusIcon} />
  </View>
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  temperature: {
    color: '#ffffff',
    fontSize: 148,
    fontWeight: '300'
  },
  unit: {
    position: 'absolute',
    top: 20,
    right: -25,
    width: 48,
    height: 48
  }
})
