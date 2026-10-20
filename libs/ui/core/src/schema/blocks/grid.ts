import { defineBlock, defineField } from '@storyblok/schema';
import { coreFolder } from '../folders';

export const gridBlock = defineBlock({
  name: 'grid',
  is_root: false,
  is_nestable: true,
  folder: coreFolder,
  fields: [
    defineField('columns', {
      type: 'bloks',
    }),
  ],
});
