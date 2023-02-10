// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  internalEvents: {
    'done.invoke.(machine).authorized.calculating:invocation[0]': {
      type: 'done.invoke.(machine).authorized.calculating:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.(machine).authorized.refreshing:invocation[0]': {
      type: 'done.invoke.(machine).authorized.refreshing:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.(machine).authorized.updating:invocation[0]': {
      type: 'done.invoke.(machine).authorized.updating:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.(machine).unauthorized.validating:invocation[0]': {
      type: 'done.invoke.(machine).unauthorized.validating:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.loading:invocation[0]': {
      type: 'done.invoke.loading:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'error.platform.(machine).authorized.refreshing:invocation[0]': {
      type: 'error.platform.(machine).authorized.refreshing:invocation[0]';
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
    calculateLevel: 'done.invoke.(machine).authorized.calculating:invocation[0]';
    cleanup: 'done.invoke.unauthorized:invocation[0]';
    loadUser:
      | 'done.invoke.(machine).authorized.refreshing:invocation[0]'
      | 'done.invoke.loading:invocation[0]';
    saveUser: 'done.invoke.(machine).unauthorized.validating:invocation[0]';
    updateUser: 'done.invoke.(machine).authorized.updating:invocation[0]';
  };
  missingImplementations: {
    actions: never;
    delays: never;
    guards: never;
    services: never;
  };
  eventsCausingActions: {
    onAuthorized: 'done.invoke.loading:invocation[0]';
    onCalculating: 'REWARD';
    onIdle: 'xstate.init';
    onLoading:
      | 'AUTO_LOGIN'
      | 'done.invoke.(machine).unauthorized.validating:invocation[0]';
    onRefreshing: 'REFRESH';
    onUnauthorized:
      | 'LOGOUT'
      | 'error.platform.(machine).authorized.refreshing:invocation[0]'
      | 'error.platform.loading:invocation[0]'
      | 'xstate.after(DEFAULT_TIMEOUT)#loading';
    onUpdateUser: 'EDIT_USER';
    removeUser:
      | 'LOGOUT'
      | 'error.platform.(machine).authorized.refreshing:invocation[0]'
      | 'error.platform.loading:invocation[0]'
      | 'xstate.after(DEFAULT_TIMEOUT)#loading';
    setUser:
      | 'done.invoke.(machine).authorized.calculating:invocation[0]'
      | 'done.invoke.(machine).authorized.refreshing:invocation[0]'
      | 'done.invoke.(machine).authorized.updating:invocation[0]'
      | 'done.invoke.loading:invocation[0]';
  };
  eventsCausingDelays: {
    DEFAULT_TIMEOUT:
      | 'AUTO_LOGIN'
      | 'done.invoke.(machine).unauthorized.validating:invocation[0]';
  };
  eventsCausingGuards: {};
  eventsCausingServices: {
    calculateLevel: 'REWARD';
    cleanup:
      | 'LOGOUT'
      | 'error.platform.(machine).authorized.refreshing:invocation[0]'
      | 'error.platform.loading:invocation[0]'
      | 'xstate.after(DEFAULT_TIMEOUT)#loading';
    loadUser:
      | 'AUTO_LOGIN'
      | 'REFRESH'
      | 'done.invoke.(machine).unauthorized.validating:invocation[0]';
    saveUser: 'LOGIN';
    updateUser: 'EDIT_USER';
  };
  matchesStates:
    | 'authorized'
    | 'authorized.calculating'
    | 'authorized.idle'
    | 'authorized.refreshing'
    | 'authorized.updating'
    | 'idle'
    | 'loading'
    | 'unauthorized'
    | 'unauthorized.idle'
    | 'unauthorized.validating'
    | {
        authorized?: 'calculating' | 'idle' | 'refreshing' | 'updating';
        unauthorized?: 'idle' | 'validating';
      };
  tags: never;
}
