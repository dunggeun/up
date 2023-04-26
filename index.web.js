/// <reference lib="DOM" />

import 'setimmediate';
import 'react-native-reanimated';
import { AppRegistry } from 'react-native';
import { App } from '@/App';
import { name as appName } from './app.json';

AppRegistry.runApplication(
  AppRegistry.registerComponent(appName, () => App),
  {
    rootTag: document.getElementById('root'),
  },
);
