import { storyblokEditable } from '@storyblok/react/rsc';
// import type { ReactNode } from 'react';
import type { Block } from '../../schema/schema';
import { pickOption } from '@monorepo/storyblok-utils';
import styles from './storyblok.module.css';

// const ICONS = [
//   'none',
//   'bolt',
//   'shield',
//   'chart',
//   'sparkles',
// ] as const satisfies readonly NonNullable<Block<'feature'>['icon']>[];
const VARIANTS = [
  'default',
  'outlined',
  'accent',
] as const satisfies readonly NonNullable<Block<'feature'>['variant']>[];
const ALIGNMENTS = ['left', 'center'] as const satisfies readonly NonNullable<
  Block<'feature'>['alignment']
>[];

// const ICON_PATHS: Record<Exclude<(typeof ICONS)[number], 'none'>, ReactNode> = {
//   bolt: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />,
//   shield: <path d="M12 3 4 6v6c0 4.5 3.4 8 8 9 4.6-1 8-4.5 8-9V6l-8-3Z" />,
//   chart: <path d="M4 20V10m6 10V4m6 16v-7m4 7H3" />,
//   sparkles: (
//     <path d="M12 3v4m0 10v4M3 12h4m10 0h4M6.3 6.3l2.4 2.4m6.6 6.6 2.4 2.4m0-11.4-2.4 2.4m-6.6 6.6-2.4 2.4" />
//   ),
// };

export default function Feature({ blok }: { blok: Block<'feature'> }) {
  // const icon = pickOption(blok.icon, ICONS, 'none');
  const variant = pickOption(blok.variant, VARIANTS, 'default');
  const alignment = pickOption(blok.alignment, ALIGNMENTS, 'left');

  return (
    <article
      className={styles.feature}
      data-variant={variant}
      data-alignment={alignment}
      {...storyblokEditable(blok)}
    >
      {/* {icon !== 'none' ? (
        <span className={styles.featureIcon}>
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
          >
            {ICON_PATHS[icon]}
          </svg>
        </span>
      ) : null} */}
      {blok.name ? <h3 className={styles.featureTitle}>{blok.name}</h3> : null}
      {blok.description ? (
        <p className={styles.featureDescription}>{blok.description}</p>
      ) : null}
    </article>
  );
}
