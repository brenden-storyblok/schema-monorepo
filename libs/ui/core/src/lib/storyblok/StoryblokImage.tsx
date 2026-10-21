'use client';

import Image from 'next/image';
import {
  parseStoryblokAsset,
  storyblokImageLoader,
} from '@monorepo/storyblok-utils';

// The loader is a function, and server components cannot pass functions to
// client components. Importing it here keeps this component usable from RSC.

export interface StoryblokImageAsset {
  filename?: string | null;
  alt?: string | null;
}

export interface StoryblokImageProps {
  // An asset field value, or any `{ filename, alt }` pair.
  asset: StoryblokImageAsset | null | undefined;
  // Must match the rendered CSS width, e.g. '(min-width: 768px) 50vw, 100vw'.
  sizes: string;
  // Above-the-fold images (LCP candidates): loads eagerly and preloads.
  preload?: boolean;
  className?: string;
  // Fill the nearest positioned ancestor instead of using intrinsic size.
  fill?: boolean;
}

export default function StoryblokImage({
  asset,
  sizes,
  preload = false,
  className,
  fill = false,
}: StoryblokImageProps) {
  const src = asset?.filename?.trim();
  if (!src) return null;

  // Missing alt means decorative; never fall back to the filename.
  const alt = asset?.alt?.trim() ?? '';
  const { isOptimizable, width, height } = parseStoryblokAsset(src);
  const loading = preload ? ('eager' as const) : ('lazy' as const);
  const fetchPriority = preload ? ('high' as const) : undefined;

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={className}
        loader={isOptimizable ? storyblokImageLoader : undefined}
        unoptimized={!isOptimizable}
        preload={preload}
        fetchPriority={fetchPriority}
      />
    );
  }

  // next/image needs dimensions outside fill mode. External URLs carry none,
  // so render a plain img rather than throw.
  if (!width || !height) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      className={className}
      loader={isOptimizable ? storyblokImageLoader : undefined}
      unoptimized={!isOptimizable}
      preload={preload}
      fetchPriority={fetchPriority}
    />
  );
}
