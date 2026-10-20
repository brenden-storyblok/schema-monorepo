import { storyblokEditable } from '@storyblok/react/rsc';
import type { Block } from '../../schema/schema';
import styles from './storyblok.module.css';

export default function Teaser({ blok }: { blok: Block<'teaser'> }) {
  return (
    <h1 className={styles.teaser} {...storyblokEditable(blok)}>
      {blok.headline}
    </h1>
  );
}
