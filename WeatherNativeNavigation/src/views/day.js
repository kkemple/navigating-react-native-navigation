import React, { Component } from 'react';
import {
  Platform,
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import { VictoryArea } from 'victory-native';

import Icon from '../components/icon';

export default class DayView extends Component {
  state = {
    chartWidth: 0,
    chartHeight: 0,
  };

  render() {
    const { style, weatherData } = this.props;
    const { chartWidth, chartHeight } = this.state;

    const {
      temp: {
        morn: morningTemp,
        day: peakTemp,
        eve: eveningTemp,
        night: nightTemp,
      },
      weather: [{ main }],
      speed,
    } = weatherData;

    const chartData = [
      { temp: Math.ceil(morningTemp) },
      { temp: Math.ceil(peakTemp) },
      { temp: Math.ceil(eveningTemp) },
      { temp: Math.ceil(nightTemp) },
    ];

    return (
      <View style={[style, styles.container]}>
        <View style={styles.overviewContainer}>
          <View style={styles.temperatureContainer}>
            <Text style={styles.temperatureText}>{Math.ceil(peakTemp)}</Text>
            <Text style={[styles.temperatureText, styles.degrees]}>˚</Text>
          </View>
        </View>
        <View style={styles.otherInfoContainer}>
          <Icon style={styles.unit} name={main.toLowerCase()} size={100} />
          <View style={styles.windSpeedContainer}>
            <Text style={styles.speed}>{Math.ceil(speed)}</Text>
            <Icon name="wind" size={60} />
          </View>
        </View>
        {Platform.OS === 'ios'
          ? <View style={styles.graphContainer}>
              <View style={styles.yAxisContainer}>
                <Text style={styles.chartLabel}>
                  {Math.max(...chartData.map(d => d.temp))}˚
                </Text>
                <Text style={styles.chartLabel}>0˚</Text>
              </View>
              <View
                style={styles.xAxisContainer}
                onLayout={event => {
                  const { nativeEvent: { layout: { width, height } } } = event;
                  this.setState({
                    chartHeight: height,
                    chartWidth: width,
                  });
                }}
              >
                <VictoryArea
                  padding={0}
                  domainPadding={5}
                  width={chartWidth}
                  height={chartHeight}
                  y="temp"
                  interpolation="cardinal"
                  style={{ data: { fill: '#ffffff', opacity: 0.7 } }}
                  data={chartData}
                />
              </View>
            </View>
          : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#03A9F4',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'stretch',
  },
  overviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingLeft: 40,
    paddingRight: 40,
  },
  otherInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingLeft: 40,
    paddingRight: 40,
  },
  windSpeedContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  speed: {
    color: '#ffffff',
    fontSize: 72,
    marginRight: 5,
    fontWeight: '300',
  },
  temperatureContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  temperatureText: {
    color: '#ffffff',
    fontSize: 148,
    fontWeight: '300',
    marginBottom: 0,
  },
  degrees: {
    backgroundColor: 'transparent',
    fontSize: 100,
    marginTop: -35,
    marginLeft: -15,
  },
  graphContainer: {
    marginTop: 30,
    paddingLeft: 15,
    paddingRight: 15,
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  yAxisContainer: {
    width: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  xAxisContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chartLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 24,
  },
});
