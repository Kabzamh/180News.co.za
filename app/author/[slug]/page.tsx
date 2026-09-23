import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TEAM_MAP, TEAM } from "@/lib/team";
import { countArticles, listArticles } from "@/lib/queries";
import { CATEGORY_MAP, SITE } from "@/lib/constants";
import Avatar from "@/components/team/Avatar";
import { StackedTeaser } from "@/components/teasers";
import SocialIcons from "@/components/SocialIcons";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const member = TEAM_MAP[slug];
  if (!member) return { title: "Journalist not found" };
  return {
    title: `${member.name} — ${member.role}`,
    description: `${member.name} is ${member.role} at ${SITE.name}, covering ${member.beat.toLowerCase()}.`,
  };
}

export default async function AuthorPage({ params }: Params) {
  const { slug } = await params;
  const member = TEAM_MAP[slug];
  if (!member) notFound();

  const [bylineCount, articleList, fallback] = await Promise.all([
    countArticles({ author: member.name }),
    listArticles({ author: member.name }, { limit: 24 }),
    listArticles({}, { limit: 6 }),
  ]);

  const hasArchive = articleList.length > 0;
  const otherMembers = TEAM.filter(
    (m) => m.slug !== member.slug && m.group === member.group,
  ).slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: member.name,
    jobTitle: member.role,
    description: member.bio.join(" "),
    email: `mailto:${member.email}`,
    url: `${SITE.url}/author/${member.slug}`,
    worksFor: { "@type": "Organization", name: SITE.name },
    sameAs: member.twitter
      ? [`https://x.com/${member.twitter}`]
      : undefined,
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Profile header */}
      <div
        className="text-white"
        style={{
          background: `linear-gradient(120deg, ${member.accent}, #070e44 95%)`,
        }}
      >
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
          <nav className="mb-4 flex items-center gap-1.5 text-[0.7rem] font-semibold uppercase tracking-wider text-white/70">
            <Link href="/team" className="hover:text-white">
              Newsroom
            </Link>
            <span>/</span>
            <span className="text-white">{member.name}</span>
          </nav>
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <Avatar
              name={member.name}
              color={member.accent}
              size="xl"
              className="!ring-4 !ring-white/30"
            />
            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-brand-gold">
                {member.role}
              </p>
              <h1 className="font-headline mt-1 text-3xl font-black uppercase sm:text-4xl">
                {member.name}
              </h1>
              <p className="mt-1 text-sm text-white/85">
                Beat: {member.beat} · 📍 {member.location}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${member.email}`}
                  className="rounded-sm bg-white/15 px-3 py-1.5 text-xs font-bold hover:bg-white/25"
                >
                  ✉ {member.email}
                </a>
                {member.twitter && (
                  <a
                    href={`https://x.com/${member.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-sm bg-white/15 px-3 py-1.5 text-xs font-bold hover:bg-white/25"
                  >
                    𝕏 @{member.twitter}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-5xl gap-8 px-3 py-8 sm:px-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {/* Bio */}
          <div className="rounded-sm bg-white p-5 shadow-sm">
            <h2 className="mb-2 border-b-2 border-slate-200 pb-2 font-headline text-lg font-black uppercase">
              About
            </h2>
            {member.bio.map((p, i) => (
              <p key={i} className="mb-2 text-sm leading-relaxed text-slate-700">
                {p}
              </p>
            ))}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {member.sections.map((s) => (
                <Link
                  key={s}
                  href={`/section/${s}`}
                  className="rounded-full px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-white"
                  style={{ backgroundColor: CATEGORY_MAP[s]?.color ?? "#475569" }}
                >
                  {CATEGORY_MAP[s]?.short ?? s}
                </Link>
              ))}
            </div>
          </div>

          {/* Articles */}
          <h2 className="mb-3 mt-8 border-b-2 border-brand-red pb-2 font-headline text-xl font-black uppercase">
            {hasArchive
              ? `${member.name.split(" ").slice(-1)[0]}'s stories (${bylineCount})`
              : "From the wider newsroom"}
          </h2>
          {hasArchive ? (
            <div className="space-y-4">
              {articleList.map((a) => (
                <StackedTeaser key={a.id} article={a} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <p className="rounded-sm bg-slate-100 p-4 text-sm text-slate-600">
                {member.name} oversees this part of the newsroom. Explore the
                latest stories from the wider 180° team below.
              </p>
              {fallback.map((a) => (
                <StackedTeaser key={a.id} article={a} />
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-5">
          <div className="rounded-sm bg-white p-5 text-center shadow-sm">
            <p className="font-headline text-4xl font-black text-brand-red">
              {bylineCount}
            </p>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Bylined stories
            </p>
          </div>
          {otherMembers.length > 0 && (
            <div className="rounded-sm bg-white p-5 shadow-sm">
              <h3 className="mb-3 border-b-2 border-brand-navy pb-2 font-headline text-sm font-black uppercase">
                Colleagues
              </h3>
              <ul className="space-y-3">
                {otherMembers.map((m) => (
                  <li key={m.slug}>
                    <Link
                      href={`/author/${m.slug}`}
                      className="flex items-center gap-3 hover:opacity-80"
                    >
                      <Avatar name={m.name} color={m.accent} size="sm" />
                      <div>
                        <p className="text-sm font-bold text-ink">{m.name}</p>
                        <p className="text-[0.68rem] text-slate-500">{m.role}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="rounded-sm bg-brand-navy p-5 text-white shadow-sm">
            <h3 className="font-headline text-sm font-black uppercase text-brand-gold">
              Follow the newsroom
            </h3>
            <div className="mt-3">
              <SocialIcons variant="dark" />
            </div>
            <Link
              href="/team"
              className="mt-4 block text-xs font-bold uppercase tracking-wider text-white/80 hover:text-white"
            >
              Meet the whole team →
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
