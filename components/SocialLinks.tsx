import { SOCIAL_LINKS } from "@/lib/constants";
import { classNames } from "@/lib/utils";

function SocialIcon({ name }: { name: string }) {
  const common = "h-4 w-4 fill-current";
  switch (name) {
    case "Facebook":
      return (
        <svg className={common} viewBox="0 0 24 24" aria-hidden>
          <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.6l.4-3H13v-2c0-.6.4-1 1-1Z" />
        </svg>
      );
    case "X":
      return (
        <svg className={common} viewBox="0 0 24 24" aria-hidden>
          <path d="M4 4h4.1l4.1 5.8L16.8 4H20l-6.4 8.3L20.4 20h-4.2l-4.5-6.4L7 20H3.6l6.7-8.6L4 4Z" />
        </svg>
      );
    case "Instagram":
      return (
        <svg className={common} viewBox="0 0 24 24" aria-hidden>
          <path d="M8 4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4Zm8 1.8H8A2.2 2.2 0 0 0 5.8 8v8A2.2 2.2 0 0 0 8 18.2h8A2.2 2.2 0 0 0 18.2 16V8A2.2 2.2 0 0 0 16 5.8ZM12 8.6A3.4 3.4 0 1 1 8.6 12 3.4 3.4 0 0 1 12 8.6Zm0 1.7A1.7 1.7 0 1 0 13.7 12 1.7 1.7 0 0 0 12 10.3Zm4.15-2.85a.85.85 0 1 1-.85.85.85.85 0 0 1 .85-.85Z" />
        </svg>
      );
    case "YouTube":
      return (
        <svg className={common} viewBox="0 0 24 24" aria-hidden>
          <path d="M22 12.2s0-3.2-.4-4.6a2.8 2.8 0 0 0-2-2C17.9 5.2 12 5.2 12 5.2s-5.9 0-7.6.4a2.8 2.8 0 0 0-2 2C2 9 2 12.2 2 12.2s0 3.2.4 4.6a2.8 2.8 0 0 0 2 2c1.7.4 7.6.4 7.6.4s5.9 0 7.6-.4a2.8 2.8 0 0 0 2-2c.4-1.4.4-4.6.4-4.6ZM10 15.2V9.2l5.2 3-5.2 3Z" />
        </svg>
      );
    case "TikTok":
      return (
        <svg className={common} viewBox="0 0 24 24" aria-hidden>
          <path d="M14 4c.4 2.4 1.8 4 4.2 4.3v2.5c-1.4 0-2.7-.4-3.8-1.2v6.1A5.7 5.7 0 1 1 8.6 10v2.6a3.2 3.2 0 1 0 2.4 3.1V4H14Z" />
        </svg>
      );
    case "WhatsApp":
      return (
        <svg className={common} viewBox="0 0 24 24" aria-hidden>
          <path d="M12 3.2A8.8 8.8 0 0 0 5.1 17L4 20.8l3.9-1A8.8 8.8 0 1 0 12 3.2Zm4.9 12.4c-.2.6-1.1 1.1-1.8 1.2-.5.1-1.1.1-1.8 0a14 14 0 0 1-6-3.2 7.4 7.4 0 0 1-2.2-3.5c-.2-.8.1-1.6.7-2.1l.9-.7c.3-.2.6-.2.8 0l1.4 1.8c.2.2.2.5.1.8l-.4.8c.7 1.3 1.8 2.3 3.1 3l.8-.4c.3-.1.6-.1.8.1l1.8 1.4c.2.2.2.5 0 .8l-.7.9Z" />
        </svg>
      );
    case "LinkedIn":
      return (
        <svg className={common} viewBox="0 0 24 24" aria-hidden>
          <path d="M6.5 9H4V20h2.5V9ZM5.2 4A1.6 1.6 0 1 0 5.3 7.2 1.6 1.6 0 0 0 5.2 4ZM20 20h-2.5v-5.6c0-1.6-.6-2.6-2-2.6s-2.2 1-2.2 2.6V20H11V9h2.4v1.5c.6-1 1.8-1.8 3.5-1.8 2.6 0 4.1 1.7 4.1 5.1V20Z" />
        </svg>
      );
    default:
      return null;
  }
}

export function SocialLinks({
  variant = "light",
  compact = false,
  iconsOnly = false,
}: {
  variant?: "light" | "dark";
  compact?: boolean;
  iconsOnly?: boolean;
}) {
  const dark = variant === "dark";
  return (
    <nav aria-label="180 Degrees News on social media" className="flex flex-wrap items-center gap-1.5">
      {SOCIAL_LINKS.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          title={`${link.name} ${link.handle}`}
          aria-label={`${link.name} ${link.handle}`}
          className={classNames(
            "inline-flex items-center justify-center",
            iconsOnly ? "h-8 w-8 rounded-full" : compact ? "gap-1.5 px-2 py-1" : "gap-1.5 px-3 py-2",
            !iconsOnly && "text-[11px] font-bold uppercase tracking-[0.12em]",
            dark
              ? "text-white/80 hover:bg-white/10 hover:text-white"
              : "border border-slate-300 text-slate-700 hover:border-[#0b2f8a] hover:text-[#0b2f8a]",
            iconsOnly && dark && "border border-white/20",
          )}
        >
          <SocialIcon name={link.name} />
          {iconsOnly ? <span className="sr-only">{link.name}</span> : link.name}
        </a>
      ))}
    </nav>
  );
}
