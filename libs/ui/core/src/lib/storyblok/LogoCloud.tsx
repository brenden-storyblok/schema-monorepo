import { storyblokEditable } from '@storyblok/react/rsc';
import type { Block } from '../../schema/schema';
import { pickOption } from '@monorepo/storyblok-utils';
import type { HeadingLevel } from '../../schema/headings';
import Heading from './Heading';
import StoryblokImage from './StoryblokImage';
import styles from './storyblok.module.css';

const VARIANTS = [
  'default',
  'white',
  'subtle',
] as const satisfies readonly NonNullable<Block<'logo_cloud'>['variant']>[];
const ALIGNMENTS = ['left', 'center'] as const satisfies readonly NonNullable<
  Block<'logo_cloud'>['alignment']
>[];
const HEIGHTS = [
  'small',
  'medium',
  'large',
] as const satisfies readonly NonNullable<Block<'logo_cloud'>['logo_height']>[];
const HEADING_LEVELS = ['h2', 'h3'] as const satisfies readonly HeadingLevel[];

// Logos are at most 72px tall (see CSS) and rarely wider than 4:1, so 300px
// covers every height option and keeps the loader on small widths.
const LOGO_SIZES = '300px';

export default function LogoCloud({ blok }: { blok: Block<'logo_cloud'> }) {
  const variant = pickOption(blok.variant, VARIANTS, 'default');
  const alignment = pickOption(blok.alignment, ALIGNMENTS, 'center');
  const logoHeight = pickOption(blok.logo_height, HEIGHTS, 'medium');
  const level = pickOption(blok.heading_level, HEADING_LEVELS, 'h2');
  // Boolean fields default to true, but a stored `false` must win.
  const grayscale = blok.grayscale !== false;
  const logos = (blok.logos ?? []).filter((logo) => logo?.filename);

  if (logos.length === 0) return null;

  return (
    <div
      className={styles.logoCloud}
      data-variant={variant}
      data-alignment={alignment}
      data-logo-height={logoHeight}
      data-grayscale={grayscale}
      {...storyblokEditable(blok)}
    >
      <div className={styles.logoCloudInner}>
        {blok.headline ? (
          <Heading level={level} className={styles.logoCloudHeadline}>
            {blok.headline}
          </Heading>
        ) : null}
        <ul className={styles.logoCloudList}>
          {logos.map((logo, index) => (
            // Editors can add the same asset twice, so the index keeps keys unique.
            <li key={`${logo.id ?? logo.filename}-${index}`}>
              <StoryblokImage
                asset={logo}
                sizes={LOGO_SIZES}
                className={styles.logoCloudLogo}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
