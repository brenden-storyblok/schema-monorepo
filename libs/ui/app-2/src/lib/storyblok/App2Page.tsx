import {
  StoryblokServerComponent,
  storyblokEditable,
} from '@storyblok/react/rsc';
import type { Block } from '../../schema/schema';
import { pickOption } from '@monorepo/storyblok-utils';
import styles from './storyblok.module.css';

const BACKGROUNDS = [
  'default',
  'subtle',
  'inverted',
  'brand',
] as const satisfies readonly NonNullable<Block<'app_2_page'>['background']>[];

export default function App2Page({ blok }: { blok: Block<'app_2_page'> }) {
  const background = pickOption(blok.background, BACKGROUNDS, 'default');

  return (
    <main
      className={styles.page}
      data-background={background}
      {...storyblokEditable(blok)}
    >
      {/* The app wraps pages in a padded container, so a fixed layer is the
          only way to cover the full viewport from inside the page block. */}
      <div className={styles.pageBackdrop} aria-hidden="true" />
      {blok.body?.map((nestedBlok) => (
        <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </main>
  );
}
