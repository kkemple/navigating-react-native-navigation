import React, { Component } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import format from 'date-fns/format';
import parse from 'date-fns/parse';

import DayView from '../views/day';
import weatherData from '../__fixtures__/amsterdam-7day-forecast.json';

export default class ForecastRoute extends Component {
  static navigationOptions = {
    title: 'Day Forecast',
    header: {
      tintColor: '#ffffff',
      style: {
        backgroundColor: '#00897B',
      },
    },
  };

  render() {
    console.log(this.props);
    const { navigation: { state: { params: { index } } } } = this.props;
    const day = weatherData.list[index];

    return (
      <View style={styles.dayDetailContainer}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.dateText}>
          {format(parse(day.dt * 1000), 'MMMM Do')}
        </Text>
        <DayView weatherData={day} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dayDetailContainer: {
    flex: 2,
  },
  dateText: {
    backgroundColor: '#009688',
    color: '#ffffff',
    fontWeight: '300',
    fontSize: 24,
    textAlign: 'center',
    paddingTop: 15,
  },
});
