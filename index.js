import './bootstrap';
import { AppRegistry } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { App } from '@/App';
import { initialize as initializePushNotification } from 'src/modules/notifications';
import { name as appName } from './app.json';

SQLite.enablePromise(true);

initializePushNotification();

AppRegistry.registerComponent(appName, () => App);
