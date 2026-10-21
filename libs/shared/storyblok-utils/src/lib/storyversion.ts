// Draft content during development and in the Visual Editor preview;
// published content everywhere else.
export function storyVersion(
    storyblokParam: string | string[] | undefined,
  ): 'draft' | 'published' {
    if (storyblokParam !== undefined) {
        return 'draft';
    }
    return process.env.NODE_ENV === 'production' ? 'published' : 'draft';
  }