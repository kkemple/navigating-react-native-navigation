import React, { Component } from 'react';
import {
  Platform,
  View,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { VictoryArea } from 'victory-native';
import parse from 'date-fns/parse';
import format from 'date-fns/format';

import Icon from '../components/icon';

export default class ForecastView extends Component {
  state = {
    chartWidth: 0,
    chartHeight: 0,
  };

  render() {
    const {
      style,
      weatherData = [],
      expanded = false,
      onDaySelected,
    } = this.props;
    const { chartHeight, chartWidth } = this.state;
    return (
      <View style={[style, styles.container]}>
        <ScrollView style={style.scrollView}>
          {weatherData.map((day, i) => {
            const {
              temp: {
                morn: morningTemp,
                day: peakTemp,
                eve: eveningTemp,
                night: nightTemp,
              },
              weather: [{ main }],
              speed,
            } = day;

            const chartData = [
              { temp: Math.ceil(morningTemp) },
              { temp: Math.ceil(peakTemp) },
              { temp: Math.ceil(eveningTemp) },
              { temp: Math.ceil(nightTemp) },
            ];

            return (
              <TouchableOpacity
                key={day.dt}
                onPress={() => {
                  onDaySelected(i);
                }}
              >
                <View style={styles.card}>
                  <Text style={styles.date}>
                    {format(parse(day.dt * 1000), 'MMMM Do')}
                  </Text>
                  <View style={styles.overviewContainer}>
                    <View style={styles.temperatureContainer}>
                      <Text style={styles.temperatureText}>
                        {Math.ceil(peakTemp)}
                      </Text>
                      <Text style={[styles.temperatureText, styles.degrees]}>
                        ˚
                      </Text>
                    </View>
                    <Icon
                      color="#009688"
                      style={styles.conditionIcon}
                      name={main.toLowerCase()}
                      size={48}
                    />
                    <View style={styles.windSpeedContainer}>
                      <Text style={styles.speed}>{Math.ceil(speed)}</Text>
                      <Icon color="#009688" name="wind" size={36} />
                    </View>
                  </View>
                  {expanded && Platform.OS === 'ios'
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
                            const {
                              nativeEvent: { layout: { width, height } },
                            } = event;
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
                            style={{ data: { fill: '#009688', opacity: 0.4 } }}
                            data={chartData}
                          />
                        </View>
                      </View>
                    : null}
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 20,
    alignItems: 'stretch',
  },
  card: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: '#ffffff',
    borderRadius: 4,
    padding: 10,
  },
  date: {
    fontSize: 24,
    color: '#009688',
    textAlign: 'center',
  },
  overviewContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  windSpeedContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  speed: {
    color: '#009688',
    fontSize: 48,
    marginRight: 5,
    fontWeight: '300',
  },
  temperatureContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  temperatureText: {
    color: '#009688',
    fontSize: 48,
    fontWeight: '300',
    marginBottom: 0,
  },
  degrees: {
    backgroundColor: 'transparent',
    fontSize: 48,
    marginLeft: -5,
  },
  conditionIcon: {
    flex: 1,
  },
  graphContainer: {
    marginTop: 10,
    height: 50,
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
    color: '#009688',
    opacity: 0.5,
    fontSize: 18,
  },
});
