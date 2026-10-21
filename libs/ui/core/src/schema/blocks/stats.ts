import { defineBlock, defineField } from '@storyblok/schema';
import { headingLevelField } from '../headings';
import { coreFolder } from '../folders';
import { statItemBlock } from './stat-item';

export const statsBlock = defineBlock({
  name: 'stats',
  display_name: 'Stats',
  is_root: false,
  is_nestable: true,
  folder: coreFolder,
  fields: [
    defineField('headline', {
      type: 'text',
      display_name: 'Headline',
    }),
    defineField('intro', {
      type: 'textarea',
      display_name: 'Intro',
      description: 'Supporting paragraph shown below the headline.',
    }),
    defineField('items', {
      type: 'bloks',
      display_name: 'Stats',
      allow: [statItemBlock],
      maximum: 6,
      required: true,
    }),
    defineField('style_tab', {
      type: 'tab',
      display_name: 'Style',
      keys: ['heading_level', 'variant', 'alignment', 'columns'],
    }),
    headingLevelField('h2', ['h2', 'h3'], {
      description:
        'Pick the level that fits the page outline. Use H3 when the block sits under another H2.',
    }),
    defineField('variant', {
      type: 'option',
      display_name: 'Variant',
      description:
        'Default shows the page background. Subtle uses a tinted surface; inverted uses a dark one.',
      default_value: 'default',
      exclude_empty_option: true,
      options: [
        { name: 'Default', value: 'default' },
        { name: 'White', value: 'white' },
        { name: 'Subtle', value: 'subtle' },
        { name: 'Inverted', value: 'inverted' },
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
    defineField('columns', {
      type: 'option',
      display_name: 'Columns',
      description:
        'Columns on desktop. Auto fits as many as the width allows. Smaller screens use fewer.',
      default_value: 'auto',
      exclude_empty_option: true,
      options: [
        { name: 'Auto', value: 'auto' },
        { name: '2 columns', value: '2' },
        { name: '3 columns', value: '3' },
        { name: '4 columns', value: '4' },
      ],
    }),
  ],
});
