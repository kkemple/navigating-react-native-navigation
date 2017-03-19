/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar
} from 'react-native';
import {
  NativeRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-native'
import SwipeableView from 'react-swipeable-views-native'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import { keyBy } from 'lodash'

import DayView from './views/day'
import ForecastView from './views/forecast'
import Header from './components/header'
import NavigationBar from './components/navigation-bar'
import weatherData from './__fixtures__/amsterdam-7day-forecast.json'

const forecastRoutes = [
  { index: 0, type: 'today', title: 'Today\'s Weather' },
  { index: 1, type: '3day', title: 'Three Day Forecast' },
  { index: 2, type: '7day', title: 'Seven Day Forecast' }
]

const forecastTypeToRouteMap = keyBy(forecastRoutes, 'type')
const indexToRouteMap = keyBy(forecastRoutes, 'index')

export default class WeatherReactRouter extends Component {
  state = {
    tabContentHeight: 0
  }

  render() {
    return (
      <View style={styles.container}>
        <Router>
          <Switch>
            {/* handle routes to forcast views */}
            <Route exact path="/forecast/:type" render={({ match, history }) => {
              const { type } = match.params
              const forecastRoute = forecastTypeToRouteMap[type]

              {/* redirect if url is invalid */}
              if (!forecastRoute) {
                return <Redirect to='/forecast/today' />
              }

              const { push, goBack } = history
              const { index, title } = forecastRoute
              const { tabContentHeight } = this.state
              const buttons = [
                { route: '/forecast/today', text: 'Today' },
                { route: '/forecast/3day', text: '3 Day' },
                { route: '/forecast/7day', text: '7 Day' }
              ]

              return (
                <View style={styles.forecastContainer}>
                  <StatusBar barStyle='light-content' />
                  <Header
                    text={title}
                    onBack={index > 0 ? goBack : undefined} />
                  <View
                    style={styles.swipeableViewsContainer}
                    onLayout={event => {
                      const {
                        nativeEvent: {
                          layout: {
                            height: tabContentHeight
                          }
                        }
                      } = event

                      this.setState((state, props) => ({ tabContentHeight }))
                    }}>
                    <SwipeableView
                      index={index}
                      onChangeIndex={
                        index => push(`/forecast/${indexToRouteMap[index].type}`)
                      }>
                      <DayView
                        style={{ height: tabContentHeight }}
                        weatherData={weatherData.list[0]} />
                      <ForecastView
                        expanded
                        style={{ height: tabContentHeight }}
                        weatherData={weatherData.list.slice(0, 3)}
                        onDaySelected={index => push(`/day/${index}`)} />
                      <ForecastView
                        style={{ height: tabContentHeight }}
                        weatherData={weatherData.list.slice()}
                        onDaySelected={index => push(`/day/${index}`)} />
                    </SwipeableView>
                  </View>

                  {/* navigation */}
                  <NavigationBar
                    activeIndex={index}
                    activeColor='#E91E63'
                    inactiveColor='#D81B60'
                    buttons={buttons}
                    onChangeIndex={index => {
                      const route = indexToRouteMap[index]
                      push(`/forecast/${route.type}`)
                    }} />
                </View>
              )
            }} />

            {/* handle day detail views */}
            <Route exact path="/day/:index" render={({ match, history }) => {
              const { index } = match.params
              const { goBack } = history
              const day = weatherData.list[index]

              return (
                <View style={styles.dayDetailContainer}>
                  <StatusBar barStyle='light-content' />
                  <Header
                    text={format(parse(day.dt * 1000), 'MMMM Do')}
                    onBack={goBack} />
                  <DayView weatherData={day} />
                </View>
              )
            }} />

            {/* redirect to today if visiting unknown route */}
            <Redirect to='/forecast/today'/>
          </Switch>
        </Router>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#E91E63',
  },
  forecastContainer: {
    flex: 2
  },
  dayDetailContainer: {
    flex: 2
  },
  swipeableViewsContainer: {
    flex: 2
  }
})

AppRegistry.registerComponent('WeatherReactRouter', () => WeatherReactRouter)
