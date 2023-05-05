import { interpret } from 'xstate';
import { globalMachine } from './globalMachine';

export const globalMachineService = interpret(globalMachine);
