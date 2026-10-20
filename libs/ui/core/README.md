# @monorepo/ui-core

Storyblok blocks for the apps in this workspace: React Server Components plus the code-defined schema they render.

## Entry points

| Import                     | File                   | Contents                                                                                     |
| -------------------------- | ---------------------- | -------------------------------------------------------------------------------------------- |
| `@monorepo/ui-core`        | `src/index.ts`         | Client components and non-server utilities (empty for now).                                  |
| `@monorepo/ui-core/server` | `src/server.ts`        | Server components `Feature`, `Grid`, `Page`, `Teaser`, `Text` and the `components` registry. |
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
