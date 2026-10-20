import { defineBlock, defineField } from '@storyblok/schema';
import { coreFolder } from '@monorepo/ui-core/schema';
import { app2Components, app2ContentTypes } from '../folders';

export const app2PageBlock = defineBlock({
  name: 'app_2_page',
  display_name: 'App 2 Page',
  is_root: true,
  is_nestable: false,
  folder: app2ContentTypes,
  fields: [
    defineField('body', {
      type: 'bloks',
      allow: [coreFolder, app2Components],
    }),
  ],
});
