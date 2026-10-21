import { storyblokEditable } from '@storyblok/react/rsc';
import type { Block } from '../../schema/schema';
import { pickOption, resolveLink } from '@monorepo/storyblok-utils';
import { StoryblokImage } from '@monorepo/ui-core';
import styles from './storyblok.module.css';

const ALIGNMENTS = ['left', 'center'] as const satisfies readonly NonNullable<
  Block<'app_2_hero'>['alignment']
>[];
const VARIANTS = [
  'default',
  'white',
  'inverted',
] as const satisfies readonly NonNullable<Block<'app_2_hero'>['variant']>[];

// Match .heroInner: the page is 85% wide, the image takes one of two columns
// (max 72rem total) from 768px, and centered heroes cap it at 48rem.
const IMAGE_SIZES = {
  left: '(min-width: 768px) min(42vw, 34.5rem), 85vw',
  center: 'min(85vw, 48rem)',
} as const;

export default function Hero({ blok }: { blok: Block<'app_2_hero'> }) {
  const alignment = pickOption(blok.alignment, ALIGNMENTS, 'left');
  const variant = pickOption(blok.variant, VARIANTS, 'default');
  const link = resolveLink(blok.cta_link);
  const showCta = Boolean(blok.cta_label && link);

  return (
    <section
      className={styles.hero}
      data-alignment={alignment}
      data-variant={variant}
      {...storyblokEditable(blok)}
    >
      <div className={styles.heroInner}>
        <div className={styles.heroText}>
          {blok.eyebrow ? (
            <p className={styles.heroEyebrow}>{blok.eyebrow}</p>
          ) : null}
          {blok.headline ? (
            <h1 className={styles.heroHeadline}>{blok.headline}</h1>
          ) : null}
          {blok.description ? (
            <p className={styles.heroDescription}>{blok.description}</p>
          ) : null}
          {showCta && link ? (
            <a
              className={styles.heroCta}
              href={link.href}
              target={link.target}
              rel={link.rel}
            >
              {blok.cta_label}
            </a>
          ) : null}
        </div>
        <StoryblokImage
          asset={blok.image}
          className={styles.heroImage}
          sizes={IMAGE_SIZES[alignment]}
          preload
        />
      </div>
    </section>
  );
}
