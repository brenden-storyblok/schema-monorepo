import { defineBlock, defineField } from '@storyblok/schema';
import { coreFolder } from '../folders';
import { coreItemBlocks } from '../items';

export const sectionBlock = defineBlock({
  name: 'section',
  display_name: 'Section',
  is_root: false,
  is_nestable: true,
  folder: coreFolder,
  fields: [
    // The editor ignores a deny list next to an allow list, so the field denies
    // `section` and the child-only items and offers every other nestable block.
    defineField('body', {
      type: 'bloks',
      display_name: 'Content',
      description:
        'Blocks shown inside the section. Start with a Headline block to name the section for screen reader users.',
      deny: ['section', ...coreItemBlocks],
    }),
    defineField('style_tab', {
      type: 'tab',
      display_name: 'Style',
      keys: ['background', 'spacing', 'width'],
    }),
    defineField('background', {
      type: 'option',
      display_name: 'Background color',
      description:
        'Default is transparent and shows the page background. Nested blocks adapt their text color.',
      default_value: 'default',
      exclude_empty_option: true,
      options: [
        { name: 'Default (transparent)', value: 'default' },
        { name: 'White', value: 'white' },
        { name: 'Subtle', value: 'subtle' },
        { name: 'Inverted', value: 'inverted' },
        { name: 'Brand', value: 'brand' },
      ],
    }),
    defineField('spacing', {
      type: 'option',
      display_name: 'Spacing',
      description: 'Vertical padding of the section.',
      default_value: 'default',
      exclude_empty_option: true,
      options: [
        { name: 'Compact', value: 'compact' },
        { name: 'Default', value: 'default' },
        { name: 'Relaxed', value: 'relaxed' },
      ],
    }),
    defineField('width', {
      type: 'option',
      display_name: 'Content width',
      default_value: 'content',
      exclude_empty_option: true,
      options: [
        { name: 'Content', value: 'content' },
        { name: 'Wide', value: 'wide' },
        { name: 'Full', value: 'full' },
      ],
    }),
  ],
});
