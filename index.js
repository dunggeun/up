import './bootstrap';
import { AppRegistry } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { App } from '@/App';
import { name as appName } from './app.json';

SQLite.enablePromise(true);

AppRegistry.registerComponent(appName, () => App);
