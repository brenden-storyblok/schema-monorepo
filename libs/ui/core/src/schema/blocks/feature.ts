import { defineBlock, defineField } from '@storyblok/schema';
import { coreFolder } from '../folders';
import { iconOptions } from '../icons';

export const featureBlock = defineBlock({
  name: 'feature',
  is_root: false,
  is_nestable: true,
  folder: coreFolder,
  fields: [
    defineField('name', {
      type: 'text',
      display_name: 'Name',
    }),
    defineField('description', {
      type: 'textarea',
      display_name: 'Description',
    }),
    defineField('icon', {
      type: 'option',
      display_name: 'Icon',
      default_value: 'none',
      exclude_empty_option: true,
      options: iconOptions,
    }),
    defineField('style_tab', {
      type: 'tab',
      display_name: 'Style',
      keys: ['variant', 'alignment'],
    }),
    defineField('variant', {
      type: 'option',
      display_name: 'Variant',
      description: 'Default shows the page background.',
      default_value: 'default',
      exclude_empty_option: true,
      options: [
        { name: 'Default', value: 'default' },
        { name: 'White', value: 'white' },
        { name: 'Outlined', value: 'outlined' },
        { name: 'Accent', value: 'accent' },
      ],
    }),
    defineField('alignment', {
      type: 'option',
      display_name: 'Alignment',
      default_value: 'left',
      exclude_empty_option: true,
      options: [
        { name: 'Left', value: 'left' },
        { name: 'Center', value: 'center' },
      ],
    }),
  ],
});
