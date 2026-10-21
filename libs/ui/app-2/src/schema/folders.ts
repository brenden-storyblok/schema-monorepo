import { defineFolder } from '@storyblok/schema';

export const app2Folder = defineFolder({ name: 'app-2' });
export const app2ContentTypes = defineFolder({
  name: 'App 2 Content Types',
  parent: app2Folder,
});
export const app2Components = defineFolder({
  name: 'App 2 Components',
  parent: app2Folder,
});
