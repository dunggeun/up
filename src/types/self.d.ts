/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-explicit-any */
interface Self {
  _log: (...args: any[]) => void;
  _warn: (...args: any[]) => void;
  _error: (...args: any[]) => void;
}

declare var self: Self;
