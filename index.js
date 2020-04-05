/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import createFilePath from './src/screens/subtitleToDo/createFilePath'
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
// AppRegistry.registerComponent(appName, () => createFilePath);
