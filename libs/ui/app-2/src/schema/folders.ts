import { defineFolder } from '@storyblok/schema';

export const app2Folder = defineFolder({ name: 'app-2' });
export const app2ContentTypes = defineFolder({
  name: 'app-2-content-types',
  parent: app2Folder,
});
export const app2Components = defineFolder({
  name: 'app-2-components',
  parent: app2Folder,
});
