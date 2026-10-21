import { storyblokEditable } from '@storyblok/react/rsc';
import type { Block } from '../../schema/schema';
import { pickOption } from '@monorepo/storyblok-utils';
import StoryblokImage from './StoryblokImage';
import styles from './storyblok.module.css';

const ASPECT_RATIOS = [
  'original',
  '16-9',
  '4-3',
  '1-1',
] as const satisfies readonly NonNullable<Block<'image'>['aspect_ratio']>[];
const WIDTHS = ['content', 'full'] as const satisfies readonly NonNullable<
  Block<'image'>['width']
>[];

// Match .image: content width caps at 46rem, full width has no cap.
const SIZES = {
  content: '(min-width: 768px) 46rem, 100vw',
  full: '100vw',
} as const;

export default function Image({ blok }: { blok: Block<'image'> }) {
  const aspectRatio = pickOption(blok.aspect_ratio, ASPECT_RATIOS, 'original');
  const width = pickOption(blok.width, WIDTHS, 'content');
  const rounded = blok.rounded !== false;
  if (!blok.image?.filename) return null;

  const picture = (
    <div className={styles.imageFrame}>
      <StoryblokImage
        asset={blok.image}
        sizes={SIZES[width]}
        className={styles.imageMedia}
        preload={Boolean(blok.preload)}
        fill={aspectRatio !== 'original'}
      />
    </div>
  );
  const props = {
    className: styles.image,
    'data-aspect-ratio': aspectRatio,
    'data-width': width,
    'data-rounded': rounded ? 'true' : 'false',
    ...storyblokEditable(blok),
  };

  return blok.caption ? (
    <figure {...props}>
      {picture}
      <figcaption className={styles.imageCaption}>{blok.caption}</figcaption>
    </figure>
  ) : (
    <div {...props}>{picture}</div>
  );
}
