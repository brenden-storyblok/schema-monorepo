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
      display_name: 'Items',
    }),
    defineField('style_tab', {
      type: 'tab',
      display_name: 'Style',
      keys: ['column_count', 'spacing'],
    }),
    defineField('column_count', {
      type: 'option',
      display_name: 'Columns',
      description: 'Columns on desktop. Smaller screens use fewer.',
      default_value: '3',
      exclude_empty_option: true,
      options: [
        { name: '2 columns', value: '2' },
        { name: '3 columns', value: '3' },
        { name: '4 columns', value: '4' },
      ],
    }),
    defineField('spacing', {
      type: 'option',
      display_name: 'Spacing',
      default_value: 'default',
      exclude_empty_option: true,
      options: [
        { name: 'Compact', value: 'compact' },
        { name: 'Default', value: 'default' },
        { name: 'Relaxed', value: 'relaxed' },
      ],
    }),
  ],
});
