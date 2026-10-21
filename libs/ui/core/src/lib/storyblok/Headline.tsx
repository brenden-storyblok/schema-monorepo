import { storyblokEditable } from '@storyblok/react/rsc';
import type { Block } from '../../schema/schema';
import type { HeadingLevel } from '../../schema/headings';
import { pickOption } from '@monorepo/storyblok-utils';
import ButtonGroup from './ButtonGroup';
import Heading from './Heading';
import styles from './storyblok.module.css';

const LEVELS = [
  'h2',
  'h1',
  'h3',
  'h4',
] as const satisfies readonly HeadingLevel[];
const SIZES = [
  'small',
  'medium',
  'large',
  'display',
] as const satisfies readonly NonNullable<Block<'headline'>['size']>[];
const ALIGNMENTS = ['left', 'center'] as const satisfies readonly NonNullable<
  Block<'headline'>['alignment']
>[];

// Visual size when the editor leaves `size` empty.
const SIZE_FOR_LEVEL = {
  h1: 'display',
  h2: 'large',
  h3: 'medium',
  h4: 'small',
} as const satisfies Record<HeadingLevel, (typeof SIZES)[number]>;

// Section points `aria-labelledby` here to name itself after its first
// headline block.
export function headlineId(uid: string) {
  return `headline-${uid}`;
}

export default function Headline({ blok }: { blok: Block<'headline'> }) {
  if (!blok.text) return null;

  const level = pickOption(blok.level, LEVELS, 'h2');
  const size = pickOption(blok.size, SIZES, SIZE_FOR_LEVEL[level]);
  const alignment = pickOption(blok.alignment, ALIGNMENTS, 'left');

  const heading = (
    <Heading
      level={level}
      id={headlineId(blok._uid)}
      className={styles.headlineText}
    >
      {blok.text}
    </Heading>
  );

  return (
    <div
      className={styles.headline}
      data-size={size}
      data-alignment={alignment}
      {...storyblokEditable(blok)}
    >
      {blok.eyebrow || blok.subline ? (
        // The eyebrow sits outside the heading so the heading text stays the
        // heading text; hgroup ties the parts together.
        <hgroup className={styles.headlineGroup}>
          {blok.eyebrow ? (
            <p className={styles.headlineEyebrow}>{blok.eyebrow}</p>
          ) : null}
          {heading}
          {blok.subline ? (
            <p className={styles.headlineSubline}>{blok.subline}</p>
          ) : null}
        </hgroup>
      ) : (
        heading
      )}
      {blok.buttons?.length ? (
        // Outside the hgroup, which may only hold headings and paragraphs.
        <div className={styles.headlineButtons}>
          <ButtonGroup bloks={blok.buttons} alignment={alignment} />
        </div>
      ) : null}
    </div>
  );
}
