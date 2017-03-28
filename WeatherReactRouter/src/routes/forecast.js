import React, { Component } from 'react';
import {
  BackAndroid,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { Redirect } from 'react-router-native';
import SwipeableView from 'react-swipeable-views-native';
import { keyBy } from 'lodash';

import DayView from '../views/day';
import ForecastView from '../views/forecast';
import Header from '../components/header';
import NavigationBar from '../components/navigation-bar';
import weatherData from '../__fixtures__/amsterdam-7day-forecast.json';

const forecastRoutes = [
  { index: 0, type: 'today', title: "Today's Weather" },
  { index: 1, type: '3day', title: 'Three Day Forecast' },
  { index: 2, type: '7day', title: 'Seven Day Forecast' },
];

const forecastTypeToRouteMap = keyBy(forecastRoutes, 'type');
const indexToRouteMap = keyBy(forecastRoutes, 'index');

export default class ForecastRoute extends Component {
  state = {
    tabContentHeight: 0,
  };

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
    const { match, history } = this.props;
    const { tabContentHeight } = this.state;

    const { type } = match.params;
    const forecastRoute = forecastTypeToRouteMap[type];

    /* redirect if url is invalid */
    if (!forecastRoute) {
      return <Redirect to="/forecast/today" />;
    }

    const { push, goBack } = history;
    const { index, title } = forecastRoute;

    const buttons = ['Today', '3 Day', '7 Day'];

    return (
      <View style={styles.forecastContainer}>
        <StatusBar backgroundColor="#D81B60" barStyle="light-content" />
        <Header text={title} onBack={index > 0 ? goBack : undefined} />
        <View
          style={styles.swipeableViewsContainer}
          onLayout={event => {
            const {
              nativeEvent: {
                layout: {
                  height: tabContentHeight,
                },
              },
            } = event;

            this.setState((state, props) => ({ tabContentHeight }));
          }}
        >
          <SwipeableView
            index={index}
            onChangeIndex={index =>
              push(`/forecast/${indexToRouteMap[index].type}`)}
          >
            <DayView
              style={{ height: tabContentHeight }}
              weatherData={weatherData.list[0]}
            />
            <ForecastView
              expanded
              style={{ height: tabContentHeight }}
              weatherData={weatherData.list.slice(0, 3)}
              onDaySelected={index => push(`/day/${index}`)}
            />
            <ForecastView
              style={{ height: tabContentHeight }}
              weatherData={weatherData.list.slice()}
              onDaySelected={index => push(`/day/${index}`)}
            />
          </SwipeableView>
        </View>

        {/* navigation */}
        <NavigationBar
          activeIndex={index}
          activeColor="#E91E63"
          inactiveColor="#D81B60"
          buttons={buttons}
          onChangeIndex={index => {
            const route = indexToRouteMap[index];
            push(`/forecast/${route.type}`);
          }}
        />
      </View>
    );
  }

  onAndroidBack() {
    const { match: { params: { type } }, history: { goBack } } = this.props;
    const { index } = forecastTypeToRouteMap[type];

    if (index > 0) goBack();
  }
}

const styles = StyleSheet.create({
  forecastContainer: {
    flex: 2,
  },
  swipeableViewsContainer: {
    flex: 2,
  },
});
