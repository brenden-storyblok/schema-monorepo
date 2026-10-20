import { defineBlock, defineField } from '@storyblok/schema';
import { coreFolder } from '../folders';

export const textBlock = defineBlock({
  name: 'text',
  display_name: 'Text',
  is_root: false,
  is_nestable: true,
  folder: coreFolder,
  fields: [
    defineField('text', {
      type: 'richtext',
      display_name: 'Text',
      // Only what `.text` styles. Leaving out `blok` keeps nested blocks out
      // of the copy; layout belongs in the page body.
      customize_toolbar: true,
      toolbar: [
        'bold',
        'italic',
        'inlinecode',
        'link',
        'h2',
        'h3',
        'h4',
        'list',
        'olist',
        'quote',
        'code',
        'hrule',
        'paragraph',
      ],
      allow_target_blank: true,
    }),
  ],
});
