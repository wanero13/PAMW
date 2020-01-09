import { AppRegistry, Platform } from 'react-native';
import App from './App';

AppRegistry.registerComponent('pamw_p3', () => App);

if (Platform.OS === 'web') {
  const rootTag = document.getElementById('root') || document.getElementById('main');
  AppRegistry.runApplication('pamw_p3', { rootTag });
}
