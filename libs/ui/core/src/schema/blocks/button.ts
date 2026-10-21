import { defineBlock, defineField } from '@storyblok/schema';
import { coreItemsFolder } from '../folders';

export const buttonBlock = defineBlock({
  name: 'button',
  display_name: 'Button',
  is_root: false,
  is_nestable: true,
  folder: coreItemsFolder,
  fields: [
    defineField('label', {
      type: 'text',
      display_name: 'Label',
      description:
        'Say where the button goes, e.g. "View pricing" rather than "Click here".',
      required: true,
    }),
    defineField('link', {
      type: 'multilink',
      email_link_type: true,
      allow_target_blank: true,
      show_anchor: true,
      asset_link_type: true,
      display_name: 'Link',
      description: 'The button only appears when the link is set.',
      required: true,
    }),
    defineField('style_tab', {
      type: 'tab',
      display_name: 'Style',
      keys: ['variant'],
    }),
    defineField('variant', {
      type: 'option',
      display_name: 'Variant',
      description:
        'Use one primary button per group. Link style shows underlined text.',
      default_value: 'primary',
      exclude_empty_option: true,
      options: [
        { name: 'Primary', value: 'primary' },
        { name: 'Secondary', value: 'secondary' },
        { name: 'Link style', value: 'link' },
      ],
    }),
  ],
});
