import { storyblokEditable } from '@storyblok/react/rsc';
import type { Block } from '../../schema/schema';
import { pickOption, resolveLink } from '@monorepo/storyblok-utils';
import ButtonLink from './ButtonLink';

const VARIANTS = [
  'primary',
  'secondary',
  'link',
] as const satisfies readonly NonNullable<Block<'button'>['variant']>[];

export default function Button({ blok }: { blok: Block<'button'> }) {
  const variant = pickOption(blok.variant, VARIANTS, 'primary');
  const link = resolveLink(blok.link);
  if (!blok.label || !link) return null;

  return (
    <span {...storyblokEditable(blok)}>
      <ButtonLink link={link} variant={variant}>
        {blok.label}
      </ButtonLink>
    </span>
  );
}
