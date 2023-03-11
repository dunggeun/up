import { TOAST_ANIMATION_DURATION, TOAST_DURATION } from 'src/constants';

type Handler = (content: React.ReactNode) => void;

export class ToastManager {
  private static instance: ToastManager | null = null;
  private visibility = false;
  private timer?: NodeJS.Timeout;
  private handler?: Handler;

  private constructor () {
    // empty constructor
  }

  public static getInstance(): ToastManager {
    if (ToastManager.instance === null) {
      ToastManager.instance = new ToastManager();
    }
    return ToastManager.instance;
  }

  private dispatchContent (content: React.ReactNode): void {
    this.visibility = Boolean(content);
    this.handler?.(content);

    if (!content) return;

    this.timer = setTimeout(() => {
      this.handler?.(null);
    }, TOAST_DURATION);
  }

  register (handler: Handler): void {
    this.handler = handler;
  }

  show (content: React.ReactNode): void {
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

  hide (): void {
    this.dispatchContent(null);
  }
}
