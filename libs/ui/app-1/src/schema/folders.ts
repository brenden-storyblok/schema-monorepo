import { defineFolder } from '@storyblok/schema';

export const app1Folder = defineFolder({ name: 'app-1' });
export const app1ContentTypes = defineFolder({
  name: 'content-types',
  parent: app1Folder,
});
export const app1Components = defineFolder({
  name: 'components',
  parent: app1Folder,
});
