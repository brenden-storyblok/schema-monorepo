import { defineBlock, defineField } from '@storyblok/schema';
import { headingLevelField } from '../headings';
import { coreFolder } from '../folders';

export const cardBlock = defineBlock({
  name: 'card',
  display_name: 'Card',
  is_root: false,
  is_nestable: true,
  folder: coreFolder,
  fields: [
    defineField('image', {
      type: 'asset',
      display_name: 'Image',
      description:
        'Shown above the text. The card link already names the card, so leave alt empty when the image repeats the title.',
      filetypes: ['images'],
    }),
    defineField('eyebrow', {
      type: 'text',
      display_name: 'Eyebrow',
      description: 'Small label shown above the title.',
    }),
    defineField('title', {
      type: 'text',
      display_name: 'Title',
      required: true,
    }),
    defineField('description', {
      type: 'textarea',
      display_name: 'Description',
    }),
    defineField('link', {
      type: 'multilink',
      email_link_type: true,
      allow_target_blank: true,
      show_anchor: true,
      asset_link_type: true,
      display_name: 'Link',
      description:
        'Makes the whole card clickable. The title is the link text. Leave empty for a card that is not a link.',
    }),
    defineField('link_label', {
      type: 'text',
      display_name: 'Link label',
      description:
        'Visible cue at the bottom of the card, such as "Read more". Screen readers still announce the title as the link, so this text is not read out.',
    }),
    defineField('style_tab', {
      type: 'tab',
      display_name: 'Style',
      keys: ['variant', 'image_ratio', 'heading_level'],
    }),
    defineField('variant', {
      type: 'option',
      display_name: 'Variant',
      description:
        'Default has no background of its own and follows the page. White and subtle use a surface.',
      default_value: 'default',
      exclude_empty_option: true,
      options: [
        { name: 'Default (transparent)', value: 'default' },
        { name: 'White', value: 'white' },
        { name: 'Outlined', value: 'outlined' },
        { name: 'Subtle', value: 'subtle' },
      ],
    }),
    defineField('image_ratio', {
      type: 'option',
      display_name: 'Image ratio',
      description: 'The image is cropped to fill this ratio.',
      default_value: '16-9',
      exclude_empty_option: true,
      options: [
        { name: '16:9', value: '16-9' },
        { name: '4:3', value: '4-3' },
        { name: '1:1', value: '1-1' },
      ],
    }),
    headingLevelField('h3', ['h3', 'h2', 'h4'], {
      description:
        'Pick the level that fits the page outline. Size does not change.',
    }),
  ],
});
