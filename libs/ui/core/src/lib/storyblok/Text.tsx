import {
  StoryblokServerRichText,
  storyblokEditable,
  type StoryblokReactRichTextProps,
} from '@storyblok/react/rsc';
import type { MultilinkFieldValue } from '@storyblok/schema';
import type { Block } from '../../schema/schema';
import { resolveLink } from '@monorepo/storyblok-utils';
import styles from './storyblok.module.css';

// A cleared richtext field still holds one empty paragraph, and a never-filled
// one can arrive as `''`.
function isEmpty(doc: Block<'text'>['text'] | undefined): boolean {
  if (!doc || typeof doc !== 'object' || !Array.isArray(doc.content)) {
    return true;
  }
  return !doc.content.some(
    (node) => node.type !== 'paragraph' || Boolean(node.content?.length),
  );
}

// Link marks carry multilink-like attrs (plus `story` under `resolve_links`),
// so map them onto that shape and let `resolveLink` build the href. Without
// this override the SDK renders the editor's raw `href` and serializes the
// resolved story into a `story` attribute.
export function RichTextLink({
  attrs,
  children,
}: StoryblokReactRichTextProps<'link'>) {
  const href = attrs.href ?? '';
  const link = resolveLink({
    ...attrs,
    fieldtype: 'multilink',
    linktype: attrs.linktype ?? 'url',
    id: attrs.uuid ?? '',
    url: href,
    cached_url: href,
    email: href.replace(/^mailto:/, ''),
  } as MultilinkFieldValue);

  if (!link) return children;
  return (
    <a href={link.href} target={link.target} rel={link.rel}>
      {children}
    </a>
  );
}

const RICHTEXT_COMPONENTS = { link: RichTextLink };

export default function Text({ blok }: { blok: Block<'text'> }) {
  if (isEmpty(blok.text)) return null;

  return (
    <StoryblokServerRichText
      document={blok.text}
      components={RICHTEXT_COMPONENTS}
      className={styles.text}
      {...storyblokEditable(blok)}
    />
  );
}
