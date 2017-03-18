import React from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet
} from 'react-native'

import Temperature from '../components/temperature'
import Humidity from '../components/humidity'
import WeatherConditionIcon from '../components/weather-condition-icon'
import WindSpeed from '../components/wind-speed'

export default ({ style, weatherData }) => {
  const {
    temp: {
      day: temp
    },
    weather: [{ main }],
    humidity,
    speed
  } = weatherData

  return (
    <View style={[style, styles.container]}>
      <View style={styles.overviewContainer}>
        <Temperature temp={temp} />
      </View>
      <View style={styles.otherInfoContainer}>
        <WeatherConditionIcon type={main.toLowerCase()} />
        <WindSpeed speed={speed} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  overviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingLeft: 40,
    paddingRight: 40,
    marginBottom: 40
  },
  otherInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingLeft: 40,
    paddingRight: 40
  }
})
