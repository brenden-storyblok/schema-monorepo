import { apiPlugin, storyblokInit } from '@storyblok/react/rsc';
import { components as coreComponents } from '@monorepo/ui-core/server';
import { components as app2Components } from '@monorepo/ui-app-2/server';

const components = {
  ...coreComponents,
  ...app2Components,
};

// Delivery (preview) token for space 296015814324321, region EU.
export const getStoryblokApi = storyblokInit({
  accessToken: process.env.STORYBLOK_API_KEY,
  use: [apiPlugin],
  apiOptions: {
    region: 'eu',
  },
  components,
});

