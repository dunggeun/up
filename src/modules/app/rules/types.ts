import type { User } from 'src/features/users';
import type { AppEventPayload, AppEventType } from 'src/modules/event/types';

interface RuleContext {
  user: User;
}

interface Rule<Type extends AppEventType> {
  description: string;
  eventType: AppEventType;
  evaluation: (
    context: RuleContext,
    event: AppEventPayload[Type],
  ) => boolean | Promise<boolean>;
}

export interface BadgeUnlockRule<Type extends AppEventType> extends Rule<Type> {
  targetBadgeId: number;
}
