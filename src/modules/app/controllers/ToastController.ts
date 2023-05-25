import React from 'react';
import { Text } from 'dripsy';
import { TOAST_ANIMATION_DURATION, TOAST_DURATION } from 'src/constants';

type Handler = (content: React.ReactElement | null) => void;

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class ToastController {
  private static visibility = false;
  private static timer?: NodeJS.Timeout;
  private static handler?: Handler;

  private static dispatchContent(content: React.ReactElement | null): void {
    this.visibility = Boolean(content);
    this.handler?.(content);

    if (!content) return;

    this.timer = setTimeout(() => {
      this.handler?.(null);
    }, TOAST_DURATION);
  }

  static register(handler: Handler): void {
    this.handler = handler;
  }

  static show(message: string): void {
    // eslint-disable-next-line import/no-named-as-default-member
    const content = React.createElement(Text, { variant: 'primary' }, message);
    clearTimeout(this.timer);
    if (this.visibility) {
      this.hide();
      this.timer = setTimeout(() => {
        this.dispatchContent(content);
      }, TOAST_ANIMATION_DURATION);
      return;
    }
    this.dispatchContent(content);
  }

  static hide(): void {
    this.dispatchContent(null);
  }
}
