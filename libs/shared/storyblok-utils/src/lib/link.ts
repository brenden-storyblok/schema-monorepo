import type { MultilinkFieldValue } from '@storyblok/schema';

export interface ResolvedLink {
  href: string;
  target?: '_blank';
  rel?: string;
}

// The Storyblok JS client copies the resolved link onto the field as
// `link.story` when the fetch passes `resolve_links: 'link'`. The schema's
// `StoryLink` type does not declare it, so read it through a narrow local type.
interface ResolvedStory {
  full_slug?: string;
  slug?: string;
}

const SCHEME = /^[a-z][a-z0-9+.-]*:/i;

function str(value: unknown): string | undefined {
  return typeof value === 'string' && value ? value : undefined;
}

function resolvedStory(link: object): ResolvedStory | undefined {
  const story = (link as { story?: unknown }).story;
  if (!story || typeof story !== 'object') return undefined;
  const { full_slug, slug } = story as Record<string, unknown>;
  return {
    full_slug: str(full_slug),
    slug: str(slug),
  };
}

// Path source order: the resolved story (reflects renames that `cached_url`
// may lag on), then `cached_url`, then `url`.
function storySource(link: MultilinkFieldValue): string | undefined {
  const story = resolvedStory(link);
  return (
    story?.full_slug ||
    story?.slug ||
    link.cached_url ||
    link.url
  )?.trim();
}

// Storyblok gives folder start pages a trailing slash: `full_slug`,
// `cached_url` and the Links API `slug` all read `app-1/`. Trimming the outer
// slashes yields the folder path (`/app-1`), so start pages need no special
// case. Never infer a start page from `slug` alone: its slug equals its
// folder's slug.
function storyPath(path: string): string {
  return `/${path.replace(/^\/+|\/+$/g, '')}`;
}

function externalUrl(url: string): string {
  if (SCHEME.test(url) || /^[/#?]/.test(url)) return url;
  return `https://${url}`;
}

// Turn a Storyblok multilink value into something renderable, or null when no
// usable URL exists.
export function resolveLink(
  link: MultilinkFieldValue | null | undefined,
): ResolvedLink | null {
  if (!link) return null;

  const blank = link.target === '_blank';
  const target = blank ? ('_blank' as const) : undefined;
  const rel = blank ? 'noopener noreferrer' : undefined;

  switch (link.linktype) {
    case 'email': {
      const email = link.email?.trim();
      return email ? { href: `mailto:${email}` } : null;
    }
    case 'story': {
      const path = storySource(link);
      if (!path) return null;
      const anchor = link.anchor?.trim().replace(/^#/, '');
      return {
        href: `${storyPath(path)}${anchor ? `#${anchor}` : ''}`,
        target,
        rel,
      };
    }
    case 'url':
    case 'asset': {
      const url = (link.cached_url || link.url)?.trim();
      if (!url) return null;
      return { href: externalUrl(url), target, rel };
    }
    default:
      return null;
  }
}
