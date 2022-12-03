import { device, by, expect, element } from 'detox';

describe('example', () => {
  beforeAll(async () => {
    console.log('A');
    await device.launchApp();
    console.log('B');
    await device.disableSynchronization();
    console.log('C');

  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have demo component', async () => {
    await expect(element(by.id('demo'))).toBeVisible();
  });
});
