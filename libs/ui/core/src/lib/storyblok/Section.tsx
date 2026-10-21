import {
  StoryblokServerComponent,
  storyblokEditable,
} from '@storyblok/react/rsc';
import type { Block } from '../../schema/schema';
import { pickOption } from '@monorepo/storyblok-utils';
import { headlineId } from './Headline';
import styles from './storyblok.module.css';

const BACKGROUNDS = [
  'default',
  'white',
  'subtle',
  'inverted',
  'brand',
] as const satisfies readonly NonNullable<Block<'section'>['background']>[];
const SPACINGS = [
  'compact',
  'default',
  'relaxed',
] as const satisfies readonly NonNullable<Block<'section'>['spacing']>[];
const WIDTHS = [
  'content',
  'wide',
  'full',
] as const satisfies readonly NonNullable<Block<'section'>['width']>[];

export default function Section({ blok }: { blok: Block<'section'> }) {
  const background = pickOption(blok.background, BACKGROUNDS, 'default');
  const spacing = pickOption(blok.spacing, SPACINGS, 'default');
  const width = pickOption(blok.width, WIDTHS, 'content');
  // The first headline block names the section. Headline renders nothing
  // without text, so skip empty ones to avoid pointing at a missing id.
  const label = blok.body?.find(
    (nestedBlok) => nestedBlok.component === 'headline' && nestedBlok.text,
  );

  const props = {
    className: styles.section,
    'data-background': background,
    'data-spacing': spacing,
    'data-width': width,
    ...storyblokEditable(blok),
  };
  const content = (
    <div className={styles.sectionInner}>
      {blok.body?.map((nestedBlok) => (
        <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  );

  // A section element is a region landmark only when it has an accessible
  // name, so without a headline render a plain div.
  return label ? (
    <section aria-labelledby={headlineId(label._uid)} {...props}>
      {content}
    </section>
  ) : (
    <div {...props}>{content}</div>
  );
}
