import {
  StoryblokServerComponent,
  storyblokEditable,
} from '@storyblok/react/rsc';
import type { Block } from '../../schema/schema';
import styles from './storyblok.module.css';

export default function App1Page({ blok }: { blok: Block<'app_1_page'> }) {
  return (
    <main className={styles.page} {...storyblokEditable(blok)}>
      {blok.body?.map((nestedBlok) => (
        <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </main>
  );
}
