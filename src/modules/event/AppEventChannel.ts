type EventType = keyof AppEventPayload;

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type AppEventPayload = {
  levelup: {
    level: number;
  };
};

export type EventHandler<Type extends EventType> = (
  event: AppEventPayload[Type],
) => void;

interface EventSubscription {
  remove: () => void;
}

export class AppEventChannel {
  private static instance: AppEventChannel | null = null;
  private listeners = new Map<EventType, Set<EventHandler<EventType>>>();

  private constructor() {
    // empty constructor
  }

  static getInstance(): AppEventChannel {
    if (AppEventChannel.instance === null) {
      AppEventChannel.instance = new AppEventChannel();
    }
    return AppEventChannel.instance;
  }

  dispatch<Type extends EventType>(
    type: Type,
    payload: AppEventPayload[Type],
  ): void {
    this.listeners.get(type)?.forEach((handler) => {
      handler(payload);
    });
  }

  addEventListener<Type extends EventType>(
    type: Type,
    handler: EventHandler<Type>,
  ): EventSubscription {
    const handlers = this.listeners.get(type) ?? new Set();
    handlers.add(handler as EventHandler<EventType>);
    this.listeners.set(type, handlers);

    return {
      remove: (): void => {
        handlers.delete(handler as EventHandler<EventType>);
      },
    };
  }
}
