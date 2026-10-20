import { defineBlock, defineField } from '@storyblok/schema';
import { coreFolder } from '@monorepo/ui-core/schema';
import { app1Components, app1ContentTypes } from '../folders';

export const app1PageBlock = defineBlock({
  name: 'app_1_page',
  display_name: 'App 1 Page',
  is_root: true,
  is_nestable: false,
  folder: app1ContentTypes,
  fields: [
    defineField('body', {
      type: 'bloks',
      allow: [coreFolder, app1Components],
    }),
  ],
});
