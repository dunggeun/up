import { interpret, type InterpreterFrom } from 'xstate';
import { globalMachine } from './globalMachine';

const service = interpret(globalMachine);

export const getService = (): InterpreterFrom<typeof globalMachine> => service;
