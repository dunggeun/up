import { registerRoute, NavigationRoute, Route } from 'workbox-routing';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';

const navigationRoute = new NavigationRoute(
  new CacheFirst({ cacheName: 'navigations' }),
);

const scriptAssetRoute = new Route(
  ({ request }) => request.destination === 'script',
  new CacheFirst({ cacheName: 'script-assets' }),
);

const imageAssetRoute = new Route(
  ({ request }) => request.destination === 'image',
  new StaleWhileRevalidate({ cacheName: 'image-assets' }),
);

const fontAssetRoute = new Route(
  ({ request }) => request.destination === 'font',
  new CacheFirst({ cacheName: 'font-assets' }),
);

registerRoute(navigationRoute);
registerRoute(scriptAssetRoute);
registerRoute(imageAssetRoute);
registerRoute(fontAssetRoute);
