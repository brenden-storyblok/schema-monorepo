import { StoryblokServerComponent } from '@storyblok/react/rsc';
import type { Block } from '../../schema/schema';
import styles from './storyblok.module.css';

// Renders a parent's `buttons` bloks field in a wrapping row. Renders nothing
// when the list is empty so parents need no guard.
export default function ButtonGroup({
  bloks,
  alignment = 'left',
}: {
  bloks: Block<'button'>[] | null | undefined;
  alignment?: 'left' | 'center';
}) {
  if (!bloks?.length) return null;
  return (
    <div className={styles.buttonGroup} data-alignment={alignment}>
      {bloks.map((blok) => (
        <StoryblokServerComponent blok={blok} key={blok._uid} />
      ))}
    </div>
  );
}
