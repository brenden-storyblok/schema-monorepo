# @monorepo/ui-core

Storyblok blocks for the apps in this workspace: React Server Components plus the code-defined schema they render.

## Entry points

| Import                     | File                   | Contents                                                                                     |
| -------------------------- | ---------------------- | -------------------------------------------------------------------------------------------- |
| `@monorepo/ui-core`        | `src/index.ts`         | Client components: `StoryblokImage` (next/image with the Storyblok loader; server components can import it). |
| `@monorepo/ui-core/server` | `src/server.ts`        | Server components `Accordion`, `AccordionItem`, `Button`, `ButtonGroup`, `ButtonGroupBlock`, `Card`, `Feature`, `Grid`, `Heading`, `Headline`, `Image`, `LogoCloud`, `Page`, `Quote`, `Section`, `StatItem`, `Stats`, `Teaser`, `Text` and the `components` registry. |
| `@monorepo/ui-core/schema` | `src/schema/schema.ts` | The `schema` object and its types: `Schema`, `Blocks`, `Block<'name'>`, `Story`.             |

Pass the registry to `storyblokInit`:

```ts
import { components } from '@monorepo/ui-core/server';

storyblokInit({ /* ... */ components });
```

Component props use `Block<'name'>` from the schema, so a field change in `src/schema/blocks/` shows up as a type error in the component that reads it.

## Schema targets

The schema in `src/schema/` is the source of truth for space 296015814324321. Change blocks there, then:

| Command                                        | Effect                                                            |
| ---------------------------------------------- | ----------------------------------------------------------------- |
| `npx nx run @monorepo/ui-core:schema:validate` | Validates the schema locally.                                     |
| `npx nx run @monorepo/ui-core:schema:push:dry` | Shows the diff against the space. Changes nothing.                |
| `npx nx run @monorepo/ui-core:schema:push`     | Applies the diff to the space. Not cached. Run the dry run first. |

## Images and buttons

`StoryblokImage` (from `@monorepo/ui-core`) takes an `asset` (or any `{ filename, alt }`), a required `sizes` that matches the CSS width, `preload` for above-the-fold images and optional `fill`. Empty alt renders `alt=""`. SVGs and non-Storyblok URLs skip the image service.

Blocks that only make sense inside a parent live in `coreItemsFolder`, a top-level folder beside `core` so page bodies that allow `coreFolder` do not offer them. Add each new item block to `coreItemBlocks` in `src/schema/items.ts` too, so Section's deny list excludes it. A parent that holds buttons declares `defineField('buttons', { type: 'bloks', display_name: 'Buttons', allow: ['button'], maximum: 2 })` and renders `<ButtonGroup bloks={blok.buttons} />` from `@monorepo/ui-core/server`. `Headline` and `Teaser` have a `buttons` field this way. For a standalone row, use the nestable `button_group` block (`ButtonGroupBlock`, up to 4 buttons, left or center alignment). It lives in `coreFolder` so Section's body offers it, and it is not in `coreItemBlocks`.
