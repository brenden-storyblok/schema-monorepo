import { defineBlock, defineField } from '@storyblok/schema';
import { app2Components } from '../folders';

export const heroBlock = defineBlock({
  name: 'app_2_hero',
  display_name: 'Hero',
  is_root: false,
  is_nestable: true,
  folder: app2Components,
  fields: [
    defineField('headline', {
      type: 'text',
      display_name: 'Headline',
      description: 'The page heading. Use one hero per page.',
      required: true,
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
    defineField('image', {
      type: 'asset',
      display_name: 'Image',
      description:
        'Shown beside the text on wide screens. Set alt text on the asset.',
      filetypes: ['images'],
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
      keys: ['alignment', 'variant'],
    }),
    defineField('alignment', {
      type: 'option',
      display_name: 'Alignment',
      description: 'Center stacks the image below the text.',
      default_value: 'left',
      exclude_empty_option: true,
      options: [
        { name: 'Left', value: 'left' },
        { name: 'Center', value: 'center' },
      ],
    }),
    defineField('variant', {
      type: 'option',
      display_name: 'Variant',
      description:
        'Default shows the page background. Inverted uses a dark surface.',
      default_value: 'default',
      exclude_empty_option: true,
      options: [
        { name: 'Default', value: 'default' },
        { name: 'White', value: 'white' },
        { name: 'Inverted', value: 'inverted' },
      ],
    }),
  ],
});
