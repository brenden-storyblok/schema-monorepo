import { useId } from 'react';
import {
  StoryblokServerRichText,
  storyblokEditable,
} from '@storyblok/react/rsc';
import type { Block } from '../../schema/schema';
import { pickOption } from '@monorepo/storyblok-utils';
import type { HeadingLevel } from '../../schema/headings';
import Heading from './Heading';
import { RichTextLink } from './Text';
import styles from './storyblok.module.css';

const VARIANTS = [
  'default',
  'white',
  'outlined',
] as const satisfies readonly NonNullable<Block<'accordion'>['variant']>[];
const HEADING_LEVELS = [
  'h3',
  'h2',
  'h4',
] as const satisfies readonly HeadingLevel[];

const RICHTEXT_COMPONENTS = { link: RichTextLink };

type Answer = Block<'accordion_item'>['answer'];

// A cleared richtext field still holds one empty paragraph.
function hasContent(doc: Answer | undefined): boolean {
  if (!doc || typeof doc !== 'object' || !Array.isArray(doc.content)) {
    return false;
  }
  return doc.content.some(
    (node) => node.type !== 'paragraph' || Boolean(node.content?.length),
  );
}

// Flattens a richtext node to text for the FAQ JSON-LD, with a space between
// block nodes so words from neighbouring paragraphs do not fuse.
function toPlainText(node: unknown): string {
  if (!node || typeof node !== 'object') return '';
  const { text, content } = node as { text?: unknown; content?: unknown };
  if (typeof text === 'string') return text;
  if (!Array.isArray(content)) return '';
  return content.map(toPlainText).join(' ');
}

function normalize(text: string): string {
  return text.replace(/\s+/g, ' ').trim();
}

type ItemProps = {
  blok: Block<'accordion_item'>;
  level?: HeadingLevel;
  // Shared `name` makes the browser close the other items in the group.
  group?: string;
  open?: boolean;
};

// Headings sit inside the summary. The HTML spec allows heading content there
// and the summary keeps its disclosure role. The reverse (a summary inside a
// heading) is invalid, and a heading wrapped around the whole details cannot
// be the toggle. Some screen readers flatten the heading to button text; the
// question stays announced and operable either way.
export function AccordionItem({ blok, level = 'h3', group, open }: ItemProps) {
  if (!blok.question || !hasContent(blok.answer)) return null;

  return (
    <details
      className={styles.accordionItem}
      name={group}
      open={open}
      {...storyblokEditable(blok)}
    >
      <summary className={styles.accordionSummary}>
        <Heading level={level} className={styles.accordionQuestion}>
          {blok.question}
        </Heading>
        <span className={styles.accordionChevron} aria-hidden="true" />
      </summary>
      <StoryblokServerRichText
        document={blok.answer}
        components={RICHTEXT_COMPONENTS}
        className={styles.accordionAnswer}
      />
    </details>
  );
}

export default function Accordion({ blok }: { blok: Block<'accordion'> }) {
  const groupId = useId();
  const variant = pickOption(blok.variant, VARIANTS, 'default');
  const picked = pickOption(blok.heading_level, HEADING_LEVELS, 'h3');
  // The headline sits one level above the questions. h2 questions would tie
  // with it, so they drop to h3.
  const level = blok.headline && picked === 'h2' ? 'h3' : picked;
  const headlineLevel = level === 'h4' ? 'h3' : 'h2';
  const headlineId = `accordion-${blok._uid}`;
  const Root = blok.headline ? 'section' : 'div';
  const exclusive = blok.allow_multiple === false;

  const items = (blok.items ?? []).filter(
    (item) => item.question && hasContent(item.answer),
  );
  if (items.length === 0) return null;

  // Exclusive groups hold one open item, so only the first flagged one opens.
  const firstOpenUid = items.find((item) => item.open_by_default)?._uid;

  const faqJsonLd = blok.faq_schema
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: normalize(toPlainText(item.answer)),
          },
        })),
      }
    : null;

  return (
    <Root
      aria-labelledby={blok.headline ? headlineId : undefined}
      className={styles.accordion}
      data-variant={variant}
      {...storyblokEditable(blok)}
    >
      <div className={styles.accordionInner}>
        {blok.headline ? (
          <Heading
            level={headlineLevel}
            id={headlineId}
            className={styles.accordionHeadline}
          >
            {blok.headline}
          </Heading>
        ) : null}
        {items.map((item) => (
          <AccordionItem
            key={item._uid}
            blok={item}
            level={level}
            group={exclusive ? groupId : undefined}
            open={
              exclusive
                ? item._uid === firstOpenUid
                : Boolean(item.open_by_default)
            }
          />
        ))}
      </div>
      {faqJsonLd ? (
        <script
          type="application/ld+json"
          // `<` escaped so answer text cannot close the script tag.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqJsonLd).replace(/</g, '\\u003c'),
          }}
        />
      ) : null}
    </Root>
  );
}
