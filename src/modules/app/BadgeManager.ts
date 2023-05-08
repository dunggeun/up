import { globalMachineService } from 'src/stores/machines';
import { AppEventChannel } from '../event';
import { Logger } from '../logger';
import { badgeRules } from './rules';

import type { Badge } from './types';

const TAG = 'BadgeManager';

export class BadgeManager {
  private static instance: BadgeManager | null = null;
  private tempBadgeIds: Badge['id'][] = [];
  private isIdle = false;
  private initialized = false;

  private constructor() {
    // empty constructor
  }

  public static getInstance(): BadgeManager {
    if (BadgeManager.instance === null) {
      BadgeManager.instance = new BadgeManager();
    }
    return BadgeManager.instance;
  }

  initialize(): void {
    if (this.initialized) return;

    const eventChannel = AppEventChannel.getInstance();
    const tasks: Promise<void>[] = [];

    /**
     * 상태머신의 값이 authorized.idle 가 아닐때
     * EDIT_USER 트랜지션이 불가하기에 authorized.idle 인지 체크 필요함
     *
     * 만약 이전 트랜지션으로 인해 authorized.updating 등의 상태라면 작업을 잠시 대기하고
     * authorized.idle 상태로 전환되었을때 이어서 작업을 처리함
     */
    globalMachineService.onTransition((state) => {
      if (state.matches('unauthorized')) {
        this.tempBadgeIds = [];
      }
      this.isIdle = state.matches('authorized.idle');
      this.isIdle && this.unlockBadges();
    });

    badgeRules.forEach((rule) => {
      eventChannel.addEventListener(rule.eventType, (event) => {
        const user = globalMachineService.getSnapshot().context.user;
        const targetBadgeId = rule.targetBadgeId;

        if (!user) {
          Logger.warn(TAG, 'user is empty');
          return;
        }

        const context = { user } as const;
        tasks.push(
          Promise.resolve(rule.evaluation(context, event))
            .then((shouldUnlock) => {
              if (!shouldUnlock) return;
              Logger.info(
                TAG,
                `unlock ${targetBadgeId} badge (${rule.description})`,
              );
              this.tempBadgeIds.push(targetBadgeId);
              this.unlockBadges();
            })
            .catch((error) => Logger.error(TAG, (error as Error).message)),
        );
      });
    });

    this.initialized = true;
  }

  private unlockBadges(): void {
    const user = globalMachineService.getSnapshot().context.user;

    if (!this.tempBadgeIds.length) {
      return;
    } else if (!user) {
      Logger.warn(TAG, 'user is empty');
      return;
    } else if (!this.isIdle) {
      Logger.warn(TAG, 'state machine is busy now');
      return;
    }

    const currentTimestamp = Number(new Date());
    const newBadges = this.tempBadgeIds.reduce(
      (prev, badgeId) => ({ ...prev, [badgeId]: currentTimestamp }),
      {},
    );

    globalMachineService.send('EDIT_USER', {
      user: {
        unlockedBadges: {
          ...user.unlockedBadges,
          ...newBadges,
        },
      },
    });

    this.tempBadgeIds.forEach((badgeId) => {
      AppEventChannel.getInstance().dispatch('unlockBadge', {
        badgeId,
      });
    });
    this.tempBadgeIds = [];
  }
}
