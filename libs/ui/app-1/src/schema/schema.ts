import { defineSchema } from '@storyblok/schema';
import type {
  Schema as InferSchema,
  Story as InferStory,
} from '@storyblok/schema';
import type {
  BlockContent,
  MapiStory as InferStoryMapi,
} from '@storyblok/schema';
import type { Blocks as CoreBlocks } from '@monorepo/ui-core/schema';

import { app1PageBlock } from './blocks/app-1-page';
import { app1Components, app1ContentTypes, app1Folder } from './folders';

export const schema = defineSchema({
  blocks: {
    app1PageBlock,
  },
  folders: {
    app1Folder,
    app1ContentTypes,
    app1Components,
  },
});

export type Schema = InferSchema<typeof schema>;
export type Blocks = Schema['blocks'];
export type FieldPlugins = Schema['fieldPlugins'];
export type Story = InferStory<Blocks, FieldPlugins>;
export type StoryMapi = InferStoryMapi<Blocks, FieldPlugins>;

// Blocks that app-1's `bloks` fields can nest: app-1's own plus ui-core's.
// ui-core pushes its blocks; app-1 only references them.
type RegistryBlocks = Blocks | CoreBlocks;

// Type a component's props by block name: `Block<"app_1_page">`.
export type Block<TName extends Blocks['name']> = BlockContent<
  Extract<Blocks, { name: TName }>,
  RegistryBlocks,
  FieldPlugins
>;

// Loose union of every block's content, for a dynamic component dispatcher.
export type AnyBlock = BlockContent<Blocks, RegistryBlocks, FieldPlugins>;
