import { runAfterModalDismissed } from 'src/utils';
import type { ModalProps } from 'src/components';
import { AppEventChannel } from '../event';
import { Logger } from '../logger';
import type { AppEventType } from '../event/types';

interface ModalConfig<Props extends Pick<ModalProps, 'visible' | 'onClose'>> {
  component: React.ReactElement<Props> | React.FC<Props>;
  on: AppEventType;
  id: string;
}

type ModalControllerCallback = (id: string | null) => void;

const TAG = 'ModalController';

export class ModalController<
  const Modals extends readonly ModalConfig<ModalProps>[],
> {
  private activeModalId: Modals[number]['id'] | null = null;
  private queuedModalId: Modals[number]['id'][] = [];
  private callback?: ModalControllerCallback;

  constructor(public modals: Modals) {
    const channel = AppEventChannel.getInstance();
    modals.forEach(({ id, on }) => {
      channel.addEventListener(on, () => this.open(id));
    });
  }

  private dispatch(): void {
    this.callback?.(this.activeModalId);
  }

  on(callback: ModalControllerCallback): void {
    this.callback = callback;
  }

  open(id: Modals[number]['id']): void {
    if (this.activeModalId) {
      this.queuedModalId.push(id);
      Logger.info(TAG, `other modal already shown: ${this.activeModalId}`);
      Logger.info(TAG, `open modal task was queued: ${id}`);
      return;
    }

    this.activeModalId = id;
    this.dispatch();
  }

  close(): void {
    this.activeModalId = null;
    this.dispatch();

    const nextModalId = this.queuedModalId.shift();
    if (nextModalId !== undefined) {
      runAfterModalDismissed(() => this.open(nextModalId));
    }
  }
}
