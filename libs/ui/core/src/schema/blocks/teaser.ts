import { defineBlock, defineField } from '@storyblok/schema';
import { coreFolder } from '../folders';

export const teaserBlock = defineBlock({
  name: 'teaser',
  is_root: false,
  is_nestable: true,
  folder: coreFolder,
  fields: [
    defineField('headline', {
      type: 'text',
      display_name: 'Headline',
    }),
    defineField('eyebrow', {
      type: 'text',
      display_name: 'Eyebrow',
      description: 'Small label shown above the headline.',
    }),
    defineField('description', {
      type: 'textarea',
      display_name: 'Description',
      description: 'Supporting paragraph shown below the headline.',
    }),
    defineField('cta_label', {
      type: 'text',
      display_name: 'Button label',
    }),
    defineField('cta_link', {
      type: 'multilink',
      email_link_type: true,
      allow_target_blank: true,
      show_anchor: true,
      asset_link_type: true,
      display_name: 'Button link',
      description: 'The button only appears when both label and link are set.',
    }),
    defineField('style_tab', {
      type: 'tab',
      display_name: 'Style',
      keys: ['alignment', 'size', 'variant'],
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
    defineField('size', {
      type: 'option',
      display_name: 'Size',
      default_value: 'large',
      exclude_empty_option: true,
      options: [
        { name: 'Medium', value: 'medium' },
        { name: 'Large', value: 'large' },
      ],
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
  ],
});
