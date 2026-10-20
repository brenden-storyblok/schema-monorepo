import { defineBlock, defineField } from '@storyblok/schema';
import { coreFolder } from '../folders';

export const teaserBlock = defineBlock({
  name: 'teaser',
  is_root: false,
  is_nestable: true,
  folder: coreFolder,
  fields: [
    defineField('headline', {
      type: 'text',
    }),
  ],
});
