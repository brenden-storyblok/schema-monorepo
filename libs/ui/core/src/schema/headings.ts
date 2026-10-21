import { defineField } from '@storyblok/schema';

// Every level the Heading component can render, in document order.
export const HEADING_LEVELS = ['h1', 'h2', 'h3', 'h4'] as const;
export type HeadingLevel = (typeof HEADING_LEVELS)[number];

type HeadingLevelFieldOptions<TName extends string> = {
  // Field key. Blocks keep `heading_level` unless the key is already taken.
  name?: TName;
  display_name?: string;
  description: string;
  // Labels in the picker: 'H2' (default) or 'h2'.
  label_case?: 'upper' | 'lower';
};

// The `heading_level` option field shared by blocks that can sit at different
// depths. `allowed` is also the picker order, so list the default first when
// it should lead. Pass the same tuple to `pickOption` in the component.
export function headingLevelField<TName extends string = 'heading_level'>(
  defaultLevel: HeadingLevel,
  allowed: readonly HeadingLevel[],
  {
    name = 'heading_level' as TName,
    display_name = 'Heading level',
    description,
    label_case = 'upper',
  }: HeadingLevelFieldOptions<TName>,
) {
  return defineField(name, {
    type: 'option',
    display_name,
    description,
    default_value: defaultLevel,
    exclude_empty_option: true,
    options: allowed.map((level) => ({
      name: label_case === 'upper' ? level.toUpperCase() : level,
      value: level,
    })),
  });
}
