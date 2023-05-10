/**
 * .env 파일 내용에 의존함
 */
declare module 'react-native-dotenv' {
  export const STORYBOOK: string;
  export const REACT_NATIVE_SENTRY_DSN: string;
}
