/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';

import ForecastRoute from './src/routes/forecast';
import DayRoute from './src/routes/day';

const App = StackNavigator({
  Forecast: { screen: ForecastRoute },
  Day: { screen: DayRoute },
});

AppRegistry.registerComponent('WeatherReactNavigation', () => App);
