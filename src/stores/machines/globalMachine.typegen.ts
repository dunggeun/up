// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  internalEvents: {
    'done.invoke.globalMachine.authorized.refreshing:invocation[0]': {
      type: 'done.invoke.globalMachine.authorized.refreshing:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.globalMachine.unauthorized.validating:invocation[0]': {
      type: 'done.invoke.globalMachine.unauthorized.validating:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.loading:invocation[0]': {
      type: 'done.invoke.loading:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'error.platform.globalMachine.authorized.refreshing:invocation[0]': {
      type: 'error.platform.globalMachine.authorized.refreshing:invocation[0]';
      data: unknown;
    };
    'error.platform.loading:invocation[0]': {
      type: 'error.platform.loading:invocation[0]';
      data: unknown;
    };
    'xstate.after(DEFAULT_TIMEOUT)#loading': {
      type: 'xstate.after(DEFAULT_TIMEOUT)#loading';
    };
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {
    cleanup: 'done.invoke.unauthorized:invocation[0]';
    loadUser:
      | 'done.invoke.globalMachine.authorized.refreshing:invocation[0]'
      | 'done.invoke.loading:invocation[0]';
    saveUser: 'done.invoke.globalMachine.unauthorized.validating:invocation[0]';
  };
  missingImplementations: {
    actions: never;
    delays: never;
    guards: never;
    services: never;
  };
  eventsCausingActions: {
    onAuthorized: 'done.invoke.loading:invocation[0]';
    onIdle: 'xstate.init';
    onLoading:
      | 'AUTO_LOGIN'
      | 'done.invoke.globalMachine.unauthorized.validating:invocation[0]';
    onUnauthorized:
      | 'LOGOUT'
      | 'error.platform.globalMachine.authorized.refreshing:invocation[0]'
      | 'error.platform.loading:invocation[0]'
      | 'xstate.after(DEFAULT_TIMEOUT)#loading';
    removeUser:
      | 'LOGOUT'
      | 'error.platform.globalMachine.authorized.refreshing:invocation[0]'
      | 'error.platform.loading:invocation[0]'
      | 'xstate.after(DEFAULT_TIMEOUT)#loading';
    setUser:
      | 'done.invoke.globalMachine.authorized.refreshing:invocation[0]'
      | 'done.invoke.loading:invocation[0]';
  };
  eventsCausingDelays: {
    DEFAULT_TIMEOUT:
      | 'AUTO_LOGIN'
      | 'done.invoke.globalMachine.unauthorized.validating:invocation[0]';
  };
  eventsCausingGuards: {};
  eventsCausingServices: {
    cleanup:
      | 'LOGOUT'
      | 'error.platform.globalMachine.authorized.refreshing:invocation[0]'
      | 'error.platform.loading:invocation[0]'
      | 'xstate.after(DEFAULT_TIMEOUT)#loading';
    loadUser:
      | 'AUTO_LOGIN'
      | 'REFRESH'
      | 'done.invoke.globalMachine.unauthorized.validating:invocation[0]';
    saveUser: 'LOGIN';
  };
  matchesStates:
    | 'authorized'
    | 'authorized.idle'
    | 'authorized.refreshing'
    | 'idle'
    | 'loading'
    | 'unauthorized'
    | 'unauthorized.idle'
    | 'unauthorized.validating'
    | {
        authorized?: 'idle' | 'refreshing';
        unauthorized?: 'idle' | 'validating';
      };
  tags: never;
}
