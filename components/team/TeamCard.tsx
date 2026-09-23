import Link from "next/link";
import type { TeamMember } from "@/lib/team";
import Avatar from "@/components/team/Avatar";

const GROUP_LABEL: Record<TeamMember["group"], string> = {
  leadership: "Leadership",
  editors: "Desk editor",
  reporters: "Correspondent",
  production: "Desk",
};

export default function TeamCard({
  member,
  count,
  featured = false,
}: {
  member: TeamMember;
  count?: number;
  featured?: boolean;
}) {
  const inner = (
    <div
      className={`card-hover group flex h-full flex-col items-start gap-3 bg-white p-5 text-left shadow-sm ${
        featured ? "sm:flex-row sm:items-center" : ""
      }`}
    >
      <div className="relative">
        <Avatar name={member.name} color={member.accent} size={featured ? "xl" : "lg"} />
        <span
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-2 py-0.5 text-[0.55rem] font-black uppercase tracking-widest text-white shadow"
          style={{ backgroundColor: member.accent }}
        >
          {GROUP_LABEL[member.group]}
        </span>
      </div>
      <div className="min-w-0">
        <h3
          className={`font-headline font-black leading-tight text-ink group-hover:text-brand-red ${
            featured ? "text-xl" : "text-base"
          }`}
        >
          {member.name}
        </h3>
        <p className="text-xs font-bold" style={{ color: member.accent }}>
          {member.role}
        </p>
        <p className="mt-1 text-xs font-semibold text-slate-500">{member.beat}</p>
        <p className="mt-0.5 flex items-center gap-1 text-[0.68rem] text-slate-400">
          <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z" />
            <circle cx="12" cy="10" r="2.6" />
          </svg>
          {member.location}
        </p>
        {typeof count === "number" && member.archive && (
          <p className="mt-1.5 text-[0.68rem] font-black uppercase tracking-wider text-slate-400">
            {count} {count === 1 ? "story" : "stories"}
          </p>
        )}
      </div>
    </div>
  );

  if (member.archive) {
    return (
      <Link href={`/author/${member.slug}`} className="block">
        {inner}
      </Link>
    );
  }
  return inner;
}
