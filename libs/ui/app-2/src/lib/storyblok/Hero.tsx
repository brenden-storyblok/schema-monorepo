import { storyblokEditable } from '@storyblok/react/rsc';
import type { Block } from '../../schema/schema';
import { pickOption, resolveLink } from '@monorepo/storyblok-utils';
import styles from './storyblok.module.css';

const ALIGNMENTS = ['left', 'center'] as const satisfies readonly NonNullable<
  Block<'app_2_hero'>['alignment']
>[];
const VARIANTS = [
  'default',
  'white',
  'inverted',
] as const satisfies readonly NonNullable<Block<'app_2_hero'>['variant']>[];

// Storyblok asset URLs look like
// https://a.storyblok.com/f/<space>/<width>x<height>/<hash>/<name>.jpg
// (regional hosts use a-us., a-ap. and so on).
const STORYBLOK_ASSET =
  /^https:\/\/a(?:-[a-z]+)?\.storyblok\.com\/f\/\d+\/(\d+)x(\d+)\//;

// Resizes Storyblok assets to 1600px wide through the image service and reads
// the original dimensions from the URL so the browser can reserve space.
// External URLs and SVGs pass through untouched.
function heroImage(filename: string) {
  const match = STORYBLOK_ASSET.exec(filename);
  if (!match || /\.svg$/i.test(filename)) return { src: filename };
  return {
    src: `${filename}/m/1600x0`,
    width: Number(match[1]),
    height: Number(match[2]),
  };
}

export default function Hero({ blok }: { blok: Block<'app_2_hero'> }) {
  const alignment = pickOption(blok.alignment, ALIGNMENTS, 'left');
  const variant = pickOption(blok.variant, VARIANTS, 'default');
  const link = resolveLink(blok.cta_link);
  const showCta = Boolean(blok.cta_label && link);
  const image = blok.image?.filename ? heroImage(blok.image.filename) : null;

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
        {image ? (
          <img
            className={styles.heroImage}
            src={image.src}
            width={image.width}
            height={image.height}
            alt={blok.image?.alt ?? ''}
            loading="eager"
          />
        ) : null}
      </div>
    </section>
  );
}
