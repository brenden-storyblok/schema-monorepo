import { storyblokEditable } from '@storyblok/react/rsc';
import type { Block } from '../../schema/schema';
import { pickOption } from '@monorepo/storyblok-utils';
import StoryblokImage from './StoryblokImage';
import styles from './storyblok.module.css';

const ALIGNMENTS = ['left', 'center'] as const satisfies readonly NonNullable<
  Block<'quote'>['alignment']
>[];
const SIZES = ['medium', 'large'] as const satisfies readonly NonNullable<
  Block<'quote'>['size']
>[];
const VARIANTS = [
  'default',
  'white',
  'subtle',
  'inverted',
] as const satisfies readonly NonNullable<Block<'quote'>['variant']>[];

export default function Quote({ blok }: { blok: Block<'quote'> }) {
  const alignment = pickOption(blok.alignment, ALIGNMENTS, 'left');
  const size = pickOption(blok.size, SIZES, 'medium');
  const variant = pickOption(blok.variant, VARIANTS, 'default');

  const paragraphs = (blok.quote ?? '')
    .split(/\r?\n\s*\r?\n/)
    .map((text) => text.trim())
    .filter(Boolean);
  if (paragraphs.length === 0) return null;

  const name = blok.author_name?.trim();
  const role = blok.author_role?.trim();
  const avatar = blok.author_image;
  const hasAvatar = Boolean(avatar?.filename);
  const showCaption = Boolean(name || role);
  const cite = blok.cite_url?.trim() || undefined;

  return (
    <figure
      className={styles.quote}
      data-alignment={alignment}
      data-size={size}
      data-variant={variant}
      {...storyblokEditable(blok)}
    >
      <div className={styles.quoteInner}>
        {/* Decorative mark drawn in CSS; nothing for assistive tech to read. */}
        <span className={styles.quoteMark} aria-hidden="true" />
        <blockquote className={styles.quoteBody} cite={cite}>
          {paragraphs.map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </blockquote>
        {showCaption ? (
          <figcaption className={styles.quoteCaption}>
            {hasAvatar ? (
              <span className={styles.quoteAvatar}>
                {/* Empty alt: the name sits next to the photo, so announcing
                    the asset's own alt text would only repeat it. */}
                <StoryblokImage
                  asset={{ filename: avatar?.filename, alt: '' }}
                  sizes="48px"
                  fill
                />
              </span>
            ) : null}
            <span className={styles.quoteAuthor}>
              {name ? <span className={styles.quoteName}>{name}</span> : null}
              {name && role ? (
                <span className={styles.visuallyHidden}>, </span>
              ) : null}
              {role ? <span className={styles.quoteRole}>{role}</span> : null}
            </span>
          </figcaption>
        ) : null}
      </div>
    </figure>
  );
}
