import { defineSchema } from '@storyblok/schema';
import type {
  Schema as InferSchema,
  Story as InferStory,
} from '@storyblok/schema';
import type {
  BlockContent,
  MapiStory as InferStoryMapi,
} from '@storyblok/schema';

import { accordionBlock } from './blocks/accordion';
import { accordionItemBlock } from './blocks/accordion-item';
import { buttonBlock } from './blocks/button';
import { buttonGroupBlock } from './blocks/button-group';
import { cardBlock } from './blocks/card';
import { featureBlock } from './blocks/feature';
import { gridBlock } from './blocks/grid';
import { headlineBlock } from './blocks/headline';
import { imageBlock } from './blocks/image';
import { logoCloudBlock } from './blocks/logo-cloud';
import { pageBlock } from './blocks/page';
import { quoteBlock } from './blocks/quote';
import { sectionBlock } from './blocks/section';
import { statItemBlock } from './blocks/stat-item';
import { statsBlock } from './blocks/stats';
import { teaserBlock } from './blocks/teaser';
import { textBlock } from './blocks/text';
import { coreFolder, coreItemsFolder } from './folders';

export const schema = defineSchema({
  blocks: {
    accordionBlock,
    accordionItemBlock,
    buttonBlock,
    buttonGroupBlock,
    cardBlock,
    featureBlock,
    gridBlock,
    headlineBlock,
    imageBlock,
    logoCloudBlock,
    pageBlock,
    quoteBlock,
    sectionBlock,
    statItemBlock,
    statsBlock,
    teaserBlock,
    textBlock,
  },
  folders: {
    coreFolder,
    coreItemsFolder,
  },
});

export { coreFolder, coreItemsFolder };
export { buttonBlock } from './blocks/button';

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
