import React from 'react'
import {
  Image,
  StyleSheet,
  View
} from 'react-native'

import rainyIcon from '../assets/rainy.png'
import cloudyIcon from '../assets/cloudy.png'
import clearIcon from '../assets/sun.png'

function getWeatherIcon(type) {
  switch (type) {
    case 'clear':
      return rainyIcon
    case 'clouds':
      return cloudyIcon
    default:
      return clearIcon
  }
}

export default ({ type }) => (
  <View style={styles.container}>
    <Image
      style={styles.image}
      source={getWeatherIcon(type)} />
  </View>
)

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  image: {
    width: 70,
    height: 70
  }
})
