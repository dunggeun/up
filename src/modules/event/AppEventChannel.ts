import { Logger } from '../logger';
import type {
  AppEventType,
  AppEventPayload,
  AppEventSubscription,
  EventHandler,
} from './types';

const TAG = 'AppEventChannel';

export class AppEventChannel {
  private static instance: AppEventChannel | null = null;
  private listeners = new Map<AppEventType, Set<EventHandler<AppEventType>>>();

  private constructor() {
    // empty constructor
  }

  static getInstance(): AppEventChannel {
    if (AppEventChannel.instance === null) {
      AppEventChannel.instance = new AppEventChannel();
    }
    return AppEventChannel.instance;
  }

  dispatch<Type extends AppEventType>(
    type: Type,
    payload: AppEventPayload[Type],
  ): void {
    Logger.info(TAG, `dispatching ${type} event`, { payload });
    this.listeners.get(type)?.forEach((handler) => {
      handler(payload);
    });
  }

  addEventListener<Type extends AppEventType>(
    type: Type,
    handler: EventHandler<Type>,
  ): AppEventSubscription {
    Logger.info(TAG, `add ${type} event listener`);
    const handlers = this.listeners.get(type) ?? new Set();
    handlers.add(handler as EventHandler<AppEventType>);
    this.listeners.set(type, handlers);

    return {
      remove: (): void => {
        Logger.info(TAG, `remove ${type} event listener`);
        handlers.delete(handler as EventHandler<AppEventType>);
      },
    };
  }
}
