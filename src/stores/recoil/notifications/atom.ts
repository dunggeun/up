import { atom } from 'recoil';

interface NotificationStatus {
  granted: boolean;
  error: Error | null;
}

const initialValue = {
  granted: false,
  error: null,
} as const;

export const notificationStatus = atom<NotificationStatus>({
  key: 'notificationStatus',
  default: initialValue,
});
