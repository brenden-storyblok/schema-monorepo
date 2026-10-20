# @monorepo/storyblok-utils

Framework-agnostic Storyblok helpers shared by the libs and apps in this workspace. No React, CSS or Next imports. Consumers import the TypeScript source directly.

## Exports

| Import                                 | Contents                                                                                               |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `resolveLink(link)`                    | Turns a Storyblok multilink value into `{ href, target?, rel? }`, or `null` when no usable URL exists. |
| `ResolvedLink`                         | Return type of `resolveLink`.                                                                          |
| `pickOption(value, allowed, fallback)` | Returns `value` when it is one of `allowed`, else `fallback`. Guards against unknown editor values.    |

## Story links and start pages

A story link resolves to `/` plus its full slug. A folder start page resolves to its folder path: `app-1/` becomes `/app-1`.

Path source order: the resolved story (`link.story`), then `cached_url`, then `url`.

Storyblok gives folder start pages a trailing slash: `full_slug`, `cached_url` and the Links API `slug` all read `app-1/`. Trimming the outer slashes yields the folder path, so start pages need no special case. Never infer a start page from `slug` alone, because a start page's slug equals its folder's slug.

`link.story` is only present when the story fetch passes `resolve_links: 'link'`. `resolveLink` prefers its `full_slug` over `cached_url`:

```ts
await getStoryblokApi().get('cdn/stories/app-1/about', {
  version: 'published',
  resolve_links: 'link',
});
```

Without it, `resolveLink` falls back to `cached_url`, which carries the same trailing slash. It then cannot see renames that `cached_url` has not caught up with.
