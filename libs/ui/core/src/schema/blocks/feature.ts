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
      display_name: 'Name',
    }),
    defineField('description', {
      type: 'textarea',
      display_name: 'Description',
    }),
    // defineField('icon', {
    //   type: 'option',
    //   display_name: 'Icon',
    //   default_value: 'none',
    //   exclude_empty_option: true,
    //   options: [
    //     { name: 'None', value: 'none' },
    //     { name: 'Bolt', value: 'bolt' },
    //     { name: 'Shield', value: 'shield' },
    //     { name: 'Chart', value: 'chart' },
    //     { name: 'Sparkles', value: 'sparkles' },
    //   ],
    // }),
    defineField('style_tab', {
      type: 'tab',
      display_name: 'Style',
      keys: ['variant', 'alignment'],
    }),
    defineField('variant', {
      type: 'option',
      display_name: 'Variant',
      default_value: 'default',
      exclude_empty_option: true,
      options: [
        { name: 'Default', value: 'default' },
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
