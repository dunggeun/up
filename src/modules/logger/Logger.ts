/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-extraneous-class */

import dayjs from 'dayjs';
import { Platform } from 'react-native';

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
  private static getTag(level: keyof typeof LEVEL_COLORS): string {
    const LEVEL_TAG = level.toUpperCase().padStart(MAX_TAG_LENGTH, ' ');
    const isNative = Platform.OS === 'android' || Platform.OS === 'ios';
    return __DEV__ && isNative
      ? `\r\x1b[${LEVEL_COLORS[level]}m${LEVEL_TAG}${RESET}`
      : LEVEL_TAG;
  }

  private static getTimestamp(): string {
    return `${dayjs().format('YYYY/MM/DD HH:mm:ss.SSS')} -`;
  }

  static debug(...params: any[]): void {
    if (!__DEV__) return;
    self._log(Logger.getTag('debug'), Logger.getTimestamp(), ...params);
  }

  static log(...params: any[]): void {
    self._log(Logger.getTag('log'), Logger.getTimestamp(), ...params);
  }

  static info(...params: any[]): void {
    self._log(Logger.getTag('info'), Logger.getTimestamp(), ...params);
  }

  static success(...params: any[]): void {
    self._log(Logger.getTag('success'), Logger.getTimestamp(), ...params);
  }

  static warn(...params: any[]): void {
    self._warn(Logger.getTag('warn'), Logger.getTimestamp(), ...params);
  }

  static error(...params: any[]): void {
    self._error(Logger.getTag('error'), Logger.getTimestamp(), ...params);
  }
}
