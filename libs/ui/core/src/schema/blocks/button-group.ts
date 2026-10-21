import { defineBlock, defineField } from '@storyblok/schema';
import { coreFolder } from '../folders';

// Lives in `coreFolder`, not `coreItemsFolder`: editors place it directly in
// a Section body, so Section must keep offering it.
export const buttonGroupBlock = defineBlock({
  name: 'button_group',
  display_name: 'Button group',
  is_root: false,
  is_nestable: true,
  folder: coreFolder,
  fields: [
    defineField('buttons', {
      type: 'bloks',
      display_name: 'Buttons',
      description: 'Use one primary button per group.',
      allow: ['button'],
      required: true,
      maximum: 4,
    }),
    defineField('style_tab', {
      type: 'tab',
      display_name: 'Style',
      keys: ['alignment'],
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
