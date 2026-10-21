import { storyblokEditable } from '@storyblok/react/rsc';
import type { Block } from '../../schema/schema';
import { pickOption, resolveLink } from '@monorepo/storyblok-utils';
import type { HeadingLevel } from '../../schema/headings';
import Heading from './Heading';
import StoryblokImage from './StoryblokImage';
import styles from './storyblok.module.css';

const VARIANTS = [
  'default',
  'white',
  'outlined',
  'subtle',
] as const satisfies readonly NonNullable<Block<'card'>['variant']>[];
const RATIOS = ['16-9', '4-3', '1-1'] as const satisfies readonly NonNullable<
  Block<'card'>['image_ratio']
>[];
const HEADING_LEVELS = [
  'h3',
  'h2',
  'h4',
] as const satisfies readonly HeadingLevel[];

// Matches Grid: 1 column, 2 from 640px, 3 or 4 from 1024px. Assume the
// narrower 3-column case so 4-column grids load a slightly larger image.
const SIZES = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw';

export default function Card({ blok }: { blok: Block<'card'> }) {
  const variant = pickOption(blok.variant, VARIANTS, 'default');
  const ratio = pickOption(blok.image_ratio, RATIOS, '16-9');
  const level = pickOption(blok.heading_level, HEADING_LEVELS, 'h3');
  const link = resolveLink(blok.link);
  const hasImage = Boolean(blok.image?.filename);

  return (
    <article
      className={styles.card}
      data-variant={variant}
      data-linked={link ? 'true' : 'false'}
      {...storyblokEditable(blok)}
    >
      {hasImage ? (
        <div className={styles.cardImage} data-ratio={ratio}>
          <StoryblokImage
            asset={blok.image}
            sizes={SIZES}
            className={styles.cardMedia}
            fill
          />
        </div>
      ) : null}
      <div className={styles.cardBody}>
        {blok.eyebrow ? (
          <p className={styles.cardEyebrow}>{blok.eyebrow}</p>
        ) : null}
        <Heading level={level} className={styles.cardTitle}>
          {link ? (
            // The ::after on this anchor covers the card, so one link serves
            // the whole card without wrapping block content in <a>.
            <a
              className={styles.cardLink}
              href={link.href}
              target={link.target}
              rel={link.rel}
            >
              {blok.title}
              {link.target === '_blank' ? (
                <span className={styles.visuallyHidden}>
                  {' '}
                  (opens in a new tab)
                </span>
              ) : null}
            </a>
          ) : (
            blok.title
          )}
        </Heading>
        {blok.description ? (
          <p className={styles.cardDescription}>{blok.description}</p>
        ) : null}
        {link && blok.link_label ? (
          // Visual cue only. Hidden from assistive tech so the link keeps
          // the title as its name instead of announcing a second label.
          <span className={styles.cardCue} aria-hidden="true">
            {blok.link_label}
          </span>
        ) : null}
      </div>
    </article>
  );
}
