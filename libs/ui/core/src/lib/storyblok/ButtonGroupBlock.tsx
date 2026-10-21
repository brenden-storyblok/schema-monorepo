import { storyblokEditable } from '@storyblok/react/rsc';
import type { Block } from '../../schema/schema';
import { pickOption } from '@monorepo/storyblok-utils';
import ButtonGroup from './ButtonGroup';
import styles from './storyblok.module.css';

const ALIGNMENTS = ['left', 'center'] as const satisfies readonly NonNullable<
  Block<'button_group'>['alignment']
>[];

// The nestable block for a standalone row of buttons. Parents that own a
// `buttons` field use `ButtonGroup` directly instead.
export default function ButtonGroupBlock({
  blok,
}: {
  blok: Block<'button_group'>;
}) {
  const alignment = pickOption(blok.alignment, ALIGNMENTS, 'left');

  return (
    <div className={styles.buttonGroupBlock} {...storyblokEditable(blok)}>
      <ButtonGroup bloks={blok.buttons} alignment={alignment} />
    </div>
  );
}
