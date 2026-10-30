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

import { app2PageBlock } from './blocks/app-2-page';
import { heroBlock } from './blocks/hero';
import { app2Components, app2ContentTypes, app2Folder } from './folders';

export const schema = defineSchema({
  blocks: {
    app2PageBlock,
    heroBlock,
  },
  folders: {
    app2Folder,
    app2ContentTypes,
    app2Components,
  },
});

export type Schema = InferSchema<typeof schema>;
export type Blocks = Schema['blocks'];
export type FieldPlugins = Schema['fieldPlugins'];
export type Story = InferStory<Blocks, FieldPlugins>;
export type StoryMapi = InferStoryMapi<Blocks, FieldPlugins>;

// Blocks that app-2's `bloks` fields can nest: app-2's own plus ui-core's.
// ui-core defines these blocks; app-2 only references them.
type RegistryBlocks = Blocks | CoreBlocks;

// Type a component's props by block name: `Block<"app_2_page">`.
export type Block<TName extends Blocks['name']> = BlockContent<
  Extract<Blocks, { name: TName }>,
  RegistryBlocks,
  FieldPlugins
>;

// Loose union of every block's content, for a dynamic component dispatcher.
export type AnyBlock = BlockContent<Blocks, RegistryBlocks, FieldPlugins>;
