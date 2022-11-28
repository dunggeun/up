import 'node-self';
import 'react-native-gesture-handler/jestSetup';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const self: any;

// react-native-reanimated
// eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unsafe-member-access
self.__reanimatedWorkletInit = (): void => {};
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));

beforeAll(() => {
  // do something
});

afterAll(() => {
  // do something
});
