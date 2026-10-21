import { StoryblokStory } from '@storyblok/react/rsc';
import { notFound } from 'next/navigation';
import { getStoryblokApi } from '@/lib/storyblok';
import { storyVersion } from '@monorepo/storyblok-utils';

export default async function StoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{ _storyblok?: string | string[] }>;
}) {
  const { slug } = await params;
  const { _storyblok } = await searchParams;
  const storyVersionValue = storyVersion(_storyblok);
  const story = await fetchStory(slug?.join('/') ?? 'home', storyVersionValue);

  if (!story) {
    notFound();
  }

  return (
    <div className="wrapper">
      <div className="container">
        <StoryblokStory
          story={story}
          bridgeOptions={{ resolveLinks: 'link' }}
        />
      </div>
    </div>
  );
}

async function fetchStory(fullSlug: string, storyVersion: 'draft' | 'published') {
  try {
    const { data } = await getStoryblokApi().get(
      `cdn/stories/${fullSlug}`,
      { version: storyVersion, resolve_links: 'link' },
      { cache: 'no-store' },
    );
    return data.story;
  } catch {
    return null;
  }
}
