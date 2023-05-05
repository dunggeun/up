import { Linking } from 'react-native';
import { Logger } from 'src/modules/logger';

/* istanbul ignore next */
export const openMail = (
  to: string,
  { subject, body }: { subject: string; body: string },
): void => {
  const url = `mailto:${to}?subject=${subject}&body=${body}`;
  Linking.canOpenURL(url)
    .then(() => Linking.openURL(url))
    .catch((error: Error) => Logger.error('utils.openMail', error.message));
};
