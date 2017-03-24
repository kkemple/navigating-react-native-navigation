/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import Navigation from 'native-navigation';

import ForecastRoute from './routes/forecast';
import DayRoute from './routes/day';

Navigation.registerScreen('Forecast', () => ForecastRoute);

Navigation.registerScreen('Day', () => DayRoute);
