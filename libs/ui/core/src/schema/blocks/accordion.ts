import { defineBlock, defineField } from '@storyblok/schema';
import { headingLevelField } from '../headings';
import { coreFolder } from '../folders';
import { accordionItemBlock } from './accordion-item';

export const accordionBlock = defineBlock({
  name: 'accordion',
  display_name: 'Accordion',
  is_root: false,
  is_nestable: true,
  folder: coreFolder,
  fields: [
    defineField('headline', {
      type: 'text',
      display_name: 'Headline',
      description: 'Optional heading shown above the items.',
    }),
    defineField('items', {
      type: 'bloks',
      display_name: 'Items',
      allow: [accordionItemBlock],
      required: true,
    }),
    defineField('allow_multiple', {
      type: 'boolean',
      display_name: 'Allow multiple open',
      description: 'Off: opening an item closes the others.',
      default_value: true,
    }),
    defineField('faq_schema', {
      type: 'boolean',
      display_name: 'Add FAQ structured data',
      description:
        'Tells search engines the items are questions and answers. Use only when the page is a real FAQ, and only once per page.',
    }),
    defineField('style_tab', {
      type: 'tab',
      display_name: 'Style',
      keys: ['variant', 'heading_level'],
    }),
    defineField('variant', {
      type: 'option',
      display_name: 'Variant',
      description:
        'Default is transparent and shows the page background. White adds a white surface; outlined adds a border.',
      default_value: 'default',
      exclude_empty_option: true,
      options: [
        { name: 'Default (transparent)', value: 'default' },
        { name: 'White', value: 'white' },
        { name: 'Outlined', value: 'outlined' },
      ],
    }),
    headingLevelField('h3', ['h3', 'h2', 'h4'], {
      display_name: 'Question heading level',
      label_case: 'lower',
      description:
        'The headline renders one level above the questions (h3 questions give an h2 headline, h4 gives h3), and h2 questions drop to h3 when a headline is set.',
    }),
  ],
});
