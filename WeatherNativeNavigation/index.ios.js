/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import Navigation from 'native-navigation';

import ForecastRoute from './src/routes/forecast';
import DayRoute from './src/routes/day';

Navigation.registerScreen('Forecast', () => ForecastRoute);
Navigation.registerScreen('Day', () => DayRoute);
