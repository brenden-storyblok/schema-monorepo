import { defineSchema } from '@storyblok/schema';
import type {
  Schema as InferSchema,
  Story as InferStory,
} from '@storyblok/schema';
import type {
  BlockContent,
  MapiStory as InferStoryMapi,
} from '@storyblok/schema';

import { featureBlock } from './blocks/feature';
import { gridBlock } from './blocks/grid';
import { teaserBlock } from './blocks/teaser';
import { coreFolder } from './folders';

export const schema = defineSchema({
  blocks: {
    featureBlock,
    gridBlock,
    teaserBlock,
  },
  folders: {
    coreFolder,
  },
});

export { coreFolder };

export type Schema = InferSchema<typeof schema>;
export type Blocks = Schema['blocks'];
export type FieldPlugins = Schema['fieldPlugins'];
export type Story = InferStory<Blocks, FieldPlugins>;
export type StoryMapi = InferStoryMapi<Blocks, FieldPlugins>;

// Type a component's props by block name: `Block<"hero">`.
export type Block<TName extends Blocks['name']> = BlockContent<
  Extract<Blocks, { name: TName }>,
  Blocks,
  FieldPlugins
>;

// Loose union of every block's content, for a dynamic component dispatcher.
export type AnyBlock = BlockContent<Blocks, Blocks, FieldPlugins>;
