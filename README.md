# Monorepo

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

This repo is an [Nx](https://nx.dev) workspace. Nx runs the tasks for each app and library. See [What is Nx?](https://nx.dev/docs/getting-started/intro).

To see the projects and their dependencies, run `npx nx graph`. To list the tasks of one project, run `npx nx show project <name>`.

Two Next.js apps render content from one Storyblok space. Libraries define the block schemas in TypeScript.

## Getting started

1. Install dependencies:

   ```sh
   npm install
   ```

2. Copy `apps/app-N/.env.example` to `apps/app-N/.env.local`. Set `STORYBLOK_API_KEY` to a preview access token from the space.
3. Start an app:

   ```sh
   npx nx dev @monorepo/app-1
   ```

   The dev server uses HTTPS with a self-signed certificate. Accept the browser warning.

4. To use the Visual Editor, follow [Visual Preview in Next.js](https://www.storyblok.com/docs/guides/nextjs/visual-preview).
5. Log in to the Storyblok CLI before you push a schema:

   ```sh
   npx storyblok login
   ```

## Project layout

```mermaid
flowchart LR
  core["libs/ui/core"]
  lib1["libs/ui/app-1"]
  lib2["libs/ui/app-2"]
  space[("Storyblok space")]
  app1["apps/app-1"]
  app2["apps/app-2"]

  core -- push --> space
  lib1 -- push --> space
  lib2 -- push --> space
  lib1 -. references .-> core
  lib2 -. references .-> core
  app1 --> core
  app1 --> lib1
  app2 --> core
  app2 --> lib2
```

app-1 and app-2 contain only routing, data fetching and `storyblokInit`. The blocks, schemas and components are in libraries. See [Nx: Keep applications thin](https://nx.dev/docs/kb/folder-structure).

Each app uses two libraries: `@monorepo/ui-core` and its own app library. app-1 uses `ui-app-1`. app-2 uses `ui-app-2`. The page block of each app allows the `@monorepo/ui-core` blocks, so editors can add them to the pages of both apps.

## Schemas in this monorepo

Each block is a TypeScript definition. The Storyblok CLI pushes the definitions to the space. See [Storyblok Schema](https://www.storyblok.com/docs/libraries/js/schema) and [`schema push`](https://www.storyblok.com/docs/tooling/cli/schema/push).

- Each library owns the schema and components for its blocks. Apps own no schema.
- App libraries reference `@monorepo/ui-core` folders in `allow` lists. Push `@monorepo/ui-core` before an app library.
- Block and folder names must be unique in the space. Add the app name to the name of each app block and folder. Example block: `app_2_hero`. Example folder: `App 2 Components`.
- Do not run `schema push --delete`. Each library's schema lists only its own blocks, so `--delete` removes the blocks of every other library.

### Example: Add a block to app-2

1. Define the block in `libs/ui/app-2/src/schema/blocks/` with the `app_2_` prefix. Add it to `libs/ui/app-2/src/schema/schema.ts`.
2. Write its component in `libs/ui/app-2/src/lib/storyblok/`. The app needs no change.
3. Push the schema:

   ```sh
   npx nx run ui-app-2:schema:push:dry
   npx nx run ui-app-2:schema:push
   ```

## Commands

| Command                            | Effect                          |
| ---------------------------------- | ------------------------------- |
| `npx nx dev @monorepo/app-1`       | Start app-1                     |
| `npm run dev`                      | Start all apps                  |
| `npx nx run <lib>:schema:validate` | Validate a library schema       |
| `npx nx run <lib>:schema:push:dry` | Show the diff against the space |
| `npx nx run <lib>:schema:push`     | Apply the diff                  |

`<lib>` is `@monorepo/ui-core`, `ui-app-1` or `ui-app-2`. Push `@monorepo/ui-core` first.
