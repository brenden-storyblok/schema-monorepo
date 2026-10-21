import { storyblokEditable } from '@storyblok/react/rsc';
import type { Block } from '../../schema/schema';
import { pickOption } from '@monorepo/storyblok-utils';
import ButtonGroup from './ButtonGroup';
import styles from './storyblok.module.css';

const ALIGNMENTS = ['left', 'center'] as const satisfies readonly NonNullable<
  Block<'teaser'>['alignment']
>[];
const SIZES = ['medium', 'large'] as const satisfies readonly NonNullable<
  Block<'teaser'>['size']
>[];
const VARIANTS = [
  'default',
  'white',
  'subtle',
  'inverted',
] as const satisfies readonly NonNullable<Block<'teaser'>['variant']>[];

export default function Teaser({ blok }: { blok: Block<'teaser'> }) {
  const alignment = pickOption(blok.alignment, ALIGNMENTS, 'left');
  const size = pickOption(blok.size, SIZES, 'large');
  const variant = pickOption(blok.variant, VARIANTS, 'default');

  return (
    <section
      className={styles.teaser}
      data-alignment={alignment}
      data-size={size}
      data-variant={variant}
      {...storyblokEditable(blok)}
    >
      <div className={styles.teaserInner}>
        {blok.eyebrow ? (
          <p className={styles.teaserEyebrow}>{blok.eyebrow}</p>
        ) : null}
        {blok.headline ? (
          <h2 className={styles.teaserHeadline}>{blok.headline}</h2>
        ) : null}
        {blok.description ? (
          <p className={styles.teaserDescription}>{blok.description}</p>
        ) : null}
        <ButtonGroup bloks={blok.buttons} alignment={alignment} />
      </div>
    </section>
  );
}
