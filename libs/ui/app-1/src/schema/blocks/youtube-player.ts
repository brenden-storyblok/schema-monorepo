import { defineBlock, defineField } from '@storyblok/schema';
import { app1Components } from '../folders';

export const youtubePlayerBlock = defineBlock({
  name: 'youtube_player',
  display_name: 'YouTube Player',
  is_root: false,
  is_nestable: true,
  folder: app1Components,
  fields: [
    defineField('video_id', {
      type: 'text',
      display_name: 'Video ID',
      description:
        'The 11-character ID only, e.g. dQw4w9WgXcQ from youtube.com/watch?v=dQw4w9WgXcQ.',
      required: true,
      regex: '^[A-Za-z0-9_-]{11}$',
    }),
    defineField('title', {
      type: 'text',
      display_name: 'Title',
      description: 'Screen readers announce this as the player name.',
      required: true,
    }),
    defineField('playback_tab', {
      type: 'tab',
      display_name: 'Playback',
      keys: ['autoplay', 'mute', 'loop', 'show_controls', 'start'],
    }),
    defineField('autoplay', {
      type: 'boolean',
      display_name: 'Autoplay',
      description: 'Browsers only autoplay muted video, so this also mutes.',
      default_value: false,
    }),
    defineField('mute', {
      type: 'boolean',
      display_name: 'Mute',
      default_value: false,
    }),
    defineField('loop', {
      type: 'boolean',
      display_name: 'Loop',
      default_value: false,
    }),
    defineField('show_controls', {
      type: 'boolean',
      display_name: 'Show controls',
      default_value: true,
    }),
    defineField('start', {
      type: 'number',
      display_name: 'Start at (seconds)',
      description: 'Leave empty to start from the beginning.',
      min_value: 0,
    }),
  ],
});
