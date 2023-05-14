import { Linking } from 'react-native';
import { Logger } from 'src/modules/logger';

export const openUrl = (url: string): void => {
  Linking.canOpenURL(url)
    .then(() => Linking.openURL(url))
    .catch((error: Error) => Logger.error('utils.openUrl', error.message));
};

/* istanbul ignore next */
export const openMail = (
  to: string,
  { subject, body }: { subject: string; body: string },
): void => {
  const url = `mailto:${to}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
  openUrl(url);
};
