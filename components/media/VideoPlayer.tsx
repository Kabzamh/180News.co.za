/** Self-hosted video player (files uploaded from the newsroom portal). */
export default function VideoPlayer({
  src,
  title,
  poster,
}: {
  src: string;
  title?: string;
  poster?: string;
}) {
  return (
    <div className="relative w-full overflow-hidden rounded-sm bg-black shadow-md">
      <video
        controls
        preload="metadata"
        poster={poster}
        className="aspect-video w-full"
        aria-label={title ?? "Video"}
      >
        <source src={src} />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
