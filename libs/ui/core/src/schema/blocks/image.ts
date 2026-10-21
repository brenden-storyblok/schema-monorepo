import { defineBlock, defineField } from '@storyblok/schema';
import { coreFolder } from '../folders';

export const imageBlock = defineBlock({
  name: 'image',
  display_name: 'Image',
  is_root: false,
  is_nestable: true,
  folder: coreFolder,
  fields: [
    defineField('image', {
      type: 'asset',
      display_name: 'Image',
      description:
        'Set alt text on the asset. Leave alt empty only for decorative images.',
      filetypes: ['images'],
      required: true,
    }),
    defineField('caption', {
      type: 'text',
      display_name: 'Caption',
      description: 'Shown below the image. Does not replace alt text.',
    }),
    defineField('preload', {
      type: 'boolean',
      display_name: 'Load first',
      description:
        'Turn on for an image that is visible without scrolling. Use on one image per page at most.',
      default_value: false,
    }),
    defineField('style_tab', {
      type: 'tab',
      display_name: 'Style',
      keys: ['aspect_ratio', 'width', 'rounded'],
    }),
    defineField('aspect_ratio', {
      type: 'option',
      display_name: 'Aspect ratio',
      description: 'Other ratios crop the image to fill the frame.',
      default_value: 'original',
      exclude_empty_option: true,
      options: [
        { name: 'Original', value: 'original' },
        { name: '16:9', value: '16-9' },
        { name: '4:3', value: '4-3' },
        { name: '1:1', value: '1-1' },
      ],
    }),
    defineField('width', {
      type: 'option',
      display_name: 'Width',
      description: 'Content matches the text column. Full uses the page width.',
      default_value: 'content',
      exclude_empty_option: true,
      options: [
        { name: 'Content', value: 'content' },
        { name: 'Full', value: 'full' },
      ],
    }),
    defineField('rounded', {
      type: 'boolean',
      display_name: 'Rounded corners',
      default_value: true,
    }),
  ],
});
