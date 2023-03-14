import { Linking } from 'react-native';
import { noop } from './common';

/* istanbul ignore next */
export const openMail = (
  to: string,
  { subject, body }: { subject: string, body: string }
): void => {
  Linking
    .openURL(`mailto:${to}?subject=${subject}&body=${body}`)
    .catch(noop);
};
