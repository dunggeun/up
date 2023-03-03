import { ToastManager } from '../ToastManager';

export const show = (element: JSX.Element): void => {
  ToastManager.getInstance().show(element);
};
