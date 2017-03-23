/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, StatusBar } from 'react-native';
import {
  NativeRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-native';

import ForecastRoute from './routes/forecast';
import DayRoute from './routes/day';

export default class WeatherReactRouter extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Router>
          <Switch>
            {/* handle routes to forcast views */}
            <Route exact path="/forecast/:type" component={ForecastRoute} />

            {/* handle day detail views */}
            <Route exact path="/day/:index" component={DayRoute} />

            {/* redirect to today if visiting unknown route */}
            <Redirect to="/forecast/today" />
          </Switch>
        </Router>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#E91E63',
  },
});

AppRegistry.registerComponent('WeatherReactRouter', () => WeatherReactRouter);
