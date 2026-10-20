import { storyblokEditable } from '@storyblok/react/rsc';
import type { Block } from '../../schema/schema';
import styles from './storyblok.module.css';

export default function Feature({ blok }: { blok: Block<'feature'> }) {
  return (
    <div
      className={`${styles.feature} rounded shadow`}
      {...storyblokEditable(blok)}
    >
      <h2>{blok.name}</h2>
    </div>
  );
}
