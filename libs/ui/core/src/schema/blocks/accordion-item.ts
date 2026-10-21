import { defineBlock, defineField } from '@storyblok/schema';
import { coreItemsFolder } from '../folders';

export const accordionItemBlock = defineBlock({
  name: 'accordion_item',
  display_name: 'Accordion item',
  is_root: false,
  is_nestable: true,
  folder: coreItemsFolder,
  fields: [
    defineField('question', {
      type: 'text',
      display_name: 'Question',
      description: 'Shown as the clickable heading of the item.',
      required: true,
    }),
    defineField('answer', {
      type: 'richtext',
      display_name: 'Answer',
      description:
        'Shown when the item opens. With FAQ schema on, search engines read it as plain text.',
      required: true,
      customize_toolbar: true,
      toolbar: ['bold', 'italic', 'link', 'list', 'olist', 'paragraph'],
      allow_target_blank: true,
    }),
    defineField('open_by_default', {
      type: 'boolean',
      display_name: 'Open by default',
      description:
        'With "Allow multiple open" off, only the first open item stays open.',
    }),
  ],
});
