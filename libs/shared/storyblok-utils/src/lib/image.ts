// Storyblok asset URLs look like
// https://a.storyblok.com/f/<space>/<width>x<height>/<hash>/<name>.jpg
// (regional hosts use a-us., a-ap. and so on).
const STORYBLOK_ASSET =
  /^https:\/\/a(?:-[a-z]+)?\.storyblok\.com\/f\/\d+\/(\d+)x(\d+)\//;

export interface StoryblokAssetInfo {
  // True for raster images the image service can resize. SVGs and URLs on
  // other hosts are false and must render unoptimized.
  isOptimizable: boolean;
  // Original dimensions read from the URL; undefined when the URL has none.
  width?: number;
  height?: number;
}

function stripQuery(url: string): string {
  return url.split(/[?#]/, 1)[0];
}

// Read what the asset URL says about itself without fetching it.
export function parseStoryblokAsset(
  url: string | null | undefined,
): StoryblokAssetInfo {
  const src = url?.trim() ?? '';
  const match = STORYBLOK_ASSET.exec(src);
  if (!match) return { isOptimizable: false };
  const width = Number(match[1]);
  const height = Number(match[2]);
  const dimensions = width > 0 && height > 0 ? { width, height } : {};
  return {
    isOptimizable: !/\.svg$/i.test(stripQuery(src)),
    ...dimensions,
  };
}

export interface StoryblokImageLoaderProps {
  src: string;
  width: number;
  quality?: number;
}

// next/image loader for the Storyblok image service. `/m/<w>x0` resizes to
// <w> pixels wide, keeps the aspect ratio, and serves WebP/AVIF when the
// browser accepts them. Widths above the original are clamped so srcset
// entries never upscale. Quality is only sent when the caller passes one.
// Only pass Storyblok raster URLs (see `parseStoryblokAsset`); anything else
// should render with `unoptimized`.
export function storyblokImageLoader({
  src,
  width,
  quality,
}: StoryblokImageLoaderProps): string {
  const original = parseStoryblokAsset(src).width;
  const target = original ? Math.min(width, original) : width;
  const filters = quality ? `/filters:quality(${quality})` : '';
  return `${src}/m/${target}x0${filters}`;
}
