import { defineBlock, defineField } from '@storyblok/schema';
import { coreFolder } from '../folders';

export const quoteBlock = defineBlock({
  name: 'quote',
  display_name: 'Quote',
  is_root: false,
  is_nestable: true,
  folder: coreFolder,
  fields: [
    defineField('quote', {
      type: 'textarea',
      display_name: 'Quote',
      description:
        'Leave a blank line between paragraphs. Do not type quotation marks; the block adds its own.',
      required: true,
    }),
    defineField('author_name', {
      type: 'text',
      display_name: 'Author name',
    }),
    defineField('author_role', {
      type: 'text',
      display_name: 'Author role',
      description: 'For example "CTO, Acme".',
    }),
    defineField('author_image', {
      type: 'asset',
      display_name: 'Author photo',
      description:
        'Optional avatar. It is decorative because the name is shown beside it, so its alt text is not used.',
      filetypes: ['images'],
    }),
    defineField('cite_url', {
      type: 'text',
      display_name: 'Source URL',
      description:
        'Optional full web address of the source, starting with https://. Not shown on the page.',
      regex: '^https?://\\S+$',
    }),
    defineField('style_tab', {
      type: 'tab',
      display_name: 'Style',
      keys: ['variant', 'size', 'alignment'],
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
    defineField('size', {
      type: 'option',
      display_name: 'Size',
      description: 'Large suits a pull quote; medium suits a testimonial.',
      default_value: 'medium',
      exclude_empty_option: true,
      options: [
        { name: 'Medium', value: 'medium' },
        { name: 'Large', value: 'large' },
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
