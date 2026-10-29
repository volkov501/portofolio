// lib/video.ts
// Turns a project video link into something the player can show.
// Supported: YouTube (watch / youtu.be / shorts / live links), Google Drive share links,
// and direct video files such as /projects/videos/demo.mp4 or any https://….mp4 / .webm URL.

export type ProjectVideo =
  | { kind: "youtube"; embedUrl: string; thumbnail: string }
  | { kind: "drive"; embedUrl: string }
  | { kind: "file"; src: string };

export function parseVideo(url: string): ProjectVideo | null {
  const src = url.trim();
  if (!src) return null;

  const yt = src.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/);
  if (yt) {
    return {
      kind: "youtube",
      // youtube-nocookie avoids tracking cookies until the visitor actually plays the video
      embedUrl: `https://www.youtube-nocookie.com/embed/${yt[1]}?autoplay=1&rel=0&playsinline=1`,
      thumbnail: `https://i.ytimg.com/vi/${yt[1]}/hqdefault.jpg`,
    };
  }

  const drive = src.match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:.*&)?id=)([\w-]+)/);
  if (drive) return { kind: "drive", embedUrl: `https://drive.google.com/file/d/${drive[1]}/preview` };

  return { kind: "file", src };
}
