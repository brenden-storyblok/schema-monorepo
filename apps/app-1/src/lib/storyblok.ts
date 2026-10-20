import { apiPlugin, storyblokInit } from '@storyblok/react/rsc';
import { components as coreComponents } from '@monorepo/ui-core/server';
import { components as app1Components } from '@monorepo/ui-app-1/server';

const components = {
  ...coreComponents,
  ...app1Components,
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

// Draft content during development and in the Visual Editor preview;
// published content everywhere else.
export const storyVersion: 'draft' | 'published' =
  process.env.NODE_ENV === 'production' ? 'published' : 'draft';
