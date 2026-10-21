import {
  StoryblokServerComponent,
  storyblokEditable,
} from '@storyblok/react/rsc';
import type { Block } from '../../schema/schema';
import { pickOption } from '@monorepo/storyblok-utils';
import type { HeadingLevel } from '../../schema/headings';
import Heading from './Heading';
import styles from './storyblok.module.css';

const HEADING_LEVELS = ['h2', 'h3'] as const satisfies readonly HeadingLevel[];
const VARIANTS = [
  'default',
  'white',
  'subtle',
  'inverted',
] as const satisfies readonly NonNullable<Block<'stats'>['variant']>[];
const ALIGNMENTS = ['left', 'center'] as const satisfies readonly NonNullable<
  Block<'stats'>['alignment']
>[];
const COLUMNS = ['auto', '2', '3', '4'] as const satisfies readonly NonNullable<
  Block<'stats'>['columns']
>[];

export default function Stats({ blok }: { blok: Block<'stats'> }) {
  const level = pickOption(blok.heading_level, HEADING_LEVELS, 'h2');
  const variant = pickOption(blok.variant, VARIANTS, 'default');
  const alignment = pickOption(blok.alignment, ALIGNMENTS, 'left');
  const columns = pickOption(blok.columns, COLUMNS, 'auto');

  return (
    <div
      className={styles.stats}
      data-variant={variant}
      data-alignment={alignment}
      data-columns={columns}
      {...storyblokEditable(blok)}
    >
      <div className={styles.statsInner}>
        {blok.headline || blok.intro ? (
          <div className={styles.statsHeader}>
            {blok.headline ? (
              <Heading level={level} className={styles.statsHeadline}>
                {blok.headline}
              </Heading>
            ) : null}
            {blok.intro ? (
              <p className={styles.statsIntro}>{blok.intro}</p>
            ) : null}
          </div>
        ) : null}
        <dl className={styles.statsList}>
          {blok.items?.map((nestedBlok) => (
            <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
          ))}
        </dl>
      </div>
    </div>
  );
}
