import { storyblokEditable } from '@storyblok/react/rsc';
import type { Block } from '../../schema/schema';
import { pickOption } from '@monorepo/storyblok-utils';
import Icon from './Icon';
import styles from './storyblok.module.css';

const ICONS = [
  'none',
  'bolt',
  'shield',
  'chart',
  'sparkles',
] as const satisfies readonly NonNullable<Block<'feature'>['icon']>[];
const VARIANTS = [
  'default',
  'white',
  'outlined',
  'accent',
] as const satisfies readonly NonNullable<Block<'feature'>['variant']>[];
const ALIGNMENTS = ['left', 'center'] as const satisfies readonly NonNullable<
  Block<'feature'>['alignment']
>[];

export default function Feature({ blok }: { blok: Block<'feature'> }) {
  const icon = pickOption(blok.icon, ICONS, 'none');
  const variant = pickOption(blok.variant, VARIANTS, 'default');
  const alignment = pickOption(blok.alignment, ALIGNMENTS, 'left');

  return (
    <article
      className={styles.feature}
      data-variant={variant}
      data-alignment={alignment}
      {...storyblokEditable(blok)}
    >
      {icon !== 'none' ? (
        <span className={styles.featureIcon}>
          <Icon name={icon} />
        </span>
      ) : null}
      {blok.name ? <h3 className={styles.featureTitle}>{blok.name}</h3> : null}
      {blok.description ? (
        <p className={styles.featureDescription}>{blok.description}</p>
      ) : null}
    </article>
  );
}
