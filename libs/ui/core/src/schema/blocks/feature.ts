import { defineBlock, defineField } from '@storyblok/schema';
import { coreFolder } from '../folders';

export const featureBlock = defineBlock({
  name: 'feature',
  is_root: false,
  is_nestable: true,
  folder: coreFolder,
  fields: [
    defineField('name', {
      type: 'text',
    }),
  ],
});
