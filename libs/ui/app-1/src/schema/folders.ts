import { defineFolder } from '@storyblok/schema';

export const app1Folder = defineFolder({ name: 'app-1' });
export const app1ContentTypes = defineFolder({
  name: 'App-1 Content Types',
  parent: app1Folder,
});
export const app1Components = defineFolder({
  name: 'App-1 Components',
  parent: app1Folder,
});
