import { storyblokEditable } from '@storyblok/react/rsc';
import type { Block } from '../../schema/schema';
import { pickOption } from '@monorepo/storyblok-utils';
import Icon, { ICON_PATHS } from './Icon';
import styles from './storyblok.module.css';

const ICONS = [
  'none',
  ...(Object.keys(ICON_PATHS) as (keyof typeof ICON_PATHS)[]),
] as const satisfies readonly NonNullable<Block<'stat_item'>['icon']>[];

// Renders one <dl> group, so it only works inside `Stats`. The label comes
// first in the DOM so assistive tech reads label then value; CSS `order`
// shows the value on top.
export default function StatItem({ blok }: { blok: Block<'stat_item'> }) {
  const icon = pickOption(blok.icon, ICONS, 'none');

  return (
    <div className={styles.statItem} {...storyblokEditable(blok)}>
      <dt className={styles.statLabel}>{blok.label}</dt>
      <dd className={styles.statValue}>
        {icon !== 'none' ? (
          <span className={styles.statIcon}>
            <Icon name={icon} />
          </span>
        ) : null}
        {blok.value}
      </dd>
      {blok.description ? (
        <dd className={styles.statDescription}>{blok.description}</dd>
      ) : null}
    </div>
  );
}
