import React, { Component } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import Navigation from 'native-navigation';
import SwipeableView from 'react-swipeable-views-native';
import { keyBy } from 'lodash';

import DayView from '../views/day';
import ForecastView from '../views/forecast';
import Header from '../components/header';
import NavigationBar from '../components/navigation-bar';
import Icon from '../components/icon';
import weatherData from '../__fixtures__/amsterdam-7day-forecast.json';

const forecastRoutes = [
  { index: 0, type: 'today', title: 'Today' },
  { index: 1, type: '3day', title: 'Three Day' },
  { index: 2, type: '7day', title: 'Seven Day' },
];

const forecastTypeToRouteMap = keyBy(forecastRoutes, 'type');
const indexToRouteMap = keyBy(forecastRoutes, 'index');

export default class ForecastRoute extends Component {
  state = {
    tabContentHeight: 0,
    activeIndex: 0,
  };

  componentWillReceiveProps(nextProps) {
    const { type } = nextProps;

    if (type) {
      const { index: activeIndex } = forecastTypeToRouteMap[type];
      this.setState(state => ({ ...state, activeIndex }));
    }
  }

  render() {
    const { nativeNavigationInitialBarHeight: headerHeight } = this.props;
    const { activeIndex, tabContentHeight } = this.state;

    const { index, title } = forecastRoutes[activeIndex];
    const buttons = ['Today', '3 Day', '7 Day'];

    return (
      <View style={[styles.forecastContainer, { marginTop: headerHeight }]}>
        <Navigation.Config
          title={title}
          titleColor="#ffffff"
          screenColor="#03A9F4"
          backgroundColor="#039BE5"
        />
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
            onChangeIndex={activeIndex =>
              this.setState(state => ({ ...state, activeIndex }))}
          >
            <DayView
              style={{ height: tabContentHeight }}
              weatherData={weatherData.list[0]}
            />
            <ForecastView
              expanded
              style={{ height: tabContentHeight }}
              weatherData={weatherData.list.slice(0, 3)}
              onDaySelected={index => Navigation.push('Day', { index: index })}
            />
            <ForecastView
              style={{ height: tabContentHeight }}
              weatherData={weatherData.list.slice()}
              onDaySelected={index => Navigation.push('Day', { index: index })}
            />
          </SwipeableView>
        </View>

        {/* navigation */}
        <NavigationBar
          activeIndex={index}
          activeColor="#03A9F4"
          inactiveColor="#039BE5"
          buttons={buttons}
          onChangeIndex={activeIndex =>
            this.setState(state => ({ ...state, activeIndex }))}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  forecastContainer: {
    backgroundColor: '#03A9F4',
    flex: 2,
  },
  swipeableViewsContainer: {
    flex: 2,
  },
});
