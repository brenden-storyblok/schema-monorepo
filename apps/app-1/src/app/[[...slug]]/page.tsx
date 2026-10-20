import { StoryblokStory } from '@storyblok/react/rsc';
import { notFound } from 'next/navigation';
import { getStoryblokApi, storyVersion } from '@/lib/storyblok';

export default async function StoryPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const story = await fetchStory(slug?.join('/') ?? 'home');

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

async function fetchStory(fullSlug: string) {
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
