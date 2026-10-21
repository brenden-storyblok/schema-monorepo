import { defineBlock, defineField } from '@storyblok/schema';
import { headingLevelField } from '../headings';
import { coreFolder } from '../folders';

export const logoCloudBlock = defineBlock({
  name: 'logo_cloud',
  display_name: 'Logo cloud',
  is_root: false,
  is_nestable: true,
  folder: coreFolder,
  fields: [
    defineField('headline', {
      type: 'text',
      display_name: 'Headline',
      description: 'Optional, for example "Trusted by".',
    }),
    defineField('logos', {
      type: 'multiasset',
      display_name: 'Logos',
      description:
        'Set the alt text of every logo to the company name. A logo with empty alt text is hidden from screen readers. SVG files work.',
      filetypes: ['images'],
      required: true,
    }),
    defineField('style_tab', {
      type: 'tab',
      display_name: 'Style',
      keys: [
        'variant',
        'alignment',
        'grayscale',
        'logo_height',
        'heading_level',
      ],
    }),
    defineField('variant', {
      type: 'option',
      display_name: 'Variant',
      description: 'Default shows the page background.',
      default_value: 'default',
      exclude_empty_option: true,
      options: [
        { name: 'Default (transparent)', value: 'default' },
        { name: 'White', value: 'white' },
        { name: 'Subtle', value: 'subtle' },
      ],
    }),
    defineField('alignment', {
      type: 'option',
      display_name: 'Alignment',
      default_value: 'center',
      exclude_empty_option: true,
      options: [
        { name: 'Left', value: 'left' },
        { name: 'Center', value: 'center' },
      ],
    }),
    defineField('grayscale', {
      type: 'boolean',
      display_name: 'Grayscale',
      description:
        'Shows logos in grayscale and in full color on hover. Check that light logos stay readable on the background.',
      default_value: true,
    }),
    defineField('logo_height', {
      type: 'option',
      display_name: 'Logo height',
      default_value: 'medium',
      exclude_empty_option: true,
      options: [
        { name: 'Small', value: 'small' },
        { name: 'Medium', value: 'medium' },
        { name: 'Large', value: 'large' },
      ],
    }),
    headingLevelField('h2', ['h2', 'h3'], {
      description:
        'Use H2 for a top-level block. Use H3 only when the page already has an H2 above it.',
    }),
  ],
});
