import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Navigation, {
  Spacer,
  Config as NavigationConfig,
} from 'native-navigation';
import format from 'date-fns/format';
import parse from 'date-fns/parse';

import DayView from '../views/day';
import weatherData from '../__fixtures__/amsterdam-7day-forecast.json';

export default class ForecastRoute extends Component {
  render() {
    const { index } = this.props;
    const day = weatherData.list[index];

    return (
      <View style={[styles.dayDetailContainer, { marginTop: headerHeight }]}>
        <NavigationConfig
          title={format(parse(day.dt * 1000), 'MMMM Do')}
          titleColor="#ffffff"
          screenColor="#03A9F4"
          backgroundColor="#039BE5"
        />
        <Spacer />
        <DayView weatherData={day} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dayDetailContainer: {
    flex: 2,
  },
});
