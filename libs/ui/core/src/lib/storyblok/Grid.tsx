import {
  StoryblokServerComponent,
  storyblokEditable,
} from '@storyblok/react/rsc';
import type { Block } from '../../schema/schema';
import { pickOption } from '@monorepo/storyblok-utils';
import styles from './storyblok.module.css';

const COLUMN_COUNTS = ['2', '3', '4'] as const satisfies readonly NonNullable<
  Block<'grid'>['column_count']
>[];
const SPACINGS = [
  'compact',
  'default',
  'relaxed',
] as const satisfies readonly NonNullable<Block<'grid'>['spacing']>[];

export default function Grid({ blok }: { blok: Block<'grid'> }) {
  const columnCount = pickOption(blok.column_count, COLUMN_COUNTS, '3');
  const spacing = pickOption(blok.spacing, SPACINGS, 'default');

  return (
    <div
      className={styles.grid}
      data-columns={columnCount}
      data-spacing={spacing}
      {...storyblokEditable(blok)}
    >
      {blok.columns?.map((nestedBlok) => (
        <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  );
}
