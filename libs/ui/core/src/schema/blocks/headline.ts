import { defineBlock, defineField } from '@storyblok/schema';
import { coreFolder } from '../folders';
import { headingLevelField } from '../headings';

export const headlineBlock = defineBlock({
  name: 'headline',
  display_name: 'Headline',
  is_root: false,
  is_nestable: true,
  folder: coreFolder,
  fields: [
    defineField('eyebrow', {
      type: 'text',
      display_name: 'Eyebrow',
      description:
        'Small label shown above the headline. It is read as separate text, not as part of the heading.',
    }),
    defineField('text', {
      type: 'text',
      display_name: 'Text',
      required: true,
    }),
    defineField('subline', {
      type: 'textarea',
      display_name: 'Subline',
      description: 'Short paragraph shown below the headline.',
    }),
    defineField('buttons', {
      type: 'bloks',
      display_name: 'Buttons',
      description: 'Optional buttons shown below the headline.',
      allow: ['button'],
      maximum: 2,
    }),
    defineField('style_tab', {
      type: 'tab',
      display_name: 'Style',
      keys: ['level', 'size', 'alignment'],
    }),
    headingLevelField('h2', ['h1', 'h2', 'h3', 'h4'], {
      name: 'level',
      description:
        'Sets the document outline for screen readers and search engines. Use one H1 per page, and only when the page has no hero. Other levels should follow on without skipping, such as H3 under H2.',
    }),
    defineField('size', {
      type: 'option',
      display_name: 'Visual size',
      description:
        'Changes the look only. The level sets the document outline. Leave empty to match the level (H1 display, H2 large, H3 medium, H4 small).',
      options: [
        { name: 'Small', value: 'small' },
        { name: 'Medium', value: 'medium' },
        { name: 'Large', value: 'large' },
        { name: 'Display', value: 'display' },
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
