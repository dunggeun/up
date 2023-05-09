/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-explicit-any */
declare namespace globalThis {
  var _log: (...args: any[]) => void;
  var _warn: (...args: any[]) => void;
  var _error: (...args: any[]) => void;
}
