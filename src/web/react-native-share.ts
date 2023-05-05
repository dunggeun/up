export default {
  open(): Promise<void> {
    console.warn('not supported on this platform');
    return Promise.resolve();
  },
};
