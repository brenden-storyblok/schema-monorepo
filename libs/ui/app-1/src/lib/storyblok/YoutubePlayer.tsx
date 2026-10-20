import { storyblokEditable } from '@storyblok/react/rsc';
import type { Block } from '../../schema/schema';
import styles from './storyblok.module.css';

// Matches the `video_id` field's regex. The ID lands in the iframe URL, so
// the component rechecks it instead of trusting stored content.
const VIDEO_ID = /^[A-Za-z0-9_-]{11}$/;

// Translates the Playback tab into YouTube embed parameters:
// https://developers.google.com/youtube/player_parameters
function embedSrc(blok: Block<'youtube_player'>, videoId: string) {
  const params = new URLSearchParams({ rel: '0', playsinline: '1' });

  if (blok.autoplay) params.set('autoplay', '1');
  // Browsers block autoplay with sound, so autoplay implies mute.
  if (blok.mute || blok.autoplay) params.set('mute', '1');
  // YouTube only loops a single video when it is also the playlist.
  if (blok.loop) {
    params.set('loop', '1');
    params.set('playlist', videoId);
  }
  if (blok.show_controls === false) params.set('controls', '0');

  // Storyblok stores number fields as strings.
  const start = Math.floor(Number(blok.start));
  if (start > 0) params.set('start', String(start));

  return `https://www.youtube-nocookie.com/embed/${videoId}?${params}`;
}

export default function YoutubePlayer({
  blok,
}: {
  blok: Block<'youtube_player'>;
}) {
  if (!blok.video_id || !VIDEO_ID.test(blok.video_id)) return null;

  return (
    <div className={styles.youtubePlayer} {...storyblokEditable(blok)}>
      <iframe
        className={styles.youtubePlayerFrame}
        src={embedSrc(blok, blok.video_id)}
        title={blok.title || 'YouTube video'}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
}
