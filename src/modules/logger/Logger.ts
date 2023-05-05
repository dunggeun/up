/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-extraneous-class */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { Platform } from 'react-native';
import { setLogger } from 'react-query';
import dayjs from 'dayjs';

const RESET = '\x1b[0m';
const LEVEL_COLORS = {
  debug: 90,
  log: 37,
  info: 34,
  success: 32,
  warn: 33,
  error: 31,
} as const;

const MAX_TAG_LENGTH = 7; // 'success'.length + ' '.length = 7

export class Logger {
  private static getLevel(level: keyof typeof LEVEL_COLORS): string {
    const LEVEL_TAG = level.toUpperCase().padStart(MAX_TAG_LENGTH, ' ');
    const isNative = Platform.OS === 'android' || Platform.OS === 'ios';
    return __DEV__ && isNative
      ? `\r\x1b[${LEVEL_COLORS[level]}m${LEVEL_TAG}${RESET}`
      : LEVEL_TAG;
  }

  private static getTimestamp(): string {
    return `${dayjs().format('YYYY/MM/DD HH:mm:ss.SSS')} -`;
  }

  static debug(tag: string, ...params: any[]): void {
    if (!__DEV__) return;
    self._log(
      Logger.getLevel('debug'),
      Logger.getTimestamp(),
      tag,
      ...(params.length ? ['::', ...params] : params),
    );
  }

  static log(tag: string, ...params: any[]): void {
    self._log(
      Logger.getLevel('log'),
      Logger.getTimestamp(),
      tag,
      ...(params.length ? ['::', ...params] : params),
    );
  }

  static info(tag: string, ...params: any[]): void {
    self._log(
      Logger.getLevel('info'),
      Logger.getTimestamp(),
      tag,
      ...(params.length ? ['::', ...params] : params),
    );
  }

  static success(tag: string, ...params: any[]): void {
    self._log(
      Logger.getLevel('success'),
      Logger.getTimestamp(),
      tag,
      ...(params.length ? ['::', ...params] : params),
    );
  }

  static warn(tag: string, ...params: any[]): void {
    self._warn(
      Logger.getLevel('warn'),
      Logger.getTimestamp(),
      tag,
      ...(params.length ? ['::', ...params] : params),
    );
  }

  static error(tag: string, ...params: any[]): void {
    self._error(
      Logger.getLevel('error'),
      Logger.getTimestamp(),
      tag,
      ...(params.length ? ['::', ...params] : params),
    );
  }
}

((): void => {
  const TAG = 'ReactQuery';
  setLogger({
    log: (...args) => Logger.log(TAG, ...args),
    warn: (...args) => Logger.warn(TAG, ...args),
    error: (...args) => Logger.error(TAG, ...args),
  });
})();
