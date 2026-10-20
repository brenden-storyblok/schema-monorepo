import { defineFolder } from '@storyblok/schema';

export const app1Folder = defineFolder({ name: 'app-1' });
export const app1ContentTypes = defineFolder({
  name: 'app-1-content-types',
  parent: app1Folder,
});
export const app1Components = defineFolder({
  name: 'app-1-components',
  parent: app1Folder,
});
