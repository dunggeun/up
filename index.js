import 'react-native-gesture-handler';
import SQLite from 'react-native-sqlite-storage';
import { AppRegistry } from 'react-native';
import { App } from '@/App';
import { name as appName } from './app.json';

SQLite.enablePromise(true);

AppRegistry.registerComponent(appName, () => App);
