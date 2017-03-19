import React from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet
} from 'react-native'

import Icon from '../components/icon'

export default ({ style, weatherData }) => {
  const {
    temp: {
      day: temp
    },
    weather: [{ main }],
    speed
  } = weatherData

  return (
    <View style={[style, styles.container]}>
      <View style={styles.overviewContainer}>
        <View style={styles.temperatureContainer}>
          <Text style={styles.temperatureText}>{Math.ceil(temp)}</Text>
          <Text style={[styles.temperatureText, styles.degrees]}>˚</Text>
        </View>
      </View>
      <View style={styles.otherInfoContainer}>
        <Icon style={styles.unit} name={main.toLowerCase()} size={100} />
        <View style={styles.windSpeedContainer}>
          <Text style={styles.speed}>{Math.ceil(speed)}</Text>
          <Icon name='wind' size={60} />
        </View>
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
  },
  windSpeedContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  speed: {
    color: '#ffffff',
    fontSize: 72,
    marginRight: 5,
    fontWeight: '300'
  },
  temperatureContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  temperatureText: {
    color: '#ffffff',
    fontSize: 148,
    fontWeight: '300',
    marginBottom: 0
  },
  degrees: {
    backgroundColor: 'transparent',
    fontSize: 100,
    marginTop: -20,
    marginLeft: -10
  }
})
