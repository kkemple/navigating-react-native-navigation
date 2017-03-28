import React, { Component } from 'react';
import {
  BackAndroid,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import format from 'date-fns/format';
import parse from 'date-fns/parse';

import DayView from '../views/day';
import Header from '../components/header';
import weatherData from '../__fixtures__/amsterdam-7day-forecast.json';

export default class ForecastRoute extends Component {
  constructor() {
    super(...arguments);

    this.onBackAndroid = this.onBackAndroid.bind(this);
  }

  componentWillMount() {
    if (Platform.OS === 'android') {
      BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }

  render() {
    const { match: { params: { index } }, history: { goBack } } = this.props;
    const day = weatherData.list[index];

    return (
      <View style={styles.dayDetailContainer}>
        <StatusBar backgroundColor="#D81B60" barStyle="light-content" />
        <Header
          text={format(parse(day.dt * 1000), 'MMMM Do')}
          onBack={goBack}
        />
        <DayView weatherData={day} />
      </View>
    );
  }

  onBackAndroid() {
    const { history: { goBack } } = this.props;
    goBack();
  }
}

const styles = StyleSheet.create({
  dayDetailContainer: {
    flex: 2,
  },
});
