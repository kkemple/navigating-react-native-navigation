import React from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  StyleSheet
} from 'react-native'
import parse from 'date-fns/parse'
import format from 'date-fns/format'

import Icon from '../components/icon'

export default ({ style, weatherData = [], expanded = false, onDaySelected }) => {
  return (
    <View style={[style, styles.container]}>
      <ScrollView style={style.scrollView}>
        {weatherData.map((day, i) => {
          const {
            temp: {
              day: temp
            },
            weather: [{ main }],
            speed
          } = day

          return (
            <TouchableOpacity key={day.dt} onPress={() => {onDaySelected(i)}}>
              <View style={styles.card}>
                <Text style={styles.date}>{format(parse(day.dt * 1000), 'MMMM Do')}</Text>
                <View style={styles.overviewContainer}>
                  <View style={styles.temperatureContainer}>
                    <Text style={styles.temperatureText}>{Math.ceil(temp)}</Text>
                    <Text style={[styles.temperatureText, styles.degrees]}>˚</Text>
                  </View>
                  <Icon
                    color='#E91E63'
                    style={styles.conditionIcon}
                    name={main.toLowerCase()}
                    size={48} />
                  <View style={styles.windSpeedContainer}>
                    <Text style={styles.speed}>{Math.ceil(speed)}</Text>
                    <Icon color='#E91E63' name='wind' size={36} />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 20,
    alignItems: 'stretch'
  },
  card: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: '#ffffff',
    borderRadius: 4,
    padding: 10
  },
  date: {
    fontSize: 24,
    color: '#E91E63',
    textAlign: 'center'
  },
  overviewContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  windSpeedContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  speed: {
    color: '#E91E63',
    fontSize: 48,
    marginRight: 5,
    fontWeight: '300'
  },
  temperatureContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  temperatureText: {
    color: '#E91E63',
    fontSize: 48,
    fontWeight: '300',
    marginBottom: 0
  },
  degrees: {
    backgroundColor: 'transparent',
    fontSize: 48,
    marginLeft: -5
  },
  conditionIcon: {
    flex: 1
  }
})
