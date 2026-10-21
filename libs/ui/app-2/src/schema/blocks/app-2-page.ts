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
    defineField('style_tab', {
      type: 'tab',
      display_name: 'Style',
      keys: ['background'],
    }),
    defineField('background', {
      type: 'option',
      display_name: 'Background color',
      description: 'Fills the whole page behind the content.',
      default_value: 'default',
      exclude_empty_option: true,
      options: [
        { name: 'Default', value: 'default' },
        { name: 'Subtle', value: 'subtle' },
        { name: 'Inverted', value: 'inverted' },
        { name: 'Brand', value: 'brand' },
      ],
    }),
  ],
});
