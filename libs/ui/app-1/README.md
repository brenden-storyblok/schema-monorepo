# @monorepo/ui-app-1

Storyblok blocks that only app-1 uses: React Server Components plus the code-defined schema they render. Shared blocks live in `@monorepo/ui-core`.

## Entry points

| Import                      | File                   | Contents                                                                         |
| --------------------------- | ---------------------- | -------------------------------------------------------------------------------- |
| `@monorepo/ui-app-1`        | `src/index.ts`         | Client components and non-server utilities (empty for now).                      |
| `@monorepo/ui-app-1/server` | `src/server.ts`        | Server component `App1Page` and the `components` registry.                       |
| `@monorepo/ui-app-1/schema` | `src/schema/schema.ts` | The `schema` object and its types: `Schema`, `Blocks`, `Block<'name'>`, `Story`. |

app-1 merges this registry with ui-core's before passing it to `storyblokInit` (see `apps/app-1/src/lib/storyblok.ts`).

Component props use `Block<'name'>` from the schema, so a field change in `src/schema/blocks/` shows up as a type error in the component that reads it.

## Schema targets

The schema in `src/schema/` is the source of truth for app-1's blocks in space 296015814324321. `app_1_page` allows blocks from ui-core's folder, so push ui-core before ui-app-1. Change blocks there, then:

| Command                               | Effect                                                            |
| ------------------------------------- | ----------------------------------------------------------------- |
| `npx nx run ui-app-1:schema:validate` | Validates the schema locally.                                     |
| `npx nx run ui-app-1:schema:push:dry` | Shows the diff against the space. Changes nothing.                |
| `npx nx run ui-app-1:schema:push`     | Applies the diff to the space. Not cached. Run the dry run first. |
