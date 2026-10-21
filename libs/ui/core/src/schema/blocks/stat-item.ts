import { defineBlock, defineField } from '@storyblok/schema';
import { coreItemsFolder } from '../folders';
import { iconOptions } from '../icons';

export const statItemBlock = defineBlock({
  name: 'stat_item',
  display_name: 'Stat item',
  is_root: false,
  is_nestable: true,
  folder: coreItemsFolder,
  fields: [
    defineField('value', {
      type: 'text',
      display_name: 'Value',
      description: 'The figure itself, e.g. "98%" or "2.4M".',
      required: true,
    }),
    defineField('label', {
      type: 'text',
      display_name: 'Label',
      description:
        'Says what the value measures, e.g. "Customer satisfaction". Screen readers read it before the value.',
      required: true,
    }),
    defineField('description', {
      type: 'textarea',
      display_name: 'Description',
      description: 'Optional context, such as the period or source.',
    }),
    defineField('icon', {
      type: 'option',
      display_name: 'Icon',
      description: 'Decorative. Screen readers skip it.',
      default_value: 'none',
      exclude_empty_option: true,
      options: iconOptions,
    }),
  ],
});
